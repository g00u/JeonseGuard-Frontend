import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class BoardService {
    // 0.사용자 토큰 확인
    checkUserToken() {
        const token = localStorage.getItem('accessToken');
        return axios.get(`${API_URL}/user/info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

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
        const token = localStorage.getItem('accessToken'); // 토큰 가져오기
        return axios.delete(`${API_URL}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    // deleteComment(commentId) {
    //     const token = localStorage.getItem('accessToken'); // 토큰 가져오기
    //     return axios.delete(`${API_URL}/post/${postId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }

    // 6. 게시글 좋아요
    likeBoard(postId) {
    const token = localStorage.getItem('accessToken');
    return axios.post(
      `${API_URL}/heart`,
      { postId }, // 서버가 postId를 body로 받는 경우
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    }


    // 댓글 조회
    getComments(postId) {
        const token = localStorage.getItem('accessToken'); 
        return axios.get(`${API_URL}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // 댓글 작성
    addComment(commentData) {
        const token = localStorage.getItem('accessToken');

        return axios.post(`${API_URL}/comment`, commentData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    }

}
const boardService = new BoardService();
export default boardService;