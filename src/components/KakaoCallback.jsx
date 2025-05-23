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
  console.log("Redirect URI:", process.env.REACT_APP_KAKAO_REDIRECT_URI);
  console.log(' KakaoCallback 컴포넌트 로드됨');
  console.log(' 전달받은 code:', code)

  useEffect(() => {
    console.log(' useEffect 실행됨');
    if (code) {
      console.log('카카오에서 받은 code:', code);
      axios.post(`${API_URL}/auth/login`, { code })
        .then((res) => {
          console.log('백엔드 응답:', res.data);
          const { accessToken, refreshToken } = res.data;

          // 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          console.log(' accessToken 저장됨:', localStorage.getItem('accessToken'));

          // 유저 정보 가져오기
          axios.get(`${API_URL}/user/info`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          .then(userRes => {
            console.log('유저 정보:', userRes.data);
            setUser(userRes.data);
            console.log('마이페이지 이동동')
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

  return <div>카카오 로그인 처리 중...(임시)</div>;
};

export default KakaoCallback;
