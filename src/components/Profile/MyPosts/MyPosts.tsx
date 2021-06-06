import React, {LegacyRef} from 'react';
import {addPostCreator, updateNewPostTextCreator} from '../../../redux/profile-reducer';
import {PostsType, StoreType} from '../../../redux/state';
import style from './MyPosts.module.css';
import Post from './Post/Post';

export type MyPostsType = {
    newPostText: string
    store: StoreType
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let state = props.store.getState().profilePage

    let postsElements = state.postsData.map((p: PostsType) => <div key={p.id}><Post message={p.message}
                                                                                    likesCount={p.likesCount}
                                                                                    id={p.id}/></div>)

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const addPost = () => {
        props.store.dispatch(addPostCreator())
    }

    const onPostChange = () => {
        if (newPostElement.current !== null) {
            const textPost = newPostElement.current.value
            props.store.dispatch(updateNewPostTextCreator(textPost))
        }
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div className={style.enterPost}>
                <textarea
                    ref={newPostElement}
                    rows={1}
                    className={style.postField}
                    value={props.newPostText}
                    onChange={onPostChange}
                    placeholder={'Enter post...'}
                />
                <button
                    onClick={addPost}
                    className={style.postBtn}>Add Post
                </button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;