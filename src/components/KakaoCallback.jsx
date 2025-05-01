// src/components/KakaoCallback.jsx
import React, { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom'; // navigate 가져오기
import { useUser } from '../context/UserContext'; //  setUser 가져오기

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 
  const code = searchParams.get('code'); // URL에서 ?code=... 추출
  
  // const API_URL = process.env.REACT_APP_API_URL; // 백엔드 API URL

  useEffect(() => {
    if (code) {
      if (code) {
        //  임시 user 생성
        const fakeUser = {
          name: '이고은',
          email: 'goeun@example.com',
        };
  
        const fakeToken = 'temporary-token-for-testing';
  
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        setUser(fakeUser);
  
        console.log(' 임시 로그인 완료');
        navigate('/mypage');
        }
      }
    }, [code, navigate, setUser]);
      /*
      // 백엔드에 code POST 요청
      axios.post(`${API_URL}/api/auth/kakao`, { code })
        .then((res) => {
          console.log(' 로그인 성공:', res.data);

          const { token, user} = res.data; // 응답에서 토큰과 사용자 정보 추출
          localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장 
          localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보 저장\
          setUser(user);// 로그인 상태 저장

          console.log('Redirecting to /mypage...'); //  이 로그 찍히는지 확인
          navigate('/mypage'); // 작동 안하면 여기에 문제

          // 예: 토큰 저장 또는 메인 화면으로 이동 등
        })
        .catch((err) => {
          console.error(' 로그인 실패:', err);
          navigate('/login'); // 로그인 실패 시 로그인 페이지로 이동
        });
    }
  }, [code, API_URL, navigate, setUser]); */

  return <div>카카오 로그인 처리 중...(임시) </div>;
};

export default KakaoCallback;
