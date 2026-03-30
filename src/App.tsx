import { useState, useEffect, useRef, useCallback } from 'react';
import { TodoItem, type Todo } from './TodoItem.tsx';
import './App.css';
import {useLocalStorage} from "./hooks/useLocalStorage.ts";

export default function App() {
    const [todos, setTodos] = useLocalStorage<Todo[]>('my-app-todos', []);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const renderCount = useRef(1);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        const fetchInitialTodos = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("Fetch failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (todos.length === 0) {
            fetchInitialTodos();
        }
    }, []);

    const handleAdd = useCallback(() => {
        if (!text.trim()) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: text,
            completed: false
        };

        const middleIndex = Math.floor(todos.length / 2);
        const newTodos = [
            ...todos.slice(0, middleIndex),
            newTodo,
            ...todos.slice(middleIndex)
        ];

        setTodos(newTodos);
        setText('');
    }, [text, todos]);

    const handleDelete = useCallback((id: string | number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const handleToggle = useCallback((id: string | number) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []);

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
            <h2>Hooks Playground</h2>
            <p style={{ color: 'gray', fontSize: '0.9rem' }}>
                Component Render Count: <strong>{renderCount.current}</strong>
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    ref={inputRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Add task..."
                    style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={handleAdd}>Add to Middle</button>
            </div>

            {isLoading ? (
                <p>Loading todos...</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {}
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}