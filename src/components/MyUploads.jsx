import React, { useEffect, useState } from 'react';
import '../styles/MyUploads.css';

const MyUploads = () => {
const [nearbyData, setNearbyData] = useState([]);

useEffect(() => {
  fetch('https://jeonseguard.duckdns.org/api/region-jeonse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: '서울특별시 종로구 종로1가',
      bun: '12',
      ji: '34',
      dongName: '101동',
      floorName: '3층',
      hoName: '301호'
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log('근처 전세 데이터:', data);
      setNearbyData(data);
    })
    .catch(err => console.error('API 오류:', err));
}, []);



  return (
    <div className="mypage-subpage">
      <h2>🏘️ 근처 전세 보기 </h2>

      {nearbyData.length > 0 ? (
        nearbyData.map((item, index) => {
          const rate = ((item.jeonsePrice / item.salePrice) * 100).toFixed(1);
          const isDanger = rate >= 70;

          return (
            <div className="upload-card" key={index}>
              <p><strong>주소:</strong> {item.address}</p>
              <p>
                <strong>전세가율:</strong>{' '}
                <span className={isDanger ? 'rate-danger' : 'rate-normal'}>
                  {rate}%
                </span>
              </p>
              <p><strong>매매가:</strong> {item.salePrice.toLocaleString()} 원</p>
              <p><strong>전세가:</strong> {item.jeonsePrice.toLocaleString()} 원</p>
            </div>
          );
        })
      ) : (
        <p>📭 근처 전세 데이터를 불러오는 중이거나 없습니다.</p>
      )}
    </div>
  );
};

export default MyUploads;
