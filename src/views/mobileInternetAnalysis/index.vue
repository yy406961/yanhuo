<template>
    <div class="ga-mobileInternet">
         <el-row class="ga-mobileInternet__selectTop">
             <FormComp :option="formObj" ref="form"></FormComp>
         </el-row>
        <el-row>
            <el-col :span="6" class="ga-mobileInternet__paddingRight">
                <div class="ga-mobileInternet__marginBottom">
                    <borderCom title="网站访问TOP10">
                        <levelBarComp :ref="echartsRefs[0]" :option="echartsObj"></levelBarComp>
                    </borderCom>
                </div>
                <div>
                    <borderCom title="手机上网热搜词">
                        <levelBarComp :ref="echartsRefs[1]" :option="echartsObj"></levelBarComp>
                    </borderCom>
                </div>
            </el-col>
            <el-col :span="12" class="ga-mobileInternet__paddingRight">
                <div class="ga-mobileInternet__marginBottom">
                    <borderCom title="近24小时手机上网变化趋势">
                        <linesArea :ref="echartsRefs[4]" :option="echartsObj"></linesArea>
                    </borderCom>
                </div>
                <div class="ga-mobileInternet__flexWrap">
                    <div>
                        <borderCom title="手机上网地域分布">
                            <annularMap :ref="echartsRefs[5]" :option="echartsObj"></annularMap>
                        </borderCom>
                    </div>
                    <div>
                        <borderCom title="手机上网时段分布">
                            <linesArea :ref="echartsRefs[6]" :option="lineObj"></linesArea>
                        </borderCom>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="ga-mobileInternet__marginBottom">
                    <borderCom title="APP访问TOP10">
                        <levelBarComp :ref="echartsRefs[2]" :option="echartsObj"></levelBarComp>
                    </borderCom>
                </div>
                <div>
                    <borderCom title="敏感信源访问TOP10">
                        <levelBarComp :ref="echartsRefs[3]" :option="echartsObj"></levelBarComp>
                    </borderCom>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import FormComp from 'components/Form/index'
import annularMap from './components/annularMap'
import BarChart from './components/barChart'
import linesArea from './components/linesArea'
import levelBarComp from './components/levelBar' // 柱图
import borderCom from './components/borderCom'
import titleCom from '../informationSource/components/titleCom'
import { ajax } from 'common'
import { mapGetters } from 'vuex'
export default {
    name: 'mobileInternet',
    data() {
        let me = this
        return {
            formObj: {
                inline: true,
                labelPos: 'right',
                labelWidth: '100',
                btnPos: 'right',
                items: [
                    {
                        label: '手机上网区域',
                        type: 'select',
                        comOpt: {
                            id: 'internetArea',
                            value: '',
                            disabled: false,
                            width: 200,
                            data: [],
                            change: function(val) {
                                if (val) {
                                    me.apiObj.code = val
                                    me.echartsData()
                                }
                            }
                        }
                    }
                ]
            },
            echartsRefs: ['websiteTop', 'internetHotWord', 'appTop', 'wallTop', 'internetTrend', 'internetRegion', 'internetTime'],
            echartsObj: { width: '100%', height: 300, smooth: true },
            lineObj: { width: '100%', height: 300,
                smooth: false,
                border: ['rgba(0,170,255,1)'],
                area: ['rgba(0,170,255,0.2)', 'rgba(0,170,255,0']
            },
            timer: null,
            // 请求参数
            apiObj: { code: '0', flag: 1 }
        }
    },
    created() {
        // this.initChartsHeight()
    },
    computed: {
        ...mapGetters({
            visualHeight: 'global/visualHeight'
        })
    },
    mounted() {
        this.chartsHeight()
        this.getArea()
        this.echartsData()
        this.rollPoling()
    },
    methods: {
        echartsData() {
            this.echartsRefs.forEach(item => {
                this.$refs[item].startLoading()
            });
            ajax.post('/ybrz/getYbrz', this.apiObj).then(resp => {
                let { data } = resp
                this.echartsRefs.forEach(item => {
                    this.$refs[item].endLoading()
                    this.$refs[item].loadData(data[item])
                    // if (data[item] && data[item].length) {
                    //     this.$refs[item].loadData(data[item])
                    // }
                })
            })
            .catch(error => {
                this.echartsRefs.forEach(item => {
                    this.$refs[item].endLoading()
                });
                console.log(error)
            })
        },
        rollPoling() {
            // 600000--10分钟
            this.timer = setInterval(() => {
                this.echartsData()
            }, 600000)
        },
        // 手机上网区域
        getArea() {
            ajax.post('/ybrz/getCityCode').then(resp => {
                let { data } = resp
                if (data && data.length) {
                    let selectData = data.map(item => {
                        item.value = item.code
                        return item
                    })
                    selectData.unshift({ name: '全省', value: '0' })
                    this.$refs.form.setItemData('internetArea', selectData)
                    this.$refs.form.setValue([{ id: 'internetArea', value: '0' }])
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        chartsHeight() {
            // let Height = (val - 62 - 28 * 2) / 2
            let Height = ($('.ga-mobileInternet').height() - 58 - 20 - 28 * 2) / 2
            // 三等列宽度
            let sizeObj = {
                width: '98%',
                height: Height
            }
            this.echartsRefs.forEach(item => {
                this.$refs[item].resizeComp(sizeObj)
            });
        }
        // initChartsHeight() {
        //     let Height = ($('.ga-mobileInternet').height() - 42 - 28 * 2) / 2
        //     this.echartsObj = { width: '100%', height: Height }
        //     this.lineObj = { width: '100%', height: Height }
        // },
    },
    destroyed () {
        clearInterval(this.timer)
    },
    watch: {
        visualHeight(val) {
            this.chartsHeight(val)
        }
    },
    components: {
        FormComp,
        linesArea,
        levelBarComp,
        annularMap,
        BarChart,
        borderCom,
        titleCom
    }
}
</script>
<style>
@component-namespace ga {
    @b mobileInternet {
        height:100%;
        font-size: 14px;
        overflow: hidden;
        @e marginBottom{
            margin-bottom:10px;
        }
        @e selectTop {
            margin-top: -20px;
        }
        @e flexWrap{
            display:flex;
            >div{
                width: 49%;
                &:first-child{
                    margin-right:2%;
                }
            }
        }
        @e paddingRight{
            padding-right:12px;
        }
    }
    & .el-row {
        /* margin-bottom: 0 !important; */
    }
}
</style>
