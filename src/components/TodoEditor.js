import React, { useContext, useRef, useState } from 'react';
import './TodoEditor.css';
import { TodoDispatchContext } from '../App';

const TodoEditor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);
  const contentRef = useRef(); // input type='text' DOM을 창조하는 ref
  const onChangeContent = (e) => {
    // console.log('content', e.target.value);
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      contentRef.current.focus();
      setIsError(true);

      return;
    }
    setIsError(false);
    onCreate(content);
    setContent('');
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="todoEditor">
      <h4>
        새로운 할 일 작성하기
        <i className="fa-solid fa-pen"></i>
      </h4>
      <div className="editor_wrapper">
        <input
          ref={contentRef}
          type="text"
          placeholder="새로운 할일..."
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          value={content}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
      {isError && <div className="errorMsg">할 일을 입력해주세요!</div>}
    </div>
  );
};

export default TodoEditor;
