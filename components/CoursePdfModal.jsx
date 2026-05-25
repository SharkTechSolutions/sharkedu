"use client";

import { useState } from "react";

export default function CoursePdfModal({ pdfUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!pdfUrl) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:underline"
      >
        View Course Brochure
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/70 p-3 text-sm sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative mx-auto flex min-h-[70vh] max-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
                  Course Brochure
                </p>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  Download or preview the brochure
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={pdfUrl}
                  download
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Download PDF
                </a>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex min-h-[50vh] flex-1 bg-slate-950">
              <iframe
                src={pdfUrl}
                className="flex-1 min-h-0 w-full"
                title="Course brochure preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
