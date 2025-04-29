import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import UploadPage from './components/UploadPage';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';

import Login from './components/Login';
import KakaoCallback from './components/KakaoCallback';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/mypage" element={<MyPage />} />
      
      <Route path="/" element={<Login />} />
      <Route path="/auth/callback/kakao" element={<KakaoCallback />} />
      
    </Routes>
  );
}

export default App;
