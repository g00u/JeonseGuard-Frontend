// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // UserContext.js
  // const initialUser = JSON.parse(localStorage.getItem('dummyUser')) || null;

  // const [user, setUserState] = useState(initialUser);

  const [user, setUserState] = useState(null);

  // setUser 함수 정의: 상태 변경 + localStorage에 저장
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  // 컴포넌트가 처음 렌더링될 때 localStorage에서 유저 정보 불러오기
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error('유저 정보 파싱 오류:', e);
      localStorage.removeItem('user'); // 잘못된 값 제거
    }
  }
}, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 사용자 정보를 가져오는 커스텀 훅. 다른 컴포넌트에서 useUser()로 사용 가능
export const useUser = () => useContext(UserContext);
