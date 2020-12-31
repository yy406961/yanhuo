import { ajax } from 'common'

const getUrl = () => {
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '' : 'http://192.168.3.157:8080/policeBusiness'
    return `${apiUrl}/menu/getMenuInfo`
}

export const getMenuList = () => {
    return ajax.get(getUrl())
}

export const loginUser = (payload) => {
    return ajax.post('/login/userLogin', payload)
}

//  ukey登录
export const loginUkey = (payload) => {
    return ajax.post('/login/ukeyLogin', payload)
}

export const logoutUser = () => {
    return ajax.get('/login/userExit')
}

export const getSelectHome = () => {
    return ajax.get('/home/selectHome')
}
