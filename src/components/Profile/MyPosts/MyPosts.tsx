import React, {LegacyRef} from 'react';
import {DialogsPageType, PostsDataType, PostsType, ProfilePageType} from '../../../redux/store';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {MyPostsContainerPropsType} from './MyPostsContainer';

// export type MyPostsType = {
//     newPostText: string
//     profilePage: ProfilePageType
//     addPost: () => void
//     updateNewPostText: (textPost: string) => void
// }

export const MyPosts: React.FC<MyPostsContainerPropsType> = (props) => {
    let postsElements = props.profilePage.postsData.map((p: PostsType) => <div key={p.id}><Post message={p.message}
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
                    value={props.profilePage.newPostText}
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