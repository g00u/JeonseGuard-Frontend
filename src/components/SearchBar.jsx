import React from 'react';
import { MdCampaign } from 'react-icons/md';
import '../styles/MainPage.css';

function SearchBar() {
  return (
    <div className="search-bar-container disabled-guide-bar">
      <MdCampaign className="search-icon disabled-icon" />
      <div className="search-guide-text">
        AI 분석과 실거래가 조회도 함께 진행해주세요.
      </div>
    </div>
  );
}

export default SearchBar;
