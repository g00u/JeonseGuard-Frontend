// src/api/sendData.js
import axios from "axios";

export const sendDataToBackend = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(
      //"https://jeonseguard.duckdns.org/upload_image", // AI 분석 엔드포인트
      "http://localhost:8000/upload_image", // 로컬 개발용 엔드포인트
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("AI 분석 요청 실패:", error);
    throw error;
  }
};
