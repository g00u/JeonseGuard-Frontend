import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.css';
import { FaFileAlt, FaCommentDots, FaInfoCircle, FaUser } from 'react-icons/fa'; 
import BoardService from '../services/BoardService'; 


const MyPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

 
  useEffect(() =>{
   const token = localStorage.getItem('accessToken');
    // console.log('현재 토큰:', token); // 토큰 확인용 로그

    // 1.로그인 안한 사용자 처리리
    if (!token || token === 'null' || token === 'undefined') {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 2.토큰 만료 사용자 처리 
    // checkUserToken에서 받아온 토큰으로 유효한지 확인하는 코드 작성
    BoardService.checkUserToken()
      // .then((res) => { //200 OK
      //   console.log('토큰 유효성 검사 성공:', res.data);
      //     navigate('/board/write');

      // })
      // .catch((err) => { // 401 Unauthorized
      //   console.error('토큰 유효성 검사 실패:', err);
      //   alert('로그인을 다시 해주세요. '); 
      //   navigate('/login'); 
      // });
  }, [navigate]);


  
  // 컴포넌트 return 전에 로딩 처리 (임시)
  if (!user) {
    return <p>로딩 중...</p>;
  }

  
  const handleLogout = () => {

    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/');
  };


  if (!user) return null; // 유저 정보가 없으면 아무것도 렌더링하지 않음

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
            
            <div className="section-card" onClick={() => navigate('/mypage/uploads')}>
              <FaFileAlt className="section-icon" />
              실거래가 조회
            </div>

            <div className="section-card" onClick={() => navigate('/mypage/posts')}>
              <FaCommentDots className="section-icon" />
              내 게시글 및 댓글 보기
            </div>

            <div className="section-card" onClick={() => navigate('/mypage/history')}>
              <FaInfoCircle className="section-icon" />
               JeonseGuard 안내 및 문의하기
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
