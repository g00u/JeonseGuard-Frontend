import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardService from '../services/BoardService';
import BoardForm from '../components/BoardForm';

const BoardEditPage = () => {
  const { category, postId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    boardService.getPostDetail(postId).then(response => {
      setInitialData(response.data);
    });
  }, [postId]);

  const handleSubmit = async ({ title, content }) => {
    await boardService.updateBoard(postId, { title, content });
    navigate(`/${postId}`);
  };

  if (!initialData) return <div>로딩 중...</div>;

  return <BoardForm initialData={initialData} onSubmit={handleSubmit} />;
};

export default BoardEditPage;
