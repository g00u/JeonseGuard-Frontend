import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadPage.css';
import { FaPaperclip } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('파일을 선택하세요!');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('업로드 성공:', res.data);
      alert('파일 업로드 성공!');
      // 업로드 후 추가 작업 (예: 결과 페이지로 이동 등)
      // navigate('/analysis'); // 예시: 분석 페이지로 이동
      navigate('/analysis');

    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  return (
    <div className="upload-container">
      <h2>계약서 이미지 업로드</h2>
      <input 
        type="file"
        id="fileUpload" 
        accept="image/*" 
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />     
      <label htmlFor="fileUpload" className="upload-label">
        <FaPaperclip style={{ marginRight: '8px' }} />
        파일 선택       
      </label>

      {file && <p className="file-name">선택된 파일: {file.name}</p>}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="미리보기" />
        </div>
      )}

      {/* 파일 선택되었을 때만 업로드 버튼 보이기 */}
      {file && (
        <div style={{ marginTop: '14px' }}>
          <button onClick={handleUpload} className="upload-button">
            업로드
          </button>
      </div>
      )}
      <div className="upload-instructions">
        <p>업로드할 파일은 JPG, PNG 형식의 계약서 이미지입니다.</p>
        <p>업로드 후 분석 결과를 확인하세요!</p>
        <p>업로드된 파일은 안전하게 저장됩니다.</p>
      </div>

      </div>
  );
};

export default UploadPage;
