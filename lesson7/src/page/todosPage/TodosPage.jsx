// TodosPage/TodosPage.js
import React, { useEffect, useState } from 'react';
import TodoList from "../../components/TodoList.jsx";

const TodosPage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:8000/todos');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
            }
        };

        fetchTodos();
    }, []);

    const updateTodo = async (newTitle, id) => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении задачи');
            }

            const updatedTodo = await response.json();
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Ошибка при удалении задачи');
            }

            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Todos</h1>
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
    );
};

export default TodosPage;