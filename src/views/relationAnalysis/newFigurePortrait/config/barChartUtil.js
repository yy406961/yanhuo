
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
        label: {
            normal: {
                show: true,
                position: 'right',
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
        z: 3,
        zlevel: 3
    }
    seriesObj.data = datas;
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
                type: 'slider',
                orient: 'vertical',
                height: props.dataZoomHeight,
                start: 0,
                end: 20,
                handleSize: '60%',
                // showDataShadow: false,
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                top: 18,
                right: '1%',
                textStyle: {
                    color: '#fff'
                },
                // filterColor: '#ffffff',
                // dataBackgound: {
                //
                // },
                backgroundColor: '#00CCFF'
            }
        ],
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            width: '90%',
            height: '95%',
            containLabel: false
        },
        xAxis: [
            {
                name: xName,
                type: 'value',
                nameTextStyle: {
                    color: nameColor
                },
                axisLabel: {
                    show: false,
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
                    interval: 0,
                    show: false,
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
