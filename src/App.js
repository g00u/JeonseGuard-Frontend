import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import UploadPage from './components/UploadPage';
import BoardPage from './components/BoardPage';
import ReportPage from './components/ReportPage';
import Login from './components/Login';
import MyPage from './components/MyPage';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>전세가드</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/analysis" element={<ReportPage/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© 2025 전세가드. </p>
      </footer>
    </div>
  );

}

export default App;
