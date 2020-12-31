<template>
    <div>
        <el-button type="primary" @click="searchClick">高级搜索</el-button>
        <searchDemo :option="searchOpt" @advanceSearchHandler="advanceSearchHandler"></searchDemo>
    </div>
</template>
<script>
    import searchDemo from 'components/yq/advance-search'
    export default {
        name: 'advanceDemo',
        data() {
            return {
                searchOpt: {
                    searchVisibile: false
                }
            }
        },
        created() {
        },
        mounted() {

        },
        components: {
            searchDemo
        },
        watch: {},
        methods: {
            searchClick() {
                this.searchOpt.searchVisibile = true;
            },
            advanceSearchHandler(arg) {
                console.log(arg);
            }
        }
    }
</script>
<style>

</style>
