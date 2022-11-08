import React, { useRef, useState } from 'react'
import { useTodo } from '../context/TodoContext';
import './todo.css';
// import { useFormik } from 'formik';

export const Todo = ({ todo, index }) => {
    const { todos, setTodos } = useTodo();
    const [editClicked, setEditClicked] = useState(false);
    const [readonly, setReadOnly] = useState(true);
    const [updatedtodo, setUpdatedtodo] = useState('');
    const inputRef = useRef(null);

    // const formik = useFormik({
    //     initialValues: {
    //         changedtodo: todo.text,
    //     },
    //     enableReinitialize:true,
    //     onSubmit: () => {

    //     }

    // })
    const handleClick = () => {
        console.log('clicked')
        setEditClicked(true)
        setReadOnly(false);
        inputRef.current.focus();
    }
    const handleSave = () => {
        todo.text = updatedtodo;
        setReadOnly(true);
        setEditClicked(false);

        const newArr = todos.map((el, key) => {
            if (key === index) {
                return { ...el, text: updatedtodo }
            }
            return el;
        })

        localStorage.setItem('todos', JSON.stringify(newArr));
        setTodos(newArr);
    }

    const handleDelete = () => {

        const newTodo = todos.filter(el => {
            if (el != todo) return el;
        })
        // const newTodo = todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(newTodo))
        setTodos(newTodo);
    }
    return (
        <div className='todo'>
            <input name='changedtodo' className='todoText' ref={inputRef} type="text" readOnly={readonly} value={updatedtodo || todo.text} onChange={e => setUpdatedtodo(e.target.value)} />
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
