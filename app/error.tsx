"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary. Triggers on any uncaught error in a Server Action,
 * page render, or layout. Without this file, errors fall through to Chrome's
 * generic network-error UI (looks like the site is broken).
 *
 * Logs to the browser console so users can copy/paste the error to support
 * if needed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl uppercase text-gray-900 md:text-4xl">
            Something went wrong
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We couldn&apos;t complete your request. Please try again, or contact us
            directly:
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:0448812800"
              className="inline-flex items-center gap-2 bg-[#7cda24] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6bc11e]"
            >
              Call 0448 812 800
            </a>
            <a
              href="mailto:info@sandhurstroofing.com.au"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Email Us
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <button
              onClick={() => reset()}
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Try again
            </button>
            <Link
              href="/"
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Back to home
            </Link>
          </div>

          {error.digest && (
            <p className="mt-8 text-xs text-gray-400">
              Error reference: {error.digest}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
