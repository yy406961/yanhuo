/**
 * mutation 常量规则
 *
 * 类型 + 模块 + 自定义name
 *
 * 类型如下
 *  获取state以 GET_  开头
 *  保存state以 SAVE_ 开头
 *  修改state以 UPDATE_ 开头
 *  删除state以 DELETE_ 开头
 *
 * 模块为业务模块
 *   例如全局模块 global
 *
 * 业务名称
 *    例如 menuList
 *
 * 最终的常量名称为
 *   GET_GLOBAL_MENULIST
 */
/**
 * [constantFactory 构建mutation常量]
 * @param  {[type]} mod   模块名称
 * @param  {[type]} names 自定义业务名称集合
 */
const constantFactory = (mod, names) => {
    const obj = Object.create(null);
    const types = ['GET', 'SAVE', 'UPDATE', 'DELETE'];
    names.map(name => {
        types.forEach(type => {
            let key = `${type}_${mod}_${name}`
            key = key.toUpperCase()
            obj[key] = key;
        })
    })
    return obj;
}

/**
 * 全局键值
 */
export const global = constantFactory(
    'global',
    [
        'menuList',
        'routerData',
        'alaInfoList',
        'funInfoList',
        'visualHeight',
        'dataType',
        'userId',
        'userName',
        'userNick',
        'GK',
        'menuState',
        'rollState'
    ]
)

export const taskTypes = constantFactory('task', ['funcTaskList', 'showTime'])
