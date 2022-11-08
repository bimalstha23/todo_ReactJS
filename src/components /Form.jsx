import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTodo } from '../context/TodoContext';
import './form.css';

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
            formik.resetForm();
        },
        onreset: (values) => {
            values.todo = ''
        }

    })
    return (
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <input className='formInput' type="text" autoFocus name='todo' placeholder='What are you Thinking to do?' value={formik?.values.todo} onChange={formik.handleChange} />
                <button className='submit-btn' type='submit'>Add</button>
            </form>
            {formik.errors.todo && <span>{formik.errors.todo}</span>}

        </div>
    )
}
