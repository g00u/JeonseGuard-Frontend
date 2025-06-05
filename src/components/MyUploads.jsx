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
//import { useEffect } from 'react';

// Chart.js 플러그인 등록
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


const MyUploads = () => {
  // 입력 상태
  const [address, setAddress] = useState('');
  const [bun, setBun] = useState('');
  const [ji, setJi] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [area, setArea] = useState('');
  const [typeCode, setTypeCode] = useState(0);

  // 결과 상태
  const [loading, setLoading] = useState(false);
  const [jeonseData, setJeonseData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // 실거래 조회 버튼 클릭 시 호출
  const handleSearch = () => {
    const base = process.env.REACT_APP_API_URL;

    // 주택유형 코드에 따라 API URL 설정
    let apiUrl = '';
    if (typeCode === 0) apiUrl = `${base}/transaction/summary/apartment`;
    else if (typeCode === 1) apiUrl = `${base}/transaction/summary/officetel`;
    else if (typeCode === 2) apiUrl = `${base}/transaction/summary/rowhouse`;

    // 입력값 검증
    if (!address.trim() || !bun.trim() || !ji.trim() || !floorNumber.trim() || !area.trim()) {
      alert('주소, 번, 지, 층수, 면적을 모두 입력해야 합니다.');
      return;
    }

    // 요청 바디 구성 (스웨거 명세와 일치)
    const requestBody = {
      address,
      bun,
      ji,
      floorNumber,
      area
    };

    setLoading(true);
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
 
      .then(data => {
        // Java 직렬화된 응답 → 각 항목이 ["java.util.ArrayList", [실제데이터]]
        console.log("전체 응답 원본:", data);
        const jeonseRaw = Array.isArray(data.jeonses) ? data.jeonses[1] : [];
        const saleRaw = Array.isArray(data.sales) ? data.sales[1] : [];

        console.log(" 파싱된 전세 데이터:", jeonseRaw);
        console.log(" 파싱된 매매 데이터:", saleRaw);

        setJeonseData(jeonseRaw);
        setSaleData(saleRaw);
        setTransactionHistory(jeonseRaw);
      })
      .catch(err => {
        console.error('API 오류:', err);
      });


    setLoading(false);
  };


/*
  useEffect(() => {
  // 테스트용 하드코딩 데이터
  const sampleJeonse = [
    {
      contractYearMonth: "202403",
      price: "450,000,000",
      area: "84.96",
      housingType: "아파트",
      rentType: "전세"
    },
    {
      contractYearMonth: "202402",
      price: "460,000,000",
      area: "84.96",
      housingType: "아파트",
      rentType: "전세"
    }
  ];

  const sampleSale = [
    {
      contractYearMonth: "202403",
      price: "600,000,000",
      area: "84.96",
      housingType: "아파트",
      rentType: "매매"
    },
    {
      contractYearMonth: "202402",
      price: "580,000,000",
      area: "84.96",
      housingType: "아파트",
      rentType: "매매"
    }
  ];

  setJeonseData(sampleJeonse);
  setSaleData(sampleSale);
  setTransactionHistory(sampleJeonse); // 전세만 거래 리스트에
}, []);
*/



  // 숫자에 쉼표 추가 (금액 포맷용)
  const formatPrice = (value) => {
    if (!value || typeof value !== 'string') return '가격 정보 없음';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
  };

  // 평으로 변환
  const convertToPyeong = (sqm) => {
    const pyeong = Number(sqm) / 3.3058;
    return pyeong.toFixed(1);
  };

  const getYAxisRange = (dataArr) => {
    if (dataArr.length === 1) {
      const val = Number(dataArr[0]);
      return { min: val - 0.2, max: val + 0.2 }; // 더 넓게 설정
    } else {
      const minVal = Math.min(...dataArr.map(Number));
      const maxVal = Math.max(...dataArr.map(Number));
      return {
        min: Math.floor(minVal * 10) / 10 - 0.1,
        max: Math.ceil(maxVal * 10) / 10 + 0.1
      };
    }
  };

  // 평균/최고/최저 전세가 통계
  const getPriceStats = () => {
    const prices = transactionHistory.map(item => Number(item.price?.replace(/,/g, '')) / 100000000);
    if (prices.length === 0) return null;

    const sum = prices.reduce((a, b) => a + b, 0);
    return {
      average: (sum / prices.length).toFixed(3),
      max: Math.max(...prices).toFixed(3),
      min: Math.min(...prices).toFixed(3),
      count: prices.length
    };
  };

  // 월별 전세가 평균 추이 그래프용 데이터
  const getLineChartData = () => {
    const grouped = {};
    transactionHistory.forEach(item => {
      const month = `${item.contractYearMonth.slice(0, 4)}.${item.contractYearMonth.slice(4)}`;
      const rawPrice = item.price?.replace(/,/g, '');
      const price = Number(rawPrice) / 100000000;
      if (!grouped[month]) grouped[month] = [];
      if (!isNaN(price)) grouped[month].push(price);
    });

    const labels = Object.keys(grouped).sort();
    const average = labels.map(month => {
      const prices = grouped[month];
      return (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(3);
    });

    return {
      labels,
      datasets: [
        {
          label: ' 월별 전세 실거래 평균',
          data: average,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0,
          fill: false,
          pointRadius: 4
        }
      ]
    };
  };

  // 월별 전세가율 계산 함수 (전세/매매 평균 비율)
  const getJeonseRateStats = () => {
    const grouped = {};

    jeonseData.forEach(item => {
      const month = `${item.contractYearMonth.slice(0, 4)}.${item.contractYearMonth.slice(4, 6)}`;
      const price = Number(item.price?.replace(/,/g, '')) / 100000000;
      if (!grouped[month]) grouped[month] = { jeonse: [], sale: [] };
      if (!isNaN(price)) grouped[month].jeonse.push(price);
    });

    saleData.forEach(item => {
      const month = `${item.contractYearMonth.slice(0, 4)}.${item.contractYearMonth.slice(4, 6)}`;
      const price = Number(item.price?.replace(/,/g, '')) / 100000000;
      if (!grouped[month]) grouped[month] = { jeonse: [], sale: [] };
      if (!isNaN(price)) grouped[month].sale.push(price);
    });

    return Object.entries(grouped)
      .map(([month, { jeonse, sale }]) => {
        const hasJeonse = jeonse.length > 0;
        const hasSale = sale.length > 0;
        if (!hasJeonse && !hasSale) return null;

        const avgJeonse = hasJeonse
          ? (jeonse.reduce((a, b) => a + b, 0) / jeonse.length).toFixed(2)
          : null;
        const avgSale = hasSale
          ? (sale.reduce((a, b) => a + b, 0) / sale.length).toFixed(2)
          : null;
        const rate =
          hasJeonse && hasSale && Number(avgSale) > 0
            ? ((Number(avgJeonse) / Number(avgSale)) * 100).toFixed(2)
            : null;

        return {
          month,
          avgJeonse,
          avgSale,
          rate
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  
  return (
    <div className="mypage-subpage">
      <h2>실거래가 직접 조회</h2>

      {/* 입력창 영역 */}
      <div className="input-section">
        <input type="text" placeholder="주소" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="text" placeholder="번" value={bun} onChange={e => setBun(e.target.value)} />
        <input type="text" placeholder="지(없으면 0)" value={ji} onChange={e => setJi(e.target.value)} />
        <input type="text" placeholder="층수" value={floorNumber} onChange={e => setFloorNumber(e.target.value)} />
        <input type="text" placeholder="면적 (㎡)" value={area} onChange={e => setArea(e.target.value)} />

        <select value={typeCode} onChange={e => setTypeCode(Number(e.target.value))}>
          <option value={0}>아파트</option>
          <option value={1}>오피스텔</option>
          <option value={2}>연립다세대</option>
        </select>
        <button onClick={handleSearch}>조회하기</button>
      </div>

      <hr />

      {/* 로딩 or 결과 */}
      {loading ? (
        <p>실거래가 불러오는 중...</p>
      ) : transactionHistory.length > 0 ? (
        <>
          {/* 거래 리스트 */}
          <ul className="transaction-list">
            {transactionHistory.map((item, idx) => (
              <li key={idx} className="upload-card">
                    <p><strong>계약일: </strong> 
                      {item.contractYearMonth 
                        ? `${item.contractYearMonth.slice(0, 4)}.${item.contractYearMonth.slice(4, 6)}`
                        : '정보 없음'}
                    </p>
                
                <p><strong>가격:</strong> {formatPrice(item.price)}</p>
                <p><strong>유형:</strong> {item.housingType} / {item.rentType}</p>
                <p><strong>면적:</strong> {item.area}㎡ ({convertToPyeong(item.area)}평)</p>
              </li>
            ))}
          </ul>

          {/* 전세 통계 요약 */}
          {getPriceStats() && (
            <div className="summary-box">
              <p><strong>거래 건수:</strong> {getPriceStats().count}건</p>
              <p><strong>평균 전세가:</strong> {getPriceStats().average}억</p>
              <p><strong>최고 전세가:</strong> {getPriceStats().max}억</p>
              <p><strong>최저 전세가:</strong> {getPriceStats().min}억</p>
            </div>
          )}

          {/* 전세가율 요약 */}
          {getJeonseRateStats().length > 0 ? (
            <div className="summary-box">
              <h3>월별 전세가율 및 평균가</h3>
              <ul>
                {getJeonseRateStats().map((item, idx) => {
                  const missingClass =
                    !item.avgJeonse && !item.avgSale
                      ? 'both-missing'
                      : !item.avgJeonse
                      ? 'jeonse-missing'
                      : !item.avgSale
                      ? 'sale-missing'
                      : '';

                const isRisk = item.rate && Number(item.rate) >= 70;

                  return (
                    <li key={idx} className={missingClass}>
                      <strong>{item.month}</strong> –{' '}
                        {item.rate ? (
                          <>
                            전세가율:{' '}
                            <span className={isRisk ? 'rate-warn' : 'rate-ok'}>
                              {item.rate}%
                            </span>
                            {isRisk && (
                              <span className="risk-info-icon" title="위험 지표">i</span>
                            )}
                          </>
                        ) : (
                          <>전세가율: <span className="rate-fail">계산 불가</span></>
                        )}

                      <br />
                      전세: {item.avgJeonse ? `${item.avgJeonse}억` : '없음'} /
                      매매: {item.avgSale ? `${item.avgSale}억` : '없음'}
                    </li>
                  );
                })}
              </ul>

            </div>
          ) : (
            <div className="empty-result">
              ※ 전세 또는 매매 평균가가 존재하지 않습니다.
            </div>
          )}




          {/* 전세가 추이 차트 */}
          <div className="chart-wrapper">
            <h3>최근 전세 실거래 변화</h3>
            <Line
              data={getLineChartData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: '#333',
                    font: { weight: 'bold' },
                    formatter: (value) => `${(value * 100000000).toLocaleString()}원`
                  },
                  tooltip: {
                    position: 'nearest',
                   
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    bodySpacing: 6,
                    displayColors: false,
                    callbacks: {
                       label: (ctx) => `전세 평균가: ${(ctx.raw * 100000000).toLocaleString()}원`
                     
                    }
                  },
                  legend: { position: 'top' }
                },
                elements: {
                  point: {
                    radius: 6,
                    borderWidth: 2,
                    backgroundColor: '#1890ff',
                    borderColor: '#005cbf',
                    hoverRadius: 8
                  }
                },
                scales: {
                  x: {
                    offset: true,
                    ticks: { align: 'center' }
                  },
                  y: {
                    ...getYAxisRange(getLineChartData().datasets[0].data),
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: '전세가 (억 원)'
                    },
                    ticks: {
                      stepSize: 0.05,
                      callback: (value) => value.toFixed(2) + '억'
                    }
                  }
                }
              }}
              />
          </div>
          {/* 단일 데이터 안내 */}
          {getLineChartData().labels.length === 1 && (
          <p className="single-data-note">
            ※ 단일 거래 데이터입니다. 추이를 보기 위해 y축이 조정되었습니다.
          </p>
          )}




        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MyUploads;
