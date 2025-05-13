import React from 'react';
import { useParams } from 'react-router-dom';
// import { Posts } from '../data/boardData'; // 실제 데이터 가져올 경우
import { useState, useEffect } from 'react';

function BoardDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);


useEffect(() => {
  fetch('/data/dummyPosts.json')
    .then((res) => res.json())
    .then((data) => {
      const found = data.find((p) => p.id === parseInt(id));
      setPost(found);
    })
    .catch((err) => console.error('게시글 로딩 실패:', err));
}, [id]);

  if (!post) return <p>해당 게시글을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: '20px' }}>
        <h2 className="">게시글 디테일 페이지</h2>
        <h2>{post.title}</h2>
        <p>작성자: {post.author} | 날짜: {post.date}</p>
        <hr />
        <p>{post.content}</p>
    </div>
  );
}

export default BoardDetailPage;
