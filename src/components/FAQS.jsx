import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is My Thrift?",
      answer: "My Thrift is a platform that connects vendors, primarily from local marketplaces, with customers seeking thrifted clothing and affordable items. We make it easy to discover unique, budget-friendly products while supporting local vendors.",
    },
    {
      question: "Is it only market vendors on the platform?",
      answer: "No, My Thrift hosts vendors from across Nigeria, but our focus remains on connecting users with local markets. After all, who doesn't love shopping for thrifted treasures?",
    },
    {
      question: "Can I become a vendor?",
      answer: "Absolutely! If you're a vendor and want to join our platform, you can sign up to become a part of the My Thrift community. We’re always looking to partner with vendors who offer quality, affordable products.",
    },
    
    {
      question: "How can I be sure of the product quality?",
      answer: "We provide detailed descriptions for every product on our platform, whether it’s brand new, thrifted, or even comes with a minor defect. For example, Nkechi wouldn’t mind getting a skirt for ₦1,000 if all she has to do is wash off a stain, right?",
    },
    {
      question: "Why should I trust the vendors on the platform?",
      answer: "All vendors on My Thrift will undergo a strict vetting and verification process to ensure they are authentic and trustworthy thereafter can they  list their products.",
    },
    {
      question: "How will my items be delivered?",
      answer: "We're currently in the process of securing reliable logistics partners to ensure your items are delivered safely and efficiently. While we finalize these partnerships, rest assured that we are exploring the best options to bring your items straight to your doorstep. We'll keep you updated as soon as we have more details to share!"
    },
    {
      question: "When are we launching?",
      answer: "We’re set to launch in late November 2024, with over 40+ vendors ready to showcase their products on our platform. We will be glad to have you onboard!",
    },
    {
      question: "How is payment handled?",
      answer: "Our payment partners allow us to hold funds in case of a fraud report or a very unsatisfactory purchase if products were damaged before the buyer received them, or in the case of a 'what I ordered vs. what I got' scenario. To ensure quality service, vendors receive full payment only after the buyer confirms they are satisfied with their purchase.",
    },
    {
      question: "Is it only thrifted items on the platform?",
      answer: "No, we also offer a range of branded and brand-new products. However, our focus is on providing affordable, quality items for the masses.",
    },
   
    {
      question: "Is it only clothes sold on My Thrift?",
      answer: "No, jewelry, shoes, bags, and many other products are available for purchase on the platform. We aim to bring the marketplace to you.",
    },
    {
      question: "How affordable are clothes on My Thrift?",
      answer: "We ensure every vendor on our platform doesnt inflate prices on products. For example, You won’t find a thrifted piece for more than ₦15,000, except in cases where it's a brand-new product. We aim to help you slay  on a budget.",
    }
  ];

  return (
    <section className="bg-[#F7F7F7] w-full mx-auto md:px-6  md:py-16" id='faq-section'>
      <h2 className="text-center text-3xl font-bold translate-y-7 mb-8">FAQs</h2>
      <div className="md:space-y-4 lg:space-y-4 space-y-3 p-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border border-gray-200 bg-white   ${activeIndex === index ? 'shadow-lg rounded-3xl' : 'rounded-full'}`}
          >
            <button 
              onClick={() => toggleAccordion(index)} 
              className="w-full flex justify-between items-center px-6 py-4 text-xs text-left md:text-lg font-medium text-gray-800"
            >
              {faq.question}
              <span className="text-orange-600 md:text-xl lg:text-xl text-sm">
                {activeIndex === index ? <FaTimes /> : <FaPlus />}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 text-xs md:text-xl">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
