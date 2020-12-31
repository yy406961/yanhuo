<template lang="html">
    <div style="width: 100%;height:100%;">
        <el-row style="margin-left: 5px">
            <el-radio-group v-model="radioArea">
                <el-radio :label=0>近一天</el-radio>
                <el-radio :label=1>近一周</el-radio>
                <el-radio :label=2>近一月</el-radio>
            </el-radio-group>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div :style="showMap" class="ga-activeArea__gis">
                    <gis :option="mapData" :showIndex="showIndex"></gis>
                </div>
            </el-col>
            <el-col :span="12">
               <tableComp :option="tableOpt"
                          :comSize="tableHeight"
                          @handleCurrentPageChange="handleCurrentPageChange"
                          @handleSizePageChange = "handleSizePageChange">
               </tableComp>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import gis from './activeAreaMap.vue'
    import tableComp from 'components/Table'
    import { mapGetters } from 'vuex'
    import { getActiveArea } from 'api/relationAnalysis/figurePortrait/index'
    export default {
        name: 'figurePortrait',
        data () {
            return {
                showIndex: null,
                radioArea: 0,
                mapData: {},
                formObj: {
                    page: 1,
                    rows: 10,
                    msisdn: '',
                    type: ''
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '排行', value: 'index', width: 60, align: 'center' },
                        { name: '停留总时长', value: 'staytime', width: 100, align: 'center' },
                        { name: '活动次数', value: 'top5count', width: 80, align: 'center' },
                        { name: 'LAC', value: 'lac', width: 100, align: 'center' },
                        { name: 'CI', value: 'ci', width: 100, align: 'center' },
                        { name: '位置描述', value: 'loc', align: 'center', tooltip: true }
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
                tableHeight: {
                    height: ''
                }
            }
        },
        created () {
            this.tableHeight.height = this.vsHeight - 115
        },
        mounted () {
//            $('.ga-activeArea__gis').css({
//                'height': this.option.height - 90 + 'px'
//            })
        },
        props: [
            'showIndexChange',
            'renderData'
        ],
        watch: {
            'showIndexChange' (val) {
                this.showIndex = val;
            },
            'renderData' (val) {
                if (val) {
                    this.getActiveArea();
                }
            },
            'radioArea' (val) {
                this.formObj.type = val
                this.formObj.page = 1
                this.formObj.rows = 10
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = 10
                this.getActiveArea();
            }
        },
        methods: {
            async getActiveArea () {
                this.formObj.msisdn = this.renderData.msisdn
                this.formObj.type = this.radioArea
                if (!this.formObj.msisdn) return
                this.tableOpt.data = [];
                this.tableOpt.listLoading = true;
                let resp = await getActiveArea(this.formObj);
                if (resp && resp.rows) {
                    this.tableOpt.data = resp.rows
                    this.tableOpt.pageOpt.total = resp.total;
                    if (this.tableOpt.data.length) {
                        this.tableOpt.listLoading = false;
                    }
                    let me = this;
                    if (resp.rows.length === 0) {
                        setTimeout(() => {
                            me.tableOpt.listLoading = false;
                        }, 200)
                    }
                    this.mapData = {
                        base: {
                            msisdn: this.renderData.msisdn,
                            name: this.renderData.name
                        },
                        info: resp.rows
                    }
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                this.getActiveArea();
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                this.tableOpt.pageOpt.currentPage = 1;
                this.getActiveArea();
            }
        },
        computed: {
            showMap () {
                return {
                    height: this.vsHeight - 90 + 'px'
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        components: {
            gis,
            tableComp
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b activeArea {
            @e gis {
                position: relative;
            }
        }
    }
</style>
