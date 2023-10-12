import { useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

const mockupTodos = [
  {
    id: 0,
    isDone: false,
    content: '빨래하기',
    createdDate: new Date().getTime(),
  },

  {
    id: 1,
    isDone: true,
    content: '수업듣기',
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockupTodos);
  const idRef = useRef(2);
  const onCreate = (content) => {
    // 입력받은 content를 멤버로 하는 새로운 할 일  객체 생성

    const newTodo = {
      id: idRef.current,
      content: content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodos([newTodo, ...todos]); // 스프레드 연산자를 통해 불변성을 지키며 새로운 배열 setTodos 할당
    idRef.current += 1;
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <TodoEditor onCreate={onCreate} />
      </div>
      <div>
        <TodoList todos={todos} /> {/* props로 todos를 내려줌 */}
      </div>
    </div>
  );
}

export default App;
