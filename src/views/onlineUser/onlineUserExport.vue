<template>
    <div class="ga-onlineUser">
        <!-- 查询条件 -->
        <FormComp :option="formOpt" ref="form"></FormComp>
        <el-row style='margin-bottom: 10px;'>
            <el-col :span="24" >
                <p v-if="textShow" v-html="textMsgTotal"></p>
            </el-col>
        </el-row>
        <!--查询结果--Table表格-->
        <el-row >
            <tableCopm :option = "tableOpt" ref="table"  :comSize="tableHeight"
                       @handleCurrentPageChange="handleCurrentPageChange"
                       @handleSizePageChange = "handleSizePageChange"
                       class="gutterNone">
            </tableCopm>
        </el-row>
        <!--<iframe id="ifile" style="display:none"></iframe>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import FormComp from 'components/Form/index'
    import tableCopm from 'components/Table'
    import { getCity,
      getDistrict,
      getProvince,
      getRegion,
      getCountry,
      queryResult } from 'api/onlineUser/onlineUserExport'
    import { forbiddenDate, getIntervalDate } from 'utils'
    import { mapGetters } from 'vuex'
    import axios from './axiosExport'
    const apiUrl = process.env.NODE_ENV === 'production'
      ? '/policeBusiness' : 'http://192.168.31.107:8080/policeBusiness'
    export default {
        name: 'onlineUserExport',
        data () {
            const me = this;
            return {
                formData: {},
                cityData: [],
                districtData: [],
                countryData: [],
                provinceData: [],
                regionData: [],
                formOpt: {
                    // form 表单true横排，false竖排
                    inline: true,
                    labelPos: 'right',
                    // labelWidth: '80',
                    btnPos: 'right',
                    // 表单项
                    items: [{
                        label: '地市',
                        type: 'select',
                        comOpt: {
                            id: 'city',
                            value: 0,
                            disabled: false,
                            width: 180,
                            data: [],
                            change: function (val) {
                                if (val === 0) {
                                    let arr = [{
                                        'name': '全部辖区',
                                        'value': 0
                                    }]
                                    me.$refs.form.setItemData('district', arr)
                                    me.$refs.form.setValue([{
                                        id: 'district',
                                        value: 0
                                    }])
                                } else {
                                    me.getDistrict(val)
                                }
                            }
                        }
                    },
                    {
                        label: '区县',
                        type: 'select',
//                        required: true,
                        comOpt: {
                            id: 'district',
                            value: 0,
                            disabled: false,
                            width: 180,
                            data: {
                                'name': '全部辖区',
                                'value': 0
                            },
                            change: function () {
                            }
                        }
                    },
                    {
                        label: '日期',
                        type: 'date',
                        wrap: true,
                        comOpt: {
                            id: 'queryTime',
                            value: getIntervalDate(),
                            type: 'datetimeMinute',
                            disabled: false,
                            format: 'yyyy-MM-dd HH',
                            width: '180',
                            pickOptions: {
                                disabledDate (time) {
                                    let maxDay = getIntervalDate()
                                    return forbiddenDate(time, maxDay, 30)
                                }
                            }
                        }
                    },
                    {
                        label: '区域',
                        type: 'select',
                        comOpt: {
                            id: 'area',
                            value: 2,
                            disabled: false,
                            width: 180,
                            data: [
                                { name: '请选择', value: 2 },
                                { name: '省外', value: 0 },
                                { name: '境外', value: 1 }
                            ],
                            change: function (val) {
                                if (val === 2) {
                                    me.$refs.form.setShow([
                                        { id: 'country', value: false },
                                        { id: 'province', value: false },
                                        { id: 'region', value: false }
                                    ])
                                } else if (val === 0) {
                                    me.$refs.form.setShow([
                                        { id: 'country', value: false },
                                        { id: 'province', value: true },
                                        { id: 'region', value: true }
                                    ])
                                    me.getProvince()
                                    me.$refs.form.setItemData('country', []);
                                    me.$refs.form.setItemData('region', []);
                                    let arr = [{
                                        'name': '全部辖区',
                                        'value': 0
                                    }]
                                    me.$refs.form.setItemData('region', arr)
                                    me.$refs.form.setValue([{
                                        id: 'region',
                                        value: 0
                                    }])
                                } else if (val === 1) {
                                    me.$refs.form.setShow([
                                        { id: 'country', value: true },
                                        { id: 'province', value: false },
                                        { id: 'region', value: false }
                                    ])
                                    me.getCountry()
                                    me.$refs.form.setItemData('province', []);
                                }
                            }
                        }
                    },
                    {
                        label: '国家（或地区）',
                        type: 'select',
                        // required: true,
                        comOpt: {
                            id: 'country',
                            value: '全部国家',
                            show: false,
                            disabled: false,
                            filterable: true,
                            width: 180,
                            data: [],
                            change: function () {
                            }
                        }
                    },
                    {
                        label: '省（市、自治区）',
                        type: 'select',
                        // required: true,
                        comOpt: {
                            id: 'province',
                            show: false,
                            value: '全部辖区',
                            disabled: false,
                            width: 180,
                            data: [],
                            change: function (val) {
                                me.getRegion(val)
                            }
                        }
                    },
                    {
                        label: '市（地区、自治州、盟）',
                        type: 'select',
                        // required: true,
                        comOpt: {
                            id: 'region',
                            value: '全部辖区',
                            show: false,
                            disabled: false,
                            width: 180,
                            data: [],
                            change: function () {
                            }
                        }
                    }],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                              // id: 'yq12',
                                value: '查询',
                                disabled: false,
                                click: function () {
                                    let val = me.$refs.form.getValue()
                                    me.queryCheck(val)
                                }
                            }
                        },
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                              // id: 'yq12',
                                value: '导出',
                                disabled: true,
                                click: function () {
                                    me.exportDoc()
                                }
                            }
                        }
                    ]
                },
                textShow: false,
                textMsg: '',
                textMsgTotal: '',
                msgHeight: 0,
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    // rowHeight: 36,
                    column: [
                        { name: '序号', value: 'index', width: 100, align: 'center' },
                        { name: '手机号码', value: 'msisdn', align: 'center' },
                        { name: '手机归属地', value: 'homeName', align: 'center' },
                        { name: '机身码', value: 'imei', align: 'center' },
                        { name: '卡号', value: 'imsi', align: 'center' }
                    ],
                    // 表格加在数据
                    data: [],
                    // 是否分页
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        components: {
            FormComp, tableCopm
        },
        computed: {
            ...mapGetters({
                'visualHeight': 'global/visualHeight',
                'owner': 'global/userName'
            }),
            tableHeight () {
                return {
                    height: this.visualHeight - this.msgHeight - 135
                }
            }
        },
        mounted () {
            this.getCity();
        },
        methods: {
            // 获取地市
            async getCity () {
                let resp = await getCity();
                let { rows } = resp;
                if (rows && _.isArray(rows)) {
                    let arr = [];
                    rows.forEach(item => {
                        arr.push({
                            'name': item.cityName,
                            'value': item.cityCode
                        })
                    })
                    arr.unshift({
                        'name': '全部辖区',
                        'value': 0
                    });
                    this.$refs.form.setItemData('city', arr)
                    this.cityData = rows
                }
            },
            // 获取区县
            async getDistrict (val) {
                let resp = await getDistrict({
                    'cityCode': val
                });
                let { rows } = resp;
                if (rows && _.isArray(rows)) {
                    let arr = []
                    rows.forEach(item => {
                        arr.push({
                            'name': item.areaName,
                            'value': item.areaCode
                        })
                    })
                    arr.unshift({
                        'name': '全部辖区',
                        'value': 0
                    });
                    this.$refs.form.setItemData('district', arr);
                    this.$refs.form.setValue([{
                        id: 'district',
                        value: 0
                    }])
                    this.districtData = rows
                }
            },
            // 获取省（市、自治区）
            async getProvince () {
                let resp = await getProvince();
                let { rows } = resp;
                if (rows && _.isArray(rows)) {
                    let arr = []
                    rows.forEach(item => {
                        arr.push({
                            'name': item.swProName,
                            'value': item.swProCode
                        })
                    })
                    arr.unshift({
                        'name': '全部辖区',
                        'value': 0
                    });
                    this.$refs.form.setItemData('province', arr);
                    this.$refs.form.setValue([{
                        id: 'province',
                        value: arr[0].value
                    }])
                    this.provinceData = rows
                }
            },
            // 获取市（地区、自治州、盟）
            async getRegion (val) {
                let resp = await getRegion({
                    'swProCode': val
                });
                let { rows } = resp;
                if (rows && _.isArray(rows)) {
                    let arr = []
                    rows.forEach(item => {
                        arr.push({
                            'name': item.swCityName,
                            'value': item.swCityCode
                        })
                    })
                    arr.unshift({
                        'name': '全部辖区',
                        'value': 0
                    });
                    this.$refs.form.setItemData('region', arr);
                    this.$refs.form.setValue([{
                        id: 'region',
                        value: 0
                    }])
                    this.regionData = rows
                }
            },
            // 获取国家（或地区）
            async getCountry () {
                let resp = await getCountry();
                let { rows } = resp;
                if (rows && _.isArray(rows)) {
                    let arr = []
                    rows.forEach(item => {
                        arr.push({
                            'name': item.nationName,
                            'value': item.nationCode
                        })
                    })
                    arr.unshift({
                        'name': '全部国家',
                        'value': 0
                    });
                    this.$refs.form.setItemData('country', arr);
                    this.$refs.form.setValue([{
                        id: 'country',
                        value: 0
                    }])
                    this.countryData = rows
                }
            },
            // 查询验证
            queryCheck (val) {
                if (val.city === '') {
                    this.$alert('地市没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.district === '') {
                    this.$alert('区县没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.queryTime === '') {
                    this.$alert('日期没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.area === '') {
                    this.$alert('区域没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.province === '') {
                    this.$alert('省（市、自治区）没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.region === '') {
                    this.$alert('市（地区、自治州、盟）没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else if (val.country === '') {
                    this.$alert('国家（或地区）没有录入信息，请检查后重新录入。', {
                        confirmButtonText: '确定'
                    })
                    return
                } else {
                    this.formData = val;
                    let rows = this.tableOpt.pageOpt.pageSize
                    this.queryResult(rows, 1);
                    this.tableOpt.pageOpt.currentPage = 1;
                    this.textMsg = this.textMsgDetail();
                }
            },
            // 查询结果
            async queryResult (pageSize, page) {
                this.tableOpt.data = []
                this.tableOpt.listLoading = true;
                let resp = await queryResult({
                    'rows': pageSize,
                    'page': page,
                    'cityCode': this.formData.city,
                    'areaCode': this.formData.district,
                    'queryDate': this.formData.queryTime.replace(/[-\s]/g, '').slice(0, 10),
                    'area': this.formData.area,
                    'swProCode': this.formData.province,
                    'swCityCode': this.formData.region,
                    'nationCode': this.formData.country
                });
                let { rows, total } = resp;
                if (rows && _.isArray(rows) && rows.length !== 0) {
                    this.tableOpt.data = rows;
                    this.tableOpt.pageOpt.total = total;
                    this.textMsgTotal = `<span style="color:#fff;">${this.textMsg}在线手机用户${total}个。</span>`;
                    this.textShow = true;
                    this.msgHeight = 25;
                    this.tableOpt.listLoading = false;
                    this.formOpt.btns[1].comOpt.disabled = false;
                } else {
                    this.tableOpt.listLoading = false;
                    this.tableOpt.pageOpt.total = 0;
                    this.textMsgTotal = `<span style="color:#fff;">${this.textMsg}在线手机用户0个。</span>`;
                    this.formOpt.btns[1].comOpt.disabled = true;
                }
            },
            // 导出
            exportDoc () {
                this.formOpt.btns[1].comOpt.disabled = true;
                let queryTime = this.formData.queryTime.replace(/[-\s]/g, '').slice(0, 10);
                let province = this.formData.province ? this.formData.province : 0;
                let region = this.formData.region ? this.formData.region : 0;
                let country = this.formData.country ? this.formData.country : 0;
                let URL = `${apiUrl}/snjwPersonExport/export/${this.formData.city}/${this.formData.district}` +
                  `/${queryTime}/${this.formData.area}/${province}/${region}/${country}`
                let me = this
                axios.get(URL).then(function (response) {
                    if (response === '200') {
                        me.$message.success('下载成功！')
                    } else {
                        me.$message.warning('下载失败！')
                    }
                    me.formOpt.btns[1].comOpt.disabled = false;
                }).catch(function (response) {
                    me.formOpt.btns[1].comOpt.disabled = false;
                    console.log(response);
                });
                // document.getElementById('ifile').src = URL;
            },
            // 查询基本信息显示
            textMsgDetail () {
                let time = new Date(this.formData.queryTime)
                let year = time.getFullYear() + '年';
                let month = time.getMonth() + 1 + '月';
                let date = time.getDate() + '日';
                let hour = time.getHours() + '点';
                let DATE = [year, month, date, hour].join('');
                let city = '';
                let district = '';
                let province = '';
                let region = '';
                let country = '';
                let area = ''
                this.cityData.forEach(item => {
                    if (this.formData.city === item.cityCode) {
                        city = item.cityName
                    }
                })
                this.districtData.forEach(item => {
                    if (this.formData.district === 0) {
                        district = '全部辖区'
                    } else if (this.formData.district === item.areaCode) {
                        district = item.areaName
                    }
                })
                this.provinceData.forEach(item => {
                    if (this.formData.province === item.swProCode) {
                        province = item.swProName
                    }
                })
                this.regionData.forEach(item => {
                    if (this.formData.region === 0) {
                        region = '全部辖区'
                    } else if (this.formData.region === item.swCityCode) {
                        region = item.swCityName
                    }
                })
                this.countryData.forEach(item => {
                    if (this.formData.country === 0) {
                        country = '全部国家'
                    } else if (this.formData.country === item.nationCode) {
                        country = item.nationName
                    }
                })
                if (this.formData.area === 2) {
                    area = '省外境外'
                }
                // 省外（省、自治区）：  XX市（地、州）XX区（县）YYYY年MM月DD日，辖区内XX省XX市在线手机用户XXXX个。
                // 省外（直辖市）：     XX市（地、州）XX区（县）YYYY年MM月DD日，辖区内XX市在线手机用户XXXX个。
                // 境外：              XX市（地、州）XX区（县）YYYY年MM月DD日，辖区内XX（国家或地区）在线手机用户XXXX个。
                return `${city}${district}${DATE}，辖区内${area}${province}${region}${country}`
            },
            // 表格页码
            handleCurrentPageChange (val) {
                this.tableOpt.pageOpt.currentPage = val;
                let pageSize = this.tableOpt.pageOpt.pageSize;
                if (this.tableOpt.data.length !== 0) {
                    this.queryResult(pageSize, val)
                }
            },
            handleSizePageChange (val) {
                this.tableOpt.pageOpt.currentPage = 1;
                this.tableOpt.pageOpt.pageSize = val;
                if (this.tableOpt.data.length !== 0) {
                    this.queryResult(val, 1)
                }
            }
        }
    }
</script>

<style>
</style>
