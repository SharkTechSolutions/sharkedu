/**
 * Enrollment form validation and backend API submission
 */
const EnrollForm = (function () {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_REGEX = /^[+]?[\d\s\-()]{10,15}$/;

  let form = null;
  let submitBtn = null;
  let successAlert = null;
  let errorAlert = null;
  let fields = {};
  let errors = {};
  let closeTimer = null;
  let onSuccessClose = null;

  function validateName(v) {
    const t = v.trim();
    if (!t) return "Name is required.";
    if (t.length < 2) return "Name must be at least 2 characters.";
    return "";
  }

  function validateEmail(v) {
    const t = v.trim();
    if (!t) return "Email is required.";
    if (!EMAIL_REGEX.test(t)) return "Enter a valid email address.";
    return "";
  }

  function validatePhone(v) {
    const t = v.trim();
    if (!t) return "Phone is required.";
    const digits = t.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return "Enter a valid phone (10–15 digits).";
    if (!PHONE_REGEX.test(t)) return "Phone contains invalid characters.";
    return "";
  }

  function setError(input, el, msg) {
    if (msg) {
      input.classList.add("is-invalid");
      el.textContent = msg;
    } else {
      input.classList.remove("is-invalid");
      el.textContent = "";
    }
    return !msg;
  }

  function validateForm() {
    return (
      setError(fields.name, errors.name, validateName(fields.name.value)) &&
      setError(fields.email, errors.email, validateEmail(fields.email.value)) &&
      setError(fields.phone, errors.phone, validatePhone(fields.phone.value))
    );
  }

  function clearAlerts() {
    [successAlert, errorAlert].forEach((el) => {
      if (!el) return;
      el.classList.remove("is-visible");
      el.textContent = "";
    });
  }

  function buildApiUrl() {
    const base = (EMAIL_API_CONFIG.API_BASE_URL || "").replace(/\/+$/, "");
    const path = EMAIL_API_CONFIG.SEND_EMAIL_PATH || "/send-email";
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  }

  async function submitEnrollment(payload) {
    if (!EMAIL_API_CONFIG || !EMAIL_API_CONFIG.API_BASE_URL) {
      throw new Error("Configure API_BASE_URL in js/config.js.");
    }

    const response = await fetch(buildApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        service: "MERN Stack Course Enquiry",
        message: payload.note || "(No message)"
      })
    });

    if (!response.ok) {
      let errorMessage = "Submission failed. Please try again.";
      try {
        const data = await response.json();
        if (data && typeof data.message === "string" && data.message.trim()) {
          errorMessage = data.message;
        }
      } catch (_) {}
      throw new Error(errorMessage);
    }
  }

  function bindFieldValidation() {
    ["name", "email", "phone"].forEach((key) => {
      const validators = { name: validateName, email: validateEmail, phone: validatePhone };
      fields[key].addEventListener("blur", () => {
        setError(fields[key], errors[key], validators[key](fields[key].value));
      });
      fields[key].addEventListener("input", () => {
        fields[key].classList.remove("is-invalid");
        errors[key].textContent = "";
      });
    });
  }

  function bindSubmit() {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAlerts();
      if (!validateForm()) return;

      const payload = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        note: fields.note.value.trim()
      };

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        await submitEnrollment(payload);
        successAlert.textContent = "Enrollment submitted! We will contact you soon.";
        successAlert.classList.add("is-visible");
        form.reset();
        Object.values(fields).forEach((f) => f.classList.remove("is-invalid"));

        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          if (typeof onSuccessClose === "function") onSuccessClose();
          clearAlerts();
        }, 3200);
      } catch (err) {
        errorAlert.textContent =
          err.message || "Submission failed. Email contact@sharktechsolutions.in";
        errorAlert.classList.add("is-visible");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enrollment";
      }
    });
  }

  function cacheElements() {
    form = document.getElementById("enrollForm");
    submitBtn = document.getElementById("submitBtn");
    successAlert = document.getElementById("successAlert");
    errorAlert = document.getElementById("errorAlert");

    fields = {
      name: document.getElementById("studentName"),
      email: document.getElementById("studentEmail"),
      phone: document.getElementById("studentPhone"),
      note: document.getElementById("studentNote")
    };

    errors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      phone: document.getElementById("phoneError")
    };
  }

  function init(options = {}) {
    onSuccessClose = options.onSuccessClose || null;
    cacheElements();

    if (!form) return false;

    bindFieldValidation();
    bindSubmit();
    return true;
  }

  function focusName() {
    if (fields.name) fields.name.focus();
  }

  return { init, clearAlerts, focusName };
})();
