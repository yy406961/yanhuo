
/**
 * [buildData 构建数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const buildData = (data, props) => {
    let { xName, yName } = props
    let __chartName__ = 'bar'
    let categories = []
    for (let i = 0; i < 25; i++) {
        categories.push(i)
    }
    let seriesObj = {
        type: __chartName__,
        label: {
            normal: {
                show: false,
                // position: 'right',
                textStyle: {
                    color: 'white' // color of value
                },
                formatter: '{b} ({c})'
            }
        },
        itemStyle: {
            normal: {
                color: '#00ccff'
            }
        },
        data: data,
        z: 3,
        zlevel: 3
    }
    let nameColor = '#00d8f1'
    let option = {
        series: [seriesObj],
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}:{c}'
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
                nameTextStyle: {
                    color: nameColor
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    textStyle: {
                        color: '#EEE'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
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
