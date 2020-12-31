<template>
    <div style="margin-top: 2%;">
        <!--省内 省外 境外 按钮组-->
        <el-row class="ga-organizationManage__buttonGroup">
            <el-col :span="3" style="text-align: right;">重点区域名称：</el-col>
            <el-col :span="5">
                <el-select v-model="selectedArea" clearable placeholder="请选择">
                    <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.areaName"
                    :value="item.taskId + '/' + item.areaId">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-button type="primary"
                            style="margin: 0 8px;"
                            v-for="(item, index) in targetType" 
                            :key="index"
                            :disabled="selectedArea === ''">
                    <a :style="{cursor: selectedArea === '' ? 'not-allowed' : 'pointer'}" :href="selectedArea === '' ? void(0) : item.url" >
                        {{ item.label }}
                    </a>
                </el-button>
            </el-col>
        </el-row>
        <!--弹框-->
        <!-- <sysDialog size="small" v-if="dialogShow"
                   :dialogVisible="dialogShow"
                   :showConfirm="false"
                   :showCancel="false"
                   :title="dialogTitle"
                   :okFn="nextStep"
                   @change="dialogChange">
        </sysDialog> -->
    </div>
</template>

<script>
    import sysDialog from 'components/common/dialog'
    import { getImportantArea } from 'api/system/importantPersonExport'
    import { mapGetters } from 'vuex'
    export default {
        name: 'importantPersonExport',
        data () {
            return {
                selectedArea: '',
                options: [],
                exportUrl: process.env.NODE_ENV === 'production'
                        ? '/policeBusiness' : 'http://10.8.0.32:8080/policeBusiness'
            }
        },
        mounted () {
            this.getArea();
        },
        computed: {
            targetType () {
                return [{
                    label: '省内人员导出',
                    url: `${this.exportUrl}/zdqy/daochu/3/${this.selectedArea}`
                }, {
                    label: '省外人员导出',
                    url: `${this.exportUrl}/zdqy/daochu/4/${this.selectedArea}`
                }, {
                    label: '境外人员导出',
                    url: `${this.exportUrl}/zdqy/daochu/5/${this.selectedArea}`
                }]
            },
            comSize () {
                return {
                    height: this.vsHeight - this.formHeight - 29 - 40
                }
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
        methods: {
            // 获取重点区域 接口
            async getArea () {
                let resp = await getImportantArea();
                if (resp.rows) {
                    this.options = this.options.concat(resp.rows)
                }
                // console.log(this.options)
            }
        },
        watch: {
            // selectedArea: function (newVal) {
            //     console.log(newVal)
            // }
        },
        components: {
            sysDialog
        }
    }
</script>

<style lang="postcss">
</style>
