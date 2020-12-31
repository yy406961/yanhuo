<template lang="html">
    <div class="timeline" :style="wrapStyle" >
        <div class="timeline_shade" v-if="!options.click"></div>
        <div class="df-timeContainer" ref="timeContainer" :style="wrapStyle"></div>
    </div>
</template>

<script>
import Timelinepick from '../ga-timeline'
export default {
    name: 'timeline',
    props: {
        options: {
            type: Object,
            default () {
                return {
                }
            }
        },
        handler: {
            required: false
        }
    },
    mounted () {
        this.buildTimepick();
    },
    data () {
        return {
            width: 800,
            height: 120,
            startTime: '',
            endTime: '',
            timeType: '',
            vals: {
                startTime: '',
                endTime: '',
                timeType: ''
            }
        }
    },
    created () {
        this.width = this.options.width;
        this.height = this.options.height;
    },
    watch: {
        'vals': {
            deep: true,
            handler (newval) {
                if (newval) {
                    this.$emit('change', this.getValue())
                }
            }
        },
        'options.type': {
            deep: true,
            handler (newval) {
                if (newval) {
                    this.buildTimepick();
                }
            }
        }
    },
    methods: {
        createTimepick () {
            let op = this.createOp()
            this.timelinepick = new Timelinepick(op)
            // let e = this.timelinepick.caculateTimeSpan();
            // this.vals.startTime = e.startTime;
            // this.vals.endTime = e.endTime;
            // this.vals.timeType = e.timeType;
        },
        buildTimepick () {
            this.createTimepick();
        },

        pause () {
            this.timelinepick.pausePlay()
        },
        clear () {
            this.timelinepick.clearPlay()
        },
        start () {
            this.timelinepick.startPlay()
        },

        createOp () {
            let op = {
                'threshold': new Date(),
                'number': 49,
                'spanIndex': { start: 48, end: 49 },
                'type': 'halfhour',
                'dateFormat': 'yyyy-MM-dd mm:hh:ss'
            }
            if (this.options.type === 'five') {
                op.type = this.options.type
                op.number = 289
                op.spanIndex = { start: 288, end: 289 }
            }
            if (this.options.type === 'yesterday') {
                op.type = this.options.type
                op.number = 25
                op.spanIndex = { start: 24, end: 25 }
            }
            if (this.options.type === 'hour') {
                op.type = this.options.type
                op.number = 25
                op.spanIndex = { start: 24, end: 25 }
            }
            if (this.options.type === 'date') {
                op.type = this.options.type
                op.number = 31
                op.spanIndex = { start: 30, end: 31 }
            }
            op.el = this.$refs.timeContainer;
            op.parent = this.$el;
            op.callback = function (...arg) {
                this.timeHandler(...arg)
            }.bind(this)
            return op
        },
        timeHandler (arg) {
            this.vals.startTime = arg.startTime;
            this.vals.endTime = arg.endTime;
            this.vals.timeType = arg.timeType;
        },

        getValue () {
            let returnValue = Object.create(null);
            returnValue.startTime = this.vals.startTime
            returnValue.endTime = this.vals.endTime
            return returnValue;
        },

        update (prop) {
            let op = this.createOp(prop)
            this.timelinepick = new Timelinepick(op)
        },
        resizeComp (newVal) {
            let me = this;
            me.width = newVal.width;
            me.height = newVal.height;
            me.$nextTick(() => {
                if (me.timelinepick) {
                    if (me.resizeTimer) {
                        clearTimeout(me.resizeTimer)
                    }
                    me.resizeTimer = setTimeout(function () {
                        me.timelinepick = new Timelinepick(me.timelinepick.getOptions())
                    })
                }
            })
        },
        destoryComp () {
            this.timelinepick.destory();
        }
    },
    computed: {
        wrapStyle () {
            return {
                width: this.width + 'px',
                height: 80 + 'px',
                background: 'transparent'
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .timeline {
        position: relative;
        .timeline_shade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background: transparent;
        }
    }
</style>
