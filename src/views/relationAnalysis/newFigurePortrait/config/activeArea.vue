<template lang="html">
    <div style="width: 100%;height:100%;">
        <el-row class="ga-baseData__base--title">
         <!--    <span v-if="renderData">{{renderData.name}} （{{renderData.msisdn}}）</span>
            基本信息
            <el-radio-group v-model="radioVal">
                <el-radio :label=0>近一天</el-radio>
                <el-radio :label=1>近一周</el-radio>
                <el-radio :label=2>近一月</el-radio>
                <el-radio :label=3>按月
                    <el-select v-model="chooseMonth"
                               placeholder="请选择">
                         <el-option
                              v-for="item in monthArr"
                              :key="item.name"
                              :label="item.name"
                              :value="item.value">
                         </el-option>
                    </el-select>
                </el-radio>
                <el-radio :label=4>全部</el-radio>
            </el-radio-group>
        </el-row>
        <el-row> -->
            <el-col :span="12" v-loading="mapLoading">
                <div :style="showMap" class="ga-activeArea__gis">
                    <gis :option="mapData"
                         :showIndex="showIndex"
                         :rowClick="rowClickObj"
                         @detailDialogChange="detailDialogChange">
                    </gis>
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
    import { ajax } from 'common'
    // import { getActiveArea } from 'api/relationAnalysis/newFigurePortrait/index'
    export default {
        name: 'figurePortrait',
        data () {
            let me = this;
            return {
                mapLoading: false,
                chooseMonth: '',
                monthArr: [],
                rowClickObj: {
                    type: false,
                    data: []
                },
                showIndex: null,
                radioVal: 0,
                mapData: {},
                formObj: {
                    msisdn: '',
                    type: '',
                    time: ''
                },
                tableOpt: {
                    listLoading: false,
                    dataLoading: false,
                    stripe: false,
                    highlightRow: true,
                    column: [
                        { name: '排行', value: 'index', width: 60, align: 'center' },
                        { name: '停留总时长', value: 'allTime', width: 100, align: 'center', tooltip: true },
                        { name: '活动次数', value: 'count', width: 80, align: 'center' },
                        { name: 'LAC', value: 'lac', width: 100, align: 'center' },
                        { name: 'CI', value: 'ci', width: 100, align: 'center' },
                        { name: '位置描述', value: 'localDescripe', align: 'center', tooltip: true }
                    ],
                    data: [],
                    pagination: false,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick (val) {
                        me.rowClickObj.type = true
                        me.rowClickObj.data = val
                    }
                },
                tableHeight: {
                    height: ''
                }
            }
        },
        created () {
            this.tableHeight.height = this.vsHeight - 95
            // this.getMonthArrFun()
        },
        mounted () {
        },
        props: [
            'showIndexChange',
            'renderData'
        ],
        watch: {
            'showIndexChange' (val) {
                this.showIndex = val;
                if (val === 8) {
                    this.tableOpt.listLoading = this.tableOpt.dataLoading;
                } else {
                    this.tableOpt.listLoading = false;
                }
            },
            'renderData' (val) {
                this.tableOpt.dataLoading = false;
                this.formObj.msisdn = val.msisdn
                this.getActiveArea();
            },
            'radioVal' (val) {
                if (this.renderData) {
                    this.formObj.type = val;
                    if (val === 3) {
                        if (!this.chooseMonth) {
                            this.$message({
                                type: 'info',
                                message: '请选择具体月份'
                            })
                            return;
                        }
                        let monthVal = this.findMonthValue(this.chooseMonth)
                        this.formObj.time = monthVal
                    } else {
                        this.formObj.time = ''
                    }
                    this.getActiveArea();
                }
            },
            'chooseMonth' (val) {
                if (val) {
                    if (this.renderData) {
                        this.formObj.time = this.chooseMonth
                        this.getActiveArea();
                    }
                }
            }
        },
        methods: {
            async getActiveArea () {
                // window.GALoading.open('查询中,请耐心等会儿...')
                this.formObj.msisdn = this.renderData.msisdn
                this.formObj.type = this.radioVal
                if (!this.formObj.msisdn) return
                this.tableOpt.data = [];
                this.$emit('change', true)
                this.mapLoading = true
                this.tableOpt.listLoading = true;
                this.tableOpt.dataLoading = true;
                ajax.post('/baseInfo/getWorkHomeArea', {
                    msisdn: this.renderData.msisdn,
                    flag: 2,
                    type: 4,
                    time: 'null'
                }).then(resp => {
                    if (resp && resp.rows) {
                        this.tableOpt.data = this.isNull(resp.rows[0].activity)
                        this.tableOpt.pageOpt.total = resp.total;
                        this.mapData = {
                            base: {
                                msisdn: this.renderData.msisdn,
                                name: this.renderData.name,
                                type: this.formObj.type,
                                time: this.formObj.time
                            },
                            info: resp.rows[0].activity
                        }
                    }
                    this.tableOpt.listLoading = false;
                    this.tableOpt.dataLoading = false;
                    this.$emit('change', false)
                    this.mapLoading = false
                    // window.GALoading.close()
                })
                .catch(err => {
                    console.log(err)
                    this.tableOpt.listLoading = false;
                    this.tableOpt.dataLoading = false;
                    this.$emit('change', false)
                    this.mapLoading = false
                    // window.GALoading.close()
                })
                // let resp = await getActiveArea({
                //     msisdn: this.renderData.msisdn,
                //     flag: 2,
                //     type: 4,
                //     time: 'null'
                // });
            },
            // 按月选择
            // async getMonthArrFun () {
            //     let resp = await getMonthArr()
            //     if (resp && resp.data) {
            //         this.monthArr = resp.data
            //         this.chooseMonth = this.monthArr[0].name
            //     }
            // },
            findMonthValue (val) {
                let value = val
                this.monthArr.forEach((item) => {
                    if (val === item.name) {
                        value = item.value
                    }
                })
                return value
            },
            detailDialogChange (val) {
                this.rowClickObj.type = val
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
            },
            // 不显示NULL
            isNull(data) {
                let { entries } = Object
                data.map(item => {
                    for (let [key, value] of entries(item)) {
                        if (value === null || value === 'null') {
                            item[key] = '----'
                        } else {
                            item[key] = value
                        }
                    }
                })
                return data
            }
        },
        computed: {
            showMap () {
                return {
                    height: this.vsHeight - 91 + 'px'
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
