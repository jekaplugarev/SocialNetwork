import React from 'react'
import style from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsContainerPropsType} from './DialogsContainer';
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormsControl/FormsControls';

export const Dialogs: React.FC<DialogsContainerPropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogsData.map((d: DialogsType) => <div key={d.id}>
        <DialogItem name={d.name} id={d.id} img={d.img}/></div>)

    let messagesElements = props.dialogsPage.messagesData.map((m: MessagesType) => <div key={m.id}>
        <Message message={m.message} id={m.id}/></div>)

    type ValuesType = {
        newMessageBody?: string
    }

    const addNewMessage = (values: ValuesType) => {
        if (values.newMessageBody) {
            props.addMessage(values.newMessageBody)
        }
        values.newMessageBody = ''
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                <div>
                    {messagesElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps> = (props) => {
    return (
        <form
            className={style.enterMessage}
            onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name="newMessageBody"
                placeholder="Enter your message..."
                className={style.messageField}
                rows={1}
            />
            <button className={style.messageBtn}>
                Send
            </button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)