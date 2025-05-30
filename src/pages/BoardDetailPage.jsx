import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardService from '../services/BoardService';

const BoardDetailPage = () => {
  const { category, postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    boardService.getPostDetail(postId).then(response => {
      setPost(response.data);
    });
  }, [postId]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">작성자: {post.author}</p>
      <p className="mb-6">{post.content}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate(`/${category}/${postId}/edit`)}
      >
        수정
      </button>
    </div>
  );
};

export default BoardDetailPage;
