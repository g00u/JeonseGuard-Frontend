import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //임시
    const correctEmail = "test";
    const correctPassword = "1234";

    if (userId === correctEmail && password === correctPassword) {
        alert("로그인 성공!");
        navigate("/main"); // 메인페이지로 이동
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다."); // 실패 시 경고
      }

    console.log("로그인 시도", { userId, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a href="/forgot-password" className="hover:underline">
            비밀번호 찾기
          </a>
          <a href="/signup" className="hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
