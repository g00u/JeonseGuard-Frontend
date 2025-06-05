import React, { useState } from 'react';
import '../styles/FaqList.css';
import { IoIosArrowDown } from "react-icons/io";

function FaqList({ faqItems, collapsible = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      <h2>전세사기 예방 관련 FAQ</h2>
      {faqItems.map((item, index) => (
        <div className="faq-card" key={index}>
          <div className="faq-header" onClick={() => collapsible && toggle(index)}>
            <h4>{item.question}</h4>
            {collapsible && (
              <IoIosArrowDown
                className={`faq-arrow ${openIndex === index ? 'open' : ''}`}
              />
            )}
          </div>
          {(!collapsible || openIndex === index) && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default FaqList;