import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
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
  const { state: message } = useLocation();
  const [showRateInfo, setShowRateInfo] = useState(false);

  const jeonsePrice = message?.deposit ? Number(message.deposit.replace(/,/g, '')) : 0;
  const contractPay = message?.downPayment ? Number(message.downPayment.replace(/,/g, '')) : 0;
  const balancePay = message?.balance ? Number(message.balance.replace(/,/g, '')) : 0;
  const salePrice = 700000000; // 매매가 임의 설정


  const jeonseRate = salePrice > 0 ? ((jeonsePrice / salePrice) * 100).toFixed(2) : null;
  const isJeonseRateDanger = jeonseRate >= 70;

  const barData = {
    labels: ['해당 건물'],
    datasets: [
      {
        label: '전세가',
        data: [jeonsePrice],
        backgroundColor: 'rgba(24, 144, 255, 0.6)',
      },
      {
        label: '매매가',
        data: [salePrice],
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

// 전세가 추이 데이터 추출
const rawJeonseData = message?.jeonseTrend || [];

const formatToHundredMillion = (str) => {
  const num = Number(str.replace(/,/g, ''));
  return (num / 100000000).toFixed(2);
};

const lineLabels = rawJeonseData.map(item => `${item.contractYearMonth}월`);
const lineValues = rawJeonseData.map(item => formatToHundredMillion(item.price));

const lineData = {
  labels: lineLabels,
  datasets: [
    {
      label: '전세가 변동 (억 원)',
      data: lineValues,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.3,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: '전세가 월별 추이 (억 원)' },
    tooltip: {
      callbacks: {
        label: context => `${context.dataset.label}: ${context.raw} 억`,
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: '억 원',
      }
    },
    x: {
      title: {
        display: true,
        text: '계약 연월',
      }
    }
  }
};


  const pieData = {
    labels: ['보증금', '계약금', '잔금'],
    datasets: [
      {
        label: '계약 구성',
        data: [jeonsePrice, contractPay, balancePay],
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

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-';
    return Number(amount).toLocaleString('ko-KR');
  };

  return (
    <div className="report-container">
      <h2>분석 결과</h2>

      {message ? (
        <>
          <div className="report-card">
            <p><strong> 주소:</strong> {message.address}</p>
            <p><strong> 건물 유형:</strong> {message.structUse}</p>
            <p><strong> 층수:</strong> {message.floorName}</p>
            <p><strong> 전세가:</strong> {formatCurrency(jeonsePrice)} 원</p>
            <p><strong> 매매가:</strong> {formatCurrency(salePrice)} 원</p>
            <p><strong> 계약금:</strong> {formatCurrency(contractPay)} 원</p>
            <p><strong> 잔금:</strong> {formatCurrency(balancePay)} 원</p>

            {jeonseRate && (
              <>
                <div className="jeonse-rate-section">
                  <div className="jeonse-gauge-wrapper">
                    <div className="gauge-level-bar">
                      <span className="level low">안전</span>
                      <span className="level mid">보통</span>
                      <span className="level high">위험</span>
                    </div>

                    <div className="jeonse-progress-bar-bg">
                      <div
                        className={`jeonse-progress-bar-fill ${isJeonseRateDanger ? 'danger' : 'safe'}`}
                        style={{ width: `${jeonseRate}%` }}
                      ></div>
                    </div>

                    <div className="gauge-label-row">
                      <span className={`gauge-label ${isJeonseRateDanger ? 'danger' : 'safe'}`}>
                        전세가율: {jeonseRate}%
                      </span>
                    </div>
                  </div>

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

                <div className={`rate-info-wrapper ${showRateInfo ? 'open' : ''}`}>
                  <div className="rate-info">
                    <p>전세가율은 전세 보증금이 매매가 대비 몇 퍼센트인지를 나타냅니다.</p>
                    <p><span className="highlight-red">⚠️ 70%를 초과하면 집값이 하락할 경우, 보증금을 전부 돌려받기 어려울 수 있어 매우 위험한 상황이 됩니다.</span></p>
                    <p>이는 <span className="highlight-blue">전세사기의 주요 원인</span> 중 하나로 작용하며,</p>
                    <p><span className="highlight-blue">실거래가와 보증금 간의 격차를 반드시 확인해야 합니다.</span></p>
                  </div>
                  <p className={`rate-risk-level ${isJeonseRateDanger ? 'danger' : ''}`}>
                    전세가율 위험도: {isJeonseRateDanger ? '⚠️ 위험' : '안전'}
                  </p>
                </div>
              </>
            )}

            <hr />
            <h3>임대인 정보</h3>
            <p><strong>이름:</strong> {message.lessorName}</p>
            <p><strong>주소:</strong> {message.lessorAddress}</p>
            <p><strong>전화번호:</strong> {message.lessorPhone}</p>
            <p><strong>주민번호:</strong> {message.lessorId}</p>

            <h3>임차인 정보</h3>
            <p><strong>이름:</strong> {message.lesseeName}</p>
            <p><strong>주소:</strong> {message.lesseeAddress}</p>
            <p><strong>전화번호:</strong> {message.lesseePhone}</p>
            <p><strong>주민번호:</strong> {message.lesseeId}</p>

            <h3>AI 계약서 분석 결과</h3>
            <p><strong>민법 기반 위험 조항 분석:</strong><br /> {message.clausesResponse}</p>
            <p><strong>특약사항 요약:</strong><br /> {message.scResponse}</p>
          </div>

          <div className="report-chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>

          <div className="report-chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>

          <div className="report-chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </>
      ) : (
        <p className="error-text">결과를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}

export default ReportPage;