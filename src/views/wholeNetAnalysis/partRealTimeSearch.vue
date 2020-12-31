<template>
    <div class="ga-mapSty">
        <div class="ga-layout__bodyTitle">
            <span class="ga-layout__titleTopLeft"></span>
            <span class="ga-layout__titleLeft"></span>
            <span class="ga-layout__titleCenter">{{ title }}</span>
            <span class="ga-layout__titleRight"></span>
            <span class="ga-layout__titleRightLeft"></span>
        </div>
        <page :part="part" :owner="id"></page>
    </div>
</template>

<script>
    import page from './AllNetCommons/realTimeSearch'
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                title: this.$route.name,
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
