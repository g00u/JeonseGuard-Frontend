import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardForm from '../components/BoardForm';
import boardService from '../services/BoardService';

const BoardCreatePage = () => {
    const navigate = useNavigate();

    // 로그인된 사용자 이름을 localStorage나 context 등에서 가져옴
    // const author = localStorage.getItem('nickname');

    const handleSubmit = async ({ title, content, category }) => {
        const response = await boardService.createBoard(category, {title, content});
        console.log(response.data); // 서버 응답 확인
        console.log("최민우 바보"); // 서버 응답 확인
        const postId = response.data.postId; // 백엔드에서 반환해야 함
        console.log("게시글 ID:", postId); // 게시글 ID 확인
        navigate(`/board/${postId}`); // 작성한 게시글 상세 페이지로 이동
    };

    return <BoardForm onSubmit={handleSubmit} showCategorySelect={true}  />;
};

export default BoardCreatePage;
