import React from 'react';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {

  const kakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API; //카카오  API 키
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI; //카카오 리다이렉트 URI

    console.log("REDIRECT URI:", REDIRECT_URI);

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
    window.location.href = kakaoURL;
    
  };

  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <button onClick={kakaoLogin} className={styles.button}>
        카카오로 로그인
      </button>
    </div>
  );
};

export default LoginPage;