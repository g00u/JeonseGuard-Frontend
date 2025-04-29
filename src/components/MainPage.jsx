import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import MainMenuButton from './MainMenuButton';

function MainPage() {
  const navigate = useNavigate();

  // 버튼 클릭 시 동작할 함수
  const handleButtonClick = (buttonName) => {
    switch(buttonName){
      case '문서 업로드':
        navigate('/upload'); // 문서 업로드 페이지로 이동
        break;
      case '게시판':
        navigate('/board'); // 게시판 페이지로 이동
        break;
      case '전세가율 분석':
        navigate('/analysis'); // 전세가율 분석 페이지로 이동
        break;
      case '로그인':
        navigate('/login'); // 리포트 보기 페이지로 이동
        break;
      case '마이페이지':
        navigate('/mypage'); // 리포트 보기 페이지로 이동
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <p>문서를 업로드하시면, AI가 요약 분석을 도와드립니다.</p>

      {/* 검색바 */}
      <SearchBar />      
      {/* 버튼메뉴뉴들 */}
      <div>
        <MainMenuButton title="문서 업로드" onClick={() => handleButtonClick('문서 업로드')} />
        <MainMenuButton title="게시판" onClick={() => handleButtonClick('게시판')} />
        {/* <MainMenuButton title="전세가율 분석" onClick={() => handleButtonClick('전세가율 분석')} /> */}
        <MainMenuButton title="로그인" onClick={() => handleButtonClick('로그인')} />
        <MainMenuButton title="마이페이지" onClick={() => handleButtonClick('마이페이지')} />
      
      </div>
      
      
    </div>
  );
}
 
export default MainPage;
