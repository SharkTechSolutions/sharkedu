"use client";

import { useEffect, useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter your phone number.";
  }

  if (!values.service.trim()) {
    errors.service = "Select a course or service.";
  }

  if (!values.message.trim()) {
    errors.message = "Please share your enquiry.";
  }

  return errors;
};

export default function EnquiryForm({ onSuccess, onClose }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleChange = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate(values);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://sitemain.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const errorMessage = errorBody?.message || "Unable to submit your enquiry right now.";
        throw new Error(errorMessage);
      }

      setToast({ type: "success", message: "Enquiry submitted successfully. We will contact you soon." });
      setValues(initialValues);
      setErrors({});
      window.setTimeout(() => {
        onSuccess?.();
      }, 1400);
    } catch (error) {
      setToast({ type: "error", message: error?.message || "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-form-shell">
      {toast && (
        <div className={`toast ${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="enquiry-name">Full Name</label>
          <input
            id="enquiry-name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
          />
          {errors.name && <p id="enquiry-name-error" className="field-error">{errors.name}</p>}
        </div>

        <div className="form-row">
          <label htmlFor="enquiry-email">Email</label>
          <input
            id="enquiry-email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="jane@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
          />
          {errors.email && <p id="enquiry-email-error" className="field-error">{errors.email}</p>}
        </div>

        <div className="form-row">
          <label htmlFor="enquiry-phone">Phone Number</label>
          <input
            id="enquiry-phone"
            type="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            placeholder="+91 91234 56789"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
          />
          {errors.phone && <p id="enquiry-phone-error" className="field-error">{errors.phone}</p>}
        </div>

        <div className="form-row">
          <label htmlFor="enquiry-service">Interested Course / Service</label>
          <input
            id="enquiry-service"
            type="text"
            value={values.service}
            onChange={handleChange("service")}
            placeholder="Web Development, UI/UX, Corporate Training"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "enquiry-service-error" : undefined}
          />
          {errors.service && <p id="enquiry-service-error" className="field-error">{errors.service}</p>}
        </div>

        <div className="form-row">
          <label htmlFor="enquiry-message">Message</label>
          <textarea
            id="enquiry-message"
            rows="5"
            value={values.message}
            onChange={handleChange("message")}
            placeholder="Tell us what you need help with."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          />
          {errors.message && <p id="enquiry-message-error" className="field-error">{errors.message}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-lg full-width" disabled={loading}>
            {loading ? "Sending..." : "Submit Enquiry"}
          </button>
          <button type="button" className="btn btn-ghost full-width" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
