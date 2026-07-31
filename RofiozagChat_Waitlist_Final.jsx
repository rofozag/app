import { useState, useEffect, useRef } from "react";

// ── CONFIG: Replace with your actual Supabase credentials ─────────────────
const SUPABASE_URL = "https://npzhuktoskzvtxkromrl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wemh1a3Rvc2t6dnR4a3JvbXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDc5NTAsImV4cCI6MjA5OTI4Mzk1MH0._kaA-6byVZVg6Cu2gRnMdif_jiniAUiomHNmt7rnDr0";

async function insertWaitlist(name, email) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, email: email.toLowerCase(), source: "landing_page" }),
  });
  return res;
}

async function checkExists(email) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email.toLowerCase())}&select=id`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  const data = await res.json();
  return Array.isArray(data) && data.length > 0;
}

async function getCount() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?select=id`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "count=exact",
      "Range-Unit": "items",
      Range: "0-0",
    },
  });
  const range = res.headers.get("content-range");
  const total = range ? parseInt(range.split("/")[1]) : 0;
  return isNaN(total) ? 0 : total;
}

// ── Animated number ────────────────────────────────────────────────────────
function AnimatedCount({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current || value === 0) return;
    ref.current = true;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

// ── Door SVG ───────────────────────────────────────────────────────────────
function DoorMark({ size = 56 }) {
  return (
    <svg width={size * 0.78} height={size} viewBox="0 0 32 40" fill="none">
      <rect x="1" y="1" width="30" height="38" rx="3" stroke="#2563eb" strokeWidth="2.5" />
      <rect x="5" y="5" width="22" height="30" rx="2" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6" />
      <rect x="20" y="18" width="4" height="1.5" rx="0.75" fill="#3b82f6" opacity="0.8" />
      <text x="16" y="27" textAnchor="middle" fill="white" fontSize="15" fontWeight="800" fontFamily="Inter,sans-serif">R</text>
    </svg>
  );
}

// ── Feature card ───────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(37,99,235,0.04)" : "#0f0f0f",
        border: `1px solid ${hov ? "rgba(37,99,235,0.35)" : "#1c1c1e"}`,
        borderRadius: 20, padding: "28px 24px",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-4px)" : "none",
        cursor: "default",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 16,
      }}>{icon}</div>
      <h3 style={{ color: "#f4f4f5", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#71717a", fontSize: 13, lineHeight: 1.75, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Step card ──────────────────────────────────────────────────────────────
function StepCard({ num, icon, title, desc }) {
  return (
    <div style={{
      background: "#0f0f0f", border: "1px solid #1c1c1e",
      borderRadius: 20, padding: "28px 24px", flex: 1, minWidth: 220,
      position: "relative",
    }}>
      <span style={{
        position: "absolute", top: 20, right: 20,
        fontSize: 11, fontWeight: 800, color: "#1c1c1e", letterSpacing: 1,
      }}>{num}</span>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.04))",
        border: "1px solid rgba(37,99,235,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 18,
      }}>{icon}</div>
      <h3 style={{ color: "#f4f4f5", fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "#71717a", fontSize: 13, lineHeight: 1.75, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle|loading|success|duplicate|error
  const [count, setCount] = useState(0);
  const [spot, setSpot] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getCount().then(setCount);
  }, []);

  async function handleSubmit(e, formId) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const exists = await checkExists(email.trim());
      if (exists) { setStatus("duplicate"); return; }
      const res = await insertWaitlist(name.trim(), email.trim());
      if (res.ok) {
        const newCount = await getCount();
        setCount(newCount);
        setSpot(newCount);
        setStatus("success");
        setName(""); setEmail("");
      } else {
        const err = await res.json().catch(() => ({}));
        if (err?.code === "23505") setStatus("duplicate");
        else setStatus("error");
      }
    } catch { setStatus("error"); }
  }

  const features = [
    { icon: "💬", title: "Real-time DMs & Groups", desc: "Instant messaging with typing indicators, read receipts, voice notes, and group chats up to 200 members." },
    { icon: "📢", title: "Channels & Broadcasting", desc: "Broadcast to unlimited subscribers. Perfect for brands, creators, and community leaders." },
    { icon: "◎", title: "Stories + Auto-Post", desc: "Create a story once. Auto-post to Facebook, Twitter/X, and TikTok simultaneously." },
    { icon: "✦", title: "AI Creator Suite", desc: "AI-generated captions per platform, message translation, and a personal AI assistant @rofiozag_assistant." },
    { icon: "⭐", title: "Stars Economy", desc: "Gift Stars to creators. 1 Star = ₦1,200. 25 Stars unlocks Business. Non-refundable virtual currency." },
    { icon: "🤖", title: "Bots & Automation", desc: "Build webhook bots, automate messages, and integrate Rofiozag Chat with your existing tools." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f4f4f5", fontFamily: "'Inter',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:rgba(37,99,235,.3);color:#f4f4f5}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#27272a;border-radius:4px}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(37,99,235,.25)}50%{box-shadow:0 0 40px rgba(37,99,235,.5),0 0 80px rgba(37,99,235,.15)}}
        @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes float1{0%,100%{transform:translateY(-4px)}50%{transform:translateY(4px)}}
        @keyframes float2{0%,100%{transform:translateY(-2px)}50%{transform:translateY(6px)}}

        .fade-up{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.55s}.d6{animation-delay:.7s}

        .inp{
          width:100%;background:#1a1a1a;border:1.5px solid #1c1c1e;
          border-radius:12px;padding:13px 16px;color:#f4f4f5;
          font-size:14px;font-family:inherit;outline:none;
          transition:border-color .2s,box-shadow .2s;
        }
        .inp::placeholder{color:#3f3f46}
        .inp:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1)}

        .btn-primary{
          width:100%;padding:14px;border-radius:12px;border:none;
          background:linear-gradient(135deg,#1a56db,#2563eb);
          color:white;font-size:15px;font-weight:700;font-family:inherit;
          cursor:pointer;transition:opacity .2s,transform .15s;
          animation:glow 3s ease-in-out infinite;
        }
        .btn-primary:hover{opacity:.9;transform:translateY(-1px)}
        .btn-primary:active{transform:translateY(0)}
        .btn-primary:disabled{opacity:.45;cursor:not-allowed;animation:none}

        .nav-link{color:#71717a;text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
        .nav-link:hover{color:#f4f4f5}

        .pill{
          display:inline-flex;align-items:center;gap:7px;
          background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.2);
          border-radius:999px;padding:6px 14px;
          font-size:11px;font-weight:700;color:#3b82f6;
          letter-spacing:.8px;text-transform:uppercase;
        }

        .platform-chip{
          display:flex;align-items:center;gap:8px;
          background:#0f0f0f;border:1px solid #1c1c1e;
          border-radius:999px;padding:9px 16px;
          white-space:nowrap;
        }

        .plan-card{
          flex:1;min-width:240px;
          background:#0f0f0f;border:1.5px solid #1c1c1e;
          border-radius:22px;padding:28px 24px;
          transition:border-color .25s,transform .25s;position:relative;
        }
        .plan-card:hover{transform:translateY(-4px)}
        .plan-card.hot{border-color:rgba(37,99,235,.45);background:linear-gradient(160deg,rgba(37,99,235,.07),#0f0f0f 70%)}

        .plan-btn{
          display:block;width:100%;padding:13px;margin-top:22px;
          border-radius:12px;font-size:14px;font-weight:700;font-family:inherit;
          cursor:pointer;transition:all .2s;text-align:center;border:none;
        }

        @media(max-width:700px){
          .hide-mob{display:none!important}
          .features-grid{grid-template-columns:1fr!important}
          .steps-flex{flex-direction:column!important}
          .plans-flex{flex-direction:column!important}
          .stats-grid{grid-template-columns:1fr 1fr!important}
          .hero-h1{font-size:38px!important;letter-spacing:-1px!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        height:60,display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 24px",
        background:"rgba(8,8,8,.88)",backdropFilter:"blur(20px)",
        borderBottom:"1px solid #1c1c1e",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <DoorMark size={34} />
          <span style={{fontWeight:800,fontSize:15,letterSpacing:"-.3px"}}>Rofiozag Chat</span>
        </div>
        <div className="hide-mob" style={{display:"flex",gap:28}}>
          {["Features","How it works","Pricing"].map(l=>(
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} className="nav-link">{l}</a>
          ))}
        </div>
        <button
          onClick={()=>document.getElementById("hero-form")?.scrollIntoView({behavior:"smooth"})}
          style={{
            background:"linear-gradient(135deg,#1a56db,#2563eb)",
            color:"white",border:"none",borderRadius:10,
            padding:"8px 16px",fontSize:13,fontWeight:700,
            cursor:"pointer",fontFamily:"inherit",
          }}
        >
          Join Waitlist
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        textAlign:"center",padding:"110px 20px 80px",
        position:"relative",overflow:"hidden",
      }}>
        {/* Glows */}
        <div style={{position:"absolute",top:"25%",left:"50%",transform:"translateX(-50%)",
          width:700,height:700,borderRadius:"50%",pointerEvents:"none",
          background:"radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%)"}} />
        <div style={{position:"absolute",top:"5%",right:"8%",
          width:280,height:280,borderRadius:"50%",pointerEvents:"none",
          background:"radial-gradient(circle,rgba(124,58,237,.06) 0%,transparent 70%)"}} />
        <div style={{position:"absolute",bottom:"10%",left:"5%",
          width:200,height:200,borderRadius:"50%",pointerEvents:"none",
          background:"radial-gradient(circle,rgba(37,99,235,.05) 0%,transparent 70%)"}} />

        {/* Floating app icons */}
        {[
          { emoji:"💬", style:{top:"22%",left:"8%",animation:"float0 4s ease-in-out infinite"} },
          { emoji:"⭐", style:{top:"30%",right:"9%",animation:"float1 3.5s ease-in-out infinite"} },
          { emoji:"📢", style:{bottom:"28%",left:"6%",animation:"float2 4.5s ease-in-out infinite"} },
          { emoji:"✦", style:{bottom:"22%",right:"7%",animation:"float0 3.8s ease-in-out infinite 0.5s"} },
        ].map((f,i)=>(
          <div key={i} className="hide-mob" style={{
            position:"absolute",width:48,height:48,borderRadius:14,
            background:"rgba(37,99,235,.08)",border:"1px solid rgba(37,99,235,.15)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:22,pointerEvents:"none",...f.style,
          }}>{f.emoji}</div>
        ))}

        {/* Logo */}
        {mounted && (
          <div className="fade-up" style={{marginBottom:24}}>
            <div style={{
              width:88,height:88,borderRadius:28,
              background:"rgba(37,99,235,.08)",
              border:"1px solid rgba(37,99,235,.2)",
              display:"flex",alignItems:"center",justifyContent:"center",
              margin:"0 auto",
              boxShadow:"0 0 40px rgba(37,99,235,.2)",
            }}>
              <DoorMark size={52} />
            </div>
          </div>
        )}

        {/* Badge */}
        {mounted && (
          <div className="fade-up d1" style={{marginBottom:24}}>
            <div className="pill">
              <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",
                animation:"pulse 1.5s ease-in-out infinite",display:"inline-block"}} />
              Private Beta · Limited Spots Available
            </div>
          </div>
        )}

        {/* Headline */}
        {mounted && (
          <h1 className="fade-up d2 hero-h1" style={{
            fontSize:62,fontWeight:900,letterSpacing:"-2.5px",lineHeight:1.06,
            maxWidth:820,marginBottom:22,
          }}>
            <span style={{color:"#f4f4f5"}}>The Messaging App</span><br/>
            <span style={{
              background:"linear-gradient(135deg,#1a56db 0%,#3b82f6 50%,#60a5fa 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>Built for Nigerian Creators</span>
          </h1>
        )}

        {/* Sub */}
        {mounted && (
          <p className="fade-up d3" style={{
            fontSize:17,color:"#71717a",maxWidth:500,
            lineHeight:1.75,marginBottom:44,
          }}>
            Chat, share stories, and auto-post to Facebook, Twitter/X & TikTok — all from one app. AI-powered captions, Stars economy, and real-time messaging built for the Nigerian creator ecosystem.
          </p>
        )}

        {/* FORM */}
        {mounted && (
          <div id="hero-form" className="fade-up d4" style={{width:"100%",maxWidth:460}}>
            <div style={{
              background:"#0f0f0f",border:"1px solid #1c1c1e",
              borderRadius:24,padding:"24px",
              boxShadow:"0 32px 80px rgba(0,0,0,.6)",
            }}>
              {status==="success" ? (
                <div style={{textAlign:"center",padding:"12px 0"}}>
                  <div style={{
                    width:64,height:64,borderRadius:"50%",margin:"0 auto 16px",
                    background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  }}>✅</div>
                  <h3 style={{color:"#f4f4f5",fontSize:19,fontWeight:800,marginBottom:8}}>
                    You're on the list!
                  </h3>
                  <p style={{color:"#71717a",fontSize:14,lineHeight:1.6,marginBottom:16}}>
                    We'll email you the moment Rofiozag Chat launches. Share with your creator friends!
                  </p>
                  <div style={{
                    background:"rgba(37,99,235,.08)",border:"1px solid rgba(37,99,235,.2)",
                    borderRadius:12,padding:"12px 16px",
                    fontSize:14,fontWeight:700,color:"#3b82f6",
                  }}>
                    🎉 You're #{spot.toLocaleString()} on the waitlist
                  </div>
                </div>
              ) : status==="duplicate" ? (
                <div style={{textAlign:"center",padding:"12px 0"}}>
                  <div style={{
                    width:64,height:64,borderRadius:"50%",margin:"0 auto 16px",
                    background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  }}>⚡</div>
                  <h3 style={{color:"#f4f4f5",fontSize:19,fontWeight:800,marginBottom:8}}>
                    Already registered!
                  </h3>
                  <p style={{color:"#71717a",fontSize:14,marginBottom:16}}>
                    This email is already on the waitlist. We'll reach out when we launch.
                  </p>
                  <button onClick={()=>setStatus("idle")} style={{
                    color:"#3b82f6",background:"none",border:"none",
                    cursor:"pointer",fontSize:14,fontWeight:600,fontFamily:"inherit",
                  }}>Use a different email →</button>
                </div>
              ) : (
                <form onSubmit={(e)=>handleSubmit(e,"hero")}>
                  <div style={{marginBottom:10}}>
                    <input className="inp" type="text" placeholder="Your full name"
                      value={name} onChange={e=>setName(e.target.value)} required />
                  </div>
                  <div style={{marginBottom:14}}>
                    <input className="inp" type="email" placeholder="your@email.com"
                      value={email} onChange={e=>setEmail(e.target.value)} required />
                  </div>
                  <button className="btn-primary" type="submit" disabled={status==="loading"}>
                    {status==="loading" ? (
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                        <span style={{
                          width:16,height:16,border:"2px solid rgba(255,255,255,.3)",
                          borderTopColor:"white",borderRadius:"50%",
                          animation:"spin .7s linear infinite",display:"inline-block",
                        }}/>
                        Securing your spot…
                      </span>
                    ) : "🚀 Get Early Access — It's Free"}
                  </button>
                  {status==="error" && (
                    <p style={{color:"#e53e3e",fontSize:12,marginTop:10,textAlign:"center"}}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p style={{color:"#3f3f46",fontSize:12,textAlign:"center",marginTop:12}}>
                    🔒 No spam. Unsubscribe anytime. Your data is safe.
                  </p>
                </form>
              )}
            </div>

            {/* Live count */}
            <div style={{marginTop:20,fontSize:14,color:"#71717a"}}>
              <span style={{color:"#22c55e",fontWeight:800,fontSize:16}}>
                <AnimatedCount value={count} />
              </span>
              {" "}Nigerian creators already waiting
            </div>
          </div>
        )}
      </section>

      {/* ── MARQUEE ── */}
      <div style={{overflow:"hidden",padding:"20px 0",
        borderTop:"1px solid #1c1c1e",borderBottom:"1px solid #1c1c1e",background:"#0a0a0a"}}>
        <div style={{display:"flex",gap:16,animation:"marquee 22s linear infinite",width:"max-content"}}>
          {[...Array(2)].map((_,i)=>(
            <div key={i} style={{display:"flex",gap:16}}>
              {[
                {e:"📘",n:"Facebook"},{e:"𝕏",n:"Twitter/X"},{e:"🎵",n:"TikTok"},
                {e:"📸",n:"Instagram"},{e:"▶️",n:"YouTube"},{e:"💼",n:"LinkedIn"},
                {e:"💬",n:"DMs"},{e:"⭐",n:"Stars"},{e:"🤖",n:"Bots"},
              ].map(p=>(
                <div key={p.n+i} className="platform-chip">
                  <span style={{fontSize:16}}>{p.e}</span>
                  <span style={{color:"#a1a1aa",fontSize:13,fontWeight:600}}>{p.n}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{padding:"72px 20px",maxWidth:1060,margin:"0 auto"}}>
        <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {[
            {val:"∞",label:"Messages",sub:"No limits ever"},
            {val:"4GB",label:"File Uploads",sub:"Premium plan"},
            {val:"3",label:"Social Platforms",sub:"FB · TW · TT"},
            {val:"₦0",label:"To Get Started",sub:"Free forever"},
          ].map((s,i)=>(
            <div key={i} style={{
              background:"#0f0f0f",border:"1px solid #1c1c1e",
              borderRadius:18,padding:"24px 16px",textAlign:"center",
            }}>
              <p style={{
                fontSize:38,fontWeight:900,letterSpacing:"-1px",
                background:"linear-gradient(135deg,#f4f4f5,#71717a)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              }}>{s.val}</p>
              <p style={{color:"#f4f4f5",fontWeight:700,fontSize:13,marginTop:4}}>{s.label}</p>
              <p style={{color:"#3f3f46",fontSize:11,marginTop:2}}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{padding:"72px 20px",maxWidth:1060,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <div className="pill" style={{marginBottom:20}}>✦ Features</div>
          <h2 style={{fontSize:38,fontWeight:900,letterSpacing:"-1.2px",marginBottom:14}}>
            Everything creators need
          </h2>
          <p style={{color:"#71717a",fontSize:15,maxWidth:460,margin:"0 auto",lineHeight:1.75}}>
            Powerful tools designed specifically for modern Nigerian creators, entrepreneurs, and businesses.
          </p>
        </div>
        <div className="features-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {features.map((f,i)=><FeatureCard key={i} {...f} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{
        padding:"72px 20px",
        background:"#0a0a0a",
        borderTop:"1px solid #1c1c1e",
        borderBottom:"1px solid #1c1c1e",
      }}>
        <div style={{maxWidth:1060,margin:"0 auto",textAlign:"center"}}>
          <div className="pill" style={{marginBottom:20}}>⚡ How it works</div>
          <h2 style={{fontSize:38,fontWeight:900,letterSpacing:"-1.2px",marginBottom:52}}>
            Live in 3 simple steps
          </h2>
          <div className="steps-flex" style={{display:"flex",gap:16}}>
            <StepCard num="01" icon="🔗" title="Connect Your Accounts"
              desc="Link Facebook, Twitter/X, and TikTok securely from Settings in under 60 seconds." />
            <StepCard num="02" icon="✍️" title="Create Your Content"
              desc="Write once. Our AI rewrites and optimizes your caption for each platform automatically." />
            <StepCard num="03" icon="🚀" title="Post Everywhere"
              desc="Tap Share on your story — it goes live across all connected platforms at the same time." />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{padding:"72px 20px",maxWidth:1060,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <div className="pill" style={{marginBottom:20}}>💰 Pricing</div>
          <h2 style={{fontSize:38,fontWeight:900,letterSpacing:"-1.2px",marginBottom:14}}>
            Simple, Nigerian pricing
          </h2>
          <p style={{color:"#71717a",fontSize:15,maxWidth:400,margin:"0 auto"}}>
            Pay in Naira. No hidden fees. No foreign exchange surprises.
          </p>
        </div>
        <div className="plans-flex" style={{display:"flex",gap:14,alignItems:"stretch",flexWrap:"wrap"}}>
          {[
            {
              name:"Free",price:"₦0",period:"forever",hot:false,
              features:["Unlimited DMs","Groups & Channels","Stories (24h)","256MB file uploads","Voice & video calls","Basic bots"],
            },
            {
              name:"Premium",price:"₦35,600",period:"/month",hot:true,badge:"MOST POPULAR",
              features:["Everything in Free","Auto-post to FB, TW & TT","Creator Hub + AI captions","4GB file uploads","Premium ⭐ badge","Username every 7 days","Priority support"],
            },
            {
              name:"Business",price:"25 ⭐",period:"/month",hot:false,badge:"",
              features:["Everything in Premium","Business profile & badge","7-day stories","5,000 group members","Business analytics","API access"],
            },
          ].map((p,i)=>(
            <div key={i} className={`plan-card ${p.hot?"hot":""}`}>
              {p.badge && (
                <div style={{
                  position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",
                  background:"linear-gradient(135deg,#1a56db,#2563eb)",
                  color:"white",fontSize:10,fontWeight:800,letterSpacing:.8,
                  padding:"4px 14px",borderRadius:999,whiteSpace:"nowrap",
                }}>{p.badge}</div>
              )}
              <p style={{color:"#a1a1aa",fontSize:13,fontWeight:600,marginBottom:8}}>{p.name}</p>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}>
                <span style={{fontSize:34,fontWeight:900,color:"#f4f4f5"}}>{p.price}</span>
                <span style={{fontSize:13,color:"#71717a"}}>{p.period}</span>
              </div>
              <div style={{height:1,background:"#1c1c1e",margin:"18px 0"}} />
              <ul style={{listStyle:"none",padding:0}}>
                {p.features.map((f,j)=>(
                  <li key={j} style={{
                    display:"flex",alignItems:"flex-start",gap:10,
                    marginBottom:11,fontSize:13,color:"#a1a1aa",
                  }}>
                    <span style={{color:"#2563eb",flexShrink:0,marginTop:1,fontWeight:700}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                className="plan-btn"
                onClick={()=>document.getElementById("hero-form")?.scrollIntoView({behavior:"smooth"})}
                style={p.hot ? {
                  background:"linear-gradient(135deg,#1a56db,#2563eb)",
                  color:"white",
                } : {
                  background:"transparent",color:"#a1a1aa",
                  border:"1px solid #27272a",
                }}
              >
                Join Waitlist
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding:"80px 20px",
        background:"#0a0a0a",
        borderTop:"1px solid #1c1c1e",
        textAlign:"center",
      }}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{
            width:72,height:72,borderRadius:24,margin:"0 auto 24px",
            background:"rgba(37,99,235,.1)",border:"1px solid rgba(37,99,235,.2)",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <DoorMark size={44} />
          </div>
          <h2 style={{fontSize:38,fontWeight:900,letterSpacing:"-1.2px",marginBottom:14}}>
            Join the movement
          </h2>
          <p style={{color:"#71717a",fontSize:15,lineHeight:1.75,marginBottom:36}}>
            Be among the first Nigerian creators to experience the future of messaging. Early access users get Premium free for 3 months.
          </p>

          {/* Bottom form */}
          <div style={{
            background:"#0f0f0f",border:"1px solid #1c1c1e",
            borderRadius:22,padding:"22px",
            boxShadow:"0 24px 60px rgba(0,0,0,.5)",
          }}>
            {status==="success" ? (
              <div style={{textAlign:"center",padding:"8px 0"}}>
                <p style={{color:"#22c55e",fontWeight:800,fontSize:16}}>
                  ✅ You're on the list!
                </p>
                <p style={{color:"#71717a",fontSize:13,marginTop:8}}>
                  Early access users get 3 months Premium free. Watch your email!
                </p>
              </div>
            ) : (
              <form onSubmit={(e)=>handleSubmit(e,"bottom")}>
                <div style={{marginBottom:10}}>
                  <input className="inp" type="text" placeholder="Your full name"
                    value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div style={{marginBottom:14}}>
                  <input className="inp" type="email" placeholder="your@email.com"
                    value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                <button className="btn-primary" type="submit" disabled={status==="loading"}>
                  {status==="loading" ? "Securing spot…" : "🔐 Secure My Early Access"}
                </button>
                {status==="duplicate" && (
                  <p style={{color:"#f59e0b",fontSize:12,marginTop:10,textAlign:"center",fontWeight:600}}>
                    ⚡ Already registered — we'll reach out when we launch!
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Social proof avatars */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:24,flexWrap:"wrap"}}>
            <div style={{display:"flex"}}>
              {["🧑‍💻","👩‍🎨","👨‍💼","👩‍🎤","🧑‍🚀","👨‍🎨"].map((em,i)=>(
                <div key={i} style={{
                  width:30,height:30,borderRadius:"50%",
                  background:`hsl(${210+i*25},55%,${25+i*3}%)`,
                  border:"2px solid #080808",display:"flex",
                  alignItems:"center",justifyContent:"center",
                  fontSize:15,marginLeft:i>0?-9:0,
                }}>{em}</div>
              ))}
            </div>
            <p style={{color:"#71717a",fontSize:13}}>
              <span style={{color:"#f4f4f5",fontWeight:800}}>
                <AnimatedCount value={count} />
              </span>{" "}
              creators already waiting
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding:"28px 24px",
        borderTop:"1px solid #1c1c1e",
        display:"flex",alignItems:"center",
        justifyContent:"space-between",
        flexWrap:"wrap",gap:12,
        maxWidth:1060,margin:"0 auto",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <DoorMark size={24} />
          <span style={{fontWeight:700,fontSize:13,color:"#a1a1aa"}}>Rofiozag Chat</span>
        </div>
        <p style={{color:"#3f3f46",fontSize:12}}>
          © 2026 Rofiozag Chat · Made with ❤️ in Nigeria
        </p>
        <div style={{display:"flex",gap:20}}>
          {["Privacy","Terms","Support"].map(l=>(
            <a key={l} href="#" className="nav-link" style={{fontSize:12}}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
