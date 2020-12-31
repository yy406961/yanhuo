<template>
    <div ref="wrap">
        <div :id="option.scrollListContainer" class = 'ga-table' @mousewheel="tableMouseWheel">
            <el-table
                ref="multipleTable"
                :data = "tableListData"
                :stripe = "isstripe"
                :height = "height"
                :defaultSort = "option.defaultSort"
                :class="option.isborder === false ?'isnoborder':''"
                :highlight-current-row="option.highlightRow"
                v-loading.body="listLoading"
                @cell-click="cellClick"
                @row-click="rowClick"
                @sort-change="sortChange"
                @select-all="handleSelectAll"
                @select="handleSelect"
                @selection-change="handleSelectionChange"
                :row-style="rowStyle"
                :empty-text="emptyText"
            >
                <template v-for="(item,index) in tableColumn">
                    <el-table-column v-if="item.value === 'index' || item.value === 'selection'"
                                     :type = "item.value"
                                     :label="item.name"
                                     :width = "item.width"
                                     :align="item.align || 'left'"
                                     :fixed = "item.fixed"
                                     :class-name = "setClassName(item)">
                    </el-table-column>
                    <el-table-column v-else-if="item.value === 'level'"
                                     :label="item.name"
                                     :width = "item.width"
                                     :class-name = "setClassName(item)"
                                     :align="item.align || 'left'">
                        <el-table-column v-for="(items, index) in item.level"
                                         :key="index"
                                         :label="items.name"
                                         :width = "items.width"
                                         :align="items.align || 'left'">
                            <template slot-scope="scope">
                                <span>{{scope.row[items.value]}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column v-else-if="item.prop"
                                     :prop="item.prop"
                                     :type = "item.value"
                                     :label="item.name"
                                     :width = "item.width"
                                     :align="item.align || 'left'"
                                     :fixed = "item.fixed"
                                     :sortable= "item.sortable"
                                     :sort-orders="sortOrders"
                                     :class-name = "setClassName(item)">
                    </el-table-column>
                    <el-table-column v-else
                                     :label="item.name"
                                     :width = "item.width"
                                     :align="item.align || 'left'"
                                     :class-name = "setClassName(item)"
                                     :show-overflow-tooltip = "item.tooltip"
                                     :fixed = "item.fixed">
                        <template slot-scope="scope">
                            <div v-if = "item.highlightKey" v-html="highlightReplace(scope, item)"></div>
                            <!-- <div v-if = "item.highlightKey && !item.tooltip" v-html="highlightReplace(scope, item)">
                            </div>
                            <div v-if = "item.highlightKey && item.tooltip">
                                <el-tooltip placement="top" :popper-class="item.tooltipClass">
                                    <div slot="content" v-html="highlightReplace(scope, item)"></div>
                                    <span  v-html="highlightReplace(scope, item)"></span>
                                </el-tooltip>
                            </div> -->
                            <div v-else-if = "item.operations">
                                 <template v-for="(operate, opeIndex) in item.operations">
                                     <!-- <el-tooltip placement="top" :key="operate.label"
                                        :disabled="toolDisabled[scope.$index][opeIndex]">
                                         <div slot="content">
                                             <p class="ga-table__tootipText" v-text="operate.text"></p>
                                             <p class="ga-table__center">
                                                 <el-button :type="buttonColor(operate.label)" class="el-button--mini"
                                                        @click="operate.click(rowClickJM(scope.row), scope.$index, $event)">
                                                    确定
                                                </el-button>
                                                 <el-button type="primary" size="mini" @click="cancelFunc">取消</el-button>
                                             </p>
                                        </div>
                                    </el-tooltip> -->
                                    <button v-if="operate.type === 'icon'" :key="operate.label"
                                            style="border: none;background: transparent;outline: none"
                                            :class = "['fa', 'fa-' + operate.icon, operate.callback(scope.row, scope.$index)]"
                                            :disabled="operate.disabled"
                                            @click="operateClick(operate, opeIndex, item.operations, scope, $event)"
                                            :style="labelColor(operate.label)"></button>
                                    <el-button v-if="operate.type === 'label'" :key="operate.label"
                                            :class="['operateBtn', 'ga-table__operateLabel', operate.callback(scope.row, scope.$index)]"
                                            :disabled="operate.disabled"
                                            @click="operateClick(operate, opeIndex, item.operations, scope, $event)"
                                            :style="labelColor(operate.label)">
                                        {{ operate.label }}
                                    </el-button>
                                </template>
                            </div>
                            <div v-else-if = "item.dateIndex">
                                 <template v-for="(operate, index) in item.dateIndex">
                                    <el-button
                                    :key="operate.label"
                                    style="margin: 0px 5px;"
                                    :class="['operateBtn', { checked:operate.callback() }]"
                                    @click="operate.click(index)"
                                    :disabled="operate.disabled">
                                    {{ operate.label }}
                                    </el-button>
                                </template>
                            </div>
                            <div v-else-if = "item.type === 'icon'">
                                <i :class = "item.callback(scope.row, scope.$index)" @click="item.clickFn(scope.row,scope.$index, $event)"></i>
                            </div>
                            <div v-else-if = "item.color">
                                <div v-if="scope.row[item.value] === 1" class="ga-table__colorInstall">
                                    <i class="el-icon-check"></i>
                                </div>
                                <div v-else="scope.row[item.value] === 0" >
                                    <i style="font-size: 16px" class="fa fa-ban"></i>
                                </div>
                            </div>
                            <div v-else-if = "item.eventType">
                                <div v-if="scope.row[item.value] - 0 === 0" style="background: #0198F1" class="ga-eventType">
                                    &nbsp;
                                </div>
                                <div v-else-if="scope.row[item.value] - 0 === 1" style="background: #000267">
                                    &nbsp;
                                </div>
                                <div v-else-if="scope.row[item.value] - 0 === 2" style="background: #FDF21C">
                                    &nbsp;
                                </div>
                                <div v-else-if="scope.row[item.value] - 0 === 3" style="background: #00931B">
                                    &nbsp;
                                </div>
                            </div>
                            <div v-else-if="item.language">
                                <span>{{scope.row[item.value]}}</span>
                                <!-- <span v-if="item.tooltip && !isString(scope.row[item.value])">{{scope.row[item.value]}}</span>
                                <el-tooltip popper-class="specialLanguage" v-if="item.tooltip && isString(scope.row[item.value])" :content="scope.row[item.value]" placement="top">
                                    <span class="specialLanguage">{{scope.row[item.value]}}</span>
                                </el-tooltip> -->
                            </div>
                            <div v-else>
                                <!-- dialogTooltip -->
                                <span>{{scope.row[item.value]}}</span>
                                <!-- <span v-if="item.tooltip && !isString(scope.row[item.value])">{{scope.row[item.value]}}</span>
                                <el-tooltip :popper-class="item.tooltipClass" v-if="item.tooltip && isString(scope.row[item.value])" :content="scope.row[item.value]" placement="top">
                                    <span>{{scope.row[item.value]}}</span>
                                </el-tooltip> -->
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
        <pagination v-if="option.pagination" :option = "option.pageOpt" ref="pagination"
                    @handleCurrentChange = "handleCurrentChange"
                    @handleSizeChange = "handleSizeChange"></pagination>
    </div>
</template>
<script>
import pagination from './pagination'
import { mapGetters } from 'vuex'
import { phoneNumChange } from 'utils/index'
import { getSecurityRegExp } from 'utils/transform'
export default {
    name: 'GA_BaseTable',
    props: ['option', 'comSize'],
    data() {
        return {
            isstripe: true,
            sortOrders: ['ascending', 'descending'],
            tableIndexData: [],
            tableListData: [],
            height: 0,
            highlightRow: false,
            columnWidth: false,
            toolDisabled: [],
            listLoading: false,
            // 暂无数据
            emptyText: this.option.emptyText || '暂无数据',
            curNum: 1,
            isScrollAbled: true,
            currentPage: 1,
            isHandleSelectAll: false,
            // 原始电话map映射
            phoneMap: {},
            phoneReg: getSecurityRegExp(),
            btnType: 'warn'
        }
    },
    mounted() {
        let me = this
        this.setHeight(this.comSize.height)
        if (this.option.scrollLoading) {
            this.$nextTick(() => {
                let listContainer =
                    this.option.scrollListContainer.substr(0, 1) === '#'
                        ? this.option.scrollListContainer
                        : '#' + this.option.scrollListContainer
                $(listContainer)
                    .find('.el-table__body-wrapper')
                    .eq(0)
                    .scroll(function() {
                        let wrapperH = this.clientHeight
                        let contentH = $(this)
                            .find('table')
                            .eq(0)
                            .height()
                        let wScrollTop = $(this).scrollTop()
                        if (me.isScrollAbled && wScrollTop === contentH - wrapperH) {
                            me.curNum++
                        }
                    })
            })
        }
    },
    watch: {
        'comSize.height'(newVal) {
            this.setHeight(newVal)
        },
        'option.listLoading'(newval) {
            if (newval) {
                this.emptyText = ' '
            } else {
                this.emptyText = '暂无数据'
            }
            this.$nextTick(() => {
                this.listLoading = newval
            })
        },
        'option.emptyText'(newval) {
            if (newval === ' ') {
                this.emptyText = ' '
            } else {
                this.emptyText = '暂无数据'
            }
        },
        'option.data'(newval) {
            this.tableIndexData = _.cloneDeep(newval)
            this.tableIndexData.forEach((item, index) => {
                item.tableIndex = index
            })
            // this.$nextTick(() => {
            if (this.option.scrollLoading) {
                this.tableListData = []
                this.isHandleSelectAll = false
                if (this.curNum === 1) {
                    this.fetchScrollData()
                } else {
                    this.isScrollAbled = true
                    this.curNum = 1
                }
            } else {
                if (this.isPhoneJM) {
                    this.tableListData = this.getPhoneEncrypt(this.tableIndexData)
                } else {
                    this.tableListData = this.option.data
                }
            }
            // for (let i = 0; i < newval.length; i++) {
            //     this.toolDisabled[i] = [true, true, true, true, true, true, true, true, true]
            // }
            // })
        },
        curNum(newVal) {
            this.fetchScrollData(newVal)
        }
    },
    computed: {
        ...mapGetters({
            isPhoneJM: 'global/isPhoneJM'
        }),
        tableColumn() {
            let column = this.option.column
            let data = this.option.data
            let maxWidthColumn = []
            let maxColumnData = []
            column.forEach(it => {
                if (it.widthType && data.length) {
                    maxWidthColumn.push(it.value)
                }
                if (it.operations) {
                    it.operations.map(item => {
                        if (!item.callback) {
                            item.callback = function() {}
                        }
                    })
                }
                if (it.value === 'multipleIndex' && data.length) {
                    let curPage = this.currentPage
                    let curPageSize = this.option.pageOpt.pageSize
                    data.forEach((d, i) => {
                        d.multipleIndex = i + 1 + curPageSize * (curPage - 1)
                    })
                }
            })
            maxWidthColumn.forEach(it => {
                let arr = []
                let maxLength = 0
                data.forEach(d => {
                    if (d[it] !== null && d[it] !== undefined) {
                        arr.push(d[it].length)
                    }
                })
                maxLength = _.max(arr)
                maxColumnData.push({ column: it, value: maxLength })
            })

            maxColumnData.forEach(it => {
                column.forEach(c => {
                    if (it.column === c.value) {
                        c.width = it.value * 16 + 100
                    }
                })
            })
            return column
        }
    },
    components: {
        pagination
    },
    methods: {
        tableMouseWheel() {
            $('.el-tooltip__popper.is-dark').css({
                display: 'none'
            })
        },
        setRow(row) {
            this.$refs.multipleTable.setCurrentRow(row)
        },
        handleToggleRowSelection(rows, val) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(this.tableListData[row], val)
                })
            }
        },
        isString(str) {
            return typeof str === 'string' && str.constructor === String
        },
        toggleSelection() {
            $(this.$refs.multipleTable.$el)
                .find('.el-checkbox__inner')[0]
                .click()
        },
        handleCurrentChange(val) {
            this.$emit('handleCurrentPageChange', val)
            this.currentPage = val
        },
        handleSizeChange(val) {
            this.$emit('handleSizePageChange', val)
        },
        cellClick(row, column, cell, event) {
            if (this.option.cellClick && _.isFunction(this.option.cellClick)) {
                this.option.cellClick(this.rowClickJM(row), column, cell, event)
            }
        },
        rowClickJM(row) {
            let newRow = _.cloneDeep(row)
            let keys = Object.keys(newRow)
            keys.forEach(key => {
                if (this.phoneReg.test(key)) {
                    newRow[key] = this.phoneMap[newRow[key]]
                }
            })
            return this.isPhoneJM ? newRow : row
        },
        rowClick(row, event, column) {
            if (this.option.rowClick && _.isFunction(this.option.rowClick)) {
                let newRow = _.cloneDeep(row)
                let keys = Object.keys(newRow)
                keys.forEach(key => {
                    if (this.phoneReg.test(key)) {
                        newRow[key] = this.phoneMap[newRow[key]]
                    }
                })
                this.option.rowClick(this.rowClickJM(row), event, column)
            }
        },
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        handleSelect(val) {
            this.$emit('handleSelect', val)
        },
        // 复选框全选事件
        handleSelectAll(val) {
            if (val.length) {
                this.isHandleSelectAll = true // 全选
                this.$emit('handleSelectionChange', this.option.data)
            } else {
                this.isHandleSelectAll = false // 取消全选
                this.$emit('handleSelectionChange', [])
            }
        },
        // 复选框change事件
        handleSelectionChange(val) {
            let coData = _.cloneDeep(val)
            if (this.isPhoneJM) {
                coData = []
                this.tableIndexData.forEach(item => {
                    val.forEach(it => {
                        if (item.tableIndex === it.tableIndex) {
                            coData.push(item)
                        }
                    })
                })
            }
            this.$emit('handleSelectionChange', coData)
            // console.log('000', val)
            // if (!this.isHandleSelectAll) {
            //     this.$emit('handleSelectionChange', val)
            // } else {
            //     let restData = [].concat(this.option.data) // 列表未显示的数据
            //     console.log('1111', this.curNum)
            //     console.log('2222', this.option.scrollListLength)
            //     restData.splice(0, this.curNum * this.option.scrollListLength)
            //     console.log('3333', restData)
            //     let newData = val.concat(restData) // 去掉未勾选的数据后重组的数据
            //     this.$emit('handleSelectionChange', newData)
            // }
        },
        setHeight(height) {
            let paginationHeight = this.option.pagination
                ? $(this.$refs.pagination.$el).height()
                : 0
            // let paginationHeight = this.option.pagination ? 32 : 0;
            // this.height = height - paginationHeight - 10
            this.$nextTick(() => {
                this.height = height - paginationHeight - 10
            })
        },
        setClassName(item) {
            let className = item.fixed
                ? 'ga-table__fixed ' + (item.className || '')
                : item.className
            return className
        },
        highlightReplace(scope, item) {
            let htmlCon = scope.row[item.value]
            item.keys.forEach(it => {
                htmlCon = htmlCon.replace(
                    new RegExp(it, 'gm'),
                    `<span style='color:#efb414'>$&</span>`
                )
            })
            return htmlCon
        },
        setColumnKeys(col, keys) {
            this.tableColumn.forEach(it => {
                if (it.value === col) {
                    it.keys = keys
                }
            })
        },
        rowStyle(row, index) {
            let rowStyle, rowHeight
            rowHeight = {
                height: this.option.rowHeight + 'px'
            }
            if (this.option.rowStyle && _.isFunction(this.option.rowStyle)) {
                rowStyle = this.option.rowStyle(row, index)
            }
            return Object.assign({}, rowHeight, rowStyle)
        },
        fetchScrollData(m) {
            /**
             * lmin - lmax 为当前列表的显示范围 默认是 0 - 1
             * scrollListLength 为一个级别的范围显示的条数
             * listLenMin - listLenMax 为table显示的具体数据索引
             * isScrollAbled 为 false 时表示数据条数不够时禁用此方法
             */
            let lmin = m - 1 || 0
            let lmax = m || 1
            let scrollListLength = this.option.scrollListLength || 10
            let listLenMin = lmin * scrollListLength
            let listLenMax = lmax * scrollListLength
            for (let i = listLenMin; i < listLenMax; i++) {
                if (this.option.data[i]) {
                    this.tableListData.push(this.option.data[i])
                    if (this.isHandleSelectAll) {
                        this.$refs.multipleTable.toggleRowSelection(this.option.data[i], true)
                    }
                } else {
                    this.isScrollAbled = false
                }
            }
        },
        sortChange(e) {
            if (this.option.sortChange && _.isFunction(this.option.sortChange)) {
                this.option.sortChange(e)
            }
        },
        sort(prop, order) {
            this.$refs.multipleTable.clearSort()
            this.$refs.multipleTable.sort(prop, order)
        },
        // 加密所有手机号字段
        getPhoneEncrypt(data) {
            // let result = []
            if (data && data.length) {
                let coData = _.cloneDeep(data)
                coData.forEach(it => {
                    let keys = Object.keys(it)
                    keys.forEach(key => {
                        if (this.phoneReg.test(key)) {
                            let newPhone = phoneNumChange(it[key])
                            this.phoneMap[newPhone] = it[key]
                            it[key] = newPhone
                        }
                    })
                })
                return coData
            }
            return data
        },
        labelColor(val) {
            let color = 'rgba(0,164,255,1)'
            if (val === '删除') {
                color = 'rgba(255,103,103,1)'
            }
            if (val === '追加' || val === '提交') {
                color = 'rgba(255,157,107,1)'
            }
            return {
                color: color
            }
        },
        // buttonColor(val) {
        //     let type = 'warn'
        //     if (val === '删除') {
        //         type = 'danger'
        //     } else {
        //         type = 'warn'
        //     }
        //     return type
        // },
        // cancelFunc() {
        //     this.toolDisabled = this.toolDisabled.map(item => {
        //         item.map((it, index) => {
        //             item[index] = true
        //         })
        //         return item
        //     })
        // },
        operateClick(operate, opeIndex, opeArr, scope, event) {
            // let arr = ['删除', '撤回']
            // let className = operate.callback(scope.row, scope.$index)
            if (operate.isConfirm) {
                this.$confirm(operate.text, operate.title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    operate.click(this.rowClickJM(scope.row), scope.$index, event)
                }).catch(() => {})
            } else {
                operate.click(this.rowClickJM(scope.row), scope.$index, event)
            }
            // this.toolDisabled = this.toolDisabled.map(item => {
            //     opeArr.map((it, index) => {
            //         item[index] = true
            //     })
            //     return item
            // })
            // if (arr.includes(operate.label) || operate.isConfirm) {
            //     this.toolDisabled[scope.$index][opeIndex] = (className === 'is-disabled' || className === 'fa-ban')
            // } else {
            //     operate.click(this.rowClickJM(scope.row), scope.$index, event)
            //     this.toolDisabled[scope.$index][opeIndex] = true
            // }
        }
    }
}
</script>
<style scoped>
@component-namespace ga {
    @b table {
        width: 100%;
        & i {
            margin-right: 10px;
        }
        @e fixed {
            background-color: rgb(7, 52, 83) !important;
        }
        @e ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
        }
        @e tootipText{
            margin: 12px;
        }
        @e center{
            text-align: center;
        }
        @e operateLabel{
            color:rgba(0,164,255,1);
        }
        /* @e specialLanguage{
            font-size: 16px !important;
        } */
    }
    .specialLanguage {
        font-size: 16px !important;
    }
    .current-row .checked span {
        color: red;
    }
}
</style>
