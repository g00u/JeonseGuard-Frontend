import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css';
import { FaFileAlt, FaBullhorn, FaUser, FaCommentDots } from 'react-icons/fa';

const MyPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="mypage-wrapper">
      {user ? (
        <>
          {/* 상단 유저 정보 */}
          <div className="profile-box" onClick={() => setShowLogout(!showLogout)}>
            <FaUser className="profile-icon" />
            <div className="profile-text">
              <p className="name">{user.name || user.nickname || '이름 없음'}</p> {/* user.name로 가져옴 */}
              <p className="email">{user.email || '이메일 없음'}</p>
            </div>
            <button className="logout-btn">▼</button>
          </div>
  
          {showLogout && (
            <div className="logout-section">
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
  
          {/* 기능 섹션 */}
          <div className="section-list">
            <div className="section-card"> 
              <FaFileAlt className="section-icon" /> 
              업로드한 문서
            </div>
            <div className="section-card"> 
              <FaBullhorn className="section-icon" />
              신고한 게시물
            </div>
            <div className="section-card"> 
              <FaCommentDots className="section-icon" />
              작성한 글 / 댓글
            </div>
          </div>
        </>
      ) : (
        <div className="mypage-login-block">
          <p>로그인이 필요합니다.</p>
          <button onClick={() => navigate('/login')}>로그인하기</button>
        </div>
      )}
    </div>
  );
  
};

export default MyPage;
