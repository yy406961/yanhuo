<template lang="html">
    <div class="">
        <tableComp :option="tableOpt" :comSize="tableSize"></tableComp>
        <br>
        <div class="nxPolice-table">
            <tableComp :option="tableOpt" :comSize="tableSize"></tableComp>
        </div>
    </div>
</template>

<script>
import tableComp from 'components/Table'
import { getUserNumber } from 'api/demo'
export default {
    name: 'userNumberManager',
    data () {
        return {
            tableSize: {
                height: 800
            },
            tableOpt: {
                listLoading: false,
                 //  是否为斑马纹 table
                stripe: false,
                column: [
                    // 首列是否显示序号、复选框index/selection
                    { name: '序号', value: 'index', width: 80, align: 'center', fixed: 'left' },
                    { name: '目标号码', value: 'targetnumber', width: 150, fixed: 'left' },
                    { name: '卡号', value: 'card', width: 150, fixed: 'left' },
                    { name: '机身码', value: 'mycard', width: 150 },
                    { name: '短信内容', value: 'msg', highlightKey: true, keys: ['ab', 'cd'], widthType: true },
                    { name: '姓名', value: 'name', width: 150 },
                    { name: '监控停止时间', value: 'stoptime', width: 150 },
                    { name: '录入时间', value: 'addtime', width: 150 },
                    { name: '操作', value: '', width: 100, align: 'center', operations: [
                        { label: '查看', icon: 'search', click: this.lookClick },
                        { label: '编辑', icon: 'edit', click: this.editClick }
                    ] },
                    { name: '', value: 'selection', width: 80 }
                ],
                data: [],
                // 是否分页
                pagination: true,
                   // 分页参数
                pageOpt: {
                    total: 20,
                    pageSizes: [10, 20, 30, 40, 50],
                    pageSize: 10
                }
            }
        }
    },
    components: {
        tableComp
    },
    mounted () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            let resp = await getUserNumber()
            if (resp) {
                this.tableOpt.data = resp.rows;
                this.tableOpt.pageOpt.total = resp.total
            }
        }
    }
}
</script>

<style lang="css">
</style>
