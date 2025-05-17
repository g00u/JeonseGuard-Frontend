// src/components/KakaoCallback.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; // navigate 가져오기
import { useUser } from '../context/UserContext'; //  setUser 가져오기

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 
  const code = searchParams.get('code'); // URL에서 ?code=... 추출 
  const API_URL = process.env.REACT_APP_API_URL; // 백엔드 API URL

  useEffect(() => {
    if (code) {
      console.log('카카오에서 받은 code:', code);
      axios.post(`${API_URL}/api/v5/auth/kakao`, { code })
        .then((res) => {
          console.log(' 백엔드 응답:', res.data); // 구조 확인용
          const { accessToken, refreshToken, user } = res.data;

          // 토큰과 사용자 정보 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);

          navigate('/mypage'); // 로그인 성공 시 마이페이지로 이동
        })
        .catch((err) => {
          console.error('카카오 로그인 실패:', err);
          navigate('/login'); //실패 시 다시 로그인인
        });
    }
  }, [code, API_URL, navigate, setUser]);

  return <div>카카오 로그인 처리 중...(임시) </div>;
};

export default KakaoCallback;
