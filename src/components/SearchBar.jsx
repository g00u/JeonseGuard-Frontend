// src/components/searchBar.jsx
function SearchBar() {
    return (
        <div style={{ margin: '20px 0'}}>
            <input
                type = "text"
                placeholder = "주소 또는 건물명 검색"
                style={{
                    // width: '100%',
                    // padding: '10px',
                    // borderRadius: '10px',
                    // border: '1px solid #ccc',
                    // fontSize: '16px'
                }}
            />
            <button style={{
                // marginTop: '10px',
                // padding: '10px 20px',
                // backgroundColor: '#007BFF',
                // color: '#fff',
                // border: 'none',
                // borderRadius: '5px',
                // cursor: 'pointer'
            }}>
                검색
            </button>
        </div>
    )
}

export default SearchBar;