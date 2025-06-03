import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class BoardService {
    // 1. 카테고리별 게시글 전체 조회
    getBoards(category) {
        return axios.get(`${API_URL}/board/${category}`);
    }
 
    // 2. 게시글 작성
    createBoard(category, postData) {
        const token = localStorage.getItem('accessToken'); // 액세스 토큰 가져오기 
        return axios.post(`${API_URL}/post/${category}`, postData, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    }


    // 3. 게시글 상세 조회 
    getBoardDetail(postId) {
        const token = localStorage.getItem('accessToken'); // 
        return axios.get(`${API_URL}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // 4. 게시글 수정
    updateBoard(postId, postData) {
        return axios.put(`${API_URL}/post/${postId}`, postData);
    }

    // 5. 게시글 삭제
    deleteBoard(postId) {
        return axios.delete(`${API_URL}/post/${postId}`);
    }
}
const boardService = new BoardService();
export default boardService;