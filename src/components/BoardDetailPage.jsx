import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Posts } from '../data/boardData'; // 실제 데이터 가져올 경우
import { useState, useEffect } from 'react';
import '../styles/BoardDetailPage.css'; 


function BoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/dummyPosts.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setPost(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error('게시글 로딩 실패:', err);
        setLoading(false);
      });
  }, [id]);
 if (loading) return <p className="detail-loading">로딩 중...</p>;
 if (!post) return <p className="detail-error">해당 게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="back-icon">←</span> 뒤로가기
        </button>
      <h2 className="detail-title">{post.title}</h2>
      <div className="detail-meta">
        <span>{post.creator}</span>
        <span>{post.date}</span>
      </div>
      <hr />
      <div className="detail-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default BoardDetailPage;
