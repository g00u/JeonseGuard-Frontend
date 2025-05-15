import React from 'react';
import '../styles/NewsPage.css';

const dummyNews = [
  {
    title: "전세가율 하락세 지속",
    summary: "서울 외곽 지역을 중심으로 전세가율 60% 이하 하락",
    date: "2025.05.15",
    url: "#"
  },
  {
    title: "계약 전 확인 필수 항목",
    summary: "확정일자, 전입신고, 특약사항 주의사항 안내",
    date: "2025.05.14",
    url: "#"
  },
  {
    title: "악성 임대인 목록 공개 예정",
    summary: "전세사기 피해 예방을 위한 공공 데이터 활용 방안",
    date: "2025.05.12",
    url: "#"
  }
];

function NewsPage() {
  return (
    <div className="news-page-container">
      <h2 className="news-page-title">전체 뉴스</h2>
      <div className="news-list">
        {dummyNews.map((item, index) => (
          <a href={item.url} key={index} className="news-item">
            <div className="news-item-content">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.date}</small>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
