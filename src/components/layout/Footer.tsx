import Link from "next/link";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-navy py-14 text-white">
    <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold">PrintAlliance</h3>
          <p className="mt-4 text-sm text-gray-200">
            Enterprise-grade printer support for hybrid teams. We pair remote diagnostics with onsite dispatch in every major USA and UK metro.
          </p>
          <div className="mt-5 space-y-1 text-xs uppercase tracking-wide text-gray-400">
            <p>Response &lt; 1 hour</p>
            <p>24/7 expert hotline</p>
            <p>HP · Brother · Epson · Canon</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Support & Policies</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/service-areas">Service Areas</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/refund-policy">Refund Policy</Link>
            </li>
           
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
          <p className="mt-4 text-sm text-gray-200">
            Need help right now? Our dispatch desk runs 24/7/365.
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <p>
              📧{" "}
              <a className="underline" href="mailto:Support@printalliance.net">
                Support@printalliance.net
              </a>
            </p>
            <p>
              📞{" "}
              <a className="underline" href="tel:+12105128406">
                +1-325-219-5205
              </a>
            </p>
            <p>USA & UK coverage • Remote + Onsite</p>
          </div>


        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-gray-200 lg:flex-row lg:items-center lg:justify-between">
        <p>© {currentYear} PrintAlliance. All rights reserved.</p>
        <p>USA & UK | Response time &lt; 1 hour | 24/7 support</p>
      </div>
    </div>
  </footer>
);

export default Footer;

