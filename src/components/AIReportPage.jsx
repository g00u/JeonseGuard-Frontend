import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AIReportPage() {
  const { name } = useParams();  // 예: '067'
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIResult = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/get_part_3_json?name=${name}`);
        const data = await res.json();
        setAiData(data);
      } catch (err) {
        console.error("AI 분석 결과 요청 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchAIResult();
  }, [name]);

  return (
    <div className="report-container">
      <h2>AI 계약서 분석 결과</h2>

      {loading && <p>로딩 중...</p>}
      {!loading && aiData ? (
        <div className="report-card">
          <p><strong>민법 기반 위험 조항 분석:</strong><br /> {aiData.clausesResponse}</p>
          <p><strong>특약사항 요약:</strong><br /> {aiData.scResponse}</p>
        </div>
      ) : (
        !loading && <p>분석 결과를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}

export default AIReportPage;
