import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUpload } from 'react-icons/fa';
import '../styles/Layout.css'; 

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <div className="bottom-nav">
        <FaHome onClick={() => navigate('/')} />
        <FaUpload onClick={() => navigate('/uploadform')} />
        <FaUser onClick={() => navigate('/mypage')} />
      </div>
    </>
  );
};

export default Layout;
