/* Header.js */
import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
        이 부분은 header입니다.<br/>
        <Link to="/">Home</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/">계약서 업로드</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/board">분석 시작</Link>
        <hr/>
    </header>
  );
};

export default Header;