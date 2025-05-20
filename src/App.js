import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";
import { useNavigate } from 'react-router-dom';

import MainPage from './components/MainPage';
import UploadFile from './components/UploadFile';
import UploadForm from './components/UploadForm';

import BoardListPage from './pages/BoardListPage';
import BoardWritePage from './pages/BoardWritePage';
import BoardDetailPage from './pages/BoardDetailPage';

import ReportPage from './components/ReportPage';
import SearchResultPage from './components/SearchResultPage';

// import KakaoLoginButton from './components/KakaoLoginButton';
import Login from './pages/LoginPage';
import KakaoCallback from './components/KakaoCallback';

import MyPage from './components/MyPage';
import Layout from './components/Layout';


function App() {
  const navigate = useNavigate();
  
  return (
    <UserProvider>{/* 사용자 정보를 관리하는 Context */}
    <FormProvider>{/* FormProvider를 사용하여 폼 상태를 관리 */}
    
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
            <Route path="/uploadfile" element={<UploadFile />} />
            <Route path="/uploadform" element={<UploadForm />} />


          <Route path="/board" element={<BoardListPage />} />
          <Route path="/board/:category" element={<BoardListPage />} />
          <Route path="/board/:category/write" element={<BoardWritePage />} />
          <Route path="/board/posts/:postId" element={<BoardDetailPage />} />


            <Route path="/analysis" element={<ReportPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchResultPage />} />
          </Route>         
          
          {/* 개별 페이지 라우트 설정 */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/auth/callback/kakao" element={<KakaoCallback />} />
          {/* <Route path="/auth/kakao/callback" element={<KakaoLoginButton />} /> */}
          {/* <Route path="/oauth/kakao/callback" element={<KakaoCallback />} /> */}
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
