import React from 'react';
import Slider from "react-slick";
import '../styles/NewsCarousel.css';

function NewsCarousel({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="news-carousel">
      <h2>전세사기 관련 뉴스</h2>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div className="news-card" key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.date}</small>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewsCarousel;
