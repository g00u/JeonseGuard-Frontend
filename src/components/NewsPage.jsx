import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NewsPage.css';

function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios.get('https://jeonseguard.duckdns.org/api/v5/news')
      .then((res) => {
        setNewsItems(res.data[1]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("뉴스 로딩 실패:", err);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="news-page-container">
      <h2 className="news-page-title">전체 뉴스</h2>

      {isLoading ? (
        <p className="news-loading">뉴스 로딩 중...</p>
      ) : hasError ? (
        <p className="news-error">뉴스를 불러오지 못했습니다.</p>
      ) : (
        <div className="news-list">
          {newsItems.map((item, index) => (
            <a href={item.link} key={index} className="news-item" target="_blank" rel="noopener noreferrer">
              <div className="news-item-content">
                <h3>{item.title || "-"}</h3>
                <p>{item.description || item.summary || ""}</p>
                <small>{item.publishedAt || item.date}</small>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage;
