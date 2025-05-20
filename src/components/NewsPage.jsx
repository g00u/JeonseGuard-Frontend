import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NewsPage.css';

function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
useEffect(() => {
  const token = localStorage.getItem("accessToken");
  const API_URL = process.env.REACT_APP_API_URL;

  axios.get(`${API_URL}/news`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    }
  })
    .then((res) => {
      console.log("뉴스 응답:", res.data);
      const newsList = Array.isArray(res.data) ? res.data[1] : []; // 안정 처리
      setNewsItems(newsList || []);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("뉴스 로딩 오류:", err.response?.data || err.message);
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
          <a
            href={item.link}
            key={index}
            className="news-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="news-item-content">
              <h3>{item.title || "-"}</h3>
              <p>{item.description || item.summary || ""}</p>
              <small>{formatDate(item.publishedAt || item.date)}</small>
            </div>
          </a>
        ))}
      </div>

      )}
    </div>
  );
}

// 날짜를 보기 좋게 포맷하는 함수
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default NewsPage;
