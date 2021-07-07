import React from "react";
import Header from './Header';
import axios from 'axios';
import { connect } from "react-redux";
import {AuthType, setAuthUserData} from '../../redux/auth-reducer';

type MapDispatchToPropsType = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null) => void
}
export type HeaderContainerPropsType = AuthType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true
            })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header/>
        )
    }
}

const mapStateToProps = (state: AuthType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);