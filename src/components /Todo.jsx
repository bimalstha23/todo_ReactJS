import React, { useRef, useState } from 'react'
import { useTodo } from '../context/TodoContext';
import './todo.css';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const Todo = ({ todo, index }) => {

    let validateSchema = yup.object().shape({
        changedtodo: yup.string().min(1).max(30).required()
    })

    const { todos, setTodos } = useTodo();
    const [editClicked, setEditClicked] = useState(false);
    const [readonly, setReadOnly] = useState(true);
    // const [updatedtodo, setUpdatedtodo] = useState(todo ? todo.text : '');
    const inputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            changedtodo: todo ? todo.text : '',
        },
        enableReinitialize: true,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            handleSave(values.changedtodo)
        },
        onblur: (values) => {
            handleSave(values.changedtodo);
            setEditClicked(false);
        }


    })
    const handleClick = () => {
        setEditClicked(true)
        setReadOnly(false);
        inputRef.current.focus();
    }
    const handleSave = (value) => {
        console.log(value);
        setReadOnly(true);
        setEditClicked(false);

        const newArr = todos.map((el, key) => {
            if (key === index) {
                return { ...el, text: value }
            }
            return el;
        })
        console.log(newArr);

        localStorage.setItem('todos', JSON.stringify(newArr));
        setTodos(newArr);
    }

    const handleDelete = () => {

        const newTodo = todos.filter(el => { if (el !== todo) return el; })
        // const newTodo = todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(newTodo))
        setTodos(newTodo);
    }
    return (
        <div className='todo-content'>
            {/* <input name='changedtodo' className='todoText' ref={inputRef} type="text" readOnly={readonly} value={updatedtodo} onChange={e => setUpdatedtodo(e.target.value)} /> */}
            {/* <form action=""> */}
            <div className='todo'>

                <input name='changedtodo' className='todoText' ref={inputRef} type="text" readOnly={readonly} value={formik.values.changedtodo} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                <div className='actions'>
                    {!editClicked ? (

                        <button className='edit-btn' onClick={handleClick} > edit </button>
                    ) : (
                        <button className='edit-btn' onClick={formik.handleSubmit}> Save </button>

                    )}
                    <button className='delete-btn' onClick={handleDelete}> Delete</button>
                </div>
            </div>
            {formik?.errors?.changedtodo && <span >{formik.errors.changedtodo}</span>}
            {/* </form> */}
        </div >

    )
}
