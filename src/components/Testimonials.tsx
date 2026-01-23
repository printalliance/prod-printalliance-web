import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Olivia Bennett",
    location: "USA",
    quote:
      "PrintAlliance resolved a mission-critical printer outage for our law firm within 45 minutes. Their team is the real deal.",
  },
  {
    name: "James Carter",
    location: "UK",
    quote:
      "We rely on PrintAlliance for quarterly maintenance across 40 devices. Downtime has dropped by 86% since onboarding.",
  },
  {
    name: "Mia Thompson",
    location: "USA",
    quote:
      "Their remote troubleshooting gets our remote teams printing again in minutes. Support is always friendly and proactive.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="section-padding bg-gray-light">
      <div className="mx-auto max-w-5xl px-4 text-center lg:px-0">
        <p className="highlight-bar justify-center">Testimonials</p>
        <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
          Rated 4.9/5 by offices across the USA & UK
        </h2>
        <div className="surface mt-8 p-8">
          <div className="flex justify-center gap-1 text-red">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} aria-hidden="true">
                {star}
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">
            “{testimonial.quote}”
          </p>
          <p className="mt-4 text-sm uppercase tracking-wide text-gray-500">
            {testimonial.name} • {testimonial.location}
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition ${
                  index === i ? "w-8 bg-red" : "w-4 bg-gray-300"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

