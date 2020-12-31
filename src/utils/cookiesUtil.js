import Cookies from 'js-cookie'

export const setCookies = obj => {
    if (typeof obj === 'object') Object.keys(obj).forEach(item => Cookies.set(item, obj[item]))
}

export const getCookies = key => {
    return Cookies.get(key)
}
