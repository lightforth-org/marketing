import React, { useState } from "react";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import AnimatedButton from "./animated-button";

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}) => {
  return (
    <div className="mb-4">
      <button
        className={`bg-[#1A1A1A] cursor-pointer rounded-md text-white w-full p-4 flex justify-between items-center transition ease-in-out ${
          isOpen ? "rounded-none rounded-tr-md rounded-tl-md" : ""
        }`}
        onClick={toggleOpen}
      >
        <span className="font-normal text-left">{question}</span>
        <span className="text-gray-400 ml-4 cursor-pointer">
          {isOpen ? (
            <LuCircleMinus className="w-5 h-5" />
          ) : (
            <LuCirclePlus className="w-5 h-5" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="transition-transform ease-in-out bg-[#1A1A1A] text-[#8A8A8A] p-4 rounded-b-md text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

// Main FAQ Component
const FAQSection = ({ onClickScroll }: { onClickScroll: () => void }) => {
  // State to track which FAQ item is open
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "How many interviews can I expect during the free trial?",
      answer:
        "Our users typically land 3–7 interviews within the free trial window — just by using Lightforth's resume tool and 1-click auto-apply system. If you follow the process, your calendar will fill up fast.",
    },
    {
      question: "Will the Copilot sound like ChatGPT or give generic answers?",
      answer:
        "Not at all. Lightforth Copilot is trained to mimic your natural voice and tone — no robotic, perfect \"corporate answers\". You'll sound human, confident, and like you in every interview. That's why hiring managers love it.",
    },
    {
      question:
        "I've already applied to hundreds of jobs. Will this still work?",
      answer:
        'Yes! It works! We can "resurrect" applications even stuck in the loop of rejection. When applying, Lightforth isn\'t just an app, it\'s a job landing system that cuts through ATS filters and positions you as a true "Yes candidate".',
    },
    {
      question: "What if I don't have a tech or design background?",
      answer:
        "We've helped people land jobs in product, tech, marketing, ops, sales, HR, and more. If you're coachable and ready to work smart (not just hard), Lightforth will help you stand out and get interviews — regardless of your background.",
    },
    {
      question: "How is this different from job boards or resume templates?",
      answer:
        "Job boards post jobs. Lightforth lands them.\n\nYou'll get:\n• A custom, ATS-beating resume\n• An autopilot tech that applies to 30 jobs daily\n• A real-time interview Copilot that helps you answer any question with confidence and ace on Zoom",
    },
    {
      question: "Is this free trial actually free? What's the catch?",
      answer:
        "No catch. You get full access to the complete tool for a limited time. After that, you'll have the option to upgrade — only if you're seeing results. We're betting on ourselves, and our customers love that.",
    },
    {
      question: "What if I don't get interviews using Lightforth?",
      answer:
        "We offer a 21-Day Job Interview Guarantee.\n\nIf you don't land interviews using the system — and you've followed the complete process — we won't be cheap! Zero risk, all upside. Please read our refund policy for more.",
    },
    {
      question: "Can I download my resume after using LightResume?",
      answer:
        "Yes, you can download your resume in multiple formats including PDF and Word.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl text-center pb-5 uppercase text-black md:text-4xl font-extrabold leading-tight md:leading-snug">
          We have answer some Important
          <br />
          questions you might have in mind
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
      {/* CTA Button */}
      <div
        className="text-center max-w-sm py-5 mx-auto px-2"
        onClick={onClickScroll}
      >
        <AnimatedButton>Start Getting Jobs - 3 days free</AnimatedButton>
      </div>
    </section>
  );
};

export default FAQSection;
