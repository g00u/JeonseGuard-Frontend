import React from 'react';
import exampleLogo from '../assets/logo192.png'

const Home = () => {
    return (
        <div>
            <h1>홈 화면 페이지입니다. </h1>
            <img src={exampleLogo} alt="테스트 이미지" />
        </div>
    );
};

export default Home;