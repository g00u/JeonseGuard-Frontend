import React from 'react';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div className="main-container">
      <header className="main-header">
        <h1>전세가드</h1>
        <p>전세가드에 오신 것을 환영합니다!</p>
      </header>
 
      <section className="main-content">
        <p className="intro-text">문서를 업로드하시면, AI가 분석을 도와드립니다.</p>
        <div className="button-group">
          <button>문서 업로드</button>
          <button>게시판</button>
          <button>전세가율 분석</button>
          <button>마이페이지</button>
        </div>

        <input
          className="search-bar"
          type="text"
          placeholder="주소 또는 건물명 검색.."
        />
        <button className="search-button">검색</button>
        
      </section>

      <footer className="main-footer">
        <p>© 2025 전세가드.</p>
      </footer>
    </div>
  );
}

export default MainPage;
