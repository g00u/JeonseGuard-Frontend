//  MyHistory.jsx (내 전체 분석 기록 히스토리)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyHistory.css'; 


const MyHistory = () => {
  const navigate = useNavigate();
  const historyList = [
    {
      id: 1,
      address: '서울시 강서구 화곡동 123',
      jeonseRate: 78.2,
      createdAt: '2025-05-01',
      result: '위험'
    },
    {
      id: 2,
      address: '부산시 해운대구 우동 456',
      jeonseRate: 63.7,
      createdAt: '2025-04-28',
      result: '안전'
    },
  ];

  return (
    <div className="mypage-subpage">
      <h2>📂 나의 분석 히스토리</h2>
      {historyList.map(item => (
        <div className="history-card" key={item.id}>
          <p><strong>주소:</strong> {item.address}</p>
          <p>
            <strong>전세가율:</strong>{' '}
            <span className={item.jeonseRate >= 70 ? 'rate-danger' : 'rate-normal'}>
              {item.jeonseRate}%
            </span>
          </p>
          <p><strong>결과:</strong> {item.result}</p>
          <p><strong>분석일:</strong> {item.createdAt}</p>
          <button
            className={item.result === '위험' ? 'button-danger' : 'button-safe'}
            onClick={() => navigate(`/report/${item.id}`)}
            >
            자세히 보기
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyHistory;


