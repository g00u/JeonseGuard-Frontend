import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function ReportPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('../data/dummyResult.json')  // public 폴더 기준 경로
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
  }, []);

  return (
    <div style={styles.container}>
      <h2>분석 결과</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : message ? (
        <>
          <p><strong>주소:</strong> {message.address}</p>
          <p><strong>건물 유형:</strong> {message.buildingType}</p>
          <p><strong>층수:</strong> {message.floor}</p>
        </>
      ) : (
        <p>결과를 불러오지 못했습니다.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd',
  },
  message: {
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  },
};

export default ReportPage;
