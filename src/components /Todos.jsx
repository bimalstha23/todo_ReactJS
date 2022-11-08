import React, { useRef, useState } from 'react'
import { useTodo } from '../context/TodoContext'
// import { useFormik } from 'formik';
import { Todo } from './Todo';

export const Todos = () => {
    const { todos } = useTodo();
    return (
        <div className='todos-lists'>
            {todos && (
                todos.map((todo, index) => (
                    <Todo todo={todo} index={index} />
                ))
            )}

        </div>
    )
}
