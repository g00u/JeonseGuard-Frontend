import React from 'react';
// import { Posts } from '../data/boardData'; // 실제 데이터 가져올 경우
import { dummyPosts } from '../data/dummyPosts'; // 테스트 데이터
import '../styles/BoardPage.css';
import { useNavigate } from 'react-router-dom';


function BoardPage() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/board/${id}`);
  };

  const handleWrite = () => {
    const isLoggedIn = localStorage.getItem('token'); // 로그인 시 저장된 토큰 등
  
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 보내기
      return;
    }
  
    navigate('/board/write');
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <h2 className="board-title">게시판</h2>
        <button className="write-button" onClick={handleWrite}>글 작성</button>
      </div>
      <div className="post-list">
        {dummyPosts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => handleClick(post.id)}>
            <h3>{post.title}</h3>
            <div className="post-meta">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
