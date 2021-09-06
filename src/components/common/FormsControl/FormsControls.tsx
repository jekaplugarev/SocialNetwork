import React from 'react';
import style from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';
import {FieldValidatorType} from '../../../utils/validators/validators';

export type GetStringKeys<T> = Extract<keyof T, string>
type FormContrlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormContrlPropsType> = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps>= (props) => {
    const {input, meta, ...restProps} = props

    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps>= (props) => {
    const {input, meta, ...restProps} = props

    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const createField = (placeholder: string | undefined, name: string, validators: Array<FieldValidatorType>, component: React.FC<WrappedFieldProps>, props = {}, text = '') => {

    return <div>
        <Field placeholder={placeholder}
               name={name}
               validator={validators}
               component={component}
               {...props}/>
        {text}
    </div>
}