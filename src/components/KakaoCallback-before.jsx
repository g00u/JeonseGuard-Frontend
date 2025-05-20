import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const KakaoCallBack = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useUser();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      axios
        .post(`${API_URL}/api/v5/user/info`, { code }) // ✅ 실제 백엔드 주소 사용
        .then((res) => {
          const { token, userInfo } = res.data; // 예: 백엔드에서 반환된 JWT와 사용자 정보
          login(userInfo, token);               // 전역 상태 저장
          navigate('/mypage');                  // 마이페이지로 이동
        })
        .catch((err) => {
          console.error('카카오 로그인 실패:', err);
          navigate('/'); // 실패 시 홈으로 이동
        });
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallBack;
