<template>
    <div class="ga-upload">
        <el-row>
            <el-col :span="colSpan">
                <el-upload ref="upload"
                    class="upload"
                    :action="uploadFile(action)"
                    :accept="uploadType"
                    :data="extraParam"
                    :multiple="isMultiple"
                    :auto-upload="autoUpload"
                    :before-upload="handleBefore"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="onChange"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :file-list="fileListSelf">
                    <el-button size="small" type="primary">{{buttonText}}</el-button>
                    <div slot="tip" class="el-upload__tip" v-if="tipShow">{{ tipText }}</div>
                </el-upload>
            </el-col>
        </el-row>
        <a class="ga-upload__model" v-if="modelShow" :href="modelDownUrl">模板下载</a>
        <!-- <div class="a"  v-if="modelShow" @click="downloadModel(downUrl)">模板下载</div> -->
    </div>
</template>

<script>
    import { downloadModel } from 'api/platform/upload'
    export default {
        data () {
            return {
                fileListSelf: [],
                extraParam: {
                    imageName: ''
                },
                modelDownUrl: ''
            }
        },
        props: {
            // 类型
            action: {
                type: String
            },
            downUrl: {
                type: String
            },
            autoUpload: {
                type: Boolean,
                default: true
            },
            isMultiple: {
                type: Boolean,
                default: true
            },
            fileList: {
                type: Array,
                default() {
                    return []
                }
            },
            limitNum: {
                type: Number,
                default: 1
            },
            // 上传类型
            uploadType: {
                type: String,
                default: '.xls'
            },
            tipText: {
                type: String,
                default: '只能上传xls文件'
            },
            buttonText: {
                type: String,
                default: '导入'
            },
            modelShow: {
                type: Boolean,
                default: true
            },
            tipShow: {
                type: Boolean,
                default: true
            },
            mulBool: {
                type: Boolean,
                default: false
            },
            colSpan: {
                type: Number,
                default: 10
            }
        },
        mounted() {
            let url = process.env.MOCK_URL;
            this.modelDownUrl = `${url}${this.downUrl}`
            this.fileListSelf = _.cloneDeep(this.fileList)
        },
        methods: {
            // 导入文件
            uploadFile (str) {
                let url = process.env.MOCK_URL;
                return `${url}${str}`
            },
            handleBefore(file) {
                let isBool = false
                console.log(file.name.slice(-3), file.name.slice(-3) === 'xls')
                if (this.uploadType === '.xls,.xlsx') {
                    isBool = file.name.slice(-3) === 'xls' || file.name.slice(-3) === 'lsx'
                } else {
                    isBool = file.type === 'image/jpeg'
                }
                if (!isBool) {
                    this.$message(`${this.tipText}！`)
                    this.fileListSelf = []
                }
                return isBool
            },
            handleRemove () {
                this.$emit('uploadRemove', false)
                // this.extraParam.imageName = file.name
            },
            handlePreview (file) {
                console.log(file);
            },
            onChange (file, fileList) {
                let { length } = fileList
                let bool = length > this.limitNum
                if (bool) {
                    this.$message.warning(`最多只能选择${this.limitNum}个文件！`)
                    this.extraParam.imageName = fileList[0].name
                    let arr = fileList.splice(length - 1 - this.limitNum, this.limitNum)
                    this.fileListSelf = _.cloneDeep(arr)
                }
            },
            submitUpload() {
                console.log('submitUpload')
                this.$refs.upload.submit();
            },
            onSuccess(resp) {
                console.log('uploadSuccess', resp)
                this.$emit('uploadSuccess', resp)
            },
            onError(err) {
                this.$message('上传文件失败' + err)
            },
            // 下载模板
            async downloadModel (str) {
                let resp = await downloadModel(str);
                if (resp) {
                    console.log(resp)
                }
            }
        }
    }
</script>

<style scoped>
    .a {
        margin-top: 20px;
        cursor: pointer;
    }
    @component-namespace ga {
        @b upload {
            position: relative;
            @e model{
                position: absolute;
                left:100px;
                top:8px;
            }
        }
    }
</style>
