<template>
    <div>
        <formComp :option="sysAreaFormOpt" ref="sysArea"></formComp>
        <sysImportantAreaTable :option="sysAreaTableOpt" :comSize="sysAreaTableSize"
                               @handleCurrentPageChange="handleCurrentPageChange"
                               @handleSizePageChange="handleSizePageChange"></sysImportantAreaTable>
    </div>
</template>
<script>
    import sysImportantAreaTable from 'components/Table/'
    import formComp from 'components/Form/index'
    import { sysBuiltInAreaScope, sysBuiltInAreaScopeSave, selectedAreaDelete, getCellCoordinate } from 'api/task/taskArea'
    import { mapGetters } from 'vuex'
    export default {
        name: 'sysImportantArea',
        data () {
            let me = this
            return {
                pageOpt: {
                    rows: '',
                    page: 1
                },
                sysAreaParams: {
                    owner: this.userName
                },
                sysAreaTableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '区域名称', value: 'areaName', align: 'center' },
                        { name: '操作', value: '', width: 120, align: 'center', operations: [
                            { label: '编辑', type: 'icon', callback: function () {
                                return 'fa fa-edit';
                            }, click: me.editClick },
                            { label: '删除', type: 'icon', isConfirm: true, text: '是否确认删除？', callback: function () {
                                return 'fa fa-trash-o';
                            }, click: me.deleteClick }]
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
                sysAreaFormOpt: {
                    inline: true,
                    items: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '地图框选',
                            disabled: false,
                            click () {
                                me.$router.push({
                                    name: '地图框选',
                                    params: {
                                        isNull: true
                                    }
                                })
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '导入',
                            disabled: false,
                            click () {
                                me.$router.push({ name: '导入',
                                    params: {
                                        isNull: true
                                    }
                                })
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            value: '录入',
                            disabled: false,
                            click () {
                                me.$router.push({ name: '录入',
                                    params: {
                                        isNull: true
                                    }
                                })
                            }
                        }
                    }]
                },
                resourceId: '',
                areaSourceType: ''
            }
        },
        methods: {
            // 系统内置重点区域初始化
            async sysBuiltInAreaScope () {
                this.sysAreaTableOpt.listLoading = true;
                this.pageOpt.rows = this.sysAreaTableOpt.pageOpt.pageSize
                let resp = await sysBuiltInAreaScope(this.pageOpt);
                if (resp) {
                    this.sysAreaTableOpt.data = resp.rows;
                    this.sysAreaTableOpt.listLoading = false;
                    this.sysAreaTableOpt.pageOpt.total = resp.total;
                }
            },
            // 系统内置重点区域保存
            async saveSysArea () {
                this.sysAreaParams = Object.assign(this.sysAreaParams, this.$refs.sysArea.getValue())
                let resp = await sysBuiltInAreaScopeSave(this.sysAreaParams);
                if (resp) {
                    this.$message.success('保存成功')
                }
            },
            // 基站信息查询
            async getCellCoordinate (obj) {
                console.log('嘻嘻黑')
                let resp = await getCellCoordinate(obj)
                let { data } = resp
                if (resp) {
                    if (this.areaSourceType === '2') {
                        this.$router.push({
                            name: '地图框选',
                            params: {
                                areaName: this.areaName,
                                list: {
                                    resourceId: this.resourceId,
                                    areaBorder: data.areaBorderInfoVO,
                                    cellInfo: data.areaIncludeCellVO
                                }
                            }
                        })
                    } else if (this.areaSourceType === '3') {
                        this.$router.push({ name: '导入',
                            params: {
                                areaName: this.areaName,
                                list: {
                                    areaBorder: data.areaBorderInfoVO,
                                    resourceId: this.resourceId,
                                    cellInfo: data.areaIncludeCellVO,
                                    areaInclude: data.areaIncludeCellVO
                                }
                            }
                        })
                    } else if (this.areaSourceType === '4') {
                        this.$router.push({ name: '录入',
                            params: {
                                areaName: this.areaName,
                                list: {
                                    resourceId: this.resourceId,
                                    areaInclude: data.areaIncludeCellVO
//                                areaBorder: row.areaBorderInfoVO,
//                                cellInfo: row.cellInfo
                                }
                            }
                        })
                    }
                }
            },
            deleteClick (row) {
                this.$confirm('是否确认删除？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    selectedAreaDelete({ resourceId: row.resourceId }).then((resp) => {
                        if (resp) {
                            this.$message.success(resp.message)
                            this.sysBuiltInAreaScope()
                        }
                    })
                })
            },
            editClick (row) {
                this.resourceId = row.resourceId
                this.areaName = row.areaName
                this.areaSourceType = row.areaSourceType
                this.getCellCoordinate({ resourceId: row.resourceId })
            },
            handleCurrentPageChange (val) {
                this.pageOpt.page = val
                let { length } = this.sysAreaTableOpt.data
                if (length !== 0) {
                    this.sysBuiltInAreaScope();
                }
            },
            handleSizePageChange (val) {
                this.sysAreaTableOpt.pageOpt.pageSize = val;
                if (this.sysAreaTableOpt.data.length !== 0) {
                    this.sysBuiltInAreaScope();
                }
            }
        },
        mounted () {
            this.sysBuiltInAreaScope()
        },
        computed: {
            ...mapGetters({
                'userName': 'global/userName',
                'vsHeight': 'global/visualHeight'
            }),
            sysAreaTableSize () {
                return {
                    height: this.vsHeight - 80
                }
            }
        },
        components: {
            sysImportantAreaTable,
            formComp
        }
    }
</script>
<style>

</style>
