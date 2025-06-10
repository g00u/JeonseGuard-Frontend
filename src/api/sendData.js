// src/api/sendData.js
import axios from "axios";
const BASE_URL = process.env.REACT_APP_AI_API_URL;
export const sendDataToBackend = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(
      `${BASE_URL}/upload_image`, 
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
