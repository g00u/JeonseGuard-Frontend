import React from 'react';
import '../styles/MyHistory.css';

const MyHistory = () => {
  const handleFeedback = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdbv8RaWmKQF0sijjpCp7j9UbfRp7uQ3_VcV7zFJov8J6Gqdw/viewform?usp=dialog', '_blank'); 
  };

  return (
    <div className="mypage-subpage">
      <h2>ℹ️ JeonseGuard 안내</h2>

      <div className="info-box">
        <p>
          <strong>JeonseGuard</strong>는 전세 사기 예방을 위한 AI 기반 계약서 분석 시스템입니다.
        </p>
        <ul>
          <li> 계약서 이미지를 업로드하면 AI가 주요 항목을 자동 분석</li>
          <li> 실거래가 및 전세가율을 시각적으로 확인</li>
          <li> 특약사항의 위험성 자동 감지</li>
          <li> 국토교통부 건축물대장 API, 내부 실거래가 데이터, 뉴스 등 정보 연계 제공</li>
        </ul>
      </div>

      <div className="notice-box">
        <p>
          현재 분석 히스토리는 저장되지 않으며, <br />
          <strong>PDF 또는 이미지로 결과를 직접 저장</strong>해 주세요.
        </p>
      </div>

      <div className="feedback-box">
        <p>개선 제안이나 불편사항이 있다면 아래 버튼을 통해 알려주세요.</p>
        <button className="feedback-btn" onClick={handleFeedback}>
           관리자에게 문의 / 제안하기
        </button>
      </div>
    </div>
  );
};

export default MyHistory;
