import React, { useState } from 'react';
import '../styles/WritePage.css';

function WritePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, author, content });
    alert('글이 작성되었습니다!');
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

        <label>작성자</label>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

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
