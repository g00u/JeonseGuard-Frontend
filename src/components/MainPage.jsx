import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import NewsCarousel from './NewsCarousel';

import '../styles/MainPage.css';
import { IoLogoWechat } from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

function MainPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
 

  const navigate = useNavigate();

useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/news`)// 백엔드 실제 API URL 변경 필요요
    .then((res) => {
      console.log("뉴스 데이터:", res.data);
      setNewsItems(res.data[1]);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("뉴스 불러오기 실패. 더미 데이터로 대체합니다:", err);
      // 더미 데이터 사용
      setNewsItems([
        {
          title: "임시 뉴스 제목 1",
          link: "#",
          description: "이것은 API 연결 전에 보이는 더미 뉴스입니다.",
          publishedAt: "2025-05-15"
        },
        {
          title: "임시 뉴스 제목 2",
          link: "#",
          description: "뉴스 API가 준비되면 이 자리는 실제 뉴스로 바뀝니다.",
          publishedAt: "2025-05-14"
        }
      ]);
      setHasError(true);
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
<div className="home-card-grid emphasized">
  <Link to="/uploadfile" className="card-btn-strong">
    <div className="icon-circle blue"><MdDriveFolderUpload /></div>
    <span>문서 업로드</span>
  </Link>
  <Link to="/mypage/uploads" className="card-btn-strong">
    <div className="icon-circle green"><IoMdAnalytics /></div>
    <span>실거래가 조회</span>
  </Link>
  <Link to="/board" className="card-btn-strong">
    <div className="icon-circle orange"><FaClipboardList /></div>
    <span>게시판</span>
  </Link>
  <Link to="/faq" className="card-btn-strong">
    <div className="icon-circle purple"><IoLogoWechat /></div>
    <span>FAQ</span>
  </Link>
</div>



      {/* 뉴스 캐러셀 or 로딩/에러 처리 */}
      <div className="news-wrapper">
        <h3 className="section-title">📢 최신 전세 관련 뉴스</h3>

        {isLoading ? (
          <div className="info-box loading-box">뉴스 로딩 중입니다...</div>
        ) : hasError ? (
          <div className="info-box error-box">
            <h3>뉴스 불러오기 실패</h3>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        ) : newsItems.length > 0 ? (
          <>
            <NewsCarousel items={newsItems} />  {/* 타이틀 없이 */}
            <div className="see-more-button-wrapper">
              <button className="see-more-button" onClick={() => navigate('/news')}>
                + 전체 뉴스 더보기
              </button>
            </div>
          </>
        ) : (
          <div className="info-box empty-box">현재 표시할 뉴스가 없습니다.</div>
        )}
      </div>

    </div>
  );
}

export default MainPage;
