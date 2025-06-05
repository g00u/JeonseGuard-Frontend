// src/api/sendData.js
import axios from "axios";

export const sendDataToBackend = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(
      "http://34.22.71.169:8000/upload_image", 
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
