import {addPost, deletePost, ProfilePageType, profileReducer} from './profile-reducer';
import {v1} from 'uuid';

//1. test data
let state: ProfilePageType = {
    postsData: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 20},
        {id: '1', message: 'It\'s my first post', likesCount: 20}
    ],
    profile: null,
    status: ''
}

test('New post should be added', () => {
    let action = addPost('Hello user!')

    //2. action
    let newState = profileReducer(state, action)

    //3. expected
    expect(newState.postsData.length).toBe(4)
})

test('Message of new post should be correct', () => {
    let action = addPost('Hello user!')

    //2. action
    let newState = profileReducer(state, action)

    //3. expected
    expect(newState.postsData[3].message).toBe('Hello user!')
})

test('Length of message should be decrement', () => {
    let action = deletePost('1')

    //2. action
    let newState = profileReducer(state, action)

    //3. expected
    expect(newState.postsData.length).toBe(2)
})

test('Length of message not should be decrement', () => {
    let action = deletePost('100000')

    //2. action
    let newState = profileReducer(state, action)

    //3. expected
    expect(newState.postsData.length).toBe(3)
})