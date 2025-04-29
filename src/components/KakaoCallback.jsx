// src/components/KakaoCallback.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code'); // URL에서 ?code=... 추출
  const API_URL = process.env.REACT_APP_API_URL; // 백엔드 API URL

  useEffect(() => {
    if (code) {
      // 백엔드에 code POST 요청
      axios.post(`${API_URL}/api/auth/kakao`, { code })
        .then((res) => {
          console.log(' 로그인 성공:', res.data);
          // 예: 토큰 저장 또는 메인 화면으로 이동 등
        })
        .catch((err) => {
          console.error(' 로그인 실패:', err);
        });
    }
  }, [code, API_URL]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
