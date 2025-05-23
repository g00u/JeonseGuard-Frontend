import React, { useState } from 'react';
import '../styles/MyUploads.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

Tooltip.positioners.customAbove = function(elements, eventPosition) {
  return {
    x: eventPosition.x,
    y: eventPosition.y - 200
  };
};
const MyUploads = () => {
  const [address, setAddress] = useState('');
  const [bun, setBun] = useState('');
  const [ji, setJi] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [typeCode, setTypeCode] = useState(0);

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const base = process.env.REACT_APP_API_URL;
    let apiUrl = '';
    if (typeCode === 0) apiUrl = `${base}/transaction/jeonse/apartment`;
    else if (typeCode === 1) apiUrl = `${base}/transaction/jeonse/officetel`;
    else if (typeCode === 2) apiUrl = `${base}/transaction/jeonse/rowhouse`;

    if (!address || !bun) {
      alert('주소와 번은 필수 입력입니다.');
      return;
    }

    const requestBody = { address, bun };
    if (ji.trim() !== '') requestBody.ji = ji;
    if (floorNumber.trim() !== '') requestBody.floorNumber = floorNumber;

    setLoading(true);
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && Array.isArray(data[1])) {
          setTransactionHistory(data[1]);
        } else {
          console.error('예상과 다른 응답 구조:', data);
          setTransactionHistory([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('API 오류:', err);
        setLoading(false);
      });
  };

  const formatPrice = (value) => {
    if (!value || typeof value !== 'string') return '가격 정보 없음';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
  };
  // 평형 변환하는 함수
  const convertToPyeong = (sqm) => {
  const pyeong = Number(sqm) / 3.3058;
  return pyeong.toFixed(1); // 소수점 첫째 자리까지 표시
};

  const getPriceSummaryData = () => {
    const grouped = {};
    transactionHistory.forEach(item => {
      const month = `${item.contractYearMonth.slice(0, 4)}.${item.contractYearMonth.slice(4)}`;
      const rawPrice = item.price?.replace(/,/g, '');
      const price = Number(rawPrice) / 100000000;
      if (!grouped[month]) grouped[month] = [];
      if (!isNaN(price)) grouped[month].push(price);
    });

    const labels = Object.keys(grouped).sort();
    const average = [], max = [], min = [], count = [];

    labels.forEach(month => {
      const prices = grouped[month];
      average.push(Number((prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(4)));
      max.push(Number(Math.max(...prices).toFixed(4)));
      min.push(Number(Math.min(...prices).toFixed(4)));
      count.push(prices.length);
    });

    return {
      labels,
      datasets: [
        {
          label: '평균 전세가',
          data: average,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0,
          yAxisID: 'y1',
        },
        {
          label: '최고 전세가',
          data: max,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0,
          yAxisID: 'y1',
        },
        {
          label: '최저 전세가',
          data: min,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          tension: 0,
          yAxisID: 'y1',
        },
        {
          label: '거래량',
          data: count,
          type: 'bar',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          yAxisID: 'y2',
          barPercentage: 0.5,
          categoryPercentage: 0.6,
          datalabels: {
            anchor: 'end',
            align: 'start',
            color: 'black',
            font: { weight: 'bold' },
            formatter: (value) => `${value}건`,
          }
        },
      ],
    };
  };

  return (
    <div className="mypage-subpage">
      <h2> 실거래가 직접 조회</h2>
      <div className="input-section">
        <input type="text" placeholder="주소" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="text" placeholder="번" value={bun} onChange={e => setBun(e.target.value)} />
        <input type="text" placeholder="지(없으면 0)" value={ji} onChange={e => setJi(e.target.value)} />
        <input type="text" placeholder="층수" value={floorNumber} onChange={e => setFloorNumber(e.target.value)} />
        <select value={typeCode} onChange={e => setTypeCode(Number(e.target.value))}>
          <option value={0}>아파트</option>
          <option value={1}>오피스텔</option>
          <option value={2}>연립다세대</option>
        </select>
        <button onClick={handleSearch}>조회하기</button>
      </div>
      <hr />
      {loading ? (
        <p>실거래가 불러오는 중...</p>
      ) : transactionHistory.length > 0 ? (
        <>
          <div className="chart-wrapper">
            <h3>월별 평균 전세가 추이</h3>
            <Line
              data={getPriceSummaryData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'point',
                  intersect: true,
                },
                  elements: {
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 6,
                  },
                  line: {
                    tension: 0, // 꺾은선으로 만들기
                  },
                },

                plugins: {
                  legend: { position: 'top' },
                  title: { 
                    display: false, 
                    text: ' ',
                    font: {
                      size: 16,
                      weight: 'bold',
                      family: 'Noto Sans KR', 
                    },
                    color: '#111',
                    padding: {
                      top: 10,
                      bottom: 20,
                   },
                  },
                  tooltip: {
                    position: 'customAbove', // 아래에 정의한 커스텀 함수 이름
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return label === '거래량'
                          ? `${label}: ${value}건`
                          : `${label}: ${Number(value).toFixed(3)}억 원`;
                      }
                    }
                  },
                  datalabels: {
                    display: (ctx) => ctx.dataset.label === '거래량',
                    anchor: 'end',
                    align: 'start',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: (value) => `${value}건`,
                  }
                },
                scales: {
                  x: {
                    ticks: { maxRotation: 0, minRotation: 0 },
                  },
                  y1: {
                    type: 'linear',
                    position: 'left',
                    title: {
                      display: true,
                      text: '전세가 (억 원)',
                      color: '#666',
                      font: {
                        size: 12,
                        weight: 'bold',
                      },
                    },
                    ticks: {
                      stepSize: 0.005,
                      color: '#444',
                      font: {
                        size: 12,
                      },
                      callback: (value) => value.toFixed(3) + '억',
                    },
                  },

                  y2: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 10,
                    title: {
                      display: false,
                      text: '거래량 (건수)',
                    },
                    ticks: {
                      display: false,
                    },
                    grid: { drawOnChartArea: false },
                  },
                },
              }}
              plugins={[ChartDataLabels]}
            />
          </div>
          <ul className="transaction-list">
            {transactionHistory.map((item, idx) => (
              <li key={idx} className="upload-card">
                <p><strong>계약일:</strong> {item.contractYearMonth.slice(0,4)}.{item.contractYearMonth.slice(4,6)}</p>
                <p><strong>가격:</strong> {formatPrice(item.price)}</p>
                <p><strong>유형:</strong> {item.housingType} / {item.rentType}</p>
                <p>
                  <strong>면적:</strong> {item.area}㎡ ({convertToPyeong(item.area)}평)
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>결과가 없습니다. 주소/번 정보를 다시 확인해주세요.</p>
      )}
    </div>
  );
};

export default MyUploads;
