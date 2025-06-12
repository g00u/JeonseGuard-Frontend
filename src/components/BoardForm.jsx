import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WritePage.css'; 
import '../styles/BoardPage.css'; 


const BoardForm = ({ initialData = {}, onSubmit, showCategorySelect = false, author }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [category, setCategory] = useState(initialData.category || 'prevention');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showCategorySelect) {
            onSubmit({ title, content, category });
        } else {
            onSubmit({ title, content });
        }
    };

    return (
        <div >
            <h2 className="detail-meta detail-title text-2xl font-bold mb-2"> 🗣️ 글 작성</h2>
            {/* <p className="text-sm text-gray-600 mb-2">작성자: {author}</p> */}
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '10px'}}>
                    {showCategorySelect && (
                        <select className='dropdown' value={category} onChange={e => setCategory(
                            e.target.value
                            )}>
                            <option value="prevention">예방</option>
                            <option value="report">신고</option>
                        </select>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="제목"
                    className="detail-content w-full border p-2 rounded board-search-input mb-2"
                    rows="1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea 
                    placeholder="내용"
                    className="detail-content w-full border p-2 rounded h-40 board-search-input mb-2"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ resize: 'none' }} 
                />
                <br/>

                <button className="back-button" onClick={() => navigate(-1)}>
                    <span className="back-icon">←</span> 취소
                </button>
                <button  
                style={{backgroundColor:"#1890ff",
                    color:'white'

                }}  type="submit" className="back-button">
                    작성하기
                </button>
                
                
            </form>
        </div>
    );
};

export default BoardForm;
