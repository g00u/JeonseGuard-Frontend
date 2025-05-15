import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import NewsCarousel from './NewsCarousel';
import FaqList from './FaqList';
import '../styles/MainPage.css';
import { IoLogoWechat } from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

function MainPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [faqItems] = useState([
    {
      question: "확정일자랑 전입신고는 어떻게 다른가요?",
      answer: "확정일자는 법원에서 받는 날짜 도장, 전입신고는 주민센터에서 주소 등록입니다. 둘 다 해야 임차인 보호됩니다."
    },
    {
      question: "특약사항에 주의할 점은 무엇인가요?",
      answer: "전입신고 금지, 계약 해지 시 위약금 과다 등은 위험합니다. AI가 자동 분석해드려요!"
    }
  ]);

  const navigate = useNavigate();

useEffect(() => {
  axios.get('http://localhost:3000/api/news') // 백엔드 실제 API URL 변경 필요요
    .then((res) => {
      setNewsItems(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("뉴스 불러오기 실패. 더미 데이터로 대체합니다:", err);
      // 더미 데이터 사용
      setNewsItems([
        {
          title: "임시 뉴스 제목 1",
          summary: "이것은 API 연결 전에 보이는 더미 뉴스입니다.",
          date: "2025.05.15",
          url: "#"
        },
        {
          title: "임시 뉴스 제목 2",
          summary: "뉴스 API가 준비되면 이 자리는 실제 뉴스로 바뀝니다.",
          date: "2025.05.14",
          url: "#"
        }
      ]);
      //setHasError(true);
      setIsLoading(false);
    });
}, []);


  return (
    <div className="main-page-container">
      {/* 상단 안내 및 검색 */}      
      <div className="main-page-header">
        <p className="hero-subtitle">
             전세 계약서, 지금 업로드해보세요,<br />
            <strong>AI가 빠르게 분석해드립니다.</strong>
        </p>
      <div className="search-wrapper">
        <SearchBar />
      </div>
      </div>

      {/* 메뉴 버튼 */}
      <div className="menu-btn-container">
        <div className="menu-btns">
          <Link to="/uploadform" className="menu-btn"><MdDriveFolderUpload className="icon" />문서 업로드</Link>
        </div>
        <div className="menu-btns">
          <Link to="/" className="menu-btn"><IoMdAnalytics className="icon" />전세가율 분석</Link>
        </div>
        <div className="menu-btns">
          <Link to="/board" className="menu-btn"><FaClipboardList className="icon" />게시판</Link>
        </div>
        <div className="menu-btns">
          <Link to="/analysis" className="menu-btn"><IoLogoWechat className="icon" />챗봇 상담</Link>
        </div>
      </div>

      {/* 뉴스 캐러셀 or 로딩/에러 처리 */}
      <div className="info-section">
        {isLoading ? (
          <div className="info-box loading-box">뉴스 로딩 중입니다...</div>
        ) : hasError ? (
          <div className="info-box error-box">
            <h3>뉴스 불러오기 실패</h3>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        ) : newsItems.length > 0 ? (
          <>
            <NewsCarousel items={newsItems} />
            <div className="see-more-button-wrapper">
              <button className="see-more-button" onClick={() => navigate('/news')}>
                전체 뉴스 더보기
              </button>
            </div>
          </>
        ) : (
          <div className="info-box empty-box">현재 표시할 뉴스가 없습니다.</div>
        )}

        <FaqList faqItems={faqItems} collapsible />
      </div>
    </div>
  );
}

export default MainPage;
