import React from 'react';
import './TodoItem.css';

const TodoItem = ({ id, isDone, content, createdDate, onUpdate, onDelete }) => {
  console.log(`${id}번의 TodoItem이 업데이트가 된다`);
  const onChangeCheckBox = () => {
    onUpdate(id); // 수정된 TodoItem 객체를 확인학기 위해 id를 매개변수로 보낸다.
  };

  const onClickButton = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">
        {new Date(createdDate).toLocaleDateString()}
      </div>
      <div className="btn_col">
        <button onClick={onClickButton}>삭제</button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
