<template lang="html">
    <div>
        <FormComp :option="formOpt"></FormComp>
        <!--<div>-->
            <!--<areaBars :option="opt"></areaBars>-->
        <!--</div>-->
        <br>
        <br>
        <div id="areaBars" style="width: 300px;height: 250px">
            <frameComp :title="title1">
                <areaBars :option="opt"></areaBars>
            </frameComp>
        </div>

        <br>
        <div style="width: 400px;height: 250px">
            <frameComp :title="title2">
                <linesTrend :option="lineOpt" :renderData="lineData"></linesTrend>
            </frameComp>
        </div>
        <br>
    </div>
</template>

<script>
    import FormComp from 'components/Form/index'
    import areaBars from 'components/monitor/areaBars'
    import frameComp from 'components/monitor/frame'
    import linesTrend from 'components/monitor/linesTrend'
    import { cylinderOuter } from 'api/situationAnalysis/outProvincePage'
    import axios from 'axios'
    export default {
        data () {
            let me = this;
            return {
                bar: true,
                formOpt: {
                    inline: true,
                    // 表单项
                    items: [{
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn1',
                            value: '切换点击状态',
                            disabled: false,
                            click: function () {
                                me.opt.click = !me.opt.click
                            }
                        }
                    }, {
                        label: '',
                        type: 'button',
                        comOpt: {
                            id: 'btn1',
                            value: '切换柱图数据',
                            disabled: false,
                            click: function () {
                                me.bar = !me.bar
                                if (me.bar) {
                                    me.loadJson()
                                } else {
                                    me.cylinderOuter()
                                }
                            }
                        }
                    }]
                },
                opt: {
                    data: [],
                    sencondData: [],
                    click: true, // 能否点击展开，TRUE为能，FALSE不能
                    barClick (item, index, e) {
                        let jump = index * 30;
                        $('#areaBars .ga-frame__content').animate({ scrollTop: jump }, 500);
                        me.loadJson();
                        console.log(e)
                        console.log('外部', item)
                        console.log(index)
                    },
                    secondBarClick (item, index, e) {
                        console.log(e)
                        console.log('外部-二级', item)
                        console.log(index)
                    }
                },
                title1: '各地市人员分布',
                title2: '折线图',
                lineOpt: {
                    width: '270',
                    height: '200',
                    props: {
                        xName: '地域',
                        yName: '人员个数',
                        tName: '新建图表标题'
                    }
                },
                lineData: []
            }
        },
        mounted () {
            this.cylinderOuter()
//            this.loadJson()
//            this.change()
        },
        components: {
            areaBars,
            FormComp,
            frameComp,
            linesTrend
        },
        watch: {
        },
        methods: {
            async cylinderOuter () {
                let resp = await cylinderOuter({});
                let { data } = resp;
                if (data) {
                    this.opt.data = data
                }
            },
            loadJson () {
                axios.get('/example/static/areaBars.json').then(resp => {
                    this.opt.sencondData = resp.data.data
                })
                axios.get('/example/static/line.json').then(resp => {
                    this.lineData = resp.data
                })
            },
            change () {
                let div = $('.abc')
                div.each(function () {
                    let width = $(this).attr('aa');
                    let per = width / 1000 * 100
                    $(this).width(`calc(${per}% - 100px`)
                })
            }
        }
    }
</script>

<style lang="css">
    /*.fade-enter-active, .fade-leave-active {*/
        /*transition: width .5s*/
    /*}*/
    /*.fade-enter, .fade-leave-active {*/
        /*width: 10px*/
    /*}*/
    .abc {
        width: 10px;
        height: 15px;
        background: repeating-linear-gradient(90deg, #0077be, #0077be 0.6rem, transparent 0, transparent 0.9rem);
        transition: width 2s ease;
    }
</style>
