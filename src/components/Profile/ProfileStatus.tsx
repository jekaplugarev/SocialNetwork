import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
// type StateType = {
//     state: {
//         editMode: boolean
//         status: string
//     }
// }

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div style={{marginTop: '15px'}}>
                    <span onDoubleClick={this.activateEditMode}>
                        {this.props.status}
                    </span>
                </div>
                }
                {this.state.editMode &&
                <div style={{marginTop: '15px'}}>
                    <input
                        onChange={this.onStatusChange}
                        value={this.state.status}
                        onBlur={this.deactivateEditMode}
                        autoFocus={true}
                    />
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus