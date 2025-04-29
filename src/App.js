import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import UploadPage from './components/UploadPage';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
