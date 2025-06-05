import React, { useState } from 'react';
import '../styles/GroupedFaqList.css';
import { IoIosArrowDown } from "react-icons/io";

function GroupedFaqList({ groupedFaqItems }) {
  const [openGroupIndex, setOpenGroupIndex] = useState(null); // null이면 모두 닫힘

  const toggleGroup = (index) => {
    setOpenGroupIndex(openGroupIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      <h2>전세사기 예방 FAQ</h2>
      {groupedFaqItems.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div
            className="faq-group-title"
            onClick={() => toggleGroup(groupIndex)}
          >
            <span>{group.title}</span>
            <IoIosArrowDown
              className={`faq-group-arrow ${openGroupIndex === groupIndex ? 'open' : ''}`}
            />
          </div>
          {openGroupIndex === groupIndex && (
            <div className="faq-group-items">
              {group.items.map((item, itemIndex) => (
                <div className="faq-card" key={itemIndex}>
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupedFaqList;
