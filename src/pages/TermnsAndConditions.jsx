import { useState } from "react";

const gold = "#C9A85C";
const goldDim = "rgba(201,168,92,0.15)";
const goldBorder = "rgba(201,168,92,0.3)";
const bg = "#0d0d0d";
const surface = "#161616";
const border = "#222222";
const textPrimary = "#f0f0f0";
const textSecondary = "#888888";
const textMuted = "#555555";

const sections = [
  {
    num: "01",
    title: "Services Provided",
    body: `Lasting Legacy Cleaners provides memorial preservation and restoration-related services including, but not limited to: headstone refinishing, memorial marker cleaning, bronze and granite cleaning, soft-wash exterior cleaning, memorial restoration services, and cemetery plot appearance services.\n\nServices are performed based on the condition of the memorial at the time of inspection and service.`,
  },
  {
    num: "02",
    title: "Customer Authorization",
    body: `Customer confirms that they are authorized to request services for the memorial, marker, monument, or plot associated with this request.\n\nCustomer further confirms they have obtained any necessary permissions required by the cemetery, memorial park, funeral home, property owner, or governing organization prior to service.`,
  },
  {
    num: "03",
    title: "Condition of Memorials",
    body: `Customer understands and acknowledges that many memorial markers, headstones, monuments, bronze plaques, and related structures are aged, weathered, fragile, cracked, unstable, deteriorated, previously repaired, or structurally compromised due to age, environmental exposure, foundation shifting, water damage, oxidation, existing fractures, prior restoration attempts, or natural deterioration.\n\nCustomer acknowledges that the true structural condition of a memorial may not be fully visible prior to cleaning or restoration.`,
  },
  {
    num: "04",
    title: "Limitation of Liability",
    body: `Customer expressly agrees that Lasting Legacy Cleaners, its owners, employees, contractors, affiliates, agents, and representatives shall NOT be held liable for existing damage, hidden structural defects, cracking, chipping, fading, separation, loosening, foundation movement, structural instability, discoloration, lettering deterioration, oxidation exposure, material failure, breakage caused by pre-existing conditions, age-related deterioration, environmental damage, or any incidental or consequential damages.\n\nCustomer understands that restoration and cleaning efforts involve interaction with aged materials that may already be compromised. Services are performed at Customer's sole risk.`,
  },
  {
    num: "05",
    title: "Release of Memorial Parks & Funeral Homes",
    body: `Customer agrees that any cemetery, memorial park, funeral home, church, property owner, or third-party location associated with the requested service shall be fully released from liability related to service performance, cleaning processes, restoration work, damage claims, structural issues, appearance outcomes, or service-related disputes.\n\nCustomer acknowledges that such entities are not responsible for the work performed by Lasting Legacy Cleaners.`,
  },
  {
    num: "06",
    title: "No Guarantee of Results",
    body: `While Lasting Legacy Cleaners strives to provide professional and respectful restoration services, Customer understands that results may vary, certain stains or deterioration may be permanent, complete restoration may not be possible, color variations may occur, and weathered surfaces may respond differently to treatment.\n\nNo guarantee is made regarding exact appearance, restoration level, longevity, or preservation outcome.`,
  },
  {
    num: "07",
    title: "Weather & Access Delays",
    body: `Services may be delayed or rescheduled due to weather conditions, cemetery restrictions, unsafe working conditions, access limitations, equipment issues, or seasonal limitations.\n\nSuch delays shall not constitute breach of service.`,
  },
  {
    num: "08",
    title: "Payment Terms",
    body: `Customer agrees to pay all service fees associated with the approved order. Payments may be collected electronically before service begins unless otherwise agreed in writing.\n\nAll completed services are non-refundable unless otherwise determined solely by Lasting Legacy Cleaners.`,
  },
  {
    num: "09",
    title: "Photo & Documentation Authorization",
    body: `Customer authorizes Lasting Legacy Cleaners to take before-and-after photographs of memorials for service documentation, quality control, internal records, marketing materials, and educational or promotional purposes.\n\nNo personal family information will intentionally be disclosed.`,
  },
  {
    num: "10",
    title: "Indemnification",
    body: `Customer agrees to indemnify, defend, and hold harmless Lasting Legacy Cleaners from any claims, demands, liabilities, damages, losses, or legal actions arising from pre-existing memorial conditions, structural failures, unauthorized service requests, third-party disputes, cemetery policy violations, or family disagreements regarding service authorization.`,
  },
  {
    num: "11",
    title: "Electronic Signature Consent",
    body: `Customer agrees that electronic signatures, checkboxes, typed acknowledgements, and digital approvals shall be legally binding and enforceable to the fullest extent permitted by law.\n\nCustomer acknowledges that electronic acceptance constitutes full agreement to these Terms & Conditions.`,
  },
  {
    num: "12",
    title: "Governing Law",
    body: `This Agreement shall be governed under the laws of the State of Indiana.\n\nAny disputes arising from this Agreement shall be resolved exclusively within the State of Indiana.`,
  },
];

function Section({ num, title, body }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        padding: "28px 0",
        borderBottom: `1px solid ${border}`,
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: gold,
          letterSpacing: "0.1em",
          minWidth: 28,
          paddingTop: 3,
          opacity: 0.7,
        }}
      >
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16,
            fontWeight: 600,
            color: textPrimary,
            marginBottom: 12,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
        {body.split("\n\n").map((para, i) => (
          <p
            key={i}
            style={{
              color: textSecondary,
              fontSize: 13,
              lineHeight: 1.8,
              margin: i > 0 ? "12px 0 0" : 0,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TermsAndConditions({ onAccept, partnerName = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState(partnerName);
  const [submitted, setSubmitted] = useState(false);

  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
      setScrolled(true);
    }
  };

  const canSign = scrolled && checked && name.trim().length > 0;

  const handleSubmit = () => {
    if (!canSign) return;
    setSubmitted(true);
    if (typeof onAccept === "function") onAccept({ name, date: new Date().toISOString() });
  };

  if (submitted) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Mono', monospace",
          padding: 24,
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap');`}</style>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `1px solid ${gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l6 6 10-10" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24,
              fontWeight: 600,
              color: textPrimary,
              marginBottom: 10,
            }}
          >
            Agreement Accepted
          </div>
          <p style={{ color: textSecondary, fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
            Thank you, <span style={{ color: gold }}>{name}</span>. Your electronic signature has been recorded.
          </p>
          <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: bg,
        fontFamily: "'DM Mono', monospace",
        color: textPrimary,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');
        .tc-scroll::-webkit-scrollbar { width: 4px; }
        .tc-scroll::-webkit-scrollbar-track { background: transparent; }
        .tc-scroll::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
        .tc-check:hover { border-color: ${gold} !important; }
        .tc-sign-btn:hover:not(:disabled) { background-color: #d4b56b !important; }
        .tc-input:focus { outline: none; border-color: ${gold} !important; }
      `}</style>

      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
              <path d="M32 4L8 14v18c0 13 10.5 24.5 24 28 13.5-3.5 24-15 24-28V14L32 4z" stroke={gold} strokeWidth="1.5" fill="none" />
              <path d="M22 32l7 7 13-13" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: textPrimary,
                  letterSpacing: "0.04em",
                }}
              >
                Lasting Legacy Cleaners
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginTop: 2 }}>
                Partner Agreement
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 16px",
              borderRadius: 999,
              border: `1px solid ${goldBorder}`,
              backgroundColor: goldDim,
              fontSize: 11,
              color: gold,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span>⬡</span> Terms &amp; Conditions of Service
          </div>

          <p style={{ color: textMuted, fontSize: 12, margin: 0 }}>
            Effective Date: &nbsp;
            <span style={{ color: textSecondary }}>
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </p>
          <p style={{ color: textSecondary, fontSize: 12.5, marginTop: 10, lineHeight: 1.7, maxWidth: 540, margin: "10px auto 0" }}>
            These Terms &amp; Conditions ("Agreement") are entered into between Lasting Legacy Cleaners ("Company") and the customer identified in the service request ("Customer"). By electronically signing this Agreement, Customer acknowledges that they have read, understood, and agreed to all terms below.
          </p>
        </div>

        {/* Scrollable terms box */}
        <div
          style={{
            backgroundColor: surface,
            border: `1px solid ${border}`,
            borderRadius: 12,
            marginBottom: 24,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderBottom: `1px solid ${border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 11, color: textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Agreement Document
            </span>
            {!scrolled && (
              <span style={{ fontSize: 11, color: gold, letterSpacing: "0.05em" }}>
                ↓ Scroll to read all terms
              </span>
            )}
            {scrolled && (
              <span style={{ fontSize: 11, color: "#7dd4a0" }}>
                ✓ All terms reviewed
              </span>
            )}
          </div>

          <div
            className="tc-scroll"
            onScroll={handleScroll}
            style={{
              maxHeight: 460,
              overflowY: "auto",
              padding: "0 28px",
            }}
          >
            {sections.map((s) => (
              <Section key={s.num} {...s} />
            ))}
            <div style={{ height: 24 }} />
          </div>
        </div>

    


        <p style={{ textAlign: "center", color: textMuted, fontSize: 11, marginTop: 16, lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Lasting Legacy Cleaners · Governed under the laws of the State of Indiana
        </p>
      </div>
    </main>
  );
}