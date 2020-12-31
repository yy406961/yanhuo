## 公共组件

## 选框样式组件使用

``` VUE
import square from 'components/common/square'

<square title="这里写标题" :minHeight="380">这里定义内容</square>
```

* 备注
  title是左上角显示的标题，类型为字符串
  minHeight为最小高度，默认380px

## 弹框组件使用

``` VUE
import sysDialog from 'components/common/dialog'

<sysDialog size="small" :dialogVisible="dialogVisible" title="我是标题" :okFn="okFn" @change="dialogChange">
    <div>主体内容</div>
</sysDialog>
```
* option 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
dialogVisible | 是否显示弹框 | boolean | true显示，false隐藏
title | 标题 | string |
okText | 确定按钮文字 | string | 不传默认为确定
showConfirm | 是否显示确定按钮 | boolean | 默认显示
cancleText | 取消按钮文字 | string | 不传默认为取消
showCancel | 是否显示取消按钮 | boolean | 默认显示
size | 弹框大小 | string | 可传值 tiny/small/large/full，默认为small
okFn | 确认方法 | function | 不传默认弹框取消
cancleFn | 取消方法 | function | 不传默认弹框取消

```js
{
    data() {
        return {
            dialogVisible: ture
        }
    },
    methods: {
        dialogChange (val) {
            this.dialogVisible = val
        },
        okFn () {
            this.dialogVisible = false
        }
    }
}
```
