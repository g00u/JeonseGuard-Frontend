import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResultPage() {
  const [searchParams] = useSearchParams(); // URL의 쿼리 파라미터를 가져옴
  const keyword = searchParams.get('keyword'); // URL에서 'keyword' 파라미터를 가져옴

  return (
    <div>
      <h2>검색 결과</h2>
      <p>검색어: <strong>{keyword}</strong></p>
      {/* 여기서 fetch로 결과 받아서 표시해도 됨 */}
    </div>
  );
}

export default SearchResultPage;
