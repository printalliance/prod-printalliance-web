import Head from "next/head";
import { useState } from "react";
import { siteUrl } from "@/utils/seo";

const printerBrands = [
  { label: "Select Printer Brand", value: "" },
  { label: "HP", value: "hp" },
  { label: "Brother", value: "brother" },
  { label: "Epson", value: "epson" },
  { label: "Canon", value: "canon" },
  { label: "Other", value: "other" },
];

const printerIssues = [
  { label: "Select Printer Issue", value: "" },
  { label: "Paper Jam", value: "paper-jam" },
  { label: "Wireless Setup", value: "wireless-setup" },
  { label: "Not Printing", value: "not-printing" },
  { label: "Blank Prints", value: "blank-prints" },
  { label: "Error Codes", value: "error-codes" },
  { label: "Driver Issues", value: "driver-issues" },
  { label: "Other", value: "other" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          brand: "",
          issue: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | PrintAlliance</title>
        <meta
          name="description"
          content="Get in touch with PrintAlliance. Reach out for printer support, questions, or partnerships."
        />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        <meta property="og:title" content="Contact PrintAlliance" />
        <meta
          property="og:description"
          content="Contact our support team for assistance with your printer needs."
        />
        <meta property="og:url" content={`${siteUrl}/contact`} />
      </Head>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-navy">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Our team of dedicated experts is working round the clock to provide you with solutions for all your printer-related queries. Submit your printer query or contact us at the below-mentioned details.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-navy mb-6">📞 Phone</h2>
                <a
                  href="tel:+13252195205"
                  className="text-lg text-red hover:text-[#c92f3a] font-semibold transition"
                >
                  +1-325-219-5205
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Available 24/7 for urgent support
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy mb-6">📧 Email</h2>
                <a
                  href="mailto:Support@printalliance.net"
                  className="text-lg text-red hover:text-[#c92f3a] font-semibold transition"
                >
                  Support@printalliance.net
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  We typically respond within 1 hour
                </p>
              </div>

              <div className="surface p-6 bg-gray-50">
                <h3 className="font-semibold text-navy mb-4">💡 Quick Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 24/7 Expert Assistance</li>
                  <li>✓ Fast Response Times</li>
                  <li>✓ Comprehensive Solutions</li>
                  <li>✓ Professional Support Team</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="surface p-8">
              <h2 className="text-2xl font-semibold text-navy mb-6">
                Submit Your Printer Query
              </h2>

              {submitted && (
                <div className="mb-4 rounded-lg bg-green-100 border border-green-300 p-4 text-green-700">
                  ✓ Thank you for reaching out! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-red focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-red focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-red focus:outline-none"
                    placeholder="+1 (325) 219-5205"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Select Printer Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-red focus:outline-none"
                  >
                    {printerBrands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Select Printer Issue
                  </label>
                  <select
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-red focus:outline-none"
                  >
                    {printerIssues.map((issue) => (
                      <option key={issue.value} value={issue.value}>
                        {issue.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-red px-4 py-3 text-white font-semibold hover:bg-[#c92f3a] transition"
                >
                  Submit Query
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
