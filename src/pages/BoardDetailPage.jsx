import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardService from '../services/BoardService';

const BoardDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Fetching post with ID: ${postId}`);
    boardService.getBoardDetail(postId)
      .then(response => {
        console.log(' 응답 내용:', response);  
        setPost(response.data);
      })
      .catch(error => {
        console.error(' API 호출 실패:', error); 
      });
  }, [postId]);


  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">작성자: {post.creator}</p>
      <p className="mb-6">{post.content}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate(`/${postId}/edit`)}
      >
        수정
      </button>
    </div>
  );
};

export default BoardDetailPage;
