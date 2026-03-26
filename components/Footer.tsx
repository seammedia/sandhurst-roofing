import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left - Logo & Description */}
          <div>
            <h3 className="font-heading text-2xl uppercase mb-4">
              SANDHURST ROOFING
            </h3>
            <p className="text-gray-400">
              Professional roofing services across Sandhurst, Frankston and
              nearby suburbs.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span>Phone:</span>
                <a
                  href="tel:+61448812800"
                  className="hover:text-green-500 transition-colors"
                >
                  +61 448 812 800
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>Email:</span>
                <a
                  href="mailto:info@sandhurstroofing.com.au"
                  className="hover:text-green-500 transition-colors"
                >
                  info@sandhurstroofing.com.au
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>Address:</span>
                <span>Sandhurst, VIC 3977</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 Sandhurst Roofing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
