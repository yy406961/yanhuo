<template>
    <div class="yq-tableDemo">
        <el-button type="primary" @click="addNewData">新增</el-button>
        <el-button type="primary" @click="saveNewData">保存</el-button>
        <el-button type="primary" @click="abandonData">放弃</el-button>

        <tableDemo ref='table' :option = "tableOpt" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange" @handleSelectionChange="handleSelectionChange" :comSize="comSize"  @operateSaveHandler="saveClick" @operateDelHandler="delClick"></tableDemo>
    </div>
</template>
<script>
    import tableDemo from 'components/Table/editorTable'
    import { search } from 'api/demo'
    export default {
        name: 'tabledemo',
        data () {
            return {
                tableSelections: [],
                tableOpt: {
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        { name: '序号', value: 'index', width: 80 },
                        { name: '事件名称', value: 'name', width: 300, edit: true },
                        { name: '敏感事件ID', value: 'id', width: 150, edit: true },
                        { name: '事件创建时间', value: 'createTime', width: 150 },
                        { name: '事件摘要', value: 'abstract', edit: true },
                        { name: '操作', value: '', width: 150, operations: true }
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    cellClick: function (row, column, cell, event) {
                        console.log(row);
                        console.log(column);
                        console.log(cell);
                        console.log(event);
                    },
                    rowClick: function (row, event, column) {
                        console.log(row);
                        console.log(event);
                        console.log(column);
                    }
                }
            }
        },
        created () {
            this.fetchData();
        },
        mounted () {

        },
        components: {
            tableDemo
        },
        computed: {
            comSize () {
                return {
                    height: $(window).height() - 50
                }
            }
        },
        methods: {
            async fetchData () {
                this.tableOpt.listLoading = true;
                const resp = await search();
                // console.log(resp);
                if (resp.rows && _.isArray(resp.rows)) {
                    resp.rows.forEach(it => {
                        it.edit = false;
                    });
                    this.tableOpt.data = resp.rows;
                }
                this.tableOpt.listLoading = false;
            },
            handleCurrentPageChange (val) {
                console.log(val);
            },
            handleSizePageChange (val) {
                console.log(val);
            },
            handleSelectionChange (val) {
                this.tableSelections = val;
            },
            addNewData () {
                this.$refs.table.addNewData();
            },
            saveNewData () {
                console.log(this.$refs.table.getNewData());
                this.fetchData();
            },
            abandonData () {
                this.fetchData();
            },
            saveClick (row) {
                console.log(row);
                this.fetchData();
            },
            delClick (row) {
                console.log(row);
            }
        }
    }
</script>
<style>
</style>
