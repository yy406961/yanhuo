<template>
    <div class = 'yq-pagination'>
        <el-pagination
            @size-change = "handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="option.currentPage"
            :page-sizes="option.pageSizes"
            :page-size.sync="option.pageSize"
            :layout="option.layout||layout"
            :total="option.total">
            <span class="yq-slotSty">
                {{ option.currentPage }} / {{ option.total }}
            </span>
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'pagination',
        props: [
            'option'
        ],
        data () {
            return {
                currentPage: 1,
                layout: 'total, sizes, prev, pager, next, jumper'
            }
        },
        created () {
        },
        mounted () {
        },
        components: {},
        watch: {},
        methods: {
            handleSizeChange (val) {
                this.$emit('handleSizeChange', val);
            },
            handleCurrentChange (val) {
                this.$emit('handleCurrentChange', val);
            }
        }
    }
</script>
<style>
    @component-namespace yq {
        @b pagination {
            text-align: right;
            margin: 5px;
        }
        @b slotSty {
            margin-left: 10px;
            color: #fff;
            opacity: 0.75;
        }
    }
</style>
