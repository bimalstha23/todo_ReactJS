import React, { useRef, useState } from 'react'
import { useTodo } from '../context/TodoContext';

export const Todo = ({ todo }) => {
    const { todos, setTodos } = useTodo();
    const [editClicked, setEditClicked] = useState(false);
    const [focus, setFocus] = useState(false);
    const [readonly, setReadOnly] = useState(true);
    const [updatedtodo, setUpdatedtodo] = useState('');

    const inputRef = useRef(null);

    console.log('focus', focus);

    const handleClick = () => {
        console.log('clicked')
        setEditClicked(true)
        setReadOnly(false);
        inputRef.current.focus();
        setFocus(true);

    }
    const handleSave = () => {
        todo.text = updatedtodo;
        setReadOnly(true);
        setFocus(false);
        setEditClicked(false);

    }

    const handleDelete = () => {
        // console.log('todosDelete', todos)
        // const newTodo =todos.splice(todos.indexOf(todo), 1)
        const newTodo = todos.filter(el => {
            if (el != todo)
                return el
        })
        localStorage.setItem('todos', JSON.stringify(newTodo))
        setTodos(newTodo);
    }
    return (
        <div className='todo'>
            <input name='changedtodo' ref={inputRef} type="text" readOnly={readonly} autoFocus={focus} value={updatedtodo || todo.text} onChange={(e) => setUpdatedtodo(e.target.value)} />
            <div className='actions'>
                {!editClicked ? (

                    <button className='edit-btn' onClick={handleClick} > edit </button>
                ) : (
                    <button className='edit-btn' onClick={handleSave}> Save </button>

                )}
                <button className='delete-btn' onClick={handleDelete}> Delete</button>
            </div>
        </div>

    )
}
