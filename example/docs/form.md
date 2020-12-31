## 表单

## 表单实例参数说明

``` VUE
import FormDemo from 'components/Form/index'

<FormDemo :option="formOpt" ref="form"></FormDemo>
```
* option 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
inline | form表单横排竖排 | boolean | true横排，false竖排
labelPos | label标签位置 | string | 可选 left/right/top ，默认right
labelWidth | label标签宽度 | string | 可选
defaultSlide | 默认伸缩状态 | boolean |true展开 false关闭
btnPos | 按钮位置 | string | 可选 right, 默认紧随之前标签
canSlider | 是否显示收缩箭头，收起显示一行 | boolean |
items | 表单项 | array |
btns | 按钮组 | array


* items，btns 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
label | 标签文本 | string |
type | 表单类型 | string | text/textNumber/select/date/radio/checkbox/switch/button
comOpt | 表单项参数 | object |

* items.comOpt 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
id | 表单id | string | 取值时对应关系
value | 值 | string |
disabled | 是否可用 | boolean |
show | 是否显示 | boolean |
data |  数据 ，仅对autoCompletet/select/radio/checkbox有效 | array |
isAll | 是否显示全部，仅对select有效 | boolean
multiple | 是否多选，仅对select有效 | boolean
change | 选中值发生变化时触发，仅对select/radio/checkbox/date有效 | function |
click | 点击事件,仅对switch/button 有效 | function |
text | 开关文本，仅对switch有效 | string |
onText | 开关左侧文本，仅对switch有效 | string |
offText | 开关右侧文本，仅对switch有效 | string |
width | 开关宽度 | number |
btnType | 按钮样式 | rightTop(缺少右上角)| leftTop(缺少左上角) |
                         rightBottom(缺少右下角)|leftBottom(缺少左下角)
isStart: | 系统时间往前推一天的日期，仅对时间组件有效 |

* btns.comOpt 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
value | 值 | string |
disabled | 是否可用 | boolean |
click | 点击事件,仅对switch/button 有效 | function |

* form.method 说明

事件名称 | 说明 | 回调参数
---|---|---|
getContainerHeight|获取当前form表单容器高度| height
getValue | 获取form表单所有item的值|返回数组对象[{id: 'txt1', value: 'aaa'}] |
setValue | 设置form表单项值 | 数组对象 [{id: 'txt1', value: 'aaa'}]
setOtherAttribute | 设置表单项属性值 | id,attr,data
setItemData | 设置表单项data值，可用setOtherAttribute替代 | id,data

```JS
{
    // form 表单true横排，false竖排
    inline: true,
    // 表单项
    items: [{
        label: '活动名称',
        type: 'text',
        comOpt: {
            id: 'yq1',
            value: 'hello',
            disabled: true
        }
    }, {
        label: '活动人数',
        type: 'textNumber',
        comOpt: {
            id: 'yq2',
            value: 10,
            disabled: false
        }
    }, {
        label: '产品名称',
        type: 'select',
        comOpt: {
            id: 'yq3',
            value: '2',
            disabled: false,
            data: [{
                name: 'opt1', value: '1'
            }, {
                name: 'opt2', value: '2'
            }],
            change: function() {
            }

        }
    }, {
        label: '产品列表',
        type: 'select',
        comOpt: {
            id: 'yq4',
            value: [],
            disabled: false,
            // 全部
            isAll: true,
            multiple: true,
            data: [{
                name: 'opt1', value: '1'
            }, {
                name: 'opt2', value: '2'
            }],
            change: function() {
            }
        }
    }, {
        label: '年月日时分秒',
        type: 'date',
        comOpt: {
            id: 'yq5',
            value: '2017-5-24 10:00:00',
            disabled: false,
            type: 'datetime',
            pickOptions: {
                disabledDate(time) {
                    let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                    let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                    return !moment(cTime).isBetween(pDate, cDate);
                }
            }
        }
    }, {
        label: '年月日',
        type: 'date',
        comOpt: {
            id: 'yq6',
            value: '',
            disabled: false,
            type: 'date'
        }
    }, {
        label: '年月',
        type: 'date',
        comOpt: {
            id: 'yq7',
            value: '',
            disabled: false,
            type: 'month'
        }
    }, {
        label: '年',
        type: 'date',
        comOpt: {
            id: 'yq8',
            value: '',
            disabled: false,
            type: 'year'
        }
    }, {
        label: '特殊资源',
        type: 'radio',
        comOpt: {
            id: 'yq9',
            value: '1',
            disabled: false,
            data: [{
                name: 'opt1', value: '1'
            }, {
                name: 'opt2', value: '2'
            }],
            change: function() {
            }
        }
    }, {
        label: '活动性质',
        type: 'checkbox',
        comOpt: {
            id: 'yq10',
            value: ['1', '2'],
            disabled: false,
            data: [{
                name: 'opt1', value: '1'
            }, {
                name: 'opt2', value: '2'
            }, {
                name: 'opt3', value: '3'
            }, {
                name: 'opt4', value: '4'
            }],
            change: function() {
            }
        }
    }, {
        label: '即时配送',
        type: 'switch',
        comOpt: {
            id: 'yq11',
            value: true,
            disabled: false,
            text: '',
            onText: '实时',
            offText: '历史',
            width: 100,
            click: function(value) {
                this.value = value;
            }
        }
    },{
        label: '目标号码',
        type: 'autoCompletet',
        comOpt: {
            id: 'yq12',
            value: '',
            disabled: false,
            width: 100
            data: [{
                 value: '15312345678'
            }, {
                  value: '18312345678'
            }, {
                  value: '15512345678'
            }, {
                  value: '17712345678'
            }]
        }
    }],
    btns: [
        {
            label: '',
            type: 'button',
            comOpt: {
                // id: 'yq12',
                value: '查询3',
                disabled: false,
                //  这个属性不写 为默认正常样式
                btnType: rightTop(缺少右上角)| leftTop(缺少左上角) |
                         rightBottom(缺少右下角)|leftBottom(缺少左下角)
                click: function() {
                    console.log(me.$refs.form.getValue());
                }
            }
        }, {
            label: '',
            type: 'button',
            comOpt: {
                // id: 'yq12',
                value: '查询4',
                disabled: false,
                click: function() {
                    console.log(me.$refs.form.getValue());
                }
            }
        }
    ]
}
```
