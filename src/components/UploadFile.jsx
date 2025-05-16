import React, { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';
import { sendDataToBackend } from '../api/sendData';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadFile.css';

const UploadFile = () => {
  const { radioValue, imageFile, setImageFile } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  // 미리보기 URL 생성
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  // 라디오 선택 안 된 경우 리디렉션
  useEffect(() => {
    if (!radioValue) {
      alert('주택 유형을 먼저 선택해주세요.');
      navigate('/uploadform');
    }
  }, [radioValue, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async () => {
    if (radioValue && imageFile) {
      await sendDataToBackend(radioValue, imageFile);
      alert('전송 완료!');
    } else {
      alert('주택 유형과 파일을 모두 선택해주세요.');
    }
  };

  const handleResetImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-6">
        <span role="img" aria-label="icon">📄</span>
        계약서 이미지 업로드
      </h2>

      <div
        className={`preview-box ${isDragging ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
      {imageFile ? (
        <div className="preview-image-wrapper">
          
          {/* 다른 이미지 선택 버튼 (좌측 상단) */}
          <label htmlFor="fileInput" className="reselect-btn">
           ↺ 다른 파일 선택
          </label>

          {/* ✕ 삭제 버튼 (우측 상단) */}
          <button className="remove-btn" onClick={handleResetImage}>
            ✕ 삭제
          </button>

          {/* 이미지 미리보기 */}
          <img src={previewUrl} alt="미리보기" />
        </div>
      ) : (
        <label className="upload-placeholder" htmlFor="fileInput">
          <div className="text-4xl text-gray-400">＋</div>
          <div className="text-sm text-gray-500 mt-1">이미지 업로드 또는 드래그</div>
        </label>
      )}


        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
      </div>



      {/* 선택된 주택유형 + 다시 선택 */}
      {radioValue !== null && (
        <div className="selection-summary text-sm text-gray-700 text-center mt-4 space-y-1">
        <p>📄 <strong>선택된 파일:</strong> {imageFile?.name}</p>
        <p>🏠 <strong>선택한 주택 유형:</strong> {
          radioValue === '0' ? '아파트' :
          radioValue === '1' ? '오피스텔' :
          '연립다세대'
        }</p>
          <button
            onClick={() => navigate('/uploadform')}
            className="change-radio-btn"
          >
             ↺ 주택유형 다시 선택하기
          </button>
        </div>
      )}

      <button onClick={handleSubmit} className="upload-button mt-4">
        업로드
      </button>

      <p className="upload-guide">
        업로드할 파일은 <strong>JPG, PNG</strong> 형식의 계약서 이미지입니다. <br />
        업로드 후 분석 결과를 확인하세요!
      </p>
    </div>
  );
};

export default UploadFile;
