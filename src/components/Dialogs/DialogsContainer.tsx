import {addMessageCreator, DialogsPageType, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {AuthPropertiesType} from '../../redux/auth-reducer';
import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
    auth: AuthPropertiesType
}

type MapDispatchToPropsType = {
    updateNewMessageText: (textMessage: string) => void
    addMessage: () => void
}

export type DialogsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (textMessage: string) => {
            dispatch(updateNewMessageTextCreator(textMessage))
        },
        addMessage: () => {
            dispatch(addMessageCreator())
        }
    }
}

const AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)