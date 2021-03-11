<!--
 * @Author: your name
 * @Date: 2021-03-10 09:49:08
 * @LastEditTime: 2021-03-10 17:21:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yanhuo\src\views\situationAnalysis\components\middleBorder.vue
-->
<template>
    <div class="ga-middleBorder__border">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'middleBorder',
        data() {
            return {
            }
        },
        props: [],
        computed: {
        },
        watch: {
        },
        created () {
        },
        mounted () {
        },
        destroyed () {
        },
        methods: {
        },
        components: {
        }
    }
</script>

<style>
    @component-namespace ga {
        @b middleBorder {
            @e border {
                width: 100%;
                height: 100%;
                background: url('~@/assets/images/common/GroupNew.png') no-repeat center 0;
                -webkit-background-size: 100% 100%;
                -o-background-size: 100% 100%;
                background-size: 100% 100%;
                text-align: left;
                overflow: hidden;
                padding: 30px 10px 10px 10px;
            }
        }
    }
</style>