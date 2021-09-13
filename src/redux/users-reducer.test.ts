import {followSuccess, unfollowSuccess, UsersPageType, usersReducer} from "./users-reducer";

let state: UsersPageType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Jeka 0', followed: false, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Jeka 1', followed: false, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 2, name: 'Jeka 2', followed: true, photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 3, name: 'Jeka 3', followed: true, photos: {small: null, large: null}, status: 'status 0'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})