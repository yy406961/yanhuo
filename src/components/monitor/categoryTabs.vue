<template lang="html">
    <div class="ga-tabs">
        <div class="ga-tabs__panees" :style="panesStyle" type="flex" justify="center">
            <div class="ga-tabs__panees--pie">
                <circularMap :option="circleOpt" :renderData="circleData"></circularMap>
            </div>
            <div class="ga-tabs__panees--nav">
                <ul>
                    <li class="ga-pane"  @click="toggle(index)" v-for="(pane,index) in panes" >
                        <i class="ga-pane__point" :style="pointColor(index)"></i>
                        <span class="ga-pane__name" :style="numColor(index)">{{pane.name}}：</span>
                        <span class="ga-pane__number" :style="numColor(index)">{{pane.value}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import circularMap from 'components/Chart/circularMap'
    export default {
        data () {
            return {
                active: this.act,
                colors: ['#00AAFF', '#FF6767', '#EF9D33', '#d94d5d', '#00FAEA'],
                circleOpt: {
                    width: this.option.panes.width / 2,
                    height: this.option.panes.height
                },
                circleData: []
            }
        },
        created () {
            this.numColor();
        },
        mounted () {
        },
        props: {
            act: {
                default: 0
            },
            panes: {
                type: Array,
                default: []
            },
            option: {}
        },
        watch: {
            act (val) {
                this.active = val
            },
            panes () {
                this.circleData = this.panes;
                // console.log(this.panes)
            }
        },
        computed: {
            panesStyle () {
                return {
                    height: this.option.panes.height + 'px',
                    width: this.option.panes.width + 'px'
                }
            },
            contentStyle () {
                return {
                    height: this.option.content.height + 'px',
                    width: this.option.content.width + 'px'
                }
            }

        },
        methods: {
            toggle (i) {
                this.active = i;
                this.panes[i].selected = true;
                this.$emit('currentSelected', i)
            },
            numColor (i) {
                return {
                    color: this.colors[i]
                }
            },
            pointColor (i) {
                return {
                    background: this.colors[i]
                }
            }
        },
        components: {
            circularMap
        }
    }

</script>

<style lang="postcss" scoped>
    @component-namespace ga {
        @b tabs {
            @e panees {
                display: flex;
                align-content: center;
                justify-content: space-between;
                /*border-top: 1px solid #8694a8;*/
                /*& ul {*/
                    /*!*display: flex;*!*/
                    /*justify-content: center;*/
                  /*}*/
                @m pie {
                    width: 40%;
                    text-align: center;
                }
                @m nav {
                    width: 50%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    & > ul {
                            width: 100%
                        }
                }
            }
        }
        @b pane {
            text-align: center;
            /*font-size: 1.4em;*/
            /*margin-top:10px;*/
            color: #fff;
            display: flex;
            justify-content: space-between;
            @e point {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin: auto 0;
            }
            @e name {
                width: 50px;
                display: inline-block;
                text-align: left;
                line-height: 30px;
                margin-left: 10px;
            }
            @e number {
                font-family: 'lcdd';
                width: calc(100% - 72px);
                /*display: inline-block;*/
                font-size: 1.6em;
                /*font-weight: bold;*/
                color: blue;
                text-align: right;
                line-height: 30px;
            }
        }
    }
</style>
