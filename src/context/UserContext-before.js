// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL; // 백엔드 API URL

  // 앱이 처음 로드될 때 localStorage 토큰 있으면 유저 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    axios.get(`${API_URL}/api/v5/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setUser(res.data);
      navigator("/mypage"); // 홈으로 이동
    })
    .catch(err => {
      console.error("Failed to fetch user info:", err);
      setUser(null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
