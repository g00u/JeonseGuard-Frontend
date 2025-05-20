import React, { useState } from 'react';
import '../styles/WritePage.css';
import { useNavigate } from 'react-router-dom';
//import { useUser } from '../context/UserContext'; //  setUser 가져오기
//import { useEffect } from 'react';

function WritePage() {
 // const user = useUser(); //로그인 상태 확인
  const [title, setTitle] = useState('');
  //const [author, setAuthor] = useState('임시사용자'); 
  const author = '임시사용자'; // 임시로 작성자 이름을 설정
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  /*
  useEffect(() => {
    if (user) {
      setAuthor(user.name); // 로그인한 유저의 이름을 가져옴
      console.log({ user });
    }
    
  }, [user]);
  */ 


  const handleSubmit = (e) => {
    e.preventDefault();

    // 일단 작성된 데이터 확인
    console.log('작성된 글:', { title, author, content });
    
    alert('글이 작성되었습니다!');
    navigate('/board'); //게시판으로 이동
  };

  return (
    <div className="write-form-wrapper">
      <h2 className="form-title">게시글 작성</h2>
      <form className="write-form" onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>작성자:{author}</label>

        <label>내용</label>
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          required
        />

        <button type="submit" className="submit-button">등록하기</button>
      </form>
    </div>
  );
}

export default WritePage;
