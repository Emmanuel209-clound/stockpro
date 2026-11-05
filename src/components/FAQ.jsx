import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is StockPro?",
      answer:
        "StockPro is an inventory and sales management system designed to help businesses manage products, monitor stock levels, track sales and organise their daily operations.",
    },
    {
      question: "Who can use StockPro?",
      answer:
        "StockPro is suitable for retailers, wholesalers, supermarkets, small businesses and other businesses that need an organised way to manage inventory and sales.",
    },
    {
      question: "Can I monitor my stock levels?",
      answer:
        "Yes. StockPro helps you monitor available products, track quantities and identify items that need restocking.",
    },
    {
      question: "Can StockPro track my sales?",
      answer:
        "Yes. The system is designed to help you record sales transactions and monitor your business sales performance.",
    },
    {
      question: "Does StockPro provide business reports?",
      answer:
        "StockPro is designed to provide organised reports and useful insights that help business owners understand their inventory and sales performance.",
    },
    {
      question: "Is my business information secure?",
      answer:
        "StockPro is designed with security in mind. Access control and appropriate security measures help protect business information.",
    },
    {
      question: "Can I access StockPro on my phone?",
      answer:
        "StockPro is being designed with responsive layouts to make the system accessible across different screen sizes, including mobile devices.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        <div className="faq-heading">
          <span className="faq-tag">GOT QUESTIONS?</span>

          <h1>
            Frequently Asked
            <span> Questions</span>
          </h1>

          <p>
            Find answers to common questions about StockPro
            and how it helps you manage your business.
          </p>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => (
            <div
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="faq-question"
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>

                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-bottom">
          <h2>Still have questions?</h2>
          <p>
            Our team is ready to help you get started with StockPro.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;