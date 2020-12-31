<template lang="html">
    <div>
        <tableComp :option="tableOpt" :comSize="tableSize" ref="table"></tableComp>
    </div>
</template>

<script>
import tableComp from 'components/Table'
import { getUserNumber } from 'api/demo'
import Mock from 'mockjs'
export default {
    name: 'userNumberManager',
    data () {
        return {
            tableSize: {
                height: 500
            },
            tableOpt: {
                scrollLoading: true,
                scrollListContainer: 'ex-tableScroll',
                scrollListLength: 20,
                listLoading: false,
                 //  是否为斑马纹 table
                rowHeight: 50,
                stripe: false,
                column: [
                    // 首列是否显示序号、复选框index/selection
                    { name: '序号', value: 'index', width: 80, align: 'center' },
                    { name: '目标号码', value: 'targetnumber', width: 150 },
                    { name: '卡号', value: 'card', width: 150 },
                    { name: '机身码', value: 'mycard', width: 150 },
                    { name: '姓名', value: 'name', width: 150, highlightKey: true, key: ['A'] },
                    { name: '监控停止时间', value: 'stoptime', width: 180 },
                    { name: '录入时间', value: 'addtime', width: 180 },
                    { name: '监控状态', value: 'status', width: 100, type: 'icon', callback: function (row) {
                        if (row.status === 1) {
                            return 'fa fa-phone'
                        } else {
                            return 'fa fa-envelope-o'
                        }
                    }, clickFn: function (rows) {
                        console.log(rows)
                    } },
                    { name: '操作', value: '', width: 100, align: 'center', edit:'false', operations: [
                        { label: '查看', icon: 'search', click: this.lookClick },
                        { label: '编辑', icon: 'edit', click: this.editClick }
                    ] },
                    { name: '', value: 'selection', width: 80 }
                ],
                data: [],
                // 是否分页
                pagination: false,
                   // 分页参数
                pageOpt: {
                    total: 0,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            },
            mockData: null
        }
    },
    components: {
        tableComp
    },
    mounted () {
        this.mockData = Mock.mock({
            "rows|55": [
                {
                    "addtime": "@datetime",
                    "card": "@integer(10000)",
                    "id": "@id()",
                    "msg": "@title()",
                    "mycard": "@integer(10000)",
                    "name": "@name()",
                    "stoptime": "@DATETIME",
                    "targetnumber|+1": 1
                }
            ],
            "status": 200,
            "total": 50
        })
        this.mockData1 = Mock.mock({
            "rows|54": [
                {
                    "addtime": "@datetime",
                    "card": "@integer(10000)",
                    "id": "@id()",
                    "msg": "@title()",
                    "mycard": "@integer(10000)",
                    "name": "@name()",
                    "stoptime": "@DATETIME",
                    "targetnumber|+1": 1
                }
            ],
            "status": 200,
            "total": 50
        })
        let me = this;
        this.fetchMockData()
        // this.fetchData()
        // 模拟 websocket 推送数据
        setTimeout(() => {
        // setInterval(() => {
            // this.tableOpt.data.unshift({
            //     "addtime": "推送数据",
            //     "card": "推送数据",
            //     "id": "推送数据",
            //     "msg": "推送数据",
            //     "mycard": "推送数据",
            //     "name": "推送数据",
            //     "stoptime": "推送数据",
            //     "targetnumber": 1
            // })
            // this.tableOpt.data = []
            this.tableOpt.data = this.mockData1.rows
        }, 6000);
    },
    methods: {
        fetchMockData (m, n) {
            this.tableOpt.data = this.mockData.rows
            this.tableOpt.pageOpt.total = this.mockData.total
            this.$refs.table.setColumnKeys('name', ['A', 'B', 'C', 'D'])
        },
        async fetchData () {
            let resp = await getUserNumber()
            if (resp) {
                this.tableOpt.data = resp.rows;
                this.tableOpt.pageOpt.total += resp.total
                this.$refs.table.setColumnKeys('name', ['A', 'B', 'C', 'D'])
            }
        }
    }
}
</script>

<style lang="css">
</style>
