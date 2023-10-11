import React from 'react';
import './Header.css'; // css 파일은 import 할때는 반드시 경로와 확장자를 정확하게 표시해야 한다

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘의 할 일 📋</h3>
      <h1>{new Date().toLocaleDateString()}</h1>
    </div>
  );
};

export default Header;
