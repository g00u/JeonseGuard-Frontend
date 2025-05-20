import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/RadioPage.css";


const RadioPage = () => {
  const { radioValue, setRadioValue, setImageFile } = useForm();
  const navigate = useNavigate();
   
  const housingTypes = [
    { label: "아파트", value: "0" },
    { label: "오피스텔", value: "1" },
    { label: "연립다세대", value: "2" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (radioValue !== null){
      setImageFile(null);
      navigate("/uploadfile");
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="radio-form">
      <h2 className="form-title">🏠 주택 유형을 선택하세요</h2>
      <div className="radio-group">
        {housingTypes.map((type) => (
          <label
            key={type.value}
            className={`radio-card ${radioValue === type.value ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="housingType"
              value={type.value}
              checked={radioValue === type.value}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <span>{type.label}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="next-button">
        ➡ 다음 단계로 이동
      </button>
    </form>
  );
};

export default RadioPage;
