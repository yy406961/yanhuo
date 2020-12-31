<template>
    <div>
        <iframeTab :option = "iframeOpt" :iframeSize="iframeSize" @tabClick="tabClick"></iframeTab>
    </div>
</template>
<script>
    import iframeTab from 'components/yq/iframe-tab'
    export default {
        name: 'vue',
        data() {
            return {
                w: 0,
                h: 0,
                iframeOpt: {
                    data: [
                        {
                            name: '基本信息',
                            path: '/hotEvent/index',
                            url: 'http://localhost:1717/#/hotEvent/index'},
                        {
                            name: '媒体意见',
                            path: '/hotEvent/rd-1',
                            url: 'http://172.17.18.10:8999/digital-factory/view.html?mid=98970c78-85fc-442a-82e7-438d19242f2e&__key1=1&isOpacity=0'
                        }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
            this.w = $(window).width() - 220;
            this.h = $(window).height() - 220;
        },
        components: {
            iframeTab
        },
        computed: {
            iframeSize() {
                return {
                    width: this.w,
                    height: this.h
                }
            }
        },
        methods: {
            tabClick(val) {
                this.$store.dispatch('iframetab/setHotTab', val.index);
                this.iframeOpt.current = val.index;
            }
        }
    }
</script>
<style>

</style>
