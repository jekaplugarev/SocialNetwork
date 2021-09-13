import {follow, followSuccess, toggleIsFollowingProgress, unfollow, unfollowSuccess} from "./users-reducer";
import {APIResponseType, usersAPI} from "../api/api";

jest.mock("../api/api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    const result: APIResponseType = {
        resultCode: 0,
        messages: [],
        data: {},
        fieldsErrors: []
    }

    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

test('success follow thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, 1))
})