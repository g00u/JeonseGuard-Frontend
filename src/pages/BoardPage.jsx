import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 불러오기 실패', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`${API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      alert('삭제 실패: ' + err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 게시판</h2>

      {user && (
        <PostForm
          onPostSuccess={fetchPosts}
          editingPost={editingPost}
        />
      )}

      {!user && (
        <div className="text-center text-gray-600 mb-4">
          로그인 후 글 작성이 가능합니다.
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              작성자: {post.author}
            </div>
            {user?.name === post.author && (
              <div className="mt-2 space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setEditingPost(post)}
                >
                  수정
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
