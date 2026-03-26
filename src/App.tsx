import {Fragment, useCallback, useState} from 'react';
import {DeleteButton} from "./DeleteButton";

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 10; i++) {
    initialTodos.push(
        {id: crypto.randomUUID(),
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}


export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');
  const handleClick = useCallback((itemID: string) => {
      setTodos(prev => prev.filter(item => item.id !== itemID));
  }, [])

  return (
      <>
        <input
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <button onClick={() => {
          setText('');
          setTodos([{
              id: crypto.randomUUID(),
            text: text
          }, ...todos]);
        }}>Add</button>
        <ul>
          {todos.map(item => (
              <Fragment key={item.id}>
                  <li>
                      {item.text}
                  </li>
                  <DeleteButton onClick={() => handleClick(item.id)} />
              </Fragment>
          ))}
        </ul>
      </>
  );
}
