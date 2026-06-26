import Image from "next/image";

/**
 * Stripped-back header for PPC landing pages.
 *
 * Deliberately has NO navigation menu - the only action is to call. Every nav
 * link on a paid landing page is a chance for an expensive click to wander off
 * without converting, so we remove them all and keep one clear phone CTA.
 * The logo is not a link for the same reason.
 */
export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Image
          src="/images/new-logo.png"
          alt="Sandhurst Roofing"
          width={538}
          height={357}
          priority
          className="h-11 w-auto sm:h-14"
        />
        <a
          href="tel:0448812800"
          className="inline-flex items-center gap-2 rounded-md bg-[#7cda24] px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#6bc41e]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <span className="hidden sm:inline">0448 812 800</span>
          <span className="sm:hidden">Call Now</span>
        </a>
      </div>
    </header>
  );
}
