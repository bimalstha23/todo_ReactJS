import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTodo } from '../context/TodoContext';

export const Form = () => {
    const { addTodo } = useTodo();

    let validateSchema = yup.object().shape({
        todo: yup.string().min(1).max(30).required()
    })

    const formik = useFormik({
        initialValues: {
            todo: ''
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            addTodo(values.todo);
        },
        onreset: (values) => {
            values.todo = ''
        }

    })
    return (
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <input type="text" name='todo' placeholder='What are you Thinking to do?' value={formik?.values.todo} onChange={formik.handleChange} />
                <button type='submit'>Add</button>
            </form>

        </div>
    )
}
