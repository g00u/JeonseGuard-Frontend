import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoardDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v5/board/posts/${postId}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error('게시글 조회 실패:', err));
  }, [postId]);

  if (!post) return <p className="p-4">게시글을 불러오는 중...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-600">작성자: {post.author}</p>
      <div className="mt-4 whitespace-pre-wrap">{post.content}</div>
    </div>
  );
};

export default BoardDetailPage;
