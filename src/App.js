import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
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

export const TodoStateContext = createContext(); // context 객체 생성 (todos를 위한)
export const TodoDispatchContext = createContext(); // context 객체 생성 (dispatch 함수를 위한)

// state : 상태 변화될 데이터(State), 여기에서는 todos
// action : State를 어떻게 변화 시킬 것 이냐(dispatch()로부터 넘겨저온 매개변수(객체)를 받음 )
function reducer(state, action) {
  switch (action.type) {
    case 'init': {
      return action.data;
    }
    case 'create': {
      const newTodos = [action.newTodo, ...state];
      localStorage.setItem('TodoList', JSON.stringify(newTodos));
      return newTodos;
    }
    case 'update': {
      const updateTodos = state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      localStorage.setItem('TodoList', JSON.stringify(updateTodos));
      return updateTodos;
    }
    case 'delete': {
      const deleteTodos = state.filter((todo) => todo.id !== action.id);
      localStorage.setItem('TodoList', JSON.stringify(deleteTodos));
      return deleteTodos;
    }
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockupTodos); // ==State 훅으로 상태관리 ==

  // todos라는 데이터의 상태가 변화 될 때 reducer 함수로 변화하는 로직을 관리 하겠다.
  // todos라는 상태는 초기 값으로 mockupTodos를 가지게 된다.
  const [todos, dispatch] = useReducer(reducer, []);

  const idRef = useRef(2);

  useEffect(() => {
    const rawData = localStorage.getItem('TodoList');
    const todosData = JSON.parse(rawData);
    if (!todosData || todosData.length === 0) {
      return;
    }
    dispatch({
      type: 'init',
      data: todosData,
    });
  }, []);

  const onCreate = (content) => {
    // 입력받은 content를 멤버로 하는 새로운 할 일  객체 생성
    dispatch({
      type: 'create',
      newTodo: {
        id: idRef.current,
        content: content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  //   const newTodo = {  // ==State 훅으로 상태관리 ==
  //     id: idRef.current,
  //     content: content,
  //     isDone: false,
  //     createdDate: new Date().getTime(),
  //   };
  // setTodos([newTodo, ...todos]); // 스프레드 연산자를 통해 불변성을 지키며 새로운 배열 setTodos 할당 // State 훅으로 상태관리
  //   idRef.current += 1;
  // }; // ==State 훅으로 상태관리 ==

  const onUpdate = useCallback((id) => {
    // console.log('수정 작업 해야 함!!!');

    dispatch({
      type: 'update',
      id: id,
    });
    // 넘겨저온 수정된 TodoItem.id와 기존 todos배열 안에 있는 요소 id값과 비교하여
    // 같다면 (수정된 할일) isDone 속성의 값을 isDone 속성의 값에서 !(반전) 시켜 새로운 객체로
    // 반환하고, 반환된 새로운 객체를 map()를 이용함으로써 새로운 배열을 결국에 setTodos()에 넣어주게 된다.
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // );
  }, []);

  const onDelete = useCallback((id) => {
    console.log(`${id}번의 할일을 삭제합니다!!!`);
    dispatch({
      type: 'delete',
      id: id,
    });
    // setTodos(todos.filter((todo) => todo.id !== id));
  }, []);

  const memoizedDispatches = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [],
  );

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={{ todos }}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList /> {/* props로 todos, onUpdate를 내려줌 */}
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
