import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (setSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div style={{margin: '10px'}}>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name='friend' as='select' style={{marginLeft: '10px'}}>
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting} style={{marginLeft: '10px'}}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})