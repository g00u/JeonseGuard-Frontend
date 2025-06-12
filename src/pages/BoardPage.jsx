
// import { Posts } from '../data/boardData'; // 실제 데이터 가져올 경우
import React, { useEffect, useState } from 'react';
import '../styles/BoardPage.css';
import { useNavigate } from 'react-router-dom';
import BoardService from '../services/BoardService'; // 실제 서비스 경로로 변경
import { useUser } from '../context/UserContext';
import heartImg from '../assets/heart.png';
import commentImg from '../assets/comment.png';


function BoardPage() {
  console.log('BoardPage 렌더링');
  const { user } = useUser(); // 사용자 정보 가져오기
  console.log('현재 사용자:', user); // 현재 사용자 정보 확인
  const navigate = useNavigate();
  // const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [selectedTag, setSelectedTag] = useState('');

  // 게시글 가져오기 
  const [preventionBoards, setPreventionBoards] = useState([]);
  const [reportBoards, setReportBoards] = useState([]);

  // 페이지네이션
  const [preventionPage, setPreventionPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    BoardService.getBoards('prevention')
      .then((res) => {
        setPreventionBoards(res.data.posts[1]); // posts[1]이 포스트 내용임 
        console.log('prevention 불러오기 성공', res.data.posts[1]);
      })
      .catch((err) => console.error('prevention 불러오기 실패', err));

    BoardService.getBoards('report')
      .then((res) => {
        setReportBoards(res.data.posts[1]);
        console.log('report 불러오기 성공', res.data.posts[1]);
      })
      .catch((err) => console.error('report 불러오기 실패', err));
  }, []);

  const renderBoardTable = (boards, currentPage, setPage) => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentBoards = boards?.slice(startIndex, startIndex + postsPerPage);

    return (
      <>
        <table className="board-table table table-striped table-bordered">
          <thead>
            <tr>
              <th>제목</th>
              <th><img src={commentImg} alt='comment count' /></th>
              <th><img src={heartImg} alt='heart count' /></th>
            </tr>
          </thead>
          <tbody>
            {currentBoards?.map((board) => (
              <tr
                key={board.postId}
                onClick={() => handleClick(board.postId)}
                style={{ cursor: 'pointer' }}
              >
                <td>{board.title}</td>
                <td>{board.commentCount}</td>
                <td>{board.heartCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination(boards, currentPage, setPage)}
      </>
    );
  };


  const renderPagination = (totalPosts, currentPage, setPage) => {
    const totalPages = Math.ceil(totalPosts.length / postsPerPage);


    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={currentPage === idx + 1 ? 'active-page' : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    );
  };


  //   useEffect(() => {
  //   fetch('/data/dummyPosts.json') // public/data 안의 JSON 파일 접근
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data))
  //     .catch((err) => console.error('게시글 데이터를 불러오는 데 실패했습니다.', err));
  // }, []);

  const handleClick = (postId) => {
    const token = localStorage.getItem('accessToken');
    // console.log('현재 토큰:', token); // 토큰 확인용 로그

    // 1.로그인 안한 사용자 처리리
    if (!token || token === 'null' || token === 'undefined') {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    // return navigate(`/board/${postId}`); // 게시글 상세 페이지로 이동

    // 2.토큰 만료 사용자 처리 
    // checkUserToken에서 받아온 토큰으로 유효한지 확인하는 코드 작성
    BoardService.checkUserToken()
      .then((res) => { //200 OK
        console.log('토큰 유효성 검사 성공:', res.data);
          navigate(`/board/${postId}`);

      })
      .catch((err) => { // 401 Unauthorized
        console.error('토큰 유효성 검사 실패:', err);
        alert('로그인을 다시 해주세요. '); 
        navigate('/login'); 
      });
  };

  const handleWrite = () => {
    const token = localStorage.getItem('accessToken');
    // console.log('현재 토큰:', token); // 토큰 확인용 로그

    // 1.로그인 안한 사용자 처리리
    if (!token || token === 'null' || token === 'undefined') {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    // return navigate('/board/write');

    // 2.토큰 만료 사용자 처리 
    // checkUserToken에서 받아온 토큰으로 유효한지 확인하는 코드 작성
    BoardService.checkUserToken()
      .then((res) => { //200 OK
        console.log('토큰 유효성 검사 성공:', res.data);
          navigate('/board/write');

      })
      .catch((err) => { // 401 Unauthorized
        console.error('토큰 유효성 검사 실패:', err);
        alert('로그인을 다시 해주세요. '); 
        navigate('/login'); 
      });
  };


  //필터링: 검색어 & 태그 모두 반영
  // const filteredPosts = posts.filter((post) => {
  //   const matchKeyword =
  //     post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //     post.content.toLowerCase().includes(searchKeyword.toLowerCase());

  //   const matchTag = selectedTag === '' || post.tags?.includes(selectedTag);

  //   return matchKeyword && matchTag;
  // });

  //태그 전체 목록 추출
  // const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

return (
  <div className="board-container">
    
    
    {/* 공지사항  */}
    <div className="notice-card">
      📢 <strong>공지사항:</strong> 공지사항 내용!
    </div>

    {/* 안내 문구 박스 */}
    <div className="intro-box">
      <p>
        JeonseGuard 커뮤니티에 오신 걸 환영합니다!<br />
        전세 계약에 대한 고민, 질문, 경험 등을 자유롭게 나눠보세요.
      </p>
    </div>

          {/* 태그 필터 UI */}
      {/* <div className="tag-filter">
        <button
          className={selectedTag === '' ? 'tag-button active' : 'tag-button'}
          onClick={() => setSelectedTag('')}
        >
          전체 보기
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={selectedTag === tag ? 'tag-button active' : 'tag-button'}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div> */}

    {/* 글쓰기 버튼 + 검색창을 같이 묶음 */}
    <div className="action-row">
      {/* <div className="search-wrapper">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="board-search-input"
        />
      </div> */}
      <button style={{backgroundColor:"#1890ff", width:'100%'}} 
      className="write-button" onClick={handleWrite}>
        글 작성하기
      </button>
    </div>


    {/*  검색 결과 게시글 리스트 */}
    {/* <div className="post-list">
      {filteredPosts.map((post) => (
        <div key={post.postId} className="post-card" onClick={() => handleClick(post.postId)}>
          <h3>{post.title}</h3>
          <p className="post-preview">
            {post.content?.substring(0, 60) || "내용 없음"}...
          </p> */}
   
          {/* 태그 리스트 */}
          {/* <div className="post-tags">
            {post.tags?.map((tag) => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div> */}

          {/* <div className="post-meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      ))} */}
     
      {/* {filteredPosts.length === 0 && (
        <div className="empty-list-message">검색 결과가 없습니다.</div>
      )}
    </div>  */}



    <div>
      <h2 className="text-center">🛡️예방 게시판</h2>
      <div className="row">
        {renderBoardTable(preventionBoards, preventionPage, setPreventionPage)}
      </div>

      <hr />
      <h2 className="text-center">📞신고 게시판</h2>
      <div className="row">
        {renderBoardTable(reportBoards, reportPage, setReportPage)}
      </div>
    </div>

  </div>
);

}

export default BoardPage;