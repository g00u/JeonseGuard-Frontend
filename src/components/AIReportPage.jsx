
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/AIReportPage.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


const BASE_URL = process.env.REACT_APP_AI_API_URL;
const TRANSACTION_API_URL = process.env.REACT_APP_API_URL;

function AIReportPage() {
  const location = useLocation();
  const { name } = useParams();
  const [data, setData] = useState(null);

  const downloadAsPDF = () => {
  const target = document.querySelector('.report-container');
  html2canvas(target).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('AI_분석_결과.pdf');
  });
};

const downloadAsImage = () => {
  const target = document.querySelector('.report-container');
  html2canvas(target).then(canvas => {
    const link = document.createElement('a');
    link.download = 'AI_분석_결과.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};

  // 실거래가 관련 상태
  const [jeonseData, setJeonseData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [rateData, setRateData] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [detectedType, setDetectedType] = useState(null);


  // 페이지 진입 시 AI 분석 결과 세팅
  useEffect(() => {
    const stateData = location.state;
    const sessionData = sessionStorage.getItem("aiReportData");

    if (stateData) {
      setData(stateData);
    } else if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        setData(parsed);
      } catch (e) {
        console.error("세션 파싱 실패:", e);
      }
    } else {
      //  새로고침 시 백엔드에서 재요청
      const fetchData = async () => {
        try {
          const res1 = await fetch(`${BASE_URL}/get_part_1_json`, {
            method: 'POST',
            body: new URLSearchParams({ name })
          });
          const res2 = await fetch(`${BASE_URL}/get_part_2_json`, {
            method: 'POST',
            body: new URLSearchParams({ name })
          });
          const res3 = await fetch(`${BASE_URL}/get_part_3_json`, {
            method: 'POST',
            body: new URLSearchParams({ name })
          });

          const part1 = await res1.json();
          const part2 = await res2.json();
          const part3 = await res3.json();

          const final = { filename: name, part1, part2, part3 };
          setData(final);
        } catch (err) {
          console.error("서버에서 데이터 다시 불러오기 실패:", err);
        }
      };

      fetchData();
    }
  }, [location.state, name]);

  // 실거래가 자동 조회
    useEffect(() => {
    if (data?.part1) {
      const info = {
        address: data.part1.address,
        bun: data.part1.bun,
        ji: data.part1.ji || '0',
        floorNumber: data.part1.floorName?.replace(/[^0-9]/g, ''),
        area: data.part1.exclArea
      };
      setLoadingPrice(true);
      fetchPriceData(info).then(() => setLoadingPrice(false));
    }
  }, [data]);

  // 실거래가 API 3종류(Apartment, Officetel, Rowhouse) 요청
  const fetchPriceData = async (info) => {
    const types = [
      { code: 0, name: 'apartment' },
      { code: 1, name: 'officetel' },
      { code: 2, name: 'rowhouse' }
    ];

    for (let t of types) {
      try {
        const res = await fetch(`${TRANSACTION_API_URL}/transaction/summary/${t.name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info)
        });
        const json = await res.json();
        const jeonse = Array.isArray(json.jeonses) ? json.jeonses[1] : [];
        const sale = Array.isArray(json.sales) ? json.sales[1] : [];

      //  전세 또는 매매 데이터가 하나라도 있으면 해당 타입 채택
      if (jeonse.length > 0 || sale.length > 0) {
        setJeonseData(jeonse);
        setSaleData(sale);
        setRateData(calculateRates(jeonse, sale));
        setDetectedType(t.name); 
        console.log(` 주택유형 '${t.name}' 타입 사용됨`);
        return; 
        }
      } catch (e) {
        console.error(`${t.name} 실거래가 조회 실패:`, e);
      }
    }
      // 세 가지 모두 실패 시
  setJeonseData([]);
  setSaleData([]);
  setRateData([]);
  console.warn('❗ 모든 주택유형에서 실거래가 데이터를 찾을 수 없습니다.');
  };

  // 전세가율 계산 함수
  const calculateRates = (jeonseList, saleList) => {
    const grouped = {};

    jeonseList.forEach(item => {
      const key = item.contractYearMonth?.slice(0, 6);
      const price = Number(item.price?.replace(/,/g, '')) / 100000000;
      if (!grouped[key]) grouped[key] = { jeonse: [], sale: [] };
      if (!isNaN(price)) grouped[key].jeonse.push(price);
    });

    saleList.forEach(item => {
      const key = item.contractYearMonth?.slice(0, 6);
      const price = Number(item.price?.replace(/,/g, '')) / 100000000;
      if (!grouped[key]) grouped[key] = { jeonse: [], sale: [] };
      if (!isNaN(price)) grouped[key].sale.push(price);
    });

    return Object.entries(grouped).map(([month, { jeonse, sale }]) => {
      const avgJ = jeonse.length ? jeonse.reduce((a, b) => a + b, 0) / jeonse.length : 0;
      const avgS = sale.length ? sale.reduce((a, b) => a + b, 0) / sale.length : 0;
      const rate = avgS > 0 ? ((avgJ / avgS) * 100).toFixed(2) : null;
      return {
        month: `${month.slice(0,4)}.${month.slice(4)}`,
        avgJeonse: avgJ.toFixed(2),
        avgSale: avgS.toFixed(2),
        rate
      };
    }).filter(Boolean);
  };

    //전세가 포맷
  const formatPrice = (value) => {
    if (!value || typeof value !== 'string') return '가격 정보 없음';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
  };


  // 전세가율 차트 데이터 생성
  const getRateChartData = () => {
    const labels = rateData.map(item => item.month);
    const values = rateData.map(item => Number(item.rate));

    return {
      labels,
      datasets: [
        {
          label: '전세가율 (%)',
          data: values,
          borderColor: '#2c7be5',
          backgroundColor: 'rgba(44,123,229,0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: values.map(v => v >= 70 ? '#e03131' : '#2c7be5')
        }
      ]
    };
  };




  if (!data || !data.part1) {
    return <p> 분석 결과를 불러올 수 없습니다. 이미지 업로드 후 다시 시도해주세요.</p>;
  }
  return (
    <div className="report-container">
      <h2 className="report-title">AI 계약서 분석 결과</h2>

      {/* Part 1 */}
      <div className="report-section">
        <h3>부동산 정보</h3>
        <div className="info-box">
          <p><strong>주소:</strong> {data.part1.address} {data.part1.dongName} {data.part1.hoName}</p>
          <p><strong>구조/용도:</strong> {data.part1.structUse}</p>
          <p><strong>보증금:</strong> {data.part1.deposit}원</p>
          <p><strong>계약금:</strong> {data.part1.downPayment}원</p>
          <p><strong>중도금:</strong> {data.part1.interimPayment}원 ({data.part1.interimDate})</p>
          <p><strong>잔금일자:</strong> {data.part1.balanceDate}</p>
          <p><strong>전용면적:</strong> {data.part1.exclArea}㎡</p>
        </div>
      </div>

      {/* Part 2 */}
      <div className="report-section">
        <h3>임대차 정보</h3>
        <div className="info-box">
        <p><strong>임대인:</strong> {data.part2.lessorName} ({data.part2.lessorPhone})</p>
        <p><strong>임차인:</strong> {data.part2.lesseeName} ({data.part2.lesseePhone})</p>
        </div>
      </div>

      {/* Part 3 */}
      <div className="report-section">
        <h3>AI 특약 분석</h3>
        <div className="info-box">
        <p className="risk-box">
          ⚠️위험 조항: {data.part3.clausesResponse}
        </p>
        <p><strong>특약사항 요약:</strong><br /> {data.part3.scResponse}</p>
        </div>      
      </div>


      {/* 실거래가 정보 */}
       <div className="report-section">
        <h3>실거래가 분석 결과</h3>
        {loadingPrice ? (
          <p>실거래가 불러오는 중...</p>
        ) : jeonseData.length === 0 ? (
          <p>※ 전세 실거래 데이터가 없습니다.</p>
        ) : (
          <>
            <h4>전세가율 요약</h4>
            {detectedType && (
            <p className="detected-type">
               감지된 주택 유형:{" "}
              <strong>
                {{
                  apartment: "아파트",
                  officetel: "오피스텔",
                  rowhouse: "연립다세대"
                }[detectedType]}
              </strong>
            </p>
          )}

          {!loadingPrice && !detectedType && (
            <p className="error-msg">❗ 실거래가 데이터를 찾을 수 없거나, 감지된 주택유형이 없습니다.</p>
          )}

            <ul className="rate-summary-list">
              {rateData.map((item, idx) => {
                const rateNum = Number(item.rate);
                let tooltipText = '전세가율 정보 없음';
                
                if (rateNum >= 70) tooltipText = '⚠️ 전세가율 높음: 보증금 반환 위험 주의';
                else if (rateNum >= 40) tooltipText = '전세가율 적정 수준';
                else tooltipText = '전세가율 낮음: 임대차 불안정 가능';

                return (
                  <li key={idx} className={`rate-card ${rateNum >= 70 ? 'rate-risk' : ''}`}>
                    <div className="rate-month">{item.month}</div>
                    <div className="rate-content">
                      <p>
                        전세가율:{" "}
                        <span className="rate-value" title={tooltipText}>
                          {item.rate}%
                        </span>
                      </p>
                      <p> 전세 {item.avgJeonse}억 / 매매 {item.avgSale}억</p>
                    </div>
                  </li>
                );
              })}
            </ul>
                      
          {rateData.length > 0 && (
            <>
              <h4> 전세가율 변화 추이</h4>
              <div className="chart-box">
                <Line
                  data={getRateChartData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          stepSize: 10,
                          callback: (val) => `${val}%`
                        },
                        title: {
                          display: true,
                          text: '전세가율 (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: '계약월'
                        },
                        ticks: {
                          maxRotation: 0,
                          minRotation: 0
                        }
                      }
                    },
                    plugins: {
                      datalabels: {
                        anchor: 'end',
                        align: 'top',
                        offset: 4,
                        color: '#333',
                        font: { size: 12, weight: 'bold' },
                        formatter: (value) => `${value}%`
                      },
                      tooltip: {
                        callbacks: {
                          label: function (ctx) {
                            const rate = ctx.parsed.y;
                            const label = ctx.label;
                            const match = rateData.find(r => r.month === label);
                            if (match) {
                              return [
                                `전세가율: ${rate}%`,
                                `전세: ${match.avgJeonse}억`,
                                `매매: ${match.avgSale}억`
                              ];
                            }
                            return `전세가율: ${rate}%`;
                          }
                        }
                      },
                      legend: {
                        position: 'top'
                      }
                    }
                  }}
                />
              </div>
              {rateData.length === 0 && !loadingPrice && (
                <p className="error-msg">※ 전세가율 분석 가능한 데이터가 없습니다.</p>
              )}

            </>
          )}

          </>
        )}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button className="save-btn" onClick={downloadAsPDF}> 결과 PDF 저장</button>
        <button className="save-btn" onClick={downloadAsImage}> 이미지로 저장</button>
      </div>


        <div className="manual-check-box">
          <p>❗ OCR로 추출한 주소/면적 정보가 실제와 다를 수 있습니다.</p>
          <p>정확한 정보를 입력해 <strong>직접 실거래가를 조회</strong>해보세요.</p>
          <button
            className="manual-check-btn"
            onClick={() => window.location.href = "/mypage/uploads"}
          >
            실거래가 직접 조회하러 가기
          </button>
        </div>
      


    </div>
  );
}

export default AIReportPage;
