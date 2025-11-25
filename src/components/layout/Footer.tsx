import Link from "next/link";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-navy py-12 text-white">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
      <div>
        <h3 className="text-2xl font-bold">PrintAlliance</h3>
        <p className="mt-4 text-sm text-gray-200">
          Premier printer services for businesses across the USA and UK. Expert
          technicians, lightning-fast response, and proactive maintenance keep
          your teams productive.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="https://www.facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </Link>
          <Link href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href="https://www.twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </Link>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold uppercase text-gray-200">Services</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/services/printer-setup">Printer Setup & Installation</Link>
          </li>
          <li>
            <Link href="/services/troubleshooting">Troubleshooting & Repair</Link>
          </li>
          <li>
            <Link href="/services/network-printing">Network Connectivity</Link>
          </li>
          <li>
            <Link href="/services/maintenance">Maintenance & Support</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold uppercase text-gray-200">Support</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/service-areas">Service Areas</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-white/20 px-4 pt-6 text-sm text-gray-200 lg:flex-row lg:items-center lg:justify-between">
      <p>© {currentYear} PrintAlliance. All rights reserved.</p>
      <p>USA & UK | Response time &lt; 1 hour | 24/7/365 support</p>
    </div>
  </footer>
);

export default Footer;

