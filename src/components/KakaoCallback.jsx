import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL; 
//빌드 시점에만 정의되기 때문에 불필요한 리렌더링 또는 경고 방지 위해 이곳에 작성

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 
  const code = searchParams.get('code');
  console.log(' 전달받은 code:', code)

  useEffect(() => {
    // console.log(' useEffect 실행됨');
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
            alert('유저 정보를 가져오는 데 실패했습니다. 다시 로그인해주세요.');
            navigate('/login');
          });
        })
        .catch((err) => {
          console.error('카카오 로그인 실패:', err);
          navigate('/login');
        });
    }
  }, [code, API_URL, navigate, setUser]);

  return <LoadingSpinner text="카카오 로그인 처리 중입니다..." />;
};

export default KakaoCallback;
