const faqs = [
  {
    question: "Do I need a prescription to order medicines?",
    answer:
      "Yes, for prescription-only medicines you must upload a valid doctor’s prescription. For over-the-counter medicines, no prescription is required.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We usually deliver within 2-3 working days. Emergency delivery is available in selected areas.",
  },
  {
    question: "Are all medicines genuine?",
    answer:
      "Yes. We only source medicines from verified manufacturers and authorized distributors to ensure authenticity.",
  },
  {
    question: "Can I return or exchange medicines?",
    answer:
      "For safety reasons, we do not accept returns of opened medicines. However, if your package is damaged or incorrect, we will replace it.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Absolutely. We use secure SSL encryption and trusted payment gateways to protect your transactions.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-gray-50  mb-48" id="faq">
      <div className="max-w-5xl mx-auto px-3">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-2">
            Find answers to common questions about ordering, delivery, and
            safety
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 border border-base-300"
            >
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                {faq?.question}
              </div>
              <div className="collapse-content text-sm">{faq?.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
