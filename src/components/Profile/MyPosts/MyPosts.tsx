import React, {LegacyRef} from 'react';
import {ActionType, addPostActionCreator, PostsType, updateNewPostTextActionCreator} from '../../../state';
import style from './MyPosts.module.css';
import Post from './Post/Post';

export type MyPostsType = {
    postsData: Array<PostsType>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
    dispatch: (action: ActionType) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElements = props.postsData.map((p: PostsType) => <div key={p.id}><Post message={p.message}
                                                                                    likesCount={p.likesCount}
                                                                                    id={p.id}/></div>)

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const onPostChange = () => {
        if (newPostElement.current !== null) {
            const textPost = newPostElement.current.value
            props.dispatch(updateNewPostTextActionCreator(textPost))
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