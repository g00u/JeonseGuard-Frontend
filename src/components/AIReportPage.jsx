
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/AIReportPage.css';
const BASE_URL = process.env.REACT_APP_AI_API_URL;

function AIReportPage() {
  const location = useLocation();
  const { name } = useParams();
  const [data, setData] = useState(null);

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
    </div>
  );
}

export default AIReportPage;
