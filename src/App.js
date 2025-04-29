import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import UploadPage from './components/UploadPage';
import BoardPage from './components/BoardPage';
import ReportPage from './components/ReportPage';
import Login from './components/Login';
import KakaoCallback from './components/KakaoCallback';
import MyPage from './components/MyPage';


function App() {
  return (
    <div className="app-container">
      <header className="App-header">
        <h1 style={{ color: '#003cff' }}>전세가드</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/analysis" element={<ReportPage/>} />
          
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/auth/callback/kakao" element={<KakaoCallback />} />
        </Routes>
      </main>
      <footer style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <p>© 2025 전세가드. </p>
      </footer>
    </div>

  );

}

export default App;
