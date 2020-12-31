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
    import page from './AllNetCommons/historySearch'
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                title: this.$route.name,
                part: 'part',
                id: null
            }
        },
        components: {
            page
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
        computed: {
            ...mapGetters({
                'userName': 'global/userName'
            })
        }
    }
</script>

<style lang="postcss">
    @component-namespace ga {
        @b bigTitleSty {
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
            /*z-index: 3;*/
        }
        @b mapSty {
            /*width: calc(100% - 38px);*/
            /*height: calc(100% - 10px);*/
            /*position: absolute;*/
            /*top: 6px;*/
            /*left: 19px;*/
            @e btn {
                position: absolute;
                /*top: -8px;*/
                left: 30px;
                padding: 0;
                margin: 0;
                top:49px;
            }
        }
    }
</style>
