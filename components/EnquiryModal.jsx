"use client";

import { useEffect } from "react";
import EnquiryForm from "@/components/EnquiryForm";

export default function EnquiryModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-portal" onClick={onClose}>
      <div className="modal-backdrop" aria-hidden="true" />
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="badge">Enquiry Form</p>
            <h2 id="enquiry-dialog-title">Need help choosing a course?</h2>
            <p className="modal-copy">
              Share a few details and our team will recommend the best learning path for you.
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Close enquiry form"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <EnquiryForm onSuccess={onClose} onClose={onClose} />
      </div>
    </div>
  );
}
