<template>
    <div style="width: 100%;height: 100%">
        <page :part="part" :owner="id"></page>
    </div>
</template>

<script>
    import page from './AllNetCommons/psNumSearch'
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
//                hint: '请选择区（省）内实时监测需要监测的目标',
                part: 'part',
                id: null
            }
        },
        created () {
            if (localStorage.getItem('taskId')) {
                this.id = localStorage.getItem('taskId')
//                this.id = this.$route.params.taskId
            } else {
//                this.id = sessionStorage.getItem('userName')
                this.id = this.userName
            }
        },
        components: {
            page
        },
        computed: {
            ...mapGetters({
                'userName': 'global/userName'
            })
        }
    }
</script>

<style>

</style>
