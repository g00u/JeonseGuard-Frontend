import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

const RadioPage = () => {
  const { radioValue, setRadioValue } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (radioValue) navigate("/uploadfile");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">주택 타입을 선택하세요.</h2>
      <label>
        <input type="radio" name="housingType" value="0" checked={radioValue === 0} onChange={(e) => setRadioValue(e.target.value)} />
        아파트
      </label>
      <label className="ml-4">
        <input type="radio" name="housingType" value="1" checked={radioValue === 1} onChange={(e) => setRadioValue(e.target.value)} />
        오피스텔
      </label>
      <label className="ml-4">
        <input type="radio" name="housingType" value="2" checked={radioValue === 2} onChange={(e) => setRadioValue(e.target.value)} />
        연립다세대
      </label>
      <br/>
      <button type="submit" className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded">다음</button>
    </form>
  );
};

export default RadioPage;
