
// import { Posts } from '../data/boardData'; // 실제 데이터 가져올 경우
import React, { useEffect, useState } from 'react';
import '../styles/BoardPage.css';
import { useNavigate } from 'react-router-dom';


function BoardPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState('');


    useEffect(() => {
    fetch('/data/dummyPosts.json') // public/data 안의 JSON 파일 접근
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('게시글 데이터를 불러오는 데 실패했습니다.', err));
  }, []);

  const handleClick = (id) => {
    navigate(`/board/${id}`);
  };

  const handleWrite = () => {
    /*
    const isLoggedIn = localStorage.getItem('token'); // 로그인 시 저장된 토큰 등
  
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 보내기
      return;
    }
  */
    navigate('/board/write');
  };

  // 🔍 필터링: 검색어 & 태그 모두 반영
  const filteredPosts = posts.filter((post) => {
    const matchKeyword =
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.content.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchTag = selectedTag === '' || post.tags?.includes(selectedTag);

    return matchKeyword && matchTag;
  });

  // 🏷️ 태그 전체 목록 추출
  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

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
      <div className="tag-filter">
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
      </div>

    {/* 글쓰기 버튼 + 검색창을 같이 묶음 */}
    <div className="action-row">
      <button className="write-button" onClick={handleWrite}>글 작성하기</button>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="board-search-input"
        />
      </div>
    </div>


    {/*  게시글 리스트 */}
    <div className="post-list">
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card" onClick={() => handleClick(post.id)}>
          <h3>{post.title}</h3>
          <p className="post-preview">
            {post.content?.substring(0, 60) || "내용 없음"}...
          </p>

          {/* 태그 리스트 */}
          <div className="post-tags">
            {post.tags?.map((tag) => (
              <span key={tag} className="post-tag">{tag}</span>
            ))}
          </div>

          <div className="post-meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      ))}
     
      {filteredPosts.length === 0 && (
        <div className="empty-list-message">검색 결과가 없습니다.</div>
      )}
    </div>
  </div>
);

}

export default BoardPage;
