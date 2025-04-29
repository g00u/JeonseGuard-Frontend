// src/components/MainMenuButton.jsx
function MainMenuButton({ title, onClick }) {
    return (
      <div
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   margin: '20px',
        //   cursor: 'pointer',
        //   width: '120px',
        // }}
        onClick={onClick}
      >
        <button
        //   style={{
        //     width: '100%',
        //     padding: '10px',
        //     backgroundColor: '#007BFF',
        //     color: '#fff',
        //     border: 'none',
        //     borderRadius: '5px',
        //     fontSize: '16px',
        //   }}
        >
          {title}
        </button>
      </div>
    );
  }
  
  export default MainMenuButton;