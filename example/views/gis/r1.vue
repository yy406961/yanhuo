<template lang="html">
    <div>
        <div>r1</div>
        <button type="button"
                class="el-button el-button--leftTop ga-layout__body-back"
                @click="goBack">
            <span>返回</span>
        </button>
        <div>
            <router-link to="/r1">r1</router-link>
            <router-link to="/r2">r2</router-link>
        </div>
        <div>
            <router-link 
            :to="{
                name: 'r2',
                params: {
                    aaa: 123
                }
            }">
            r2
            </router-link>
        </div>
        {{param}}
        {{local}}
    </div>
</template>

<script>
    import Mock from 'mockjs'
    export default {
        name: 'r1',
        data () {
            return {
                param: this.$route.params
            }
        },
        created () {
            
        },
        computed: {
            local () {
                if (!localStorage.getItem('r1')) {
                    localStorage.setItem('r1', 'lll')
                    return 'local'
                } else {
                    return localStorage.getItem('r1')
                }
            }
        },
        beforeDestroy () {
            // localStorage.removeItem('r1')
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
