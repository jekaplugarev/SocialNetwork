import React, {LegacyRef} from 'react';
import {PostsDataType, PostsType} from '../../../redux/store';
import style from './MyPosts.module.css';
import Post from './Post/Post';

export type MyPostsType = {
    newPostText: string
    posts: PostsDataType
    addPost: () => void
    updateNewPostText: (textPost: string) => void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElements = props.posts.map((p: PostsType) => <div key={p.id}><Post message={p.message}
                                                                                likesCount={p.likesCount}
                                                                                id={p.id}/></div>)

    const newPostElement: LegacyRef<HTMLTextAreaElement> = React.createRef()

    const onAddPost = () => {
        props.addPost()
    }

    const onPostChange = () => {
        if (newPostElement.current !== null) {
            const textPost = newPostElement.current.value
            props.updateNewPostText(textPost)
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
                    onClick={onAddPost}
                    className={style.postBtn}>Add Post
                </button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}