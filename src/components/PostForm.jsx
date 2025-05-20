// 게시글 폼
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = ({ onPostSuccess, editingPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!user || !token) return alert("로그인 후 이용하세요");

    const postData = {
      title,
      content,
      author: user.name, // 작성자 자동 입력
    };

    try {
      if (editingPost) {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, postData, {
        headers: { Authorization: `Bearer ${token}` }
    });

      } else {
        await axios.post(`${API_URL}/api/posts`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      onPostSuccess(); // 글 작성 또는 수정 후 목록 리로드
      setTitle('');
      setContent('');
    } catch (err) {
      alert('오류 발생: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {editingPost ? '글 수정하기' : '새 글 작성'}
      </h3>
      <input
        className="border p-2 w-full mb-2"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
      />
      <div className="text-right text-sm text-gray-500 mb-2">
        작성자: {user?.name}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingPost ? '수정 완료' : '작성'}
      </button>
    </form>
  );
};

export default PostForm;
