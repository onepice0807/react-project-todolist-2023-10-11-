import React, { useState } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  const [searchWord, setSearchWord] = useState('');
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  const getSearchResult = () => {
    return searchWord === ''
      ? todos
      : todos.filter((todo) => todo.content.includes(searchWord));
  };

  return (
    <div className="todoList">
      <h4>해야 할 일들</h4>
      <input
        type="text"
        placeholder="검색할 할일..."
        className="searchBar"
        onChange={onChangeSearch}
        value={searchWord}
      />
      <div className="List_wrapper">
        {getSearchResult().map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
