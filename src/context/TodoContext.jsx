import React, { createContext, useContext, useEffect, useState } from 'react'

const todoContext = createContext({
    todos: [],
    setTodos: () => { },
    addTodo: () => { },

})


export const useTodo = () => useContext(todoContext);

export const TodoContext = ({ children }) => {
    const [todos, setTodos] = useState([]);
    console.log(todos);

    const addTodo = (todo) => {
        const todoObj = {
            text: todo,
            id: Date.now(),
        }
        const newTodo = [...todos, todoObj];
        localStorage.setItem('todos', JSON.stringify(newTodo));
        setTodos(newTodo);
    }

    useEffect(() => {
        if (localStorage.getItem('todos')) {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        }
    }, [])

    const values = {
        todos,
        addTodo,
        setTodos,
    }
    return (
        <todoContext.Provider value={values}>
            {children}
        </todoContext.Provider>
    )
}
