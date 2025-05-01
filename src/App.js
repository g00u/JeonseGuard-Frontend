import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import UploadPage from './components/UploadPage';
import BoardPage from './components/BoardPage';
import ReportPage from './components/ReportPage';
import Login from './components/Login';
import KakaoCallback from './components/KakaoCallback';
import MyPage from './components/MyPage';
import Layout from './components/Layout';
import SearchResultPage from './components/SearchResultPage';

import {UserProvider} from './context/UserContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  return (
    <UserProvider>{/* */}
    <div className="app-container">
      <header className="app-header">
        <h1 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' , color: '#003cff' }}
        >
          전세가드
        </h1>
      </header>
      <main className="app-main">
        <Routes>
          {/* Layout이 공통 레이아웃을 감싸도록 설정 */}
          <Route >
            <Route path="/" element={<MainPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/analysis" element={<ReportPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchResultPage />} />
          </Route>         
          
          {/* 개별 페이지 라우트 설정 */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/auth/callback/kakao" element={<KakaoCallback />} />
        </Routes>
      </main>
      
      <footer style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <p>© 2025 전세가드. </p>
      </footer>
      <Layout/>
    </div>
    
    </UserProvider>

  );

}

export default App;
