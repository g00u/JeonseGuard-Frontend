import React, {useState } from 'react';
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
  const [area, setArea] = useState('');

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const base = process.env.REACT_APP_API_URL;
    let apiUrl = '';
    if (typeCode === 0) apiUrl = `${base}/transaction/jeonse/apartment`;
    else if (typeCode === 1) apiUrl = `${base}/transaction/jeonse/officetel`;
    else if (typeCode === 2) apiUrl = `${base}/transaction/jeonse/rowhouse`;

    if (!address.trim() || !bun.trim() || !ji.trim() || !floorNumber.trim() || !area.trim()) {
      alert('주소, 번, 지, 층수, 면적을 모두 입력해야 합니다.');
      return;
    }

    const requestBody = { address, bun };
    if (ji.trim() !== '') requestBody.ji = ji;
    if (floorNumber.trim() !== '') requestBody.floorNumber = floorNumber;
    if (area.trim() !== '') requestBody.area = area;


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

const getYAxisRange = (dataArr) => {
if (dataArr.length === 1) {
  const val = Number(dataArr[0]);
  return { min: val - 0.05, max: val + 0.05 };
}
return {}; // 기본 자동 스케일링
};

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
        label: '평균 전세가 (억 원)',
        data: average,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0,
        fill: false,
        pointRadius: 5,
      }
    ]
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
        <input type="text" placeholder="면적 (㎡)" value={area} onChange={e => setArea(e.target.value)} />

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

              {getPriceStats() && (
                <div className="summary-box">
                  <p><strong>거래 건수:</strong> {getPriceStats().count}건</p>
                  <p><strong>평균 전세가:</strong> {getPriceStats().average}억</p>
                  <p><strong>최고 전세가:</strong> {getPriceStats().max}억</p>
                  <p><strong>최저 전세가:</strong> {getPriceStats().min}억</p>
                </div>
              )}

              {getLineChartData().labels.length === 1 && (
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '12px' }}>
                ※ 단일 거래 데이터입니다. 추이를 보기 위해 y축이 조정되었습니다.
              </p>
            )}


            <div className="chart-wrapper">
              <h3>월별 평균 전세가 추이</h3>
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
                        font: {
                          weight: 'bold'
                        },
                        formatter: (value) => `${(value * 100000000).toLocaleString()}원`
                      },
                      tooltip: {
                        position: 'customAbove',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 10,
                        bodySpacing: 6,
                        displayColors: false,
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${(ctx.raw * 100000000).toLocaleString()}원`
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
                        hoverRadius: 8,
                      }
                    },
                    scales: {
                      x: {
                        offset: true,
                        ticks: {
                          align: 'center'
                        }
                      },
                    y: {
                      ...getYAxisRange(getLineChartData().datasets[0].data),
                      title: {
                        display: true,
                        text: '전세가 (억 원)'
                      },
                      ticks: {
                        callback: (value) => value.toFixed(2) + '억'
                      }
                    }
                  }
                }}
              />

            </div>
          </>
        ) : (
          <p></p>
        )}
    </div>
  );
};

export default MyUploads;
