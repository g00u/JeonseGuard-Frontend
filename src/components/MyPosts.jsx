import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import BoardService from '../services/BoardService';
import '../styles/MyPosts.css';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const MyPosts = () => {
  const { user } = useUser();
  const [mypost, setMypost] = useState([]);
  const [postPage, setPostPage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const preventionRes = await BoardService.getBoards('prevention');
        const reportRes = await BoardService.getBoards('report');
        console.log('preventionRes:', preventionRes);
        console.log('reportRes:', reportRes);
        const preventionPosts = preventionRes.data.posts[1] || [];
        const reportPosts = reportRes.data.posts[1] || [];

        const allPosts = [...preventionPosts, ...reportPosts];
        setMypost(allPosts);
      } catch (err) {
        console.error('게시글 불러오기 실패', err);
      }
    };

    fetchBoards();
  }, []);

  // 내 게시글 필터링
  const myPostsOnly = mypost.filter(post => post.creator === user.nickname);

  const handleNav = (e) => {
    navigate(`/board/${e}`);
  }

  // 내 댓글 필터링
  const myCommentsOnly = mypost.flatMap(post =>
    (post.comments || [])
      .filter(comment => comment.creator === user.nickname)
      .map(comment => ({
        ...comment,
        postId: post.postId,
        postTitle: post.title,
      }))
  );

  // 페이지네이션 계산
  const paginate = (items, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  const paginatedPosts = paginate(myPostsOnly, postPage);
  const paginatedComments = paginate(myCommentsOnly, commentPage);

  return (
    <div className="mypage-subpage">
      <h2>내 게시글 보기</h2>

      {myPostsOnly.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <>
          {paginatedPosts.map(post => (
            <div onClick={handleNav(post.postId)} className="post-card" key={post.postId}>
              <strong>{post.title}</strong> ({post.creator})<br />
              <small>{new Date(post.createdDateTime).toLocaleString()}</small>
            </div>
          ))}

          {/* 게시글 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(myPostsOnly.length / ITEMS_PER_PAGE) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPostPage(idx + 1)}
                className={postPage === idx + 1 ? 'active' : ''}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <hr />

      {/* <h2>💬 내 댓글 보기</h2> */}
{/* 
      {myCommentsOnly.length === 0 ? (
        <p>작성한 댓글이 없습니다.</p>
      ) : (
        <>
          {paginatedComments.map(comment => (
            <div className="post-card" key={comment.commentId}>
              <strong>
                {comment.content.length > 10
                  ? comment.content.slice(0, 10) + '...'
                  : comment.content}
              </strong>{' '}
              ({comment.creator})<br />
              <small>📌 {comment.postTitle}</small>
            </div>
          ))} */}

          {/* 댓글 페이지네이션 */}
          {/* <div className="pagination">
            {Array.from({ length: Math.ceil(myCommentsOnly.length / ITEMS_PER_PAGE) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCommentPage(idx + 1)}
                className={commentPage === idx + 1 ? 'active' : ''}
              >
                {idx + 1}
              </button>
            ))}
          </div> */}
        {/* </>
      )} */}
    </div>
  );
};

export default MyPosts;
