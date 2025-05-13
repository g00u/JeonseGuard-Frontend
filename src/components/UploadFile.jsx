import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadFile.css';
import { FaPaperclip } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


import { useForm } from "../context/FormContext";
import { sendDataToBackend } from "../api/sendData";

const UploadFile = () => {
  const { radioValue, imageFile, setImageFile } = useForm();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (radioValue && imageFile) {
      await sendDataToBackend(radioValue, imageFile);
      alert("전송 완료!");
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">계약서 이미지 업로드</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">제출</button>
    </div>
  );
};

export default UploadFile;
