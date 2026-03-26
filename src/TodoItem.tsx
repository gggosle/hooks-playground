import { useEffect } from "react";
import { DeleteButton } from "./DeleteButton.tsx";

export interface Todo {
    id: string | number;
    title: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string | number) => void;
    onDelete: (id: string | number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {

    useEffect(() => {
        return () => {
            console.log(`🧹 Cleanup: Todo unmounted - "${todo.title}"`);
        };
    }, [todo.title]);

    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
            </span>
            <DeleteButton onClick={() => onDelete(todo.id)} />
        </li>
    );
}