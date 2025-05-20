import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const BoardWritePage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const data = { title, content};

    // axios.post(`${process.env.REACT_APP_API_URL}/api/v5/board/${category}/posts`, data, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    // .then(() => {
    //   alert('게시글 작성 완료');
    //   navigate(`/board/${category}`);
    // })
    // .catch((err) => {
    //   console.error('게시글 작성 실패:', err);
    //   alert('작성 실패');
    // });

        // 테스트용: 인증 헤더 없이 전송
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v5/board/${category}/posts`, data)
      .then(() => {
        alert('게시글 작성 완료');
        navigate(`/board/${category}`);
      })
      .catch((err) => {
        console.error('게시글 작성 실패:', err);
        alert('작성 실패');
      });
  };

//   if (!user) return <p className="p-4">로그인이 필요합니다.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">[ {category} ] 글 작성</h2>
        <p className="text-sm text-gray-600 mb-2">작성자: </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          작성하기
        </button>
      </form>
    </div>
  );
};

export default BoardWritePage;
