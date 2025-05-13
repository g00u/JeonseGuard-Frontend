import axios from "axios";

export const sendDataToBackend = async (radioValue, imageFile) => {
  const formData = new FormData();
  formData.append("option", radioValue);
  formData.append("image", imageFile);

  try {
    const res = await axios.post("/api/sendData", formData);
    console.log("서버 응답:", res.data);
  } catch (error) {
    console.error("전송 오류:", error);
  }
};
