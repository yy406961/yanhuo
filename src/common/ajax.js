import { Message } from 'element-ui'
import axios from 'axios'
import { NOTIFY_CLOSE_TIME } from 'constant/BizServiceConfig'
import qs from 'qs'
// import store from 'store'

const CancelToken = axios.CancelToken;
// eslint-disable-next-line no-unused-vars
let cancel;

const service = axios.create({
    baseURL: process.env.MOCK_URL,
    timeout: 180000
    // withCredentials: true
})

const sendMessage = (msg, type) => {
    if (type === 'error') {
        Message({
            message: msg,
            type
        })
    } else {
        Message({
            message: msg,
            type,
            duration: NOTIFY_CLOSE_TIME
        })
    }
}

/**
 * 通用request封装
 * @param method
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const request = (method, url, data, config = {}) => {
    const options = Object.assign({}, config, {
        url,
        method,
        data,
        cancelToken: new CancelToken(c => {  // 强行中断请求要用到的
            cancel = c
        })
    })
    options.headers = options.headers || {}
    return new Promise((resolve, reject) => {
        service
            .request(options)
            .then(res => {
                const data = res.data
                const status = res.status
                if (status === 200) {
                    //  查询类成功
                    if (data.status === 200) {
                        resolve(data)
                        // 保存、删除、修改成功
                    } else if (data.status === 201 || data.status === 202) {
                        // sendMessage(data.message, 'success')
                        resolve(data)
                        // 300 失败
                    } else if (data.status === 300) {
                        // sendMessage(data.message, 'error')
                        reject(data)
                    }
                }
                if (status === 202) {
                    // 清空 重新登录
                    window.$VUEStore.dispatch('global/disposeExitLoginService')
                }
                if (data.HasError) {
                    if (!res.config.notNotifyError) {
                        sendMessage(data.message, 'error')
                    }
                    reject(res)
                }
                resolve(data)
            })
            .catch(res => {
                if (res.message === 'interrupt') {
                    console.log('已中断请求');
                    return;
                } else {
                    console.log(res)
                    // if (!res.config.notNotifyError) {
                    //     console.log('请求失败,请查看服务器信息')
                    // }
                    reject(res)
                }
            })
    })
}

export const ajax = {
    get(url, config) {
        return request('get', url, null, config)
    },
    delete(url, data, config) {
        return request('delete', url, data, config)
    },
    head(url, config) {
        return request('head', url, null, config)
    },
    post(url, data, config = {}) {
        if (!config.headers) {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        return request('post', url, qs.stringify(data), config)
    },
    put(url, data, config = {}) {
        config.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        return request('put', url, data, config)
    },
    patch(url, data, config) {
        return request('path', url, qs.stringify(data), config)
    },
    setCommonHeader(key, value) {
        service.defaults.headers.common[key] = value
    },
    cancelAjax() {
        cancel('interrupt')
    }
}
