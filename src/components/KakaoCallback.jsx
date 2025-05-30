import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 
  const code = searchParams.get('code');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (code) {
      console.log('카카오에서 받은 code:', code);
      axios.post(`${API_URL}/auth/login`, { code })
        .then((res) => {
          console.log('백엔드 응답:', res.data);
          const { accessToken, refreshToken } = res.data;

          // 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // 유저 정보 가져오기
          axios.get(`${API_URL}/user/info`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          .then(userRes => {
            console.log('유저 정보:', userRes.data);
            setUser(userRes.data);
            navigate('/mypage');
          })
          .catch(err => {
            console.error('유저 정보 가져오기 실패:', err);
            navigate('/login');
          });
        })
        .catch((err) => {
          console.error('카카오 로그인 실패:', err);
          navigate('/login');
        });
    }
  }, [code, API_URL, navigate, setUser]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
