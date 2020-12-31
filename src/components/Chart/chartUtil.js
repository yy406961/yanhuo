
/**
 * [buildData 构建数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const buildData = (data, props) => {
    let { xName, yName } = props
    let __chartName__ = 'bar'
    let categories = []
    let datas = []
    if (data) {
        data.forEach(item => {
            categories.push(item.name || '')
            datas.push({
                name: item.name,
                value: item.value || 0,
                info: item.info,
                dataObj: item,
                group: 'noGroup'
            })
        })
    }
    let seriesObj = {
        type: __chartName__,
        barWidth: '14',
        label: {
            normal: {
                show: true,
                position: 'insideRight',
                textStyle: {
                    color: 'white' // color of value
                }
            }
        },
        itemStyle: {
            normal: {
                color: '#00ccff'
            }
        }
    }
    seriesObj.data = datas;
    let nameColor = '#00d8f1'
    let option = {
        series: [seriesObj],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}:{c}'
        },
        grid: {
            left: '20%',
            right: '20%',
            bottom: '10%',
            top: '20%',
            containLabel: true
        },
        xAxis: [
            {
                name: xName,
                type: 'value',
                nameTextStyle: {
                    color: nameColor
                },
                axisLabel: {
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
                },
                splitLine: false,
                boundaryGap: ['0%', '5%']
            }
        ],
        yAxis: [
            {
                name: yName,
                nameTextStyle: {
                    color: nameColor
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
                    show: true,
                    textStyle: {
                        color: '#EEE'
                    }
                },
                data: categories
            }
        ]

    }

    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
