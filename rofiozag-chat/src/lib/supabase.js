import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit waitlist entry to Supabase or LocalStorage fallback
 */
export async function submitWaitlistEntry({ name, email, role = 'Creator', referralCode = '' }) {
  const normalizedEmail = email.trim().toLowerCase();
  
  // Local storage check for duplicate
  const localEntries = JSON.parse(localStorage.getItem('rofiozag_waitlist') || '[]');
  const isDuplicateLocal = localEntries.some(item => item.email.toLowerCase() === normalizedEmail);

  if (isDuplicateLocal) {
    throw new Error('This email address is already on the waitlist.');
  }

  let position = 14892 + localEntries.length + 1;
  const referralLink = `https://rofiozag.chat/waitlist?ref=${Math.random().toString(36).substring(2, 9)}`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            name,
            email: normalizedEmail,
            role,
            referral_code: referralCode,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Duplicate key
          throw new Error('This email address is already on the waitlist.');
        }
        console.warn('Supabase insertion error, falling back to local state:', error.message);
      } else if (data) {
        position = data.id || position;
      }
    } catch (err) {
      if (err.message.includes('already on the waitlist')) {
        throw err;
      }
      console.warn('Using fallback persistence for waitlist submission');
    }
  }

  // Always save to LocalStorage for instant UI reliability
  const newEntry = {
    id: position,
    name,
    email: normalizedEmail,
    role,
    referralCode,
    referralLink,
    position,
    timestamp: new Date().toISOString()
  };

  localEntries.push(newEntry);
  localStorage.setItem('rofiozag_waitlist', JSON.stringify(localEntries));

  return newEntry;
}
