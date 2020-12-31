<template lang="html">
    <categoryTabs @currentSelected="tabCurrentSelected" :act="currentView" :panes="panesData" :option="tabsOpt">
        <template>
            <div v-show="currentView === 0">
                我是境外组件
            </div>
            <div v-show="currentView === 1">
                我是省外组件
            </div>
            <div v-show="currentView === 2">
                我是重点人组件
            </div>
        </template>
    </categoryTabs>
</template>

<script>
    import categoryTabs from 'components/monitor/categoryTabs'
    import axios from 'axios'
    export default {
        name: 'mapDemo',
        data () {
            return {
                panesData : [],
                tabsOpt: {
                    panes: {
                        width: 400,
                        height: 200
                    },
                    content: {
                        width: 400,
                        height: 400

                    }
                },
                currentView: 0
            }
        },
        mounted () {
            this.loadPanesJson();
        },
        methods: {
            tabCurrentSelected (val) {
                this.currentView = val;
            },
            loadPanesJson () {
                axios.get('/example/static/panes.json').then(resp => {
                    this.panesData = resp.data;
                })
            }
        },
        components: {
            categoryTabs
        }
    }
</script>

<style lang="css">
    div {
        color: #2157A3;
        font-size: 18px;
    }
</style>
