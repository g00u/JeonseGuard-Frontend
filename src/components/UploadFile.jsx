import React, { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';
import { sendDataToBackend } from '../api/sendDataToBackend';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadFile.css';

const UploadFile = () => {
  const { imageFile, setImageFile } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ , setAnalysisResult] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  // 미리보기 URL 생성
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);


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
    if (imageFile) {
      try {
         setIsLoading(true); // 로딩 시작
        const result = await sendDataToBackend(imageFile);
        console.log('AI 분석 결과:', result);

        sessionStorage.setItem("aiReportData", JSON.stringify(result));
        alert('분석 완료!');
        navigate(`/ai-report/${result.filename}`, { state: result });
      
      } catch (error) {
        console.error('🔴 AI 분석 요청 실패:', error);

        if (error.response) {
          // 서버가 응답했지만 에러 상태코드(4xx, 5xx)
          console.error("📡 응답 데이터:", error.response.data);
          console.error("📡 응답 상태코드:", error.response.status);
          console.error("📡 응답 헤더:", error.response.headers);
          alert(`서버 응답 오류: ${error.response.status} - ${error.response.statusText}\n${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          // 요청은 전송되었지만 응답 없음
          console.error("🕸️ 요청은 갔지만 응답이 없습니다:", error.request);
          alert('서버에 연결되지 않았습니다. 서버가 실행 중인지 확인하세요.');
        } else {
          // 요청 구성 중 에러 발생
          console.error("⚙️ 요청 설정 중 에러 발생:", error.message);
          alert('분석 요청 중 알 수 없는 오류가 발생했습니다.\n' + error.message);
        }
      }finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    }
  };

  const handleResetImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
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

      {imageFile && (
        <>
          <div className="text-sm text-gray-700 text-center mt-4">
            📄 <strong>선택된 파일:</strong> {imageFile.name}
          </div>
          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />
        </>
      )}

      <button onClick={handleSubmit} className="upload-button mt-4" disabled={isLoading}>
        {isLoading ? '분석 중...' : 'AI 분석 요청'}
      </button>

      <p className="upload-guide">
        업로드할 파일은 <strong>JPG, PNG</strong> 형식의 계약서 이미지입니다. <br />
        업로드 후 분석 결과를 확인하세요!
      </p>
    </div>
  );
};

export default UploadFile;
