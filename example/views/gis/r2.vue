<template lang="html">
    <div>
        <div>r2</div>
        <button type="button"
                class="el-button el-button--leftTop ga-layout__body-back"
                @click="goBack">
            <span>返回</span>
        </button>
        <div>
            <router-link to="/r1">r1</router-link>
            <router-link to="/r2">r2</router-link>
        </div>
        {{param}}
    </div>
</template>

<script>
    import Mock from 'mockjs'
    export default {
        name: 'r2',
        data () {
            return {
                param: this.$route.params
            }
        },
        created () {
            console.log(this.$route.params)
        },
        methods: {
            goBack () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="postcss">
</style>
