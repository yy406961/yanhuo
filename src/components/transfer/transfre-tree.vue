<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-newTransfer">
            <el-row>
                <el-col :span="11">
                    <div class="ga-newTransfer__tree">
                        <div class="ga-newTransfer__treeTitle">
                            备选目标
                            <span class="ga-newTransfer__treeTitle--span" v-text="leftNum"></span>
                        </div>
                        <div class="ga-newTransfer__formWrap">
                            <FormComp :option="leftFormOpt" ref="leftForm"></FormComp>
                        </div>
                        <!-- <el-input v-model="filterTextLeft"
                                  icon="search"
                                  placeholder="请输入域名查询"
                                  auto-complete="on"
                                  :style = "widthStyle"></el-input> -->
                        <el-tree class="ga-newTransfer__treeLeft"
                            ref="lefttree"
                            :data="leftTreeData"
                            show-checkbox
                            node-key="id"
                            :filter-node-method="filterNode"
                            :default-expanded-keys="expandedKeys"
                            @node-click="nodeLeftClick"
                            @check-change="handleCheckChangeLeft"
                            :props="defaultProps">
                        </el-tree>
                    </div>
                    <div class="ga-newTransfer__check">
                            <el-checkbox v-model="leftChSataus" :indeterminate="leftIsIndeterminate">
                                全选
                                <span class="ga-newTransfer__treeTitle--span">{{leftChMessage}}</span>
                            </el-checkbox>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="ga-newTransfer__choose">
                        <el-button
                            type="primary"
                            size="small"
                            @click.native="addToRight"
                            :disabled="leftChecked.length === 0">
                            <i class="el-icon-arrow-right"></i>
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click.native="addToLeft"
                            :disabled="rightChecked.length === 0">
                            <i class="el-icon-arrow-left"></i>
                        </el-button>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="ga-newTransfer__tree">
                        <div class="ga-newTransfer__treeTitle">
                            已选目标
                            <span class="ga-newTransfer__treeTitle--span" v-text="rightNum"></span>
                        </div>
                        <div class="ga-newTransfer__formWrap">
                            <FormComp :option="rightFormOpt" ref="rightForm"></FormComp>
                        </div>
                        <!-- <el-input v-model="filterTextRight"
                                      icon="search"
                                      placeholder="请输入域名查询"
                                      auto-complete="on"
                                      :style = "widthStyle"></el-input> -->
                        <el-tree class="ga-newTransfer__treeRight"
                                ref="righttree"
                                :data="rightTreeData"
                                show-checkbox
                                node-key="id"
                                :filter-node-method="filterNodeRight"
                                :default-expanded-keys="expandedKeys"
                                :props="defaultProps"
                                @node-click="nodeRightClick"
                                @check-change="handleCheckChangeRight">
                        </el-tree>
                    </div>
                    <div class="ga-newTransfer__check">
                            <el-checkbox v-model="rightChSataus" :indeterminate="rightIsIndeterminate">
                                全选
                                <span class="ga-newTransfer__treeTitle--span">{{rightChMessage}}</span>
                            </el-checkbox>
                    </div>
                </el-col>
            </el-row>
      </div>
</template>

<script>
import FormComp from 'components/Form'
import ButtonComp from 'components/Form/button'
import textComp from 'components/Form/text'
export default {
    props: ['option'],
    data() {
        let me = this
        return {
            // checkbox状态
            leftChSataus: false,
            leftIsIndeterminate: false,
            rightChSataus: false,
            rightIsIndeterminate: false,
            leftFormOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '66',
                btnPos: 'right',
                items: [{
                    label: '',
                    type: 'text',
                    comOpt: {
                        id: 'filterLeft',
                        value: '',
                        disabled: false,
                        placeholder: '请输入域名查询',
                        width: 250
                    }
                }],
                btns: [{
                    label: '',
                    type: 'button',
                    comOpt: {
                        id: 'leftBtn',
                        value: '查询',
                        disabled: false,
                        click: function() {
                            let { filterLeft } = me.$refs.leftForm.getValue()
                            me.$refs.lefttree.filter(filterLeft)
                        }
                    }
                }]
            },
            rightFormOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '66',
                btnPos: 'right',
                items: [{
                    label: '',
                    type: 'text',
                    comOpt: {
                        id: 'filterRight',
                        value: '',
                        disabled: false,
                        placeholder: '请输入域名查询',
                        width: 250
                    }
                }],
                btns: [{
                    label: '',
                    type: 'button',
                    comOpt: {
                        id: 'rightBtn',
                        value: '查询',
                        disabled: false,
                        click: function() {
                            let { filterRight } = me.$refs.rightForm.getValue()
                            me.$refs.righttree.filter(filterRight)
                        }
                    }
                }]
            },
            leftChMessage: '选中 0 项',
            rightChMessage: '选中 0 项',
            // title
            total: 0,
            leftNum: '共0个',
            rightNum: '共0个',
            // 左右勾选数据集合
            rightChecked: [],
            leftChecked: [],

            // 左右过滤字符
            // filterTextLeft: '',
            // filterTextRight: '',
            widthStyle: {
                width: '100%',
                marginTop: '10px'
            },

            // 树形数据 --- 映射到界面
            leftTreeData: [],
            rightTreeData: [],
            leftCopyData: [],
            rightCopyData: [],

            // 右侧数据已存在的rightKeyId和新加的rightNewKeyId
            rightKeyId: [],
            rightNewKeyId: [],

            // 默认展开
            expandedKeys: [1, 2],
            defaultProps: {
                children: 'sub',
                label: 'name'
            }
        }
    },
    mounted() {},
    computed: {},
    methods: {
        // 加载信源树接口
        loadSourceTree(data) {
            // 强行要求数据格式
            /*
                    [
                        {
                            name: 'A',
                            id: '',
                            domian: '',
                            sub: [
                                {
                                    name: '1',
                                    id: '',
                                    domain: '',
                                    dataObj: {}
                                }
                                .......
                            ]
                        }
                        .......
                    ]
                 */
            this.leftTreeData = _.cloneDeep(data)
            this.leftCopyData = _.cloneDeep(data)
            this.total = 0
            data.forEach(item => {
                this.total += 1
                let { sub } = item
                if (sub && sub.length > 0) {
                    this.total += sub.length
                }
            })
            this.leftNum = '共' + this.total + '个'
        },
        // 穿梭框相关函数 -- 过滤
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1;
        },
        filterNodeRight(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1;
        },
        // 节点点击事件
        nodeLeftClick(val) {
            let { sub } = val
            if (this.leftChecked.includes(val)) {
                if (!sub) {
                    this.$refs.lefttree.setChecked(val, false)
                }
            } else {
                if (!sub) {
                    this.$refs.lefttree.setChecked(val, true)
                    // sub.map(item => {
                    //     this.$refs.lefttree.setChecked(item, true)
                    // })
                    // this.$refs.lefttree.setChecked(sub, false)
                }
            }
        },
        nodeRightClick(val) {
            if (this.rightChecked.includes(val)) {
                this.$refs.righttree.setChecked(val, false)
            } else {
                this.$refs.righttree.setChecked(val, true)
            }
        },
        addToLeft() {
            // 右到左 -- 清除右边选中，左边的取消选中状态
            // 将原数组中勾选的数值删除, rightCopyData也要删
            let arr = this.$refs.righttree.getCheckedNodes()
            let newRightData = this.rightTreeData
            // this.rightTreeData = []
            this.rightTreeData = this.arrSplice(newRightData, arr)
            // this.rightCopyData重新赋值
            // this.rightCopyData = []
            this.rightCopyData = _.cloneDeep(this.rightTreeData)
            // id为2出问题
            // 右到左 -- 选中的清空
            this.rightChecked = []
            arr.forEach(item => {
                this.$refs.lefttree.setChecked(item, false)
            })
            this.rightChSataus = false
            this.rightChMessage = `选中 0 项`
        },
        addToRight() {
            let arr = this.$refs.lefttree.getCheckedNodes()
            let deleteArr = this.deleteData(arr)
            this.rightKeyId = []
            this.rightTreeData.map(item2 => {
                this.rightKeyId.push(item2.id)
            })
            this.rightTreeData = _.cloneDeep(this.rightTreeData)
            this.getrightNewKeyId(this.rightKeyId, deleteArr, this.rightChecked)
            // 延迟渲染？？？
            setTimeout(() => {
                this.rightTreeData.forEach(item => {
                    if (this.rightNewKeyId.includes(item.id)) {
                        this.$refs.righttree.setChecked(item, true)
                    }
                })
            }, 0)
            this.checkBoxStatus()
            this.rightNum = '共' + this.rightTreeData.length + '个'
            // 保留一份数据
            this.rightCopyData = _.cloneDeep(this.rightTreeData)
            this.rightChMessage = `选中 ${this.rightChecked.length} 项`
        },
        // 左侧勾选
        handleCheckChangeLeft() {
            // 控制左移按钮状态
            this.leftChecked = this.$refs.lefttree.getCheckedNodes()
            this.leftChMessage = `选中 ${this.leftChecked.length} 项`
            if (this.leftChecked.length === this.total) {
                this.leftIsIndeterminate = false
                this.leftChSataus = true
            } else if (this.leftChecked.length === 0) {
                this.leftIsIndeterminate = false
                this.leftChSataus = false
            } else {
                this.leftIsIndeterminate = true
            }
        },
        // 右侧勾选
        handleCheckChangeRight() {
            this.rightChecked = this.$refs.righttree.getCheckedNodes()
            // 右侧选中，更改checkd状态
            this.rightChMessage = `选中 ${this.rightChecked.length} 项`
            this.checkBoxStatus()
        },
        // 右侧底部checkbox状态
        checkBoxStatus() {
            if (this.rightChecked.length === this.rightTreeData.length) {
                this.rightIsIndeterminate = false
                this.rightChSataus = true
            } else if (this.rightChecked.length === 0) {
                this.rightIsIndeterminate = false
                this.rightChSataus = false
            } else {
                this.rightIsIndeterminate = true
            }
        },
        // 得到新添加右侧数据ID及右侧已经选中的ID
        getrightNewKeyId(arr, arr1, arr2) {
            this.rightNewKeyId = []
            arr1.map(item => {
                if (!arr.includes(item.id)) {
                    this.rightTreeData.push(item)
                    this.rightNewKeyId.push(item.id)
                }
            })
            arr2.map(item => {
                this.rightNewKeyId.push(item.id)
            })
        },
        // 去除最外层的数据
        deleteData(arr) {
            let arrs = []
            arr.map(item => {
                if (item.sub && item.sub.length !== 0) {
                } else {
                    arrs.push(item)
                }
            })
            return arrs
        },
        // 数组简化
        arrSplice(arr1, arr2) {
            let newArr = arr1
            arr1 = []
            for (let i = 0; i < newArr.length; i++) {
                let k = 0
                for (let j = 0; j < arr2.length; j++) {
                    if (newArr[i].id === arr2[j].id) {
                        k = 1
                    }
                }
                if (k === 0) {
                    arr1.push(newArr[i])
                }
            }
            return arr1
        },
        // getValue
        getValue() {
            return this.rightChecked
            // return this.rightTreeData
        },
        // 清除树状数据
        clearValue() {
            // 左侧已选清空
            this.leftChecked.map(item => {
                this.$refs.lefttree.setChecked(item, false)
            })
            this.leftChecked = []
            // 右侧数据清空
            this.rightChecked = []
            this.rightTreeData = []
            // 清空左侧已选信息
            this.leftChSataus = false
            this.leftChMessage = '已选 0 / 0 项'
            this.leftIsIndeterminate = false
            // 清除右测已选相关信息
            this.rightChMessage = '已选 0 / 0 项'
            this.rightChSataus = false
            this.rightIsIndeterminate = false
            // 搜索框清空
            this.$refs.leftForm.clearValue()
            this.$refs.rightForm.clearValue()
            // this.filterTextLeft = ''
            // this.filterTextRight = ''
        }
    },
    watch: {
        'option.data'(val) {
            this.loadSourceTree(val)
        },
        // 左侧过滤
        // filterTextLeft(val) {
        //     this.$refs.lefttree.filter(val)
        // },
        // 右侧过滤
        // filterTextRight(val) {
        //     // 先重置过滤数组
        //     this.$refs.righttree.filter(val)
        // },
        leftChSataus(val) {
            // 选中时，选中左侧所有数据选中时，选中右侧所有数据
            if (val === true) {
                this.leftTreeData.forEach(item => {
                    let { sub } = item
                    if (sub && sub.length) {
                        sub.forEach(it => {
                            this.$refs.lefttree.setChecked(it, true)
                        })
                    }
                    // this.$refs.lefttree.setChecked(item, true)
                })
                this.leftChMessage = `选中 ${this.total} 项`
            } else {
                this.leftTreeData.forEach(item => {
                    let { sub } = item
                    if (sub && sub.length) {
                        sub.forEach(it => {
                            this.$refs.lefttree.setChecked(it, false)
                        })
                    }
                    // this.$refs.lefttree.setChecked(item, false)
                })
                this.leftChMessage = `选中 0 项`
            }
        },
        rightChSataus(val) {
            // 选中时，选中右侧所有数据选中时，选中右侧所有数据
            if (val === true) {
                this.rightTreeData.forEach(item => {
                    this.$refs.righttree.setChecked(item, true)
                })
                this.rightChMessage = `选中 ${this.rightTreeData.length} 项`
            } else {
                this.rightTreeData.forEach(item => {
                    this.$refs.righttree.setChecked(item, false)
                })
                this.rightChMessage = `选中 0 项`
            }
        }
    },
    components: {
        FormComp,
        ButtonComp,
        textComp
    }
}
</script>

<style scoped>
@component-namespace ga {
    @b newTransfer {
        @e treeTitle{
            color:var(--font-color);
            padding:0 12px;
            background: rgba(27,117,184,0.20);
            box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
            @m span{
                padding-left:6px;
                opacity:0.55;
            }
        }
        @e formWrap{
            margin-top: -10px;
            padding: 0 8px;
            height: 48px;
            border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        @e tree {
            /* border: 1px solid #0b245f;
            box-shadow: 0 2px 4px rgba(11, 36, 95, 0.12), 0 0 6px rgba(11, 36, 95, 04); */
            position: relative;
            /* padding: 10px 4%; */
            border: 1px solid #00A4FF;
            box-shadow: 0 1px 4px 0 rgba(0,148,255,0.20);
        }
        @e treeLeft {
            height:180px;
            margin-top: 10px;
            overflow: auto;
        }
        @e treeRight {
            height:180px;
            margin-top: 10px;
            overflow: auto;
        }
        @e check {
            width: 100%;
            height: 30px;
            margin-top: 8px;
            padding: 0 0 0 21px;
            /* border: 1px solid #0b245f;
            box-shadow: 0 2px 4px rgba(11, 36, 95, 0.12), 0 0 6px rgba(11, 36, 95, 04); */
        }
        @e choose {
            display: flex;
            height: 258px;
            justify-content: center;
            align-content: center;
            flex-flow: column;
            width: 50px;
            margin: 10px auto;

            & button:last-child {
                margin-top: 10px;
                width: 50px;
            }

            & .el-button + .el-button {
                margin-left: 0 !important;
            }
        }
    }
}
</style>
