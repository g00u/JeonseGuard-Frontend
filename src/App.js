import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";
import { useNavigate } from 'react-router-dom';

import MainPage from './components/MainPage';
import UploadFile from './components/UploadFile';
import RadioPage from './components/RadioPage';
import BoardPage from './components/BoardPage';
import BoardDetailPage from './components/BoardDetailPage';
import WritePage from './components/WritePage';
import ReportPage from './components/ReportPage';
import SearchResultPage from './components/SearchResultPage';

// import KakaoLoginButton from './components/KakaoLoginButton';
import Login from './pages/LoginPage';
import KakaoCallback from './components/KakaoCallback';

import MyPage from './components/MyPage';
import Layout from './components/Layout';
import NewsPage from './components/NewsPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import MyUploads from './components/MyUploads';
import MyPosts from './components/MyPosts';
import MyHistory from './components/MyHistory';



function App() {
  const navigate = useNavigate();
  
  const handleClickTitle = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UserProvider>{/* 사용자 정보를 관리하는 Context */}
    <FormProvider>{/* FormProvider를 사용하여 폼 상태를 관리 */}
    
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={handleClickTitle}className="page-title" >
          <span className="logo-icon">🏠</span> 전세가드
        </h1>
      </header>
      <main className="app-main">
        <Routes>
          {/* Layout이 공통 레이아웃을 감싸도록 설정 */}
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/uploadfile" element={<UploadFile />} />
            <Route path="/uploadform" element={<RadioPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/:id" element={<BoardDetailPage />} />
            <Route path="/board/write" element={<WritePage />} />
            <Route path="/analysis" element={<ReportPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/mypage/uploads" element={<MyUploads />} />
            <Route path="/mypage/posts" element={<MyPosts />} />
            <Route path="/mypage/history" element={<MyHistory />} />
            <Route path="/report/:id" element={<ReportPage />} />

          </Route>         
          
          {/* 개별 페이지 라우트 설정 */}
          <Route path="/login" element={<Login/>}/>
          <Route path="auth/callback/kakao" element={<KakaoCallback />} />
          <Route path="/kakao/callback" element={<KakaoCallback />} />

        </Routes>
      </main>
      
      <footer style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <p>© 2025 전세가드. </p>
      </footer>
      <Layout/>
    </div>
    
    </FormProvider>
    </UserProvider>

  );

}

export default App;
