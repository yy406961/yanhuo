## 表格

## table实例参数说明

``` vue
    import tableDemo from './table'

    <tableDemo :option = "tableOpt"  :comSize="comSize"
        @handleCurrentPageChange="handleCurrentPageChange"
        @handleSizePageChange = "handleSizePageChange"
        @handleSelectionChange="handleSelectionChange"
        @operateSaveHandler="saveClick"
        @operateDelHandler="delClick">
    </tableDemo>
```
1. 组件路径

   example/table/table.vue

2. option

属性 | 含义 | 类型 |常量值
---|---|---|--
listLoading | 是否加载loading效果 | boolean |
scrollLoading | 是否使用列表数据懒加载 | boolean |
scrollListContainer | 列表容器的 id | string |
scrollListLength | 列表数据懒加载时，每次加载的条数，与 scrollLoading 配合同时使用 | number |
stripe | 斑马纹|boolean|
column | 表格列 |array|
data | 表格数据 |array|
pagination| 是否分页| boolean |
pageOpt | 分页参数 | object |
cellClick | 单元格点击触发事件 | function |
rowClick | 行点击触发事件 | function |
rowHeight | 行高设置 | string

* column 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
name | header标题字段名 | string |
value | 数据对应字段名 | string|
width | 表格列宽度 |number|
edit | 该列是否可编辑 | boolean |
widthType | 是否根据内容计算最大宽度 | boolean | true/false
fixed | 列固定 | string | left/right
tooltip | 超出宽度隐藏划过显示tip | boolean | true/false
highlightKey | 是否高亮某些文本内容 | boolean | true/false
keys | 需要高亮显示的内容 | array |
align | 对齐 | string | left/center/right 默认left
operations | 操作 | Array | [{...}, {...}]


* operations 说明

属性 | 含义 | 类型 |常量值
---|---|---|---
label | 按钮名称 | string |
type | 图标设置'icon' 和`callback`组合使用、文字设置'label' | string |
callback{type} | 回调处理`row` 返回一个class字符串 | function
click{type} | 按钮点击事件 | function |
disabled | 按钮是否可用 | boolean | true/false


* pageOpt 说明

属性 | 含义 | 类型 |常量值
---|---|---|--
total | 总记录数 | number |
pageSizes | 每页显示个数选择器的选项设置 | array
pageSize | 每页显示条目个数 |number|

```JS
tableOpt: {
    // 是否使用列表数据懒加载
    scrollLoading: true,
    // 是否使用列表数据懒加载
    scrollListContainer: 'containerId',
    // 列表数据懒加载时，每次加载的条数，与 scrollLoading 配合同时使用
    scrollListLength: 10,
    // 是否显示表格加在loading效果，ELMENT默认loading效果
    listLoading: false,
    // 	是否为斑马纹 table
    stripe: false,
    // 表格列 ，value值为数据对应字段名，width不写自适应，edit指示该行是否可编辑
    column: [
        /**
         * 首列是否显示序号、复选框index/selection
         * 序号分为单重序号和多重序号，单重序号 value 为 index，多重序号为 multipleIndex
         * */
        {name: '序号', value: 'index', width: 80},
        {name: '事件名称', value: 'name', width: 300, edit: true},
        {name: '敏感事件ID', value: 'id', width: 150, edit: true},
        {name: '事件创建时间', value: 'createTime', width: 150},
        {name: '事件摘要', value: 'abstract', edit: true},
        {name: '操作', value: '', width: 150, operations: [
            { label: '修改', type: 'label', icon: 'edit', click: me.editClick, disabled: true },
            { label: '删除', type: 'label', icon: 'close', click: me.deleteClick, callback (row) {
                this.disabled = true;
            } },
            { label: '提交', type: 'label', icon: 'check', click: me.commitClick },
            { label: '追加', type: 'label', icon: 'plus' }
        ]}
    ],
    // 表格加在数据
    data: [],
    // 是否分页
    pagination: true,
    // 分页参数
    pageOpt: {
        total: 100,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10
    },
    // 单元格点击事件
    cellClick: function(row, column, cell, event) {
        console.log(row);
        console.log(column);
        console.log(cell);
        console.log(event);
    },
    // 行点击事件
    rowClick: function(row, event, column) {
        console.log(row);
        console.log(event);
        console.log(column);
    }
}
```

* comSize

```JS
    {
        // 表格整体高度，如果存在分页，表格数据显示区高度为height-分页高度
        height: 1000
    }
```
* Events

事件名称 | 说明 | 回调参数
---|---|---|
handleCurrentPageChange | currentPage 改变时会触发 | 参数当前页currentPage
handleSizePageChange | pageSize 改变时会触发 |参数每页条数size
handleSelectionChange | 有复选框，当选择项发生变化时会触发该事件 | 选中项纪录值
operateSaveHandler | 保存操作 | 当前行记录
operateDelHandler | 删除操作 | 当前行记录

* 实例方法
方法名称 | 说明 | 参数
---|---|---
setColumnKeys | 动态设置某一列高亮 | `{string} columnId`,`{Array} 数组`
