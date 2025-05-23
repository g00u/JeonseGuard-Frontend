import React, { useState } from 'react';
import '../styles/MyUploads.css';

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

    const requestBody = {
      address,
      bun,
    };
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
        // 이중 배열 응답 처리: 실제 데이터는 [1] 번째 배열
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

  return (
    <div className="mypage-subpage">
      <h2> 실거래가 직접 조회</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="주소 (예: 경상북도 포항시 남구 오천읍 원리)"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="번 (예: 892)"
          value={bun}
          onChange={e => setBun(e.target.value)}
        />
        <input
          type="text"
          placeholder="지 (없으면 0으로 입력)"
          value={ji}
          onChange={e => setJi(e.target.value)}
        />
        <input
          type="text"
          placeholder="층수 "
          value={floorNumber}
          onChange={e => setFloorNumber(e.target.value)}
        />
        <select value={typeCode} onChange={e => setTypeCode(Number(e.target.value))}>
          <option value={0}>아파트</option>
          <option value={1}>오피스텔</option>
          <option value={2}>연립다세대</option>
        </select>
        <button onClick={handleSearch}>조회하기</button>
      </div>

      <hr />

      {loading ? (
        <p> 실거래가 불러오는 중...</p>
      ) : transactionHistory.length > 0 ? (
        <ul className="transaction-list">
          {transactionHistory.map((item, idx) => (
            <li key={idx} className="upload-card">
              <p><strong>계약일:</strong> {item.contractYearMonth}</p>
              <p><strong>가격:</strong> {formatPrice(item.price)}</p>
              <p><strong>유형:</strong> {item.housingType} / {item.rentType}</p>              
            </li>
          ))}
        </ul>
      ) : (
        <p> 결과가 없습니다. 주소/번 정보를 다시 확인해주세요.</p>
      )}
    </div>
  );
};

export default MyUploads;

// 면적 추가
// 