import {addMessageCreator, DialogsPageType, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    updateNewMessageText: (textMessage: string) => void
    sendMessage: () => void
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
        sendMessage: () => {
            dispatch(addMessageCreator())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)