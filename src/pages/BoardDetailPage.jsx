import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardService from '../services/BoardService';
import Comment from '../components/Comment';
import '../styles/BoardDetailPage.css';
import { useUser } from '../context/UserContext';
import heartImg from '../assets/heart.png';


const BoardDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0); // 초기값 0으로 설정
  const navigate = useNavigate();
  const { user } = useUser();

  const handleDelete = () => {
  const confirmDelete = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
  if (!confirmDelete) return;

  boardService.deleteBoard(postId)
    .then(() => {
      alert('게시글이 삭제되었습니다.');
      navigate('/board'); 
    })
    .catch((error) => {
      console.error('게시글 삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    });
  };

  // 게시글 상세 불러오기
  useEffect(() => {
    // if (!user) {
    //   alert('로그인이 필요합니다.');
    //   navigate('/login'); // 로그인 페이지로 리다이렉트
    //   return;
    // }
    boardService.getBoardDetail(postId)
      .then(response => {
        setPost(response.data);
        setCount(response.data.heartCount || 0); // 서버에서 받아온 좋아요 수 설정
      })
      .catch(error => {
        console.error('API 호출 실패:', error);
      });
  }, [user, navigate, postId]);

  // 좋아요 여부 확인 (localStorage)
  useEffect(() => {
    boardService.getBoardDetail(postId)
      .then(response => {
        setPost(response.data);
        setCount(response.data.heartCount || 0);
        setLiked(response.data.heartStatus || false); // 서버에서 좋아요 상태 제공 시
      })
      .catch(error => {
        console.error('API 호출 실패:', error);
      });
  }, [postId]);

  // 좋아요 처리
  const handleLike = () => {
  if (liked || user?.nickname === post?.creator) return;

  boardService.likeBoard(postId)
    .then((response) => {
      setCount(response.data.heartCount);
      setLiked(response.data.heartStatus);

      // localStorage에 저장
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.push(postId);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    })
    .catch((error) => {
      console.error('좋아요 실패:', error);
    });
  };

  if (!post) return;

  return (
    <div className="detail-container p-4 max-w-3xl mx-auto">
      <h2 className="detail-title text-2xl font-bold mb-2">{post.title}</h2>
      <p className="detail-meta text-sm text-gray-500 mb-4">작성자: {post.creator}</p>
      <p className="detail-meta text-sm text-gray-500 mb-4">작성일: {new Date(post.createdDateTime).toLocaleString()}</p>
      <p className="detail-content mb-6">{post.content}</p>

      {/* 수정 버튼: 작성자만 표시 */}
      {user?.nickname === post.creator && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/${postId}/edit`)}
        >
          수정
        </button>
      )}

      &nbsp;

      {/* 삭제 버튼: 작성자만 표시 */}
      {user?.nickname === post.creator && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleDelete}
        >
          삭제
        </button>
      )}

      <br/>

      {/* 뒤로가기 버튼 */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="back-icon">←</span> 뒤로가기
      </button>

      {/* 좋아요 버튼: 작성자 제외, 중복 방지 */}
      {user?.nickname !== post.creator && (
        <button
          onClick={handleLike}
          disabled={liked}
          className="ml-4"
          style={{ cursor: liked ? 'not-allowed' : 'pointer' }}
        >
          <img src={heartImg} alt="좋아요" width="24" height="24" />
          <span className="ml-1">{count}</span>
        </button>
      )}

      <hr/>

      { /* 댓글  */}
      <Comment postId={postId} /> {/* 댓글 컴포넌트 렌더링링 */} 

    </div>
  );
};

export default BoardDetailPage;
