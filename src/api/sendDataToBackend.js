import axios from 'axios';
const BASE_URL = process.env.REACT_APP_AI_API_URL;
export const sendDataToBackend = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  // 1. 이미지 업로드
  const uploadRes = await axios.post(`${BASE_URL}/upload_image`, formData);
  const filename = uploadRes.data.filename || imageFile.name.split('.')[0]; 

  // 2. name 기반으로 세 개 API 호출
  const formForPost = new FormData();
  formForPost.append('name', filename);

  const [part1Res, part2Res, part3Res] = await Promise.all([
    axios.post(`${BASE_URL}/get_part_1_json`, formForPost),
    axios.post(`${BASE_URL}/get_part_2_json`, formForPost),
    axios.post(`${BASE_URL}/get_part_3_json`, formForPost),
  ]);

  return {
    filename,
    part1: part1Res.data,
    part2: part2Res.data,
    part3: part3Res.data
  };
};
