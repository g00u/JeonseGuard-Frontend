import React from 'react';
import '../styles/MyPosts.css';

const MyPosts = () => {
  const dummyPosts = [
    {
      id: 1,
      type: '게시글',
      content: '이 건물 전세가율 너무 높아요. 주의하세요!',
      date: '2025-05-01',
    },
    {
      id: 2,
      type: '댓글',
      content: '좋은 정보 감사합니다.',
      date: '2025-05-02',
    },
  ];

  return (
    <div className="mypage-subpage">
      <h2>💬 내 게시글 및 댓글 보기</h2>
      {dummyPosts.map(post => (
        <div className="post-card" key={post.id}>
          <p><strong>유형:</strong> {post.type}</p>
          <p><strong>내용:</strong> {post.content}</p>
          <p><strong>작성일:</strong> {post.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
