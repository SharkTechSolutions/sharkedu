"use client";

export default function FloatingChatButton({ onClick }) {
  return (
    <button
      type="button"
      className="floating-chat-button"
      onClick={onClick}
      aria-label="Open support enquiry form"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V15C20 16.1046 19.1046 17 18 17H9.41421L6 20.4142V17H6C4.89543 17 4 16.1046 4 15V5Z" fill="white"/>
        <path d="M8 8H16" stroke="#0f7b6c" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 12H14" stroke="#0f7b6c" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </button>
  );
}
