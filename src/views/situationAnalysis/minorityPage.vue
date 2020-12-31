<template>
    <div class='ga-allProvince' ref="abc">
        <div class='ga-allProvince__leftContent'>
            <!-- 条件选择 -->
            <div :class="{
                    'ga-allProvince__term': true,
                    'termHeight': termHeight
                }">
                <frameCom>
                    <div class="tooltip" v-show="toolShow">{{message}}</div>
                    <div class="ga-allProvince__term--tabs">
                        <el-tabs type="card" v-model="termName" @tab-click="leftClick">
                            <el-tab-pane label="涉藏查询" name="first">
                            </el-tab-pane>
                            <el-tab-pane label="涉疆查询" name="second">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="changeH" @click="changeHeight" v-model="changeH"></div>
                    </div>
                    <div class="ga-allProvince__term--content">
                        <formComp :option="termFormOpt1" v-show="disForm1" ref="form1"></formComp>
                        <formComp :option="termFormOpt2" v-show="disForm2" ref="form2"></formComp>
                    </div>
                    <div class="ga-allProvince__term--bottom">
                        <formComp :option="formOpt" ref="phoneForm" :class="{'yq-form1': yqForm}"></formComp>
                        <a class="getFile" @click="getFile" :href="exportUrl" v-if="isExportAbled">导出</a>
                        <div class="getFile getFileDis" v-else>导出</div>
                    </div>
                </frameCom>
            </div>
            <!-- 人员列表 -->
            <div :class="{
                'ga-allProvince__tableBottom': true,
                'bHeight': bHeight
            }">
                <frameCom>
                    <tableComp :option="tableBottom":comSize="BottomHeight"
                    @handleCurrentPageChange="personCurrentPage"
                    @handleSizePageChange="personPage"></tableComp>
                </frameCom>
            </div>
        </div>
        <!-- 人员详情界面 -->
        <div class="ga-allProvince__personDetail" ref="personDetail">
            <frameCom >
                <div class="ga-allProvince__personDetail--tittle">
                    <p>手机号: {{msisdnTittle}}</p>
                    <el-tooltip :content="locationTittle" placement="top"
                    v-if="locationTittle !== ''">
                        <p>归属地: {{locationTittle}}</p>
                    </el-tooltip>
                    <p v-else>归属地: </p>
                    <p>特征: {{typeTittle}}</p>
                </div>
                <ul class="ga-allProvince__personDetail--basis">
                    <li v-for="(item, index) in termData" class="ga-allProvince__personDetail--lis"
                    v-if="termData[index].key !== ''">
                        <el-tooltip :content="item.key" placement="top">
                            <p>{{ item.key }}</p>
                        </el-tooltip>
                        <p>{{ item.value }}</p>
                    </li>
                    <li v-else class="ga-allProvince__personDetail--lis">
                        <p></p>
                        <p></p>
                    </li>
                </ul>
                <div class="personTableContent">
                    <ul class="lisTabsFat" v-if="activeNameDis">
                        <li v-for="(item, index) in tabsRightData" 
                            :class="{
                                'lisTabs': true,
                                'isactive': index === activeName
                            }" 
                            @click="handleClick(index)">
                            <el-tooltip :content="item.key + ' ( ' + item.value + ' )'" placement="top" class="lisTabsCon" v-if="index !== tabsRightData.length - 1">
                                <p>{{ item.shortKey }}</p>
                            </el-tooltip>
                            <el-tooltip :content="item.key" class="lisTabsCon" v-else>
                                <p>{{ item.shortKey }}</p>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <tableComp :option="personTable" :comSize="personHeight"
                @handleCurrentPageChange="personDetailCurrentPage"
                @handleSizePageChange="personDetailPage"></tableComp>
            </frameCom>
        </div>
        <div class="ga-allProvince__loading" v-show="allLoading"></div>
    </div>
</template>
<script>
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import { mapGetters } from 'vuex'
    import frameCom from 'components/monitor/frame'
    import { termData0, termData1, termSearch, frequency, relationShip, messageCon, targetLocation } from 'api/situationAnalysis/minorityPage'
    const apiUrl = process.env.NODE_ENV === 'production'
    ? '/policeBusiness' : 'http://192.168.3.209:8686/policeBusiness'
    export default {
        data () {
            let me = this;
            return {
                allLoading: false,
                // 导出按钮样式
                yqForm: true,
                // 左侧div高度
                termHeight: false,
                bHeight: false,
                tabType: '0',
                changeH: false,
                disForm1: true,
                disForm2: false,
                activeName: 0,
                activeNameDis: false,
                termName: 'first',
                personTitle: '',
                toolShow: false,
                message: '',
                exportUrl: `${apiUrl}/situation/SJExportData/`,
                // 查询后涉疆或涉藏的判断依据
                saveTermName: '',
                msisdnTittle: '',
                locationTittle: '',
                typeTittle: '',
                allPhoneNumber: '',
                // 右上判断依据
                termData: [],
                tabsRightData: [],
                leftObj: {},
                leftRows: 10,
                // 左上搜索框设置
                formOpt: {
                    inline: true,
                    items: [{
                        label: '手机号码:',
                        type: 'text',
                        comOpt: {
                            id: 'phoneNum',
                            value: ''
                        }
                    }],
                    btns: [{
                        type: 'button',
                        comOpt: {
                            value: '查询',
                            disabled: false,
                            click: function () {
                                // msisdn --- 电话号码
                                let valueObj;
                                let msisdn = me.$refs.phoneForm.getValue();
                                // 电话号码正确性检测  在不为空时，加86与不加86检测
                                if (!(/^[1-9]\d{0,19}$/.test(msisdn.phoneNum)) &&
                                    msisdn.phoneNum !== '') {
                                    me.$message.warning('请输入正确的手机号');
                                    return false;
                                }
                                me.tableBottom.listLoading = true;
                                me.tableBottom.emptyText = ' ';
                                me.allLoading = true;
                                me.tableBottom.data = [];
                                me.personTable.data = [];
                                me.personTable.column = [];
                                me.termData = [];
                                me.tabsRightData = [];
                                me.personTable.pageOpt.total = 0;
                                me.tableBottom.pageOpt.total = 0;
                                me.msisdnTittle = '';
                                me.allPhoneNumber = '';
                                me.locationTittle = '';
                                me.typeTittle = '';
                                me.activeName = 0;
                                // first -- 涉藏   second -- 涉疆
                                // 0 --- 涉藏   1 --- 涉疆
                                // 与表格状态相关
                                me.changeH = true;
                                // 与是否显示导入按钮相关
                                me.saveTermName = me.termName;
                                if (me.termName === 'first') {
                                    me.tableBottom.tableType = '0';
                                    // 改变人员详情标签页
                                    me.activeNameDis = true;
                                    valueObj = me.$refs.form1.getValue();
                                    // 将checkbox数组的变为checkbox字符串
                                    for (let key in valueObj) {
                                        if (valueObj[key][0] === 'checkbox') {
                                            valueObj[key] = 'checkbox'
                                        }
                                    }
                                    let obj = {
                                        valueObj: valueObj,
                                        type: '0',
                                        msisdn: msisdn.phoneNum,
                                        page: 1,
                                        rows: me.leftRows
                                    };
                                    me.leftObj = obj;
                                    me.termSearchData(obj);
                                } else if (me.termName === 'second') {
                                    me.tableBottom.tableType = '1';
                                    // 改变人员详情标签页
                                    me.activeNameDis = true;
                                    valueObj = me.$refs.form2.getValue();
                                    // 将checkbox数组的变为checkbox字符串
                                    for (let key in valueObj) {
                                        if (valueObj[key][0] === 'checkbox') {
                                            valueObj[key] = 'checkbox'
                                        }
                                    }
                                    let obj = {
                                        valueObj: valueObj,
                                        type: '1',
                                        msisdn: msisdn.phoneNum,
                                        page: 1,
                                        rows: me.leftRows
                                    };
                                    me.leftObj = obj;
                                    me.termSearchData(obj);
                                }
                            }
                        }
                    }]
                },
                // 条件列表
                termFormOpt1: {
                    inline: false,
                    labelWidth: '400',
                    labelPos: 'left',
                    items: [
                    ]
                },
                termFormOpt2: {
                    inline: false,
                    labelWidth: '430',
                    labelPos: 'left',
                    btnPos: 'right',
                    items: [
                    ]
                },
                // 左下表格配置 + 右侧接口请求
                tableBottom: {
                    stripe: true,
                    listLoading: false,
                    emptyText: ' ',
                    tableType: '0',
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdnStar', width: 135, align: 'center' },
                        { name: '手机归属地', value: 'homeCode', width: 80, align: 'center', tooltip: true },
                        { name: '所在地市', value: 'city', width: 80, align: 'center', tooltip: true },
                        { name: '到达时间', value: 'arriveTime', width: 150, align: 'center' }
                    ],
                    data: [],
                    // 添加分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        total: 0,
                        currentPage: 1,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    },
                    rowClick: (row) => {
                        // 右侧整体loading
                        this.personTable.listLoading = true;
                        this.personTable.emptyText = ' ';
                        this.allLoading = true;
                        // 右侧表格tittle
                        this.msisdnTittle = row.msisdnStar;
                        this.allPhoneNumber = row.msisdn;
                        this.locationTittle = row.homeCode;
                        if (this.saveTermName === 'first') {
                            this.typeTittle = '涉藏'
                        } else {
                            this.typeTittle = '涉疆'
                        }
                        this.getFrequency();
                    }
                },
                BottomHeight: {
                    height: 0
                },
                personHeight: {
                    height: 0
                },
                pageSizeArr: 10,
                // 人员详情表格
                personTable: {
                    listLoading: false,
                    emptyText: ' ',
                    stripe: true,
                    column: [],
                    data: [],
                    // 添加分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        total: 0,
                        currentPage: 1,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                },
//              人员详情表格的column
//              1--- 通联    2 --- 短信  3 --- 位置
                column1: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '对端号码', value: 'endMsisdnStar', width: 120, align: 'center' },
                    { name: '通联类型', value: 'cdrType', width: 80, align: 'center' },
                    { name: '对端号码归属地', value: 'endHomeCode', width: 120, align: 'center' },
                    { name: '事件发生时间', value: 'timeStamp', width: 180, align: 'center' },
                    { name: '通话时长', value: 'callTime', width: 60, align: 'center' },
                    { name: '短信内容', value: 'content', width: 150, align: 'center', tooltip: true, language: true },
                    // { name: '对端号码位置', value: 'endLocation', width: 120, align: 'center' },
                    { name: '本端号码位置', value: 'location', width: 250, align: 'center' }
                ],
                column2: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '对端号码', value: 'endMsisdnStar', width: 120, align: 'center' },
                    { name: '主被短', value: 'cdrType', width: 80, align: 'center' },
                    { name: '对端号码归属地', value: 'endHomeCode', width: 120, align: 'center' },
                    { name: '事件发生时间', value: 'timeStamp', width: 180, align: 'center' },
                    { name: '短信内容', value: 'content', width: 150, align: 'center', tooltip: true, language: true },
                    // { name: '对端号码位置', value: 'endPosition', width: 120, align: 'center' },
                    { name: '本端号码位置', value: 'location', width: 250, align: 'center' }
                ],
                column3: [
                    { name: '序号', value: 'index', width: 60, align: 'center' },
                    { name: '到达时间', value: 'arriveTime', width: 230, align: 'center' },
                    // { name: '停留时间', value: 'stayTime', width: 130, align: 'center' },
                    { name: '位置描述', value: 'location', width: 330, align: 'center' }
                ]
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys'
            }),
            /**
             * 判断导出是否可用
             * table有数据 且 与table绑定的type === 页签type   (table的type在查询后改变)
             */
            isExportAbled () {
                if (this.tableBottom.data.length && this.tableBottom.tableType === this.tabType) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {
            // 左半边页面的伸缩
            'changeH' () {
                if (this.changeH === true) {
                    $('.changeH').css({
                        'transform': 'rotate(180deg)'
                    })
                    this.termHeight = true;
                    this.bHeight = true;
                    this.BottomHeight.height = parseInt(this.vsHeight * 0.87) - 50;
                } else if (this.changeH === false) {
                    $('.changeH').css({
                        'transform': 'rotate(0deg)'
                    })
                    this.termHeight = false;
                    this.bHeight = false;
                    this.BottomHeight.height = parseInt(this.vsHeight * 0.38) - 35;
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                // 表格高度
                this.BottomHeight.height = $('.ga-allProvince__tableBottom').height() - 20;
                this.personHeight.height = $('.ga-allProvince__personDetail').height() - 100;
                $('.ga-frame__content').css('marginTop', '5px');
            })
            this.formLoad();
        },
        methods: {
            // 导出 --- 添加字符串参数
            getFile () {
                let str = '';
                let obj = this.leftObj;
                this.exportUrl = `${apiUrl}/situation/SJExportData/`;
                if (!obj.type) {
                    if (this.termName === 'first') {
                        this.exportUrl += '0,';
                    } else {
                        this.exportUrl += '1,';
                    }
                } else {
                    if (obj.msisdn === '') {
                        obj.msisdn = '$'
                    }
                    for (var i in obj.valueObj) {
                        if (obj.valueObj[i] === '' || obj.valueObj[i].length === 0) {
                            obj.valueObj[i] = '$';
                        }
                        str += (i + ',' + obj.valueObj[i] + ',')
                    }
                    this.exportUrl += (obj.type + ',' + obj.msisdn + ',' + str)
                }
            },
            // 改变左上角div高度
            changeHeight () {
                if (this.changeH === true) {
                    this.changeH = false;
                } else {
                    this.changeH = true
                }
            },
            // 获取字符串宽度及高度
            getWidth (text) {
                var $span = $('<span>' + text + '</span>');
                $span.css({ 'fontSize': '12px', visibility: 'hidden' });
                $('body').append($span)
                var result = {
                    'width': $span.width(),
                    'height': $span.height()
                }
                $span.remove()
                return result
            },
            // 人员列表表格分页 --- 左下
            personCurrentPage (val) {
                if (this.saveTermName !== this.termName || this.tableBottom.data.length === 0) {
                    return false;
                }
                this.leftObj.page = val;
                this.leftObj.rows = this.leftRows;
                this.tableBottom.listLoading = true;
                this.allLoading = true;
                this.tableBottom.emptyText = ' ';
                this.termSearchData(this.leftObj)
            },
            personPage (val) {
                this.leftRows = val;
                this.tableBottom.pageOpt.pageSize = val;
                if (this.saveTermName !== this.termName || this.tableBottom.data.length === 0) {
                    return false;
                }
                this.leftObj.page = 1;
                this.leftObj.rows = val;
                this.tableBottom.listLoading = true;
                this.allLoading = true;
                this.tableBottom.emptyText = ' ';
                this.tableBottom.pageOpt.currentPage = 1;
                this.termSearchData(this.leftObj)
            },
            // 个人详情表格分页 --- 右下
            // 当表格数据为空时 -- 使分页无效
            personDetailCurrentPage (val) {
                if (this.personTable.data.length === 0) {
                    return false;
                }
                let personPage = this.pageSizeArr;
                let tabsType;
                let flag;
                // 获取当前标签页的tabsType, 判断调用哪个接口
                this.tabsRightData.forEach((item) => {
                    if (item.name === this.activeName) {
                        flag = item.flag;
                        tabsType = item.tabsType;
                    }
                })
                this.personTable.listLoading = true;
                this.personTable.emptyText = ' ';
                this.allLoading = true;
                if (tabsType === 1) {
                    this.getPersonDetail(tabsType, flag, relationShip, val, personPage);
                } else if (tabsType === 2) {
                    this.getPersonDetail(tabsType, flag, messageCon, val, personPage);
                } else {
                    this.getPersonDetail(tabsType, flag, targetLocation, val, personPage);
                }
            },
            personDetailPage (val) {
                this.pageSizeArr = val;
                this.personTable.pageOpt.pageSize = val;
                if (this.personTable.data.length === 0) {
                    return false;
                }
                let tabsType;
                let flag;
                this.tabsRightData.forEach((item) => {
                    if (item.name === this.activeName) {
                        flag = item.flag;
                        tabsType = item.tabsType;
                    }
                })
                this.personTable.pageOpt.currentPage = 1;
                this.personTable.listLoading = true;
                this.personTable.emptyText = ' ';
                this.allLoading = true;
                if (tabsType === 1) {
                    this.getPersonDetail(tabsType, flag, relationShip, 1, val);
                } else if (tabsType === 2) {
                    this.getPersonDetail(tabsType, flag, messageCon, 1, val);
                } else {
                    this.getPersonDetail(tabsType, flag, targetLocation, 1, val);
                }
            },
            // 条件查询初始加载 --- 左上
            async formLoad () {
                let termFormOpt1 = this.termFormOpt1;
                let termFormOpt2 = this.termFormOpt2;
                let respTerm = (resp, termFormOpt) => {
                    if (resp && resp.length) {
                        resp.forEach((item) => {
                            if (item.valueWord === null || item.valueWord[0] === '') {
                                let obj = {};
                                let objData = [{ 'value': 'checkbox' }]
                                obj.label = item.key;
                                obj.type = 'checkbox';
                                obj.comOpt = {
                                    id: item.flag,
                                    value: [],
                                    disabled: false,
                                    width: 100,
                                    data: objData,
                                    change: function () {
                                    }
                                }
                                termFormOpt.items.push(obj)
                            } else {
                                let obj = {};
                                let valueArr = [];
                                obj.label = item.key;
                                obj.type = 'select';
                                item.valueWord.forEach((items) => {
                                    let obj = {
                                        'name': items,
                                        'value': items
                                    }
                                    valueArr.push(obj)
                                })
                                obj.comOpt = {
                                    id: item.flag,
                                    value: '',
                                    disabled: false,
                                    width: 100,
                                    data: valueArr,
                                    change: function () {
                                    }
                                }
                                obj.comOpt.data.unshift({
                                    name: '请选择',
                                    value: ''
                                })
                                termFormOpt.items.push(obj)
                            }
                        })
                    }
                    this.$nextTick(() => {
                        let me = this;
                        $('.el-form-item__label').each(function () {
                            var wh = me.getWidth($(this).text());
                            if (wh.width >= 400) {
                                // 设置label省略号
                                $(this).css({
                                    'white-space': 'nowrap',
                                    'text-overflow': 'ellipsis',
                                    'overflow': 'hidden'
                                })
                                $(this).on('mouseover', function () {
                                    me.toolShow = true;
                                    me.message = $(this).text();
                                })
                                $(this).on('mouseout', function () {
                                    me.toolShow = false
                                })
                            }
                        })
                        $('.el-form-item__label').css({
                            'height': '30px',
                            'margin-left': '10px',
                            'cursor': 'pointer'
                        })
                        // 设置label样式
                        $('.el-form-item').css({
                            'margin': '2px 0 1px 10px'
                        })
                    })
                }
                let resp1 = await termData0();
                let resp2 = await termData1();
                // 检测是否有数据， 决定样式
                if (!(resp1 === null || resp1 === '' || resp1.length === 0 || resp1.isOk === false)) {
                    this.yqForm = false;
                } else {
                    this.yqForm = true;
                }
                respTerm(resp1, termFormOpt1);
                respTerm(resp2, termFormOpt2);
            },
            // 根据条件查询人员列表 --- 左下
            async termSearchData (arr) {
                this.tableBottom.data = [];
                let resp = await termSearch(arr);
                if (resp) {
                    this.tableBottom.listLoading = false;
                    this.allLoading = false;
                }
                resp.rows.forEach((item) => {
                    let star = item.msisdn
                    star = star.split('');
                    star.splice(-8, 4, '****');
                    star = star.join('');
                    item.msisdnStar = star;
                })
                this.tableBottom.data = resp.rows;
                if (this.tableBottom.data.length === 0) {
                    this.tableBottom.emptyText = '暂无数据';
                }
                this.tableBottom.pageOpt.total = resp.total;
            },
            // 右上角特征详情 -- 右下角表格初始化
            async getFrequency () {
                let types;
                let phoneNumber = this.allPhoneNumber;
                let flag;
                let tabsType;
                if (this.saveTermName === 'first') {
                    types = 0;
                } else if (this.saveTermName === 'second') {
                    types = 1
                }
                let resp = await frequency({
                    msisdn: phoneNumber,
                    type: types
                })
                this.termData = [];
                this.tabsRightData = [];
                resp.rows.forEach((item) => {
                    let obj = {
                        key: item.conditions,
                        shortKey: item.shortConditions,
                        value: item.frequency,
                        flag: item.flag,
                        tabsType: item.tabsType
                    }
                    this.termData.push(obj)
                })
                for (let i = 0; i < this.termData.length; i++) {
                    // 只不显示为空
                    if (this.termData[i].value !== null) {
                        let objs = this.termData[i];
                        objs.name = i;
                        this.tabsRightData.push(objs);
                    }
                }
                let objLoc = {
                    key: '目标位置轨迹',
                    shortKey: '目标位置轨迹',
                    value: '',
                    flag: 1,
                    tabsType: 3,
                    name: this.termData.length
                }
                this.tabsRightData.push(objLoc);
                // 初始化加载判断, 默认加载人员详情第一个标签页, 下标为0
                if (this.termData.length % 2 !== 0) {
                    let objs = {
                        key: '',
                        value: ''
                    }
                    this.termData.push(objs)
                }
                tabsType = this.tabsRightData[0].tabsType;
                flag = this.tabsRightData[0].flag;
                this.activeName = 0;
                let pageSizeArr = this.pageSizeArr;
                this.personTable.pageOpt.currentPage = 1;
                if (tabsType === 1) {
                    this.getPersonDetail(tabsType, flag, relationShip, 1, pageSizeArr);
                } else if (tabsType === 2) {
                    this.getPersonDetail(tabsType, flag, messageCon, 1, pageSizeArr);
                } else {
                    this.getPersonDetail(tabsType, flag, targetLocation, 1, pageSizeArr);
                }
                // 改变右下角表格
                let num = ((this.termData.length - 0) / 2) * 30;
                this.personHeight.height = $('.ga-allProvince__personDetail').height() - 100 - num;
            },
            /**
             * 右下角表格
             * flag --- 对应通联, 短信, 位置三大类
             * arg --- 路径参数
             * someApi --- 请求接口
             * currentPage, pageSize --- 分页参数
             */
            async getPersonDetail (columnType, flag, someApi, currentPage, pageSize) {
                let types;
                let phoneNumber = this.allPhoneNumber;
                if (this.saveTermName === 'first') {
                    types = 0;
                } else if (this.saveTermName === 'second') {
                    types = 1
                }
                // 清空数据，防止列缓存……
                this.personTable.column = [];
                if (columnType === 1) {
                    this.personTable.column = this.column1;
                } else if (columnType === 2) {
                    this.personTable.column = this.column2;
                } else {
                    this.personTable.column = this.column3;
                }
                let resp = await someApi(flag, {
                    msisdn: phoneNumber,
                    type: types,
                    page: currentPage,
                    rows: pageSize
                })
                if (resp) {
                    this.personTable.listLoading = false;
                    this.allLoading = false;
                }
                this.personTable.data = [];
                resp.rows.forEach((item) => {
                    if (item.endMsisdn) {
                        let stars = item.endMsisdn;
                        stars = item.endMsisdn.split('');
                        stars.splice(-8, 4, '****');
                        stars = stars.join('');
                        item.endMsisdnStar = stars;
                    }
                })
                this.personTable.data = resp.rows;
                if (this.personTable.data.length === 0) {
                    this.personTable.emptyText = '暂无数据';
                }
                this.personTable.pageOpt.total = resp.total;
            },
//          条件查询tabs切换  --- 清空数据
            leftClick (tab) {
                // 清空所有数据
                if (this.saveTermName !== this.termName) {
                    this.$refs.phoneForm.clearValue();
                    this.tableBottom.data = [];
                    this.personTable.data = [];
                    this.personTable.column = [];
                    this.tableBottom.listLoading = false;
                    this.personTable.listLoading = false;
                    this.allLoading = false;
                    this.termData = [];
                    this.tabsRightData = [];
                    this.personTable.pageOpt.total = 0;
                    this.tableBottom.pageOpt.total = 0;
                    this.msisdnTittle = '';
                    this.allPhoneNumber = '';
                    this.locationTittle = '';
                    this.typeTittle = '';
                    this.activeName = 0;
                    this.personHeight.height = $('.ga-allProvince__personDetail').height() - 100;
                }
                let num = tab.index - 0;
                // 点击页签,左上角框展开
                this.changeH = false;
                if (num === 0) {
                    this.disForm1 = true;
                    this.disForm2 = false;
                    this.tabType = '0';
                } else {
                    this.disForm1 = false;
                    this.disForm2 = true;
                    this.tabType = '1';
                }
            },
//          人员列表选项卡
//          pages --- 保存每页都少条的状态
//          使用li的index与tabsRightData的index对应，所以只需要一个函数
            handleClick (val) {
                this.activeName = val;
                this.personTable.pageOpt.currentPage = 1;
                this.personTable.listLoading = true;
                this.personTable.emptyText = ' ';
                this.allLoading = true;
                if (this.saveTermName === '') {
                    return
                }
                let pages = this.pageSizeArr;
                let flag;
                let tabsType;
                flag = this.tabsRightData[val].flag;
                tabsType = this.tabsRightData[val].tabsType;
                // 清空数据，防止缓存……
                // this.personTable.column = [];
                this.personTable.data = [];
                switch (tabsType) {
                    case 1: this.getPersonDetail(1, flag, relationShip, 1, pages); break;
                    case 2: this.getPersonDetail(2, flag, messageCon, 1, pages); break;
                    case 3: this.getPersonDetail(3, flag, targetLocation, 1, pages); break;
                    default: alert('wrong'); break;
                }
            }
        },
        components: {
            frameCom,
            tableComp,
            formComp
        }
    }
</script>
<style scoped>
    ::-webkit-scrollbar {
        width: 0px;
    }

    :root {
        --timeline: 30px;
        --titleHeigth: 30px;
        --countMargin: 10px;
        --leftWidth: 27%;
        --barTop: 50%;
    }
    .personTableContent {
        width: 100%;
        height: 31px;
        /*overflow: hidden;*/
        margin: 3px 0 5px 0;
        border-bottom: 1px solid #4F8EE5;
    }
    .ga-allProvince__term .ga-allProvince__term--content .yq-form {
        margin: -3px 0 0 0;
    }
    .ga-allProvince__personDetail--lis p {
        list-style: none;
        text-align: center;
        line-height: 27px;
        float: left;
        height: 27px;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .ga-allProvince__personDetail--lis p:first-child {
        width: 80%;
    }  
    .ga-allProvince__personDetail--lis p:nth-child(2) {
        width: 20%;
    }
    .el-form-item .el-form-item__label {
        height: 30px;
        overflow: hidden;
        background: red;
    }
    .tooltip {
        width: 250px;
        height: auto;
        background: var(--bg-color);
        border: 1px solid #9af5f6;
        position: absolute;
        border-radius: 4px;
        padding: 10px;
        z-index: 2000;
        font-size: 12px;
        line-height: 1.2;
        transform-origin: center bottom 0px;
        color: #fff;
        right: 60px;
    }
    .changeH {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
    .ga-allProvince__personDetail--tittle p {
        float: left;
        width: 33%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .getFile {
        width: 60px;
        height: 26px;
        border: 1px solid #4F8EE5;
        background: #0D2E54;
        position: absolute;
        left: 360px;
        bottom: 3px;
        text-align: center;
        line-height: 26px;
        font-size: 14px;
    }
    .getFileDis {
        background: #3f4750;
        cursor: not-allowed;
    }
    .lisTabsFat {
        width: 100%;
        height: 30px;
        list-style: none;
    }
    .lisTabsCon{
        width: 80px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 2px;
        text-align: center;
    }
    .lisTabs {
        width: 80px;
        height: 30px;
        float: left;
        margin-right: 10px;
        border: none;
        /*background: #2157a3;*/
        margin-right: 1px;
        z-index: 0;
        position: relative;
        cursor:pointer;
        line-height: 30px;
    }
    .lisTabs:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        margin-right: 3px;
        background: #11325c;
        border: 1px solid #254672;
        transform: skew(25deg);
    }
    .lisTabs:first-child:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 20px;
        z-index: -1;
        background: #11325c;
        border: 1px solid #254672;
        border-right: none;
    }
    .lisTabs:last-child:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 20px;
        right: -5px;
        z-index: -1;
        background: #11325c;
        border: 1px solid #254672;
        border-left: none;
    }
    .isactive:before {
        background: #2157a3;
    } 
    .isactive:first-child:after {
        background: #2157a3;
    }
    .isactive:last-child:after {
        background: #2157a3;
    }
    @component-namespace ga {
        @b allProvince {
            width: 100%;
            height: 94%;
            position: relative;
            margin-top:1%;
            @e leftContent {
                width: 44%;
                height: 100%;
                left: 2%;
                position: absolute;
                overflow: hidden;
            }
            @e term{
                position: absolute;
                width: 100%;
                height: 55%;
                overflow: hidden;
                @m content {
                    width: 100%;
                    height: 70%;
                    overflow-y: scroll;
                    margin: 5px 0 0 0;
                }
                @m bottom {
                    width: 100%;
                    height: 41px;
                    position: relative;
                    overflow: hidden;
                }
                @m tabs {
                    width: 96%;
                    height: 30px;
                    border-bottom: 1px solid #4F8EE5;
                    margin-left: 10px;
                    overflow: hidden;
                    position: relative;
                } 
            }
            @e tableBottom {
                width: 100%;
                height: 40%;
                bottom: 2%;
                padding: 0;
                /*-webkit-transition: all 0.5s ease-in-out 0s;
                -o-transition: all 0.5s ease-in-out 0s;
                transition: all 0.5s ease-in-out 0s;*/
                position: absolute;
                z-index: 1;
                background: rgba(0, 0, 0, 0.8);
            }
            @e personDetail {
                width: 50%;
                height: 98%;
                left: 48%;
                top: 0;
                padding: 0;
                -webkit-transition: all 0.5s ease-in-out 0s;
                -o-transition: all 0.5s ease-in-out 0s;
                transition: all 0.5s ease-in-out 0s;
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                @m tittle {
                    width: 97%;
                    height: 30px;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: left;
                    line-height: 30px;
                    margin-left: 10px;
                }
                @m basis {
                    width: 100%;
                    height: auto;
                    position: relative;
                    margin: 5px 0 10px 0;
                    border-top: 1px solid #4F8EE5;
                    border-left: 1px solid #4F8EE5;
                    overflow: hidden;
                }
                @m lis {
                    list-style: none;
                    width: 50%;
                    height: 28px;
                    font-size: 12px;
                    float: left;
                    overflow: hidden;
                }
            }
            @e loading {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 99999999;
                opacity: 0;
                cursor: not-allowed;
            }
        }
    }
    .termHeight {
        height: 40px;
    }
    .bHeight {
        height: 87%;
    }
    .yq-form1 {
        margin: 2px 0 0 0;
    }
</style>
