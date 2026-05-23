import { useState } from "react";

const inputStyle = {
  width: "100%",
  height: "44px",
  padding: "0 12px",
  borderRadius: "6px",
  border: "1px solid #2a2a2a",
  backgroundColor: "#111111",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "#cccccc",
  marginBottom: "6px",
  letterSpacing: "0.02em",
};

function Field({ label, required, children, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <label style={labelStyle}>
        {label}
        {required && (
          <span style={{ color: "#C9A85C", marginLeft: "3px" }}>*</span>
        )}
      </label>
      {children}
      {hint && (
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#666666" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function FocusInput({ as: Tag = "input", ...props }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = Tag === "textarea"
    ? { ...inputStyle, height: "auto", padding: "10px 12px", resize: "none", lineHeight: "1.6" }
    : inputStyle;

  return (
    <Tag
      {...props}
      style={{
        ...baseStyle,
        borderColor: focused ? "#C9A85C" : "#2a2a2a",
        boxShadow: focused ? "0 0 0 3px rgba(201,168,92,0.12)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function SelectField({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        {...props}
        style={{
          ...inputStyle,
          appearance: "none",
          paddingRight: "36px",
          cursor: "pointer",
          borderColor: focused ? "#C9A85C" : "#2a2a2a",
          boxShadow: focused ? "0 0 0 3px rgba(201,168,92,0.12)" : "none",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
      <svg
        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="14" height="14" viewBox="0 0 14 14" fill="none"
      >
        <path d="M3 5l4 4 4-4" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StatusMessage({ type, message }) {
  const isSuccess = type === "success";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "14px 16px",
        borderRadius: "8px",
        border: `1px solid ${isSuccess ? "rgba(201,168,92,0.4)" : "rgba(220,38,38,0.4)"}`,
        backgroundColor: isSuccess ? "rgba(201,168,92,0.08)" : "rgba(220,38,38,0.08)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
        {isSuccess ? (
          <>
            <circle cx="9" cy="9" r="8" stroke="#C9A85C" strokeWidth="1.5" />
            <path d="M5.5 9l2.5 2.5L12.5 6" stroke="#C9A85C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M9 5.5v4M9 12.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>
      <p style={{ margin: 0, fontSize: "14px", color: isSuccess ? "#C9A85C" : "#ef4444", lineHeight: "1.5" }}>
        {message}
      </p>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="rgba(201,168,92,0.15)" />
        <path d="M14 6l2 5h5l-4 3 1.5 5L14 16l-4.5 3 1.5-5-4-3h5z" fill="#C9A85C" />
      </svg>
      <span style={{ fontSize: "15px", fontWeight: 600, color: "#C9A85C", letterSpacing: "0.04em" }}>
        Anderson Memorial Park
      </span>
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required.";
    if (!formData.lastName.trim()) e.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!formData.subject) e.subject = "Please select a subject.";
    if (!formData.message.trim()) e.message = "Message is required.";
    else if (formData.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setStatus(null);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setStatus({ type: "success", message: "Thank you for reaching out. A member of our team will be in touch within 1–2 business days." });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", preferredContact: "email" });
    setErrors({});
  };

  const fieldError = (field) =>
    errors[field] ? (
      <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#ef4444" }}>{errors[field]}</p>
    ) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111111",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <Logo />
          <div style={{ marginTop: "24px" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em" }}>
              Get in Touch
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#999999", lineHeight: "1.6" }}>
              Our team is here to help with memorial restoration services, partner inquiries, and general support.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, #C9A85C44, #C9A85C22, transparent)", marginBottom: "32px" }} />

        {/* Card */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderLeft: "4px solid #C9A85C",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          {status && (
            <div style={{ marginBottom: "24px" }}>
              <StatusMessage type={status.type} message={status.message} />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <Field label="First Name" required>
                    <FocusInput
                      name="firstName"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      autoComplete="given-name"
                    />
                  </Field>
                  {fieldError("firstName")}
                </div>
                <div>
                  <Field label="Last Name" required>
                    <FocusInput
                      name="lastName"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      autoComplete="family-name"
                    />
                  </Field>
                  {fieldError("lastName")}
                </div>
              </div>

              {/* Email */}
              <div>
                <Field label="Email Address" required>
                  <FocusInput
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                  />
                </Field>
                {fieldError("email")}
              </div>

              {/* Phone */}
              <div>
                <Field label="Phone Number" hint="Optional — include if you prefer a callback.">
                  <FocusInput
                    type="tel"
                    name="phone"
                    placeholder="(000) 000-0000"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    autoComplete="tel"
                  />
                </Field>
              </div>

              {/* Subject */}
              <div>
                <Field label="Subject" required>
                  <SelectField
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange("subject")}
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option value="restoration">Memorial Restoration Services</option>
                    <option value="partner">Partner Program Inquiry</option>
                    <option value="pricing">Pricing & Packages</option>
                    <option value="existing">Existing Request Follow-Up</option>
                    <option value="general">General Question</option>
                  </SelectField>
                </Field>
                {fieldError("subject")}
              </div>

              {/* Preferred contact */}
              <div>
                <label style={labelStyle}>Preferred Contact Method</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["email", "phone"].map((opt) => {
                    const active = formData.preferredContact === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, preferredContact: opt }))}
                        style={{
                          flex: 1,
                          height: "38px",
                          borderRadius: "6px",
                          border: `1px solid ${active ? "#C9A85C" : "#2a2a2a"}`,
                          backgroundColor: active ? "rgba(201,168,92,0.12)" : "#111111",
                          color: active ? "#C9A85C" : "#888888",
                          fontSize: "13px",
                          fontWeight: active ? 500 : 400,
                          cursor: "pointer",
                          transition: "all 0.15s",
                          textTransform: "capitalize",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <Field label="Message" required>
                  <FocusInput
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Describe how we can help you…"
                    value={formData.message}
                    onChange={handleChange("message")}
                  />
                </Field>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  {fieldError("message")}
                  <span style={{ marginLeft: "auto", fontSize: "12px", color: "#555555" }}>
                    {formData.message.length} chars
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: "46px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: submitting ? "#a88840" : "#C9A85C",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#d4b56b"; }}
                onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#C9A85C"; }}
              >
                {submitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                      <circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                      <path d="M8 2a6 6 0 016 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2 7.5h10M9 4l4 3.5L9 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

            </div>
          </form>
        </div>

        {/* Footer note */}
        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#555555", lineHeight: "1.6" }}>
          By submitting, you agree to our privacy policy. We typically respond within 1–2 business days.
        </p>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::placeholder { color: #444444 !important; }
        select option { background-color: #1a1a1a; color: #ffffff; }
      `}</style>
    </div>
  );
}