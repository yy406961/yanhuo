
/**
 * [buildData 构建数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const buildData = (data) => {
    let __chartName__ = 'treemap'
    let categories = []
    let datas = []
    if (data) {
        data.forEach(item => {
            categories.push(item.name || '')
            datas.push({
                name: item.appName,
                value: item.value || 0,
                info: item.info,
                dataObj: item
            })
        })
    }
    let seriesObj = {
        type: __chartName__,
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: 'white' // color of value
                },
                textAlign: 'center',
                formatter: '{b} {c}%'
            }
        },
        left: 'left',
        width: '100%',
        height: '100%',
        roam: false,
        nodeClick: false,
        breadcrumb: {
            show: false
        }
    }
    seriesObj.data = datas;
    let option = {
        series: [seriesObj],
        tooltip: {
            show: true,
            formatter: '{b} {c}%'
        }
    }

    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
