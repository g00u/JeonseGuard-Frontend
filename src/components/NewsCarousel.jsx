import React from 'react';
import Slider from "react-slick";
import '../styles/NewsCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function formatRelativeTime(dateStr) {
  if (!dateStr) return "-";

  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return "-";

  const now = new Date();
  const diffMin = Math.floor((now - parsed) / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  return `${parsed.getFullYear()}.${parsed.getMonth() + 1}.${parsed.getDate()}`;
}


function NewsCarousel({ items }) {
  const CustomPrevArrow = ({ className, style, onClick }) => (
    <div className={`custom-arrow custom-prev ${className}`} style={style} onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const CustomNextArrow = ({ className, style, onClick }) => (
    <div className={`custom-arrow custom-next ${className}`} style={style} onClick={onClick}>
      <FaChevronRight />
    </div>
  );
  
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   prevArrow: <CustomPrevArrow />,  
   nextArrow: <CustomNextArrow />
  };

  // 슬라이드마다 5개씩 묶기
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 5) {
    chunkedItems.push(items.slice(i, i + 5));
  }

  return (
    <div className="news-carousel">
      
      <Slider {...settings}>
        {chunkedItems.map((group, index) => (
          <div className="news-slide" key={index}>
            <ul className="news-list">
              {group.map((item, i) => (
                <li className="news-item" key={i}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
                    <span className="news-title">{item.title || "-"}</span>
                    <span className="news-time">{formatRelativeTime(item.publishedAt)}</span>
                  </a>
                </li>

              ))}
            </ul>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewsCarousel;
