import { provinceMap } from 'common/areaMap'
import BMap from 'BMap'
/**
 * [getIntervalDate 获取距离系统n天的日期]
 * @param  {n}  num            [需要往前推的天数，负数表示往后推]
 */
export const getIntervalDate = (n = 0) => {
    // let gTime = localStorage.gTime
    let gTime = sessionStorage.gTime
    // let { gTime } = JSON.parse(sessionStorage.getItem('globalKeys'))
    let ms = new Date(gTime).getTime() - 24 * n * 3600 * 1000
    return new Date(ms)
}
//  设置日期格式
export const formatTime = date => {
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute
}

/**
 * [startDrag 拖拽目标选择框方法]
 * @param  {bar}  this.$refs.table            [需要拖动的元素]
 * @param  {target}  this.$refs.table         [需要拖动的元素]
 * @param  {callback}                         [不用传]
 * this.$nextTick(() => {
        let bar = this.$refs.table
        startDrag(bar, bar)
    })
 */
export const startDrag = (bar, target, callback) => {
    let params = {
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
    }
    // 获取相关CSS属性
    let getCss = function(o, key) {
        return o.currentStyle
            ? o.currentStyle[key]
            : document.defaultView.getComputedStyle(o, false)[key]
    }
    if (getCss(target, 'left') !== 'auto') {
        params.left = getCss(target, 'left')
    }
    if (getCss(target, 'top') !== 'auto') {
        params.top = getCss(target, 'top')
    }
    // o是移动对象
    bar.onmousedown = function(event) {
        params.flag = true
        if (!event) {
            event = window.event
            // 防止IE文字选中
            bar.onselectstart = function() {
                return false
            }
        }
        let e = event
        params.currentX = e.clientX
        params.currentY = e.clientY
    }
    document.onmouseup = function() {
        params.flag = false
        if (getCss(target, 'left') !== 'auto') {
            params.left = getCss(target, 'left')
        }
        if (getCss(target, 'top') !== 'auto') {
            params.top = getCss(target, 'top')
        }
    }
    document.onmousemove = function(event) {
        let e = event || window.event
        if (params.flag) {
            var nowX = e.clientX
            var nowY = e.clientY
            var disX = nowX - params.currentX
            var disY = nowY - params.currentY
            target.style.left = parseInt(params.left) + disX + 'px'
            target.style.top = parseInt(params.top) + disY + 'px'
            if (event.preventDefault) {
                event.preventDefault()
            }
            return false
        }

        if (typeof callback == 'function') {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY)
        }
    }
}

/**
 * [forbiddenDate 选择日期范围]
 * @param  {Date} time                       [选择的日期]
 * @param  {Date}  lastDate=new  Date()      [可选的最后日期]
 * @param  {Number} [duration=180]          [间隔时间 默认6个月 ]
 * @return {Boolean}  [true:xxxx, false:xxxxxx]
 */
export const forbiddenDate = (time, lastDate, duration = 180) => {
    // let { gTime } = JSON.parse(sessionStorage.getItem('globalKeys'))
    let gTime = sessionStorage.gTime
    let dateNew
    if (lastDate) {
        dateNew = lastDate
    } else {
        dateNew = gTime
    }
    // let dateNew = lastDate ? lastDate : gTime
    let cDate = moment(dateNew).format('YYYY-MM-DD HH:mm:ss')
    let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
    let pDate = moment(dateNew)
        .subtract(duration, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
    return !moment(cTime).isBetween(pDate, cDate)
}

export const ts2Date = ts => {
    return moment(new Date(ts)).format('YYYY-MM-DD HH:mm:ss')
}

export const addMarkId = payload => {
    let markId =
        moment(new Date()).format('YYYYMMDDHHmmss') +
        new Date()
            .getTime()
            .toString()
            .substr(-4, 4)
    if (typeof payload === 'object') {
        payload.markId = parseInt(markId)
        return payload
    } else {
        return payload
    }
}

/**
 * [pointRandom 防止点打在一块方法]
 * @param  {point}  points.longtitude \ points.latitude      [需要在地图上打的的点的坐标]
 * pointRandom(points.longtitude) \ pointRandom(points.latitude)
 */
export const pointRandom = point => {
    point = Number(point)
    let ran = (Math.random() * 1.2 + 0.5) * 1e-4
    let ranNumber = Math.floor(Math.random() * 2)
    if (ranNumber === 0) {
        return point - ran
    } else {
        return point + ran
    }
}

/**
 * 列表前端分页
 * @param {Array<Object>} data 需要分页的完整数据
 * @param {number} curPageNum 当前页页码
 * @param {number} pageSize 每显示的条数
 * @return {Array<Object>} 分页后当前页需要显示的数据
 */
export const setTablePage = (data, curPageNum, pageSize) => {
    let n = curPageNum * pageSize
    let list = []
    for (let m = n - pageSize; m < n; m++) {
        if (data && data[m]) {
            list.push(data[m])
        }
    }
    return list
}
/**
 * null的数据转化为其他内容
 * @param {data} data 需要判断的数据
 * @param {result} 目标内容
 */
export const notNull = (data, result = '----') => {
    let val
    if (data && data !== 'null') {
        val = data
    } else {
        val = result
    }
    return val
}
/**
 * 把电话号码中间4位****显示
 * @param {data} data 需要改变的手机号
 * @param {phone} 改变之后的号码
 */
export const phoneNumChange = data => {
    let phone
    if (data === null || data === undefined) return data
    data = String(data)
    if (data.substr(0, 2) === '86') {
        phone = data.replace(/(\d{5})\d{4}(\d{4})/, '$1****$2')
    } else {
        phone = data.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return phone
}

/**
 * 中文字母数字混合的字符串的长度判断
 * @param {message} 需要验证的字符串
 * @param {MaxLenght} 字符串最长的长度
 */
export const getStrLenght = (message, MaxLenght) => {
    let strlenght = 0; // 初始定义长度为0
    let txtval = $.trim(message);
    for (let i = 0; i < txtval.length; i++) {
        if (isCN(txtval.charAt(i)) === true) {
            strlenght = strlenght + 2; // 中文为2个字符
        } else {
            strlenght = strlenght + 1; // 英文一个字符
        }
    }
    return strlenght > MaxLenght
}

// 判断是不是中文
export const isCN = str => {
    let regexCh = /[u00-uff]/;
    return !regexCh.test(str);
}
// 判断是否删除这个点, 经纬度不完整时
export const isPoint = (lat, lng) => {
    let reg = /^[0-9]+.?[0-9]*$/
    return reg.test(lat) && reg.test(lng)
}
// 热度图图例相关
// 计算gps热力图图例最大值 算法为：gps人数最大值 * （总在线人数 / 总gps人数）* （100 / 121）
/**
 * 中文字母数字混合的字符串的长度判断
 * @param {legendRatio} 需要验证的字符串
 * @param {heatMax} gps人数最大值
 * @param {onlineNum} 总在线人数
 * @param {allHeatNum} 总gps人数
 */
export const heatLenged = (legendRatio, heatMax, onlineNum, allHeatNum) => {
    let max = 0
    if (heatMax) {
        legendRatio = (onlineNum / allHeatNum) * (100 / 121)
        max = heatMax * legendRatio
    }
    let obj = {
        legendRatio: legendRatio,
        lengedObj: [
            {
                color: 'red',
                range: `100 - 150`
            }, {
                color: 'rgb(242, 248, 90)',
                range: `60 - 100`
            }, {
                color: 'rgb(123, 240, 123)',
                range: `30 - 60`
            }, {
                color: 'rgb(0,42, 255)',
                range: `0 - 30`
            }
        ]
    }
    if (Math.floor(max * 0.9) > 100) {
        obj.lengedObj = [
            {
                color: 'red',
                range: `${Math.floor(max * 0.9)} - ${Math.floor(max)}`
            },
            {
                color: 'rgb(242, 248, 90)',
                range: `${Math.floor(max * 0.6)} - ${Math.floor(max * 0.9)}`
            },
            {
                color: 'rgb(123, 240, 123)',
                range: `${Math.floor(max * 0.3)} - ${Math.floor(max * 0.6)}`
            },
            {
                color: 'rgb(0,42, 255)',
                range: `0 - ${Math.floor(max * 0.3)}`
            }
        ]
    }
    return obj
}
export const getBoundary = map => {
    let str = JSON.parse(sessionStorage.getItem('globalKeys')).gMapKey
    let pArr = [
        {
            lat: 59.0,
            lng: 73.0
        },
        {
            lat: 59.0,
            lng: 136.0
        },
        {
            lat: 3.0,
            lng: 136.0
        },
        {
            lat: 3.0,
            lng: 73.0
        },
        {
            lat: 59.0,
            lng: 73.0
        }
        // {
        //     lat: 21.40,
        //     lng: 111.2
        // },
        // {
        //     lat: 18.08,
        //     lng: 111.2
        // },
        // {
        //     lat: 18.08,
        //     lng: 108.50
        // },
        // {
        //     lat: 21.40,
        //     lng: 108.50
        // }
    ]
    // 限定区域点数组
    let pointArr = []
    provinceMap[str].forEach(item => {
        let pbArr = item
        let ply = new BMap.Polygon(pbArr, {
            strokeWeight: 2,
            strokeColor: '#0d59ab',
            fillOpacity: 0.05
            // fillColor: '#101c32'
        });
        ply.disableMassClear()
        map.addOverlay(ply);
        let path = ply.getPath();
        pointArr = pointArr.concat(path);
        pArr = pArr.concat(path);
        pArr.push(pArr[0]);
    })
    map.setViewport(pointArr, {
        zoomFactor: 0
    });
    let inverse = new BMap.Polygon(pArr, {
        strokeOpacity: 0.0000001,
        strokeColor: '',
        strokeWeight: 0.00001,
        fillColor: '#E6E6FA',
        fillOpacity: 0.6
    });
    inverse.disableMassClear()
    map.addOverlay(inverse);
}
