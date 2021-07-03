import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {addPost, ProfilePageType, updateNewPostText} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStateToPropsType = {
    profilePage: ProfilePageType
}

type MapDispatchToPropsType = {
    updateNewPostText: (textPost: string) => void
    addPost: () => void
}

export type MyPostsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewPostText: (textPost: string) => {
            dispatch(updateNewPostText(textPost))
        },
        addPost: () => {
            dispatch(addPost())
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)