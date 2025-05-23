import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
//Chart.js 관련 요소 import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../styles/ReportPage.css'; 

// Chart.js에서 사용할 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ReportPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/data/report_${id}.json`)  // public 폴더 기준 경로
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('메시지 불러오기 실패:', err);
        setMessage(null);
        setLoading(false);
      });
  }, [id]);

  // 전세가율 계산
  // 전세가율 = (전세가 / 매매가) * 100
const jeonseRate = (message?.jeonsePrice && message?.salePrice>0)
  ? ((message.jeonsePrice / message.salePrice) * 100).toFixed(2)
  : null;
// 전세가율이 위험한 수준인지 판별
const isJeonseRateDanger = jeonseRate >= 70;


const [showRateInfo, setShowRateInfo] = useState(false);


// Bar Chart 데이터 (전세가 vs 매매가)
  const barData = {
    labels: ['해당 건물'],
    datasets: [
      {
        label: '전세가',
        data: [message?.jeonsePrice || 0],
        backgroundColor: 'rgba(24, 144, 255, 0.6)',
      },
      {
        label: '매매가',
        data: [message?.salePrice || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '전세가 vs 매매가 비교' },
    },
  };

// Line Chart 데이터 (전세가 추세)
  const lineData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: '전세가 변동',
        data: [1.8, 2.1, 2.3, 2.2, message?.jeonsePrice / 100000000 || 2.4],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: '전세가 연도별 추이 (억 원)' },
    },
  };

  // Pie Chart 데이터 (계약금/잔금/보증금 비율)
   const pieData = {
    labels: ['보증금', '계약금', '잔금'],
    datasets: [
      {
        label: '계약 구성',
        data: [
          message?.jeonsePrice || 0,
          message?.contractPay || 0,
          message?.balancePay || 0,
        ],
        backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384'],
        borderWidth: 1,
      },
    ],
  };
   const pieOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: '계약 항목 비율' },
      legend: { position: 'bottom' },
    },
  };

  // 렌더링 영역 시작
    return (
    <div className="report-container">
      <h2>분석 결과</h2>

      {/* 로딩 중일 때 */}
      {loading ? (
        <p>불러오는 중...</p>

      // 로딩 성공 + 데이터 있을 때
      ) : message ? (
        <>
          {/* 기본 정보 카드 */}
          <div className="report-card">
            <p><strong> 주소:</strong> {message.address}</p>
            <p><strong> 건물 유형:</strong> {message.buildingType}</p>
            <p><strong> 층수:</strong> {message.floor}</p>
            <p><strong> 전세가:</strong> {message.jeonsePrice} 원</p>
            <p><strong> 매매가:</strong> {message.salePrice} 원</p>
            <p><strong> 계약금:</strong> {message.contractPay} 원</p>
            <p><strong> 잔금:</strong> {message.balancePay} 원</p>
            
            {jeonseRate && (
              <>
    
                <div className="jeonse-rate-section">
                  <div className="jeonse-gauge-wrapper">
                    
                    {/* 위험도 구간 라벨 (안전 ~ 위험) */}
                    <div className="gauge-level-bar">
                      <span className="level low">안전</span>
                      <span className="level mid">보통</span>
                      <span className="level high">위험</span>
                    </div>

                    {/* 전세가율 게이지 바 */}
                    <div className="jeonse-progress-bar-bg">
                      <div
                        className={`jeonse-progress-bar-fill ${isJeonseRateDanger ? 'danger' : 'safe'}`}
                        style={{ width: `${jeonseRate}%` }}
                      ></div>
                    </div>

                    {/* 수치: 전세가율:*/}
                    <div className="gauge-label-row">
                      <span className={`gauge-label ${isJeonseRateDanger ? 'danger' : 'safe'}`}>
                        전세가율: {jeonseRate}%
                      </span>
                    </div>
                  </div>

                  {/* 전세가율 설명 토글 */}
                  <div className="rate-heading-row">
                    <span className="rate-label">전세가율 분석</span>
                    <button
                      className="info-toggle-btn"
                      onClick={() => setShowRateInfo(!showRateInfo)}
                    >
                      {showRateInfo ? '설명 닫기' : '자세히 보기'}{' '}
                      {showRateInfo ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                </div>



              {/* 전세가율 설명 */}
              <div className={`rate-info-wrapper ${showRateInfo ? 'open' : ''}`}>
                <div className="rate-info">
                  <p>
                    전세가율은 전세 보증금이 매매가 대비 몇 퍼센트인지를 나타냅니다.
                  </p>
                  <p>
                    <span className="highlight-red">
                      ⚠️ 70%를 초과하면 집값이 하락할 경우, 보증금을 전부 돌려받기 어려울 수 있어 매우 위험한 상황이 됩니다.
                    </span>
                  </p>
                  <p>
                    이는 <span className="highlight-blue">전세사기의 주요 원인</span> 중 하나로 작용하며,
                  </p>
                  <p>
                    <span className="highlight-blue">실거래가와 보증금 간의 격차를 반드시 확인해야 합니다.</span>
                  </p>
                </div>

                {/* 위험도 간단 표시 (위/안전) */}
                <p className={`rate-risk-level ${isJeonseRateDanger ? 'danger' : ''}`}>
                  전세가율 위험도: {isJeonseRateDanger ? '⚠️ 위험' : '안전'}
                </p>
              </div>

                </>
            )}
          </div>

          {/* Bar Chart */}
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Line Chart */}
          <div className="chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>

          {/* Pie Chart */}
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </>

      // 로딩 실패 또는 데이터 없음
      ) : (
        <p className="error-text">결과를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}




export default ReportPage;
