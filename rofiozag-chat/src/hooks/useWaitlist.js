import { useState } from 'react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { submitWaitlistEntry } from '../lib/supabase';
import { trackEvent } from '../utils/analytics';

export function useWaitlist() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const handleWaitlistSubmit = async ({ name = '', email, role = 'Creator', referralCode = '' }) => {
    setLoading(true);
    try {
      const entry = await submitWaitlistEntry({ name, email, role, referralCode });
      setSuccessData(entry);
      setIsModalOpen(true);
      triggerConfetti();
      toast.success('🎉 You\'re on the VIP waitlist!');
      trackEvent('waitlist_submission_success', { role, position: entry.position });
      return { success: true, data: entry };
    } catch (error) {
      toast.error(error.message || 'Failed to submit. Please try again.');
      trackEvent('waitlist_submission_failed', { error: error.message });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    loading,
    successData,
    isModalOpen,
    handleWaitlistSubmit,
    closeModal
  };
}
