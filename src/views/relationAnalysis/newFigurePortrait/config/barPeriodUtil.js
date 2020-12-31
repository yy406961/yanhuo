
/**
 * [buildData 构建数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const buildData = (data, props) => {
    let { xName, yName, titleName } = props
    let __chartName__ = 'bar'
    let categories = []
    let dataArr = []
    for (let i = 0; i < 24; i++) {
        categories.push(i)
    }
    if (data) {
        data.forEach(item => {
            dataArr.push({
                type: __chartName__,
                stack: '统计',
                name: item.name,
                data: item.data || item.sub
            })
        })
    }
    let nameColor = '#00d8f1'
    let option = {
        series: dataArr,
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 0 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            formatter: function (params) {
                let axisName = titleName + '：' + params[0].axisValue
                let nameVal = ''
                params.forEach((item) => {
                    let span = `<div style="width: 8px;height: 8px;display: inline-block;
                background: ${item.color};margin-right: 5px"></div>`
                    nameVal += span + item.seriesName + '：' + item.data + '<br/>'
                })
                return `${axisName} <br/> ${nameVal}`
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '14%',
            width: '100%',
            height: '86%',
            containLabel: true
        },
        xAxis: [
            {
                name: xName,
                type: 'category',
                data: categories,
                // 坐标轴名称的文字样式
                nameTextStyle: {
                    color: nameColor
                },
                // 坐标轴在 grid 区域中的分隔线
                splitLine: {
                    show: false
                },
                // 坐标轴刻度标签
                axisLabel: {
                    interval: 0,
                    show: true,
                    textStyle: {
                        color: '#EEE'
                    }
                },
                // 坐标轴轴线
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: yName,
                nameLocation: 'end',
                nameTextStyle: {
                    color: nameColor
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    textStyle: {
                        color: '#EEE'
                    }
                }
            }
        ]
    }

    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
