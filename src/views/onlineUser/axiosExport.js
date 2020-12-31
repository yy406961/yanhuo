// Axios拦截请求并实现下载
import axios from 'axios'

// download url
export const downloadUrl = (url) => {
    console.log(url)
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
        document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
}

// Add a response interceptor
axios.interceptors.response.use(res => {
    if (res.data.status && res.data.status === 300) {
        return '300' // 链接正确，下载失败
    } else {
        downloadUrl(res.request.responseURL)
        return '200' // 链接正确，下载成功
    }
}, error => {
    // Do something with response error
    return error // 链接错误
})

export default axios
