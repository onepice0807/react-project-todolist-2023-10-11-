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
  const [todos, setTodos] = useState(mockupTodos); // State 훅으로 상태관리

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

  const onUpdate = (id) => {
    // console.log('수정 작업 해야 함!!!');

    // 넘겨저온 수정된 TodoItem.id와 기존 todos배열 안에 있는 요소 id값과 비교하여
    // 같다면 (수정된 할일) isDone 속성의 값을 isDone 속성의 값에서 !(반전) 시켜 새로운 객체로
    // 반환하고, 반환된 새로운 객체를 map()를 이용함으로써 새로운 배열을 결국에 setTodos()에 넣어주게 된다.
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (id) => {
    console.log(`${id}번의 할일을 삭제합니다!!!`);
    setTodos(todos.filter((todo) => todo.id !== id));
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
        <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />{' '}
        {/* props로 todos, onUpdate를 내려줌 */}
      </div>
    </div>
  );
}

export default App;
