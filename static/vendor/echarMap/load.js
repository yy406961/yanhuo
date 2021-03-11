/*
 * @Author: your name
 * @Date: 2020-11-23 16:23:34
 * @LastEditTime: 2021-03-10 17:26:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \yanhuo\static\vendor\echarMap\load.js
 */

;(function () {
    let worldMap = [
        // 'world',
        'china',
        'Africa'
    ]
    // let feizhouMap = [
    //     'feizhou'
    // ]
    let beijingMap = [
        'beijing',
        'changping'
    ]
    let ningxiaMap = [
        'ningxia',
        'yinchuan',
        'shizuishan',
        'wuzhong',
        'zhongwei',
        'guyuan'
    ]
    let qinghaiMap = [
        'qinghai',
        'xining',
        'haidong',
        'haibeizangzuzizhizhou',
        'huangnanzangzuzizhizhou',
        'hainanzangzuzizhizhou',
        'guoluozangzuzizhizhou',
        'yushuzangzuzizhizhou',
        'haiximengguzuzangzuzizhizhou'
    ]
    let hunanMap = [
        'hunan',
        'changsha',
        'changshaDetail',
        'zhuzhou',
        'changde',
        'chenzhou',
        'hengyang',
        'huaihua',
        'loudi',
        'shaoyang',
        'xiangtan',
        'yiyang',
        'yongzhou',
        'yueyang',
        'zhangjiajie',
        'xiangxitujiazumiaozuzizhizhou'
    ]
    let shanghaiMap = [
        'shanghai'
    ]
    let jilinMap = [
        'jilin',
        'jilinshi',
        'baicheng',
        'baishan',
        'liaoyuan',
        'siping',
        'songyuan',
        'tonghua',
        'yanbian',
        'changchun'
    ]
    let hainanMap = [
        'hainan',
        'sansha',
        'haikou'
    ]
    /**
     * [loadProvMaps 加载省级地图 ]
     * @param  {[type]} prov [description]
     * @return {[type]}      [description]
     */
    function loadProvMaps(prov, maps) {
        let addScript = src => {
            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script)
        }
        var fixed = `./static/vendor/echarMap/${prov}/`;
        for (let i = 0; i < maps.length; i++) {
            let path = fixed + maps[i] + '.js';
            addScript(path)
        }
    }
    loadProvMaps('world', worldMap)
    // loadProvMaps('world', feizhouMap)
    loadProvMaps('beijing', beijingMap)
    loadProvMaps('ningxia', ningxiaMap)
    loadProvMaps('qinghai', qinghaiMap)
    loadProvMaps('hunan', hunanMap)
    loadProvMaps('shanghai', shanghaiMap)
    loadProvMaps('jilin', jilinMap)
    loadProvMaps('hainan', hainanMap)
})()
