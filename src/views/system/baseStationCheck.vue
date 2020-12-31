<template>
    <div class="ga-bsCheck">
        <span class="ga-bsCheck__btnbox">
            <el-button type='primary' @click="importFn">导入</el-button>
            <el-button style="margin-left: 12px" type='primary' @click="cleanUpFn">清除</el-button>
        </span>
        <div id="bsCheckMap" class="ga-bsCheck__map"></div>
        <sysDialog size="small" v-if="importShow" :dialogVisible="importShow" title="基站信息导入" :okFn="commitImport" @change="dialogChange">
            <el-row>
                <el-col :span="4" :offset="3">
                    模板下载：
                </el-col>
                <el-col :span="14">
                    <a :href="importUrl">【点击下载】</a>
                </el-col>
            </el-row>
            <el-row class="ga-targetNumberManage__dialog">
                <el-col :span="21" :offset="3">
                    <el-upload ref="upload"
                    :action="uploadUrl"
                    :on-error="handleError"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <p style="margin-top: 5px;" slot="tip"><span style="color: red">*&nbsp;</span>只能上传Excel文件(.xls)</p>
                </el-upload>
                </el-col>
            </el-row>
        </sysDialog>
    </div>
</template>
<script>
    import sysDialog from 'components/common/dialog'
    import { mapGetters, mapActions } from 'vuex'
    // const RED = './static/vendor/gis/baidumapv2/images/red.png'
    const apiUrl = process.env.NODE_ENV === 'production'
        ? '/policeBusiness' : 'http://localhost:8080/mockjsdata/1'
    // const apiUrl = process.env.NODE_ENV === 'production'
    //     ? '/policeBusiness' : 'http://10.8.0.23:8080/policeBusiness'
    export default {
        data () {
            return {
                map: '', // 地图元素
                importShow: false,
                importUrl: '', // 导入模板地址
                uploadUrl: '', // 导入地址
                fileList: [], // 导入文件列表
                opts: {
                    width: 300,     // 信息窗口宽度
                    // height: 0,     // 信息窗口高度
                    fontSize: 16,
                    enableCloseOnClick: true // 是否开启点击地图关闭信息窗口
                }
            }
        },
        components: {
            sysDialog
        },
        mounted () {
            // console.log(this.globalKeys)
            this.createMap();
            this.importUrl = apiUrl + '/cellImport/downloadJzbModel'
            this.uploadUrl = apiUrl + '/cellImport/uploadjzfile'
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight', // 取到可用视窗高
                'globalKeys': 'global/globalKeys' // 全局省份关键字
            })
        },
        created () {
        },
        methods: {
            importFn () {
                this.importShow = true
            },
            cleanUpFn () {
                this.map.clearOverlays();
            },
            commitImport () {
                this.$refs.upload.submit();
                this.dialogChange(false);
            },
            dialogChange (val) {
                this.importShow = val;
            },
            handleError (err) {
                this.$message({
                    type: 'warning',
                    message: err
                })
            },
            handleSuccess (resp) {
                if (resp.status === 201) {
                    this.$message({
                        type: 'info',
                        message: resp.message
                    })
                    this.createMap(resp.rows)
                    this.createPoint(resp.rows)
                } else {
                    this.$message({
                        type: 'warning',
                        message: resp.message
                    })
                }
            },
            handleRemove (file) {
                this.$message({
                    type: 'success',
                    message: file.name + '移除成功'
                })
            },
            /**
             * 创建地图
             * @param {data} 基站点数据
             * */
            createMap (data) {
                // 在id为heatMapContainer的div中画地图
                this.map = new BMap.Map('bsCheckMap', { minZoom: 4, maxZoom: 18 });
                // 设置中心点和初始层级
                try {
                    if (data && data.length) {
                    // 有点数据
                        let view = this.map.getViewport(data.map(item => {
                            return new BMap.Point(item.lon, item.lat)
                        }));
                        this.map.centerAndZoom(view.center, view.zoom);
                    } else {
                    // 无点数据
                        // let title = this.globalKeys.gTitle
                        let lng = this.globalKeys.gMapCenterRvrovice[0]
                        let lat = this.globalKeys.gMapCenterRvrovice[1]
                        this.map.centerAndZoom(new BMap.Point(lng, lat), 8);
                    }
                } catch (error) {
                    console.log('非法的中心点或层级')
                    this.map.centerAndZoom('中国')
                }
                // 添加控件
                let topRightNavigation = new BMap.NavigationControl({
                    anchor: 1,  // 控件位置，左 0，右 1
                    type: 0 // 控件类型
                });
                this.map.addControl(topRightNavigation)
                // 允许地图进行滚轮缩放
                this.map.enableScrollWheelZoom();
            },
            //  画点
            createPoint (data) {
                if (data.length) {
                    let map = this.map;
                    map.clearOverlays();
                    // // 初始化数据
                    data.forEach(point => {
                        let marker = new BMap.Marker(new BMap.Point(point.lon, point.lat));
                        map.addOverlay(marker);
                        let message = `<div style="font-size: 16px;">
                                        <p>基站位置：${point.address}</p>
                                        <p>经度：${point.lon}</p>
                                        <p>纬度：${point.lat}</p>
                                        <p>LAC：${point.lac}</p>
                                        <p>CI：${point.ci}</p>
                                        <p>ULI：${point.uli}</p>
                                        <p>AreaCode：${point.areacode}</p>
                                    </div>`
                        let infoWindow = new BMap.InfoWindow(message, this.opts);
                        this.map.openInfoWindow(infoWindow, marker); //  开启信息窗口
                        marker.addEventListener('click', function (e) {
                            //  获取点击事件弹出框的内容
                            this.openInfo(message, e.target)
                        }.bind(this))
                    });
                }
            },
            // 点击 marker 显示其信息
            openInfo (content, e) {
                let p = e;
                let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                let infoWindow = new BMap.InfoWindow(content, this.opts);
                this.map.openInfoWindow(infoWindow, point); //  开启信息窗口
            },
            setLabel (marker, message) {
                let label = new BMap.Label(message,
                    { offset: new BMap.Size(20, -10) })
                label.setStyle({
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '12px',
                    lineHeight: '20px',
                    opacity: 0.6,
                    border: '#000',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    whiteSpace: 'normal',
                    width: '240px'
                });
                marker.setLabel(label)
            },
            ...mapActions({
                'syncHeight': 'global/syncVisualHeight'
            })
        }
    }
</script>
<style lang="postcss" scoped>
    @component-namespace ga {
        @b bsCheck {
            width: calc(100% + 40px);
            height: calc(100% + 40px) !important;
            position: relative;
            left: -20px;
            top: -7px;
            @e map {
                width: 100%;
                height: 100%;
            }
            @e btnbox {
                position: absolute;
                top: 16px;
                left: 30px;
            }
        }
    }
</style>
<style>
    .ga-bsCheck .el-upload-list {
        height: auto;
    }
</style>

