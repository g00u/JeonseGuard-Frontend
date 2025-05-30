import React, { useState } from 'react';

const BoardForm = ({ initialData = {}, onSubmit, showCategorySelect = false, author }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [category, setCategory] = useState(initialData.category || 'prevention');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showCategorySelect) {
            onSubmit({ title, content, category });
        } else {
            onSubmit({ title, content });
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">[ {category} ] 글 작성</h2>
            {/* <p className="text-sm text-gray-600 mb-2">작성자: {author}</p> */}
            <form onSubmit={handleSubmit}>
                {showCategorySelect && (
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="prevention">예방</option>
                        <option value="report">신고</option>
                    </select>
                )}
                <input
                    type="text"
                    placeholder="제목"
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="내용"
                    className="w-full border p-2 rounded h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    작성하기
                </button>
            </form>
        </div>
    );
};

export default BoardForm;
