import { Link } from "react-router-dom";
import SearchBar from './SearchBar';
import '../styles/MainPage.css';
import React from 'react';
import { IoLogoWechat } from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";



function MainPage() {
  //const user = useUser(); //로그인 상태 확인
  // console.log(user); // 로그인 상태 확인을 위한 콘솔 로그
  

  return (
    <div className="main-page-container">
      <div className="main-page-header">
        <p>문서를 업로드하시면, AI가 요약 분석을 도와드립니다.</p>
        <SearchBar /> 
      </div>

      <div className="menu-btn-container">
        <div className="menu-btns">
          <Link to="/uploadform" className="menu-btn"><MdDriveFolderUpload className="icon"/>문서 업로드</Link>
        </div>
        <div className="menu-btns">
          <Link to="/" className="menu-btn"><IoMdAnalytics className="icon" />전세가율 분석</Link>
        </div>
        <div className="menu-btns">
          <Link to="/board" className="menu-btn"><FaClipboardList className="icon" />게시판</Link>
        </div>
        <div className="menu-btns">
          <Link to="/analysis" className="menu-btn"><IoLogoWechat className="icon" />챗봇 상담</Link>
        </div>
      </div>
  
    </div>
  );
}
 
export default MainPage;
