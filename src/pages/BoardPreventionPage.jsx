// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';

// const BoardListPage = () => {
//   const { category } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(category || '');

//   // 카테고리 JSON 불러오기
//   useEffect(() => {
//     fetch('/data/testCategory.json')
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//         if (!selectedCategory && data.length > 0) {
//           setSelectedCategory(data[0].id); // 기본 선택
//         }
//       });
//   }, []);

//   // 카테고리 선택 시 게시글 불러오기
//   useEffect(() => {
//     if (!selectedCategory) return;
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/api/v5/board/${selectedCategory}`)
//       .then((res) => setPosts(res.data))
//       .catch((err) => console.error('게시글 조회 실패:', err));
//   }, [selectedCategory]);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">게시판</h2>

//       <select
//         className="border p-2 rounded mb-4"
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//       >
//         {categories.map((cate) => (
//           <option key={cate.id} value={cate.id}>
//             {cate.name}
//           </option>
//         ))}
//       </select>

//       <div className="mb-4">
//         <Link
//           to={`/board/${selectedCategory}/write`}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           글 작성
//         </Link>
//       </div>

//       <ul className="space-y-2">
//         {posts.map((post) => (
//           <li key={post.id} className="p-4 border rounded">
//             <Link to={`/board/posts/${post.id}`} className="text-lg font-semibold">
//               {post.title}
//             </Link>
//             <p className="text-sm text-gray-600">작성자: {post.author}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BoardListPage;