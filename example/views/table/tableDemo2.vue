<template>
    <div class="yq-tableDemo">
        <el-button type="primary" @click="delHandler">删除</el-button>
        <tableDemo :option = "tableOpt" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange = "handleSizePageChange" @handleSelectionChange="handleSelectionChange"></tableDemo>
    </div>
</template>
<script>
    import tableDemo from 'components/Table/'
    import { search } from 'api/minganEvent'
    export default {
        name: 'tabledemo',
        data() {
            let me = this;
            return {
                tableSelections: [],
                tableOpt: {
                    // 不设置width ，默认自适应
                    // width: 1000,
                    // height: 500,
                    listLoading: false,
                    // 	是否为斑马纹 table
                    stripe: false,
                    column: [
                        // 首列是否显示序号、复选框、下沉展开 index/selection
                        {name: '序号', value: 'selection', width: 80},
                        {name: '事件名称', value: 'name', width: 300},
                        {name: '敏感事件ID', value: 'id', width: 150},
                        {name: '事件创建时间', value: 'createTime', width: 150},
                        {name: '事件摘要', value: 'abstract'},
                        {name: '操作', value: '', width: 100, operations: [
                            {label: '编辑', icon: 'edit', click: me.editClick},
                            {label: '删除', icon: 'trash-o', click: me.deleteClick}]}
                    ],
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        total: 100,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    cellClick: function(row, column, cell, event) {
                        console.log(row);
                        console.log(column);
                        console.log(cell);
                        console.log(event);
                    },
                    rowClick: function(row, event, column) {
                        console.log(row);
                        console.log(event);
                        console.log(column);
                    }
                }
            }
        },
        created() {
            this.fetchData();
        },
        mounted() {

        },
        components: {
            tableDemo
        },
        watch: {},
        methods: {
            async fetchData() {
                this.tableOpt.listLoading = true;
                let resp = await search();
                // console.log(resp);
                this.tableOpt.data = resp.rows;
                this.tableOpt.listLoading = false;
            },
            editClick(row, index, e) {
                console.log(row, index, e);
            },
            deleteClick(row, index, e) {
                console.log(row, index, e);
            },
            handleCurrentPageChange(val) {
                console.log(val);
            },
            handleSizePageChange(val) {
                console.log(val);
            },
            handleSelectionChange(val) {
                this.tableSelections = val;
            },
            delHandler() {
                console.log(this.tableSelections);
            }
        }
    }
</script>
<style>
</style>
