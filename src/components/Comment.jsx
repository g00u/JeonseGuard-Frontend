// src/components/Comment.jsx
import React, { useEffect, useState } from 'react';
import commentService from '../services/BoardService';
import { useUser } from '../context/UserContext';
import '../styles/BoardPage.css';

const Comment = ({ postId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
//   const token = localStorage.getItem('accessToken');



  // 댓글 불러오기
  useEffect(() => {
    commentService.getComments(postId)
      .then(response => {
        setComments(response.data.comments[1]);
        console.log('댓글 불러오기 성공:', response.data.comments[1]);
    })
      .catch(error => console.error('댓글 불러오기 실패:', error));
  }, [postId]);

  // 댓글 작성
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    commentService.addComment({ postId: postId, content: newComment })
      .then((response) => {
        console.log('댓글 작성:', { postId: postId, content: newComment });
        setComments([...comments, 
            response.data]); // 새로운 댓글 추가
        setNewComment('');
      })
      .catch(error => console.error('댓글 작성 실패:', error));
  };

  return (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">댓글</h3>

    {/* 로그인한 사용자만 댓글 작성 폼 표시 */}
    {user && (
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border rounded p-2 board-search-input"
          rows="3"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          댓글 작성
        </button>
      </form>
    )}

    {/* 댓글 목록 */}
    {comments.map((comment) => (
      <div key={comment.commentId} className="border-t py-2">
        <p className="text-sm text-gray-700">
          <strong>{comment.creator}</strong>
        </p>
        <p>{comment.content}</p>
      </div>
    ))}
  </div>
);
}

export default Comment;
