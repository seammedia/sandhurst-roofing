/**
 * Minimal footer for PPC landing pages - trust + contact only, no sitewide nav.
 * Keeps the page focused on converting while still showing the legitimacy
 * signals (real address, phone, service area) that paid visitors look for.
 */
export default function LandingFooter() {
  return (
    <footer className="bg-black px-4 py-10 text-center text-sm text-gray-400 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-heading text-lg uppercase tracking-wide text-white">
          Sandhurst Roofing
        </p>
        <p className="mt-3">
          <a href="tel:0448812800" className="text-[#7cda24] hover:underline">
            0448 812 800
          </a>
          {"  ·  "}
          <a
            href="mailto:info@sandhurstroofing.com.au"
            className="hover:text-white"
          >
            info@sandhurstroofing.com.au
          </a>
        </p>
        <p className="mt-2">10 Duiker Crt, Langwarrin VIC</p>
        <p className="mt-2">
          Serving Frankston, the Mornington Peninsula and Melbourne&apos;s
          south-east. 35+ years in the trade.
        </p>
        <p className="mt-4 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Sandhurst Roofing Pty Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
