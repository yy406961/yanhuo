
/**
 * [buildData 构建数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const buildData = (data, props) => {
    let __chartName__ = 'pie'
    let datas = []
    if (data) {
        console.log(data)
        data.forEach(item => {
            datas.push({
                name: item.name,
                value: item.value || 0,
                selected: item.selected || false,
                dataObj: item
            })
        })
    }
    let seriesObj = {
        type: __chartName__,
        radius: props,
        center: ['50%', '50%'],
        selectedMode: 'single',
        selectedOffset: 10,
        label: {
            normal: {
                show: true,
                position: 'inner',
                formatter: '{b} {d}%'
            }
        }
    }
    seriesObj.data = datas;
    let option = {
        color: ['#36befc', '#3cf887', '#fbd13d'],
        series: [seriesObj]
    }

    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: '12'
    }
    return option
}
