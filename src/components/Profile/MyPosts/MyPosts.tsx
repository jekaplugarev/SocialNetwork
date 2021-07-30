import React from 'react';
import style from './MyPosts.module.css';
import {MyPostsContainerPropsType} from './MyPostsContainer';
import {PostsType} from '../../../redux/profile-reducer';
import {Post} from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControl/FormsControls';

export const MyPosts: React.FC<MyPostsContainerPropsType> = (props) => {
    let postsElements = props.profilePage.postsData.map((p: PostsType) => <div key={p.id}><Post message={p.message}
                                                                                                likesCount={p.likesCount}
                                                                                                id={p.id}/></div>)

    type ValuesType = {
        newPostText?: string
    }

    const onAddPost = (values: ValuesType) => {
        if (values.newPostText) {
            props.addPost(values.newPostText)
        }
    }

    return (
        <div className={style.postsBlock}>
            <h3 className={style.postsTitle}>My posts</h3>
            <AddMessageFormRedux onSubmit={onAddPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

let AddNewPostForm: React.FC<InjectedFormProps> = (props) => {
    return (<form
            className={style.enterPost}
            onSubmit={props.handleSubmit}
        >
            <Field
                component={Textarea}
                name="newPostText"
                placeholder="Post message..."
                className={style.postField}
                rows={1}
                validate={[required, maxLength100]}
            />
            <button className={style.postBtn}>
                Add Post
            </button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
        form: 'profileAddMessageForm'
    }
)(AddNewPostForm)