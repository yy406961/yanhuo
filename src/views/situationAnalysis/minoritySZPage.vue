<template>
    <div class='ga-allProvince' ref="abc">
        <div class='ga-allProvince__leftContent'>
            <!-- 条件选择 -->
            <div class="ga-allProvince__term">
                <p>涉藏人员分析</p>
                <el-button @click="searchDialogShow" type="primary">查询</el-button>
                <a :href="leftExport" class="exportUrl1" v-if="leftCanExport">导出</a>
                <el-button class="exportUrl2" v-else :disabled="!leftCanExport" type="primary">导出</el-button>
            </div>
            <!-- 人员列表 -->
            <div class="ga-allProvince__tableBottom">
                <frameCom>
                    <tableComp :option="tableBottom":comSize="BottomHeight"
                    @handleCurrentPageChange="tableBottomCurrent"
                    @handleSizePageChange = "tableBottomSize"></tableComp>
                </frameCom>
            </div>
        </div>
        <!-- 人员详情界面 -->
        <div class="ga-allProvince__personDetail" ref="personDetail">
            <div class="personDetailTop">
                <frameCom >
                    <div class="ga-allProvince__personDetail--tittle">
                        <el-tooltip :content="saveMsisdn" placement="top"
                        v-if="rightAllTittle.msisdnTittle !== ''">
                            <!--  <p>手机号：{{rightAllTittle.msisdnTittle}}</p> -->
                            <p>手机号：{{saveMsisdn}}</p>
                        </el-tooltip>
                        <p v-else>手机号：</p>
                        <el-tooltip :content="rightAllTittle.operatorTittle" placement="top"
                        v-if="rightAllTittle.operatorTittle !== ''">
                            <p>运营商：{{rightAllTittle.operatorTittle}}</p>
                        </el-tooltip>
                        <p v-else>运营商：</p>
                        <el-tooltip :content="rightAllTittle.locationTittle" placement="top"
                        v-if="rightAllTittle.locationTittle !== ''">
                            <p>归属地：{{rightAllTittle.locationTittle}}</p>
                        </el-tooltip>
                        <p v-else>归属地：</p>
                        <p>研判结果：{{rightAllTittle.typeTittle}}</p>
                        <el-button v-if="!(rightAllTittle.msisdnTittle)" class="button1"
                        type="primary" :disabled="(rightAllTittle.msisdnTittle)" size="mini">研判</el-button>
                        <el-button @click="daterDialogShow" v-else class="button2" type="primary" size="mini">研判</el-button>
                        <el-button v-if="rightCanExport" @click="rightExports" type="primary" size="mini">导出</el-button>
                        <el-button class="button1" v-else type="primary" :disabled="!rightCanExport" size="mini">导出</el-button>
                    </div>
                    <ul class="ga-allProvince__personDetail--basis">
                        <li v-for="(item, index) in termData" class="ga-allProvince__personDetail--lis"
                        v-if="termData[index].rulename !== ''">
                            <el-tooltip :content="item.rulename" placement="top">
                                <p>{{ item.rulename }}</p>
                            </el-tooltip>
                            <p>{{ item.count }}</p>
                        </li>
                        <li v-else class="ga-allProvince__personDetail--lis">
                            <p></p>
                            <p></p>
                        </li>
                    </ul>
                </frameCom>
            </div>
            <div class="personDetailBottom">
                <frameCom>
                    <div class="personTableContent">
                        <ul class="lisTabsFat" v-if="activeNameDis">
                            <li v-for="(item, index) in tabsRightData"
                                :class="{
                                    'lisTabs': true,
                                    'isactive': index === activeNameIndex
                                }" 
                                @click="handleClick(item.showIndex, index)">
                                <p>{{ item.shortKey }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="personDetailBottomCon">
                        <tableComp v-if="flag !== 'map'"
                            :option="personTable" :comSize="personHeight" ref="personTables"
                            @handleCurrentPageChange="personCurrent"
                            @handleSizePageChange = "personSize">
                        </tableComp>
                        <div id="actionMap" v-else
                             class="ga-allProvince__personDetail--map">
                        </div>    
                    </div>
                </frameCom>
            </div>
        </div>
        <!-- 查询按钮弹窗 -->
        <sysDialog  size="small"
                    title="涉藏人员查询"
                    @change="searchChangeResult"
                    :dialogVisible='searchDialog'
                    :okFn='saveSearchChange'>
            <el-form ref="form" v-model="formData">
                <div class="szsjFormDivs">
                    <div class="szsjFormDivs">
                        <el-radio v-model="formData.radio" label="a"
                        >组合查询</el-radio>
                    </div>
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="1" :disabled="disabled1" v-model="formData.checkboxs">外省藏区号段</el-checkbox>
                        </div>
                        <div class="formCheckDivs2">
                            <el-button size="small" type="primary" 
                                       :disabled="!formData.checkboxs.includes('1') || disabled1"
                                       :style="buttonStyle"
                                       @click="dialogButton1"
                            >
                            请选择</el-button>
                        </div>
                    </div>
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="2" :disabled="disabled1" v-model="formData.checkboxs">藏文短信</el-checkbox>
                        </div>
                        <div :class="{
                                    'formCheckDivs2': !(!formData.checkboxs.includes('2') || disabled1),
                                    'formCheckDivs3': true
                              }">
                            <el-input v-model="formData.input1" size="mini"
                            :style="widthStyle" 
                            :disabled="!formData.checkboxs.includes('2') || disabled1"></el-input>
                            <span>天内出现</span> 
                            <el-input v-model="formData.input2" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('2') || disabled1"></el-input>
                            <span>次及以上含藏文的短信</span>
                        </div>
                    </div>
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="3" :disabled="disabled1" v-model="formData.checkboxs">关键词短信</el-checkbox>
                        </div>
                        <div :class="{
                                    'formCheckDivs2': !(!formData.checkboxs.includes('3') || disabled1),
                                    'formCheckDivs3': true
                              }">
                            <el-input v-model="formData.input3" size="mini"
                            :style="widthStyle" 
                            :disabled="!formData.checkboxs.includes('3') || disabled1"></el-input>
                            <span>天内出现</span>
                            <el-input v-model="formData.input4" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('3') || disabled1"></el-input>
                            <span>次及以上，包含关键词</span>
                            <el-button size="small" type="primary"
                            :disabled="!formData.checkboxs.includes('3') || disabled1"
                            :style="buttonStyle"
                            @click="dialogButton2">请选择</el-button>
                            <span>的短信</span>
                        </div>
                    </div>
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="4" :disabled="disabled1" v-model="formData.checkboxs">境外通联</el-checkbox>
                        </div>
                        <div :class="{
                                    'formCheckDivs2': !(!formData.checkboxs.includes('4') || disabled1),
                                    'formCheckDivs3': true
                              }">
                            <el-input v-model="formData.input5" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('4') || disabled1"></el-input>
                            <span>天内出现与</span>
                            <el-button size="small" type="primary"
                            :disabled="!formData.checkboxs.includes('4') || disabled1"
                            :style="buttonStyle"
                            @click="dialogButton3">请选择</el-button>
                            <span>等国家（或地区）通联</span>
                            <el-input v-model="formData.input6" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('4') || disabled1"></el-input>
                            <span>及以上（查询时间范围180天之内）</span>
                        </div>
                    </div>
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="5" :disabled="disabled1" v-model="formData.checkboxs">外省藏区通联</el-checkbox>
                        </div>
                        <div :class="{
                                    'formCheckDivs2': !(!formData.checkboxs.includes('5') || disabled1),
                                    'formCheckDivs3': true
                              }">
                            <el-input v-model="formData.input7" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('5') || disabled1"></el-input>
                            <span>天内出现与</span>
                            <el-button size="small" type="primary"
                            :disabled="!formData.checkboxs.includes('5') || disabled1"
                            :style="buttonStyle"
                            @click="dialogButton4">请选择</el-button>
                            <span>等外省藏区通联</span>
                            <el-input v-model="formData.input8" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('5') || disabled1"></el-input>
                            <span>及以上（查询时间范围180天之内）</span>
                        </div>
                    </div>
                    <!-- 后加的查询条件在原有的序号上追加 -->
                    <div class="formCheckDivs">
                        <div class="formCheckDivs1">
                            <el-checkbox label="8" :disabled="disabled1" v-model="formData.checkboxs">访问藏文信源</el-checkbox>
                        </div>
                        <div :class="{
                                    'formCheckDivs2': !(!formData.checkboxs.includes('8') || disabled1),
                                    'formCheckDivs3': true
                              }">
                            <el-input v-model="formData.input10" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('8') || disabled1"></el-input>
                            <span>天内访问</span>
                            <el-input v-model="formData.input11" size="mini"
                            :style="widthStyle"
                            :disabled="!formData.checkboxs.includes('8') || disabled1"></el-input>
                            <span>次及以上藏文信源（网站及APP）（查询时间范围90天之内）</span>
                        </div>
                    </div>
                    <div class="formCheckDivs">
                        <el-checkbox label="6" :disabled="disabled1" v-model="formData.checkboxs">结果中排除高度疑似对象</el-checkbox>
                    </div>
                    <div class="formCheckDivs">
                        <el-checkbox label="7" :disabled="disabled1" v-model="formData.checkboxs">结果中排除中度疑似对象</el-checkbox>
                    </div>
                </div>
                <div class="szsjFormDivs">
                    <el-radio v-model="formData.radio" label="b">精确查询</el-radio>
                    <div :class="{
                            'formCheckDivsSure1': !disabled2,
                            'formCheckDivsSure2': true
                        }">
                        <el-radio v-model="formData.radios" label="1" :disabled="disabled2">手机号码查询</el-radio>
                        <el-input v-model="formData.input9" size="small"
                        :style="widthSearchStyle" 
                        :disabled="!(formData.radios === '1') || formData.radio !== 'b'"></el-input>
                        <span slot="tip" class="msgTip">（输入多个手机号码时，用逗号分隔）</span>
                    </div>
                    <div :class="{
                            'formCheckDivsSure1': !disabled2,
                            'formCheckDivsSure2': true
                        }" style="position: relative;">
                        <el-radio v-model="formData.radios" label="2" :disabled="disabled2">文件导入</el-radio>
                        <el-upload class="upload-demo"
                              ref="upload"
                              :action="uploadUrl"
                              accept=".xls"
                              :auto-upload="false"
                              :on-success="uploadSuccess"
                              :file-list="fileList"
                              style="margin: -30px 0 0 130px;">
                            <el-button size="small" type="primary" :disabled="!(formData.radios === '2') || formData.radio !== 'b'"
                            @click="clearFile">导入xls文件</el-button>
                        </el-upload>
                        <p class="downLoadUrls" v-if="!(formData.radios === '2') || formData.radio !== 'b'">xls文件模板下载</p>
                        <a :href="downLoadUrl" class="downLoadUrl" v-else>xls文件模板下载</a>
                    </div>
                </div>
                <div class="szsjFormDivs">
                    <el-radio v-model="formData.radio" label="c">研判结果</el-radio>
                    <div class="formCheckDivs">
                        <el-checkbox label="1" v-model="formData.checkboxs2" :disabled="disabled3">高度疑似对象</el-checkbox>
                        <el-checkbox label="2" v-model="formData.checkboxs2" :disabled="disabled3">中度疑似对象</el-checkbox>
                    </div>
                </div>
                <div class="szsjFormDivs">
                    <span>注：导入文件查询只可对一个导入文件进行查询,点击"导入xls文件"按钮时,会清除上次所导入文件</span>
                </div>
            </el-form>
        </sysDialog>
        <!-- 查询条件"请选择"相关弹窗 -->
        <sysDialog  size="small"
                    title="外省藏区号段"
                    @change="changeButton1"
                    :dialogVisible='button1'
                    :okFn='saveButton1'>
            <div class="dialogChecks1">
                <el-checkbox v-model="buttonForm1All"
                    :indeterminate="isForm1" @change="changeForm1All">
                    全选
                </el-checkbox>
                <el-checkbox-group v-model="x1" @change="changeForm1">
                    <el-checkbox v-for="item in buttonForm1" :label="item" 
                        :key="item"
                        :style="buttonForm1Style">
                        {{item}}
                    </el-checkbox>
                </el-checkbox-group>   
            </div>
        </sysDialog>
        <sysDialog  size="small"
                    title="关键词短信"
                    @change="changeButton2"
                    :dialogVisible='button2'
                    :okFn='saveButton2'>
            <div class="dialogChecks2">
                <el-checkbox v-model="buttonForm2All"
                    :indeterminate="isForm2" @change="changeForm2All">
                    全选
                </el-checkbox>
                <el-checkbox-group v-model="x2" @change="changeForm2">
                    <el-checkbox v-for="item in buttonForm2" :label="item" 
                        :key="item"
                        :style="buttonForm2Style">
                        {{item}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </sysDialog>
        <sysDialog  size="small"
                    title="境外通联"
                    @change="changeButton3"
                    :dialogVisible='button3'
                    :okFn='saveButton3'>
            <div class="dialogChecks3">
                <el-checkbox v-model="buttonForm3All"
                    :indeterminate="isForm3" @change="changeForm3All">
                    全选
                </el-checkbox>
                <el-checkbox-group v-model="x3" @change="changeForm3">
                    <el-checkbox v-for="item in buttonForm3" :label="item" 
                        :key="item"
                        :style="buttonForm3Style">
                        {{item}}
                    </el-checkbox>
                </el-checkbox-group>   
            </div>
        </sysDialog>
        <sysDialog  size="small"
                    title="外省藏区通联"
                    @change="changeButton4"
                    :dialogVisible='button4'
                    :okFn='saveButton4'>
            <div class="dialogChecks4">
                <el-checkbox v-model="buttonForm4All"
                    :indeterminate="isForm4" @change="changeForm4All">
                    全选
                </el-checkbox>
                <el-checkbox-group v-model="x4" @change="changeForm4">
                    <el-checkbox v-for="item in buttonForm4" :label="item" 
                        :key="item"
                        :style="buttonForm4Style">
                        {{item}}
                    </el-checkbox>
                </el-checkbox-group>   
            </div>
        </sysDialog>
        <!-- 研判按钮弹窗 -->
        <sysDialog  size="small"
                    title="涉藏研判"
                    @change="deterChangeResult"
                    :dialogVisible='deterDialog'
                    :okFn='saveDeterChange'>
                <div class="ga-allProvince__personDetail--tittleDeter">
                    <p>手机号：{{saveMsisdn}}</p>
                    <p>运营商：{{rightAllTittle.operatorTittle}}</p>
                    <el-tooltip :content="rightAllTittle.locationTittle" placement="top"
                    v-if="rightAllTittle.locationTittle !== ''">
                        <p>归属地：{{rightAllTittle.locationTittle}}</p>
                    </el-tooltip>
                    <p v-else>归属地：</p>
                </div>
                <ul class="ga-allProvince__personDetail--basis">
                    <li v-for="(item, index) in termData" class="ga-allProvince__personDetail--lis"
                    v-if="termData[index].rulename !== ''">
                        <el-tooltip :content="item.rulename" placement="top">
                            <p>{{ item.rulename }}</p>
                        </el-tooltip>
                        <p>{{ item.count }}</p>
                    </li>
                    <li v-else class="ga-allProvince__personDetail--lis">
                        <p></p>
                        <p></p>
                    </li>
                </ul>
                <formComp :option="determineForm" ref="deterFormValue"></formComp>
        </sysDialog>
        <!-- 个人详情表格相关弹窗 -->
        <sysDialog  size='small'
                    v-if="personTableDialog"
                    :title='personTableTittle'
                    @change="personChangeResult"
                    :dialogVisible="personTableDialog"
                    :showCancel='false'
                    :showConfirm='false'>
                    <ul class="dialogUl">
                        <li v-for="(item, index) in personTypeDialogs.tittleTop">
                            <p>{{item.key}}</p>
                            <el-tooltip :content="item.value" placement="top">
                                <p>{{ item.value }}</p>
                            </el-tooltip>
                        </li>
                    </ul>
                    <ul :class="personTypeDialogs.type === 'table' ? 'dialogUlTable' : 'dialogUlMap'">
                        <li v-for="(item, index) in personTypeDialogs.tittleMiddle1">
                            <p>{{item.key}}</p>
                            <p>{{item.value}}</p>
                        </li>
                    </ul>
                    <ul class="dialogUlTable" v-if="personTypeDialogs.tittleMiddle2">
                        <li v-for="(item, index) in personTypeDialogs.tittleMiddle2">
                            <p>{{item.key}}</p>
                            <p>{{item.value}}</p>
                        </li>
                    </ul>
                    <p  class="dialogContent"
                        v-if="personTypeDialogs.type === 'table'"
                        v-html="personTypeDialogs.titleContent">
                        {{personTypeDialogs.titleContent}}
                    </p>
                    <tableComp v-else 
                               :option="diaglogTable"
                               :comSize="diaglogTableHeight"
                               id="personDiaglogTable">
                    </tableComp>
        </sysDialog>
        <div class="ga-allProvince__loading" v-show="allLoading"></div>
    </div>
</template>
<script>
    import BMap from 'BMap'
    import sysDialog from 'components/common/dialog'
    import tableComp from 'components/Table'
    import formComp from 'components/Form'
    import { mapGetters } from 'vuex'
    import { phoneNumChange } from 'utils/index.js'
    import frameCom from 'components/monitor/frame'
    import { personData, MessageWindows,
            CommunicationRelationshipWindows, BasestationWindows,
            Judgment, searchAll, searchDialog, BasestationWindowsById,
            upLoadPage } from 'api/situationAnalysis/minoritySJSZPage'
    const RED = './static/vendor/gis/baidumapv2/images/point-collection/red-map-work.png'
    const MINTYPE = 0
    const apiUrl = process.env.NODE_ENV === 'production'
    ? '/policeBusiness' : 'http://192.168.3.186:8080/policeBusiness'
    // const apiUrl = process.env.NODE_ENV === 'production'
    // ? '/policeBusiness' : 'http://192.168.3.209:8686/policeBusiness'
    export default {
        data () {
            return {
                // 导入数组
                fileList: [],
                upLoadFlag: false,
                // 左侧导出
                leftExport: `${apiUrl}/szsj/exportLeftResult/0`,
                // 右侧导出
                rightExport: `${apiUrl}/situation/ExportWordDatas/0`,
                // 查询上传文件
                uploadUrl: `${apiUrl}/szsj/uploadFile/0`,
                // 查询模板下载
                downLoadUrl: `${apiUrl}/szsj/downModel`,
                // 查询请选择按钮相关 -- 保存状态
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                // 保存请选择四个弹窗数据
                /* x 为弹窗的动态改变数据，dialogSeach为数据确定后的保存
                 * 方便了在取消之后，仍保存之前的数据选择状态
                 * 代码太多了………………
                 */
                x1: [],
                x2: [],
                x3: [],
                x4: [],
                dialogSeach1: [],
                dialogSeach2: [],
                dialogSeach3: [],
                dialogSeach4: [],
                // 四个按钮文字
                button1Text: '',
                button2Text: '',
                button3Text: '',
                button4Text: '',
                // 四个弹窗的多选框
                buttonForm1All: false,
                buttonForm1: [],
                isForm1: true,
                // -------<  1
                buttonForm2All: false,
                buttonForm2: [],
                isForm2: true,
                // ------< 2
                buttonForm3All: false,
                buttonForm3: [],
                isForm3: true,
                // -------< 3
                buttonForm4All: false,
                buttonForm4: [],
                isForm4: true,
                // -------< 4
                // 保存查询依据的值
                termArr: [],
                // 查询条件相关
                saveSearch: {
                    radioFlag: '',
                    checkRows: []
                },
                disabled1: false,
                disabled2: true,
                disabled3: true,
                formData: {
                    radio: 'a',
                    radios: '1',
                    checkboxs: [],
                    checkboxs2: [],
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: '',
                    input7: '',
                    input8: '',
                    input9: '',
                    input10: '',
                    input11: ''
                },
                // 整体查询按钮相关数据  ----->
                searchDialog: false,
                // ------>
                // 地图打点
                icon: RED,
                minType: MINTYPE,
                userNum: '',
                mapArr: [],
                // 地图点的等级
                iconLe: [
                    { lev1: 26, lev2: 31 },
                    { lev1: 32, lev2: 36 },
                    { lev1: 37, lev2: 41 },
                    { lev1: 44, lev2: 48 },
                    { lev1: 51, lev2: 55 }
                ],
                deterDialog: false,
                flag: 0,
                activeName: 0,
                activeNameIndex: 0,
                personTableDialog: false,
                personTableTittle: '',
                // 左下表格数据
                tableBottomData: [],
                // 右上判断依据
                termData: [
                    { rulename: '短信中出现藏文字符', count: '' },
                    { rulename: '短信中出现关键词', count: '' },
                    { rulename: '180天之内与境外手机号码有通联', count: '' },
                    { rulename: '180天之内与外省藏区号码通联', count: '' },
                    { rulename: '90天之内访问藏文信源', count: '' }
                ],
                // 保存右上判断依据对应的次数
                frequencyArr: [],
                // 右侧标签页 -- 被强行打乱了顺序
                tabsRightData: [
                    { 'shortKey': '藏文短信', 'flag': 'table', 'showIndex': 0 },
                    { 'shortKey': '关键词短信', 'flag': 'table', 'showIndex': 1 },
                    { 'shortKey': '境外通联', 'flag': 'table', 'showIndex': 2 },
                    { 'shortKey': '外省藏区通联', 'flag': 'table', 'showIndex': 3 },
                    { 'shortKey': '访问藏文信源', 'flag': 'table', 'showIndex': 6 },
                    { 'shortKey': '活动区域', 'flag': 'map', 'showIndex': 4 },
                    { 'shortKey': '登录基站排行', 'flag': 'table', 'showIndex': 5 }
                ],
                activeNameDis: true,
                /**
                 * 个人详情表格表头
                 * column1 -- 藏文短信，column2 -- 关键词短信
                 * column3 -- 境外通联，column3 -- 外省藏区通联，
                 * column6 -- 登陆基站排行，
                 */
                columnArr: [
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '短信内容', value: 'oriContent', align: 'center', width: 280, highlightKey: true, keys: [], tooltip: true },
                        { name: '时间', value: 'timestamp', align: 'center', width: 130 },
                        { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                        { name: '对端号码', value: 'relateNum', align: 'center', width: 230 },
                        { name: '对端号码归属地', width: 200, value: 'relateNumHomecode', align: 'center' }
                    ],
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '中标关键字', value: 'keywords', align: 'center', width: 80 },
                        { name: '短信内容', value: 'oriContent', align: 'center', width: 260, highlightKey: true, keys: [], tooltip: true },
                        { name: '时间', value: 'timestamp', align: 'center', width: 130 },
                        { name: '类型', value: 'cdrType', align: 'center', width: 80 },
                        { name: '对端号码', value: 'relateNum', align: 'center', width: 230 },
                        { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 200 }
                    ],
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '对端号码', value: 'relateNum', align: 'center', width: 130 },
                        { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 180 },
                        { name: '类型', value: 'cdrType', align: 'center', width: 60 },
                        { name: '发生时间', value: 'timestamp', align: 'center', width: 130 },
                        { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 270, highlightKey: true, keys: [], tooltip: true }
                        // { name: '通话时长(秒)', value: 'callTime', align: 'center', width: 270, highlightKey: true, keys: [], tooltip: true }
                    ],
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '对端号码', value: 'relateNum', align: 'center', width: 130 },
                        { name: '对端号码归属地', value: 'relateNumHomecode', align: 'center', width: 180 },
                        { name: '类型', value: 'cdrType', align: 'center', width: 60 },
                        { name: '发生时间', value: 'timestamp', align: 'center', width: 130 },
                        { name: '通话时长(秒) / 短信内容', value: 'callTime', align: 'center', width: 270, highlightKey: true, keys: [], tooltip: true }
                        // { name: '通话时长(秒)', value: 'callTime', align: 'center', width: 270, highlightKey: true, keys: [], tooltip: true }
                    ],
                    [],
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '停留总时长', value: 'allTime', align: 'center', width: 100 },
                        { name: 'LAC', value: 'lac', align: 'center', width: 100 },
                        { name: 'CI', value: 'ci', align: 'center', width: 100 },
                        { name: '位置描述', value: 'uliPositionName', align: 'center', width: 470 }
                    ],
                    [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '信源名称', value: 'sourceName', width: 230, align: 'center' },
                        // { name: 'IP', value: 'sourceIP', width: 130, align: 'center' },
                        { name: '访问时间', value: 'timestamp', width: 160, align: 'center' },
                        { name: 'URL', value: 'sourceURL', width: 380, align: 'center' }
                    ]
                ],
                // 右侧研判按钮弹窗数据
                determineForm: {
                    inline: false,
                    items: [
                        {
                            label: '研判: ',
                            type: 'radio',
                            comOpt: {
                                id: 'determine',
                                value: 'low',
                                disabled: false,
                                data: [
                                    { name: '取消疑似研判', value: 'low' },
                                    { name: '中度疑似对象', value: 'middle' },
                                    { name: '高度疑似对象', value: 'large' }
                                ]
                            }
                        }
                    ]
                },
                // 保存右侧电话的数据
                saveMsisdn: '',
                // 右侧顶部数据显示
                rightAllTittle: {
                    msisdnTittle: '',
                    locationTittle: '',
                    operatorTittle: '',
                    typeTittle: ''
                },
                // 个人详情每行弹出数据
                // type -- table --- 短信，通联，弹窗无表格
                // type -- map --- 基站排行型弹窗有表格
                personTypeDialog: [
                    {
                        type: '',
                        tittleTop: [
                            { key: '时间' },
                            { key: '类型' },
                            { key: '对端号码' },
                            { key: '对端号码归属地' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        type: '',
                        tittleTop: [
                            { key: '中标关键字' },
                            { key: '时间' },
                            { key: '类型' },
                            { key: '对端号码' },
                            { key: '对端号码归属地' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        type: '',
                        tittleTop: [
                            { key: '对端号码' },
                            { key: '对端号码归属地' },
                            { key: '类型' },
                            { key: '时间' },
                            { key: '通话时长' }
                        ],
                        tittleMiddle1: [
                            { key: '本端位置' },
                            { key: '本端机身码' },
                            { key: '本端卡号' }
                        ],
                        tittleMiddle2: [
                            { key: '对端位置' },
                            { key: '对端机身码' },
                            { key: '对端卡号' }
                        ],
                        titleContent: ''
                    },
                    {
                        type: '',
                        tittleTop: [
                            { key: '活动次数' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {
                        type: '',
                        tittleTop: [
                            { key: '停留总时长' },
                            { key: '基站名称' },
                            { key: 'LAC' },
                            { key: 'CI' },
                            { key: '经度' },
                            { key: '纬度' }
                        ],
                        tittleMiddle1: [
                            { key: '位置名称' }
                        ],
                        titleContent: []
                    },
                    {}
                ],
                // 个人详情每行弹出数据 -- 表格
                diaglogTable: {
                    scrollLoading: true,
                    scrollListLength: 20,
                    scrollListContainer: 'personDiaglogTable',
                    widthType: true,
                    listLoading: false,
                    stripe: true,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center' },
                        { name: '到达时间', value: 'arriveTime', width: 400, align: 'center' },
                        { name: '停留时间', value: 'stayTime', align: 'center' }
                    ],
                    data: []
                },
                personTypeDialogs: {},
                // <-----
                // 整体loading遮罩层
                allLoading: false,
                exportUrl: `${apiUrl}/situation/SJExportData/`,
                // 左下表格配置 + 右侧接口请求
                tableBottom: {
                    stripe: true,
                    listLoading: false,
                    emptyText: ' ',
                    tableType: '0',
                    highlightRow: true,
                    column: [
                        { name: '序号', value: 'index', width: 40, align: 'center' },
                        { name: '手机号', value: 'usernum', align: 'center' },
                        { name: '手机归属地', value: 'homeCode', width: 80, align: 'center', tooltip: true },
                        { name: '研判结果', value: 'ypResult', width: 100, align: 'center' }
                    ],
                    data: [],
                    // 添加分页
                    pagination: true,
                    // 分页参数
                    pageOpt: {
                        total: 0,
                        currentPage: 1,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10,
                        layout: 'total, sizes, prev, next, jumper'
                    },
                    rowClick: (row) => {
                        /*  显示右侧上方的数据*/
                        this.rightAllTittle.msisdnTittle = row.usernum;
                        if (this.isPhoneJM) {
                            this.saveMsisdn = phoneNumChange(this.rightAllTittle.msisdnTittle)
                        } else {
                            this.saveMsisdn = this.rightAllTittle.msisdnTittle
                        }
                        this.rightAllTittle.locationTittle = row.homeCode;
                        this.rightAllTittle.operatorTittle = row.ascode;
                        this.rightAllTittle.typeTittle = row.ypResult;
                        // 显示右侧判断依据
                        this.frequencyArr = row.list;
                        this.termArr = [];
                        // 将值全变为整形
                        this.termArr = row.list.map(item => {
                            if (item === 'noTerm') {
                                item = 0
                            }
                            return +item;
                        });
                        this.frequency(this.frequencyArr);
                        this.activeName = 0;
                        this.activeNameIndex = 0;
                        // 右侧整体loading
                        // ifFlag -- 告诉后台是否进行查询 -- 右侧表格数据
                        // 0 -- 不查； 1 -- 查
                        this.personTable.pagination = true;
                        if (this.termArr[0] === 0) {
                            this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 0);
                        } else {
                            this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 1);
                        }
                    }
                },
                BottomHeight: {
                    height: 0
                },
                personHeight: {
                    height: 0
                },
                diaglogTableHeight: {
                    height: 250
                },
                // 人员详情表格
                personTable: {
                    listLoading: false,
                    emptyText: ' ',
                    stripe: true,
                    column: [],
                    data: [],
                    highlightRow: true,
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
                        // 点击每行，显示弹窗，分三个接口，短信类， 通联类， 基站类
                        let ids = row.id;
                        if (this.activeName === 0) {
                            this.rowClicks(ids, MessageWindows, this.activeName);
                        } else if (this.activeName === 1) {
                            this.rowClicks(ids, MessageWindows, this.activeName, row.keywords);
                        } else if (this.activeName === 2 || this.activeName === 3) {
                            this.rowClicks(ids, CommunicationRelationshipWindows, this.activeName);
                        } else if (this.activeName === 5) {
                            this.rowClicks(ids, BasestationWindows, this.activeName);
                        } else if (this.activeName === 6) {
                            return
                        }
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight',
                'globalKeys': 'global/globalKeys',
                'mapCenter': 'global/globalKeys',
                'isPhoneJM': 'global/isPhoneJM'
            }),
            buttonForm1Style () {
                return {
                    width: 200 + 'px',
                    height: 30 + 'px',
                    marginLeft: 30 + 'px'
                }
            },
            buttonForm2Style () {
                return {
                    width: 150 + 'px',
                    height: 30 + 'px',
                    marginLeft: 30 + 'px'
                }
            },
            buttonForm3Style () {
                return {
                    width: 150 + 'px',
                    height: 30 + 'px',
                    marginLeft: 30 + 'px'
                }
            },
            buttonForm4Style () {
                return {
                    width: 200 + 'px',
                    height: 30 + 'px',
                    marginLeft: 30 + 'px'
                }
            },
            widthStyle () {
                return {
                    width: 50 + 'px'
                }
            },
            widthSearchStyle () {
                return {
                    width: 350 + 'px',
                    height: 22 + 'px',
                    marginLeft: 20 + 'px'
                }
            },
            buttonStyle () {
                return {
                    width: 70 + 'px',
                    height: 25 + 'px',
                    lineHeight: 25 + 'px'
                }
            },
            leftCanExport () {
                // return false
                if (this.tableBottom.data.length) {
                    return true
                } else {
                    return false
                }
            },
            rightCanExport () {
                // return false
                // 表格有值或者地图存在
                if (this.rightAllTittle.msisdnTittle) {
                    return true
                } else {
                    return false
                }
            }
            /**
             * 判断导出是否可用
             * table有数据 且 与table绑定的type === 页签type   (table的type在查询后改变)
             */
        },
        mounted () {
            this.searchDialogs();
            this.$nextTick(() => {
                // 表格高度
                this.BottomHeight.height = $('.ga-allProvince__tableBottom').height() - 17;
                $('.ga-frame__content').css('marginTop', '5px');
                let num = ((this.termData.length - 0) / 2) * 30;
                this.personHeight.height = $('.ga-allProvince__personDetail').height() - 159 - num;
                this.personTable.column = this.columnArr[0];
            })
        },
        watch: {
            // 查询条件变化
            'formData.radio' (val) {
                if (val === 'a') {
                    this.disabled1 = false;
                    this.disabled2 = true;
                    this.disabled3 = true;
                } else if (val === 'b') {
                    this.disabled2 = false;
                    this.disabled1 = true;
                    this.disabled3 = true;
                } else if (val === 'c') {
                    this.disabled3 = false;
                    this.disabled2 = true;
                    this.disabled1 = true;
                }
            },
            // 动态改变表格高度
            termData: {
                deep: true,
                handler () {
                    let num = ((this.termData.length - 0) / 2) * 30;
                    this.personHeight.height = $('.ga-allProvince__personDetail').height() - 159 - num;
                }
            }
        },
        methods: {
            // 关键词高亮
            highlight (item, con) {
                item = item.split(',');
                item.forEach(it => {
                    con = con.replace(new RegExp(it, 'gm'), `<span style='color:#efb414'>$&</span>`)
                })
                return con;
            },
            // 导入文件查询相关
            uploadSuccess (resp) {
                this.allLoading = true;
                this.tableBottom.listLoading = true;
                this.tableBottom.emptyText = '';
                this.activeName = 0;
                // 对分页page, rows状态进行赋值
                this.tableBottom.pageOpt.pageSize = 10;
                this.tableBottom.pageOpt.currentPage = 1;
                // 清空所有数据（左侧 + 右侧）
                this.tableBottom.data = [];
                this.personTable.data = [];
                this.termData.forEach((item) => {
                    item.count = '';
                })
                this.rightAllTittle.msisdnTittle = '';
                this.saveMsisdn = '';
                this.rightAllTittle.locationTittle = '';
                this.rightAllTittle.operatorTittle = '';
                this.rightAllTittle.typeTittle = '';
                if (resp.status === 200) {
                    this.allLoading = false;
                    this.tableBottom.listLoading = false;
                    this.tableBottom.data = resp.data.rows
                    this.tableBottom.pageOpt.total = resp.data.total
                    if (resp.data.rows[0].list) {
                        let arr = resp.data.rows[0].list;
                        this.termArr = []
                        this.termArr = resp.data.rows[0].list.map(item => {
                            if (item === 'noTerm') {
                                item = 0;
                            }
                            return +item
                        })
                        this.frequency(arr);
                    }
                    this.rightAllTittle.msisdnTittle = resp.data.rows[0].usernum;
                    if (this.isPhoneJM) {
                        this.saveMsisdn = phoneNumChange(this.rightAllTittle.msisdnTittle)
                    } else {
                        this.saveMsisdn = this.rightAllTittle.msisdnTittle
                    }
                    this.rightAllTittle.locationTittle = resp.data.rows[0].homeCode;
                    this.rightAllTittle.operatorTittle = resp.data.rows[0].ascode;
                    this.rightAllTittle.typeTittle = resp.data.rows[0].ypResult;
                    // ifFlag -- 告诉后台是否进行查询
                    // 0 -- 不查； 1 -- 查
                    if (this.termArr[0] === 0) {
                        this.personTable.pagination = true;
                        this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 0);
                    } else {
                        this.personTable.pagination = true;
                        this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 1);
                    }
                } else if (resp.status === 300) {
                    this.$message(resp.message)
                    this.allLoading = false;
                    this.tableBottom.listLoading = false;
                }
            },
            clearFile () {
                this.$refs.upload.clearFiles();
            },
            // 四个多选弹窗内部变化
            changeForm1All (val) {
                this.x1 = val ? this.buttonForm1 : [];
                this.isForm1 = false;
            },
            changeForm1 (value) {
                let checkedCount = value.length;
                this.buttonForm1All = checkedCount === this.buttonForm1.length;
                this.isForm1 = checkedCount > 0 && checkedCount < this.buttonForm1.length;
            },
            changeForm2All (val) {
                this.x2 = val ? this.buttonForm2 : [];
                this.isForm2 = false;
            },
            changeForm2 (value) {
                let checkedCount = value.length;
                this.buttonForm2All = checkedCount === this.buttonForm2.length;
                this.isForm2 = checkedCount > 0 && checkedCount < this.buttonForm2.length;
            },
            changeForm3All (val) {
                this.x3 = val ? this.buttonForm3 : [];
                this.isForm3 = false;
            },
            changeForm3 (value) {
                let checkedCount = value.length;
                this.buttonForm3All = checkedCount === this.buttonForm3.length;
                this.isForm3 = checkedCount > 0 && checkedCount < this.buttonForm3.length;
            },
            changeForm4All (val) {
                this.x4 = val ? this.buttonForm4 : [];
                this.isForm4 = false;
            },
            changeForm4 (value) {
                let checkedCount = value.length;
                this.buttonForm4All = checkedCount === this.buttonForm4.length;
                this.isForm4 = checkedCount > 0 && checkedCount < this.buttonForm4.length;
            },
            /**
             * 查询条件四个弹窗
             * 藏区号段     --- dialogButton1
             * 关键词短信   --- dialogButton2
             * 境外通联     --- dialogButton3
             * 外省藏区通联 --- dialogButton4
             */
            // 显示四个弹窗
            dialogButton1 (val) {
                this.button1Text = val.target;
                this.button1 = true;
            },
            dialogButton2 (val) {
                this.button2Text = val.target;
                this.button2 = true;
            },
            dialogButton3 (val) {
                this.button3Text = val.target;
                this.button3 = true;
            },
            dialogButton4 (val) {
                this.button4Text = val.target;
                this.button4 = true;
            },
            // 改变弹窗状态
            changeButton1 (val) {
                this.button1 = val;
                this.x1 = this.dialogSeach1
            },
            changeButton2 (val) {
                this.button2 = val;
                this.x2 = this.dialogSeach2
            },
            changeButton3 (val) {
                this.button3 = val;
                this.x3 = this.dialogSeach3
            },
            changeButton4 (val) {
                this.button4 = val;
                this.x4 = this.dialogSeach4
            },
            // 保存四个弹窗结果
            saveButton1 () {
                this.button1 = false;
                this.dialogSeach1 = this.x1;
                if (this.dialogSeach1.length !== 0) {
                    this.button1Text.innerText = '已选择'
                } else {
                    this.button1Text.innerText = '未选择'
                }
            },
            saveButton2 () {
                this.button2 = false;
                this.dialogSeach2 = this.x2;
                if (this.dialogSeach2.length !== 0) {
                    this.button2Text.innerText = '已选择'
                } else {
                    this.button2Text.innerText = '未选择'
                }
            },
            saveButton3 () {
                this.button3 = false;
                this.dialogSeach3 = this.x3;
                if (this.dialogSeach3.length !== 0) {
                    this.button3Text.innerText = '已选择'
                } else {
                    this.button3Text.innerText = '未选择'
                }
            },
            saveButton4 () {
                this.button4 = false;
                this.dialogSeach4 = this.x4;
                if (this.dialogSeach4.length !== 0) {
                    this.button4Text.innerText = '已选择'
                } else {
                    this.button4Text.innerText = '未选择'
                }
            },
            // 请求弹窗数据
            async searchDialogs () {
                let resp = await searchDialog({
                    type: this.minType
                })
                if (resp && resp.rows.length > 0) {
                    resp.rows.forEach((item) => {
                        if (item.flag === '1') {
                            this.buttonForm1 = item.values;
                        } else if (item.flag === '3') {
                            this.buttonForm2 = item.values;
                        } else if (item.flag === '4') {
                            this.buttonForm3 = item.values;
                        } else if (item.flag === '5') {
                            this.buttonForm4 = item.values;
                        }
                    })
                }
            },
            // 为活动区域画地图
            drawMap () {
                // 百度地图API功能
                let this_ = this;
                let { gMapCenterRvrovice } = this.mapCenter
                var map = new BMap.Map('actionMap');
                map.clearOverlays()
                // 地图中心点
                var point = new BMap.Point(gMapCenterRvrovice[0], gMapCenterRvrovice[1]);
                map.centerAndZoom(point, 9);
                map.enableScrollWheelZoom();
                // 编写自定义函数,创建标注
                function addMarker (point, leavel, datas) {
                    let lev1 = this_.iconLe[leavel].lev1;
                    let lev2 = this_.iconLe[leavel].lev2;
                    let myIcon = new BMap.Icon(this_.icon, new BMap.Size(lev1, lev2), {
                        imageSize: new BMap.Size(lev1, lev2)
                    })
                    var marker = new BMap.Marker(point, { icon: myIcon });
                    marker.addEventListener('click', () => {
                        this_.rowClicks(datas, BasestationWindowsById, 4);
                    });
                    map.addOverlay(marker);
                }
                if (this.mapArr.length && this.mapArr.length > 0) {
                    let pointsArr = [];
                    for (let i in this.mapArr) {
                        pointsArr.push({
                            lng: this.mapArr[i].longtitude,
                            lat: this.mapArr[i].latitude
                        })
                    }
                    let view = map.getViewport(pointsArr);
                    map.centerAndZoom(view.center, view.zoom);
                    this.mapArr.forEach((item) => {
                        let leavel = item.leavel;
                        let datas = item.id;
                        point = new BMap.Point(item.longtitude, item.latitude);
                        addMarker(point, leavel, datas);
                    })
                }
            },
            // 右侧导出 -- 拼接n个参数
            rightExports () {
                this.rightExport = `${apiUrl}/situation/ExportWordDatas/0`;
                this.rightExport = this.rightExport + ',' +
                                    this.rightAllTittle.msisdnTittle + ',' +
                                    this.rightAllTittle.locationTittle + ',' +
                                    this.rightAllTittle.operatorTittle + ',' +
                                    this.rightAllTittle.typeTittle;
                this.termArr.forEach((item) => {
                    this.rightExport += ',' + item + '次';
                })
                location.href = this.rightExport
            },
            // 对于输入查询条件的进行过滤
            // 判断输入的字符是否为整型并且大于0, 对于有day参数的需要 >0 && <= 180
            // day不同，对应不同的查询范围
            filterInput (str, day) {
                if (day === 1) {
                    return (Math.floor(str - 0) === (str - 0)) && str - 0 > 0 && str - 0 <= 180
                } else if (day === 2) {
                    return (Math.floor(str - 0) === (str - 0)) && str - 0 > 0 && str - 0 <= 90
                }
                return (Math.floor(str - 0) === (str - 0)) && str > 0;
            },
            // 检测并保存查询结果
            saveSearchResult () {
                let status = false;
                if (this.formData.radio === 'a') {
                    // 组合查询 -- 判断输入是否正常
                    let arrs = this.formData.checkboxs;
                    // 判断是否选择二级查询条件
                    if (arrs.length === 0) {
                        this.$alert('请选择查询条件')
                        return
                    }
                    // 判断是否只选择了疑似对象查询条件
                    if ((arrs.includes('6') && arrs.length === 1) ||
                        (arrs.includes('7') && arrs.length === 1) ||
                        (arrs.includes('6') && arrs.includes('7') && arrs.length === 2)
                    ) {
                        this.$alert('请结合更多条件查询')
                        return
                    }
                    // 判断每个二级查询条件的子条件是否完整
                    arrs.forEach((item) => {
                        if (item === '1' && this.dialogSeach1.length === 0) {
                            this.$alert('请选择藏区号段');
                            status = true
                        } else if (item === '2') {
                            if (!(this.filterInput(this.formData.input1) &&
                                this.filterInput(this.formData.input2))) {
                                this.$alert('请输入格式、时间范围正确且完整的藏文短信查询条件');
                                status = true
                            }
                        } else if (item === '3') {
                            if (!(this.filterInput(this.formData.input3) &&
                                this.filterInput(this.formData.input4)) || this.dialogSeach2.length === 0) {
                                this.$alert('请输入格式、时间范围正确且完整的关键词短信查询条件');
                                status = true
                            }
                        } else if (item === '4') {
                            if (!(this.filterInput(this.formData.input5, 1) &&
                                this.filterInput(this.formData.input6)) || this.dialogSeach3.length === 0) {
                                this.$alert('请输入格式、时间范围正确且完整的境外通联查询条件');
                                status = true
                            }
                        } else if (item === '5') {
                            if (!(this.filterInput(this.formData.input7, 1) &&
                                this.filterInput(this.formData.input8)) || this.dialogSeach4.length === 0) {
                                this.$alert('请输入格式、时间范围正确且完整的外省藏区通联查询条件');
                                status = true
                            }
                        } else if (item === '8') {
                            if (!(this.filterInput(this.formData.input10, 2) &&
                                this.filterInput(this.formData.input11))) {
                                this.$alert('请输入格式、时间范围正确且完整的访问藏区信源查询条件');
                                status = true
                            }
                        }
                    })
                    if (status) {
                        return
                    }
                    // 清空原有的查询条件
                    this.saveSearch.checkRows = [];
                    // 在条件无误后开始封装参数
                    this.saveSearch.radioFlag = 'a';
                    arrs.forEach((item) => {
                        let obj = {};
                        obj.checkFlag = item;
                        obj.checkArr = [];
                        if (item === '1') {
                            obj.checkArr = this.dialogSeach1;
                        } else if (item === '2') {
                            obj.days = this.formData.input1;
                            obj.count = this.formData.input2;
                        } else if (item === '3') {
                            obj.days = this.formData.input3;
                            obj.count = this.formData.input4;
                            obj.checkArr = this.dialogSeach2;
                        } else if (item === '4') {
                            obj.days = this.formData.input5;
                            obj.count = this.formData.input6;
                            obj.checkArr = this.dialogSeach3;
                        } else if (item === '5') {
                            obj.days = this.formData.input7;
                            obj.count = this.formData.input8;
                            obj.checkArr = this.dialogSeach4;
                        } else if (item === '6') {
                            obj.checkArr = ['6'];
                        } else if (item === '7') {
                            obj.checkArr = ['7'];
                        } else if (item === '8') {
                            obj.days = this.formData.input10;
                            obj.count = this.formData.input11;
                        }
                        this.saveSearch.checkRows.push(obj);
                    })
                } else if (this.formData.radio === 'b') {
                    // 精确查询
                    this.saveSearch.radioFlag = 'b'
                    let arrb = [];
                    if (this.formData.radios === '1') {
                        if (this.formData.input9 === '') {
                            this.$alert('请输入手机号')
                            return
                        }
                        arrb.push(this.formData.input9)
                    } else {
                        // 导入文件
                    }
                    this.saveSearch.checkRows = arrb;
                } else if (this.formData.radio === 'c') {
                    /**
                     * 研判结果查询
                     * 1 -- 高度疑似对象
                     * 2 -- 中度疑似对象
                     */
                    this.saveSearch.radioFlag = 'c';
                    let arrc = this.formData.checkboxs2;
                    if (this.formData.checkboxs2.length === 0) {
                        this.$alert('请选择研判查询相关条件')
                        return
                    }
                    this.saveSearch.checkRows = arrc;
                }
                this.searchDialog = false;
                return true;
            },
            // 查询按钮弹窗
            searchChangeResult (val) {
                this.searchDialog = val;
            },
            searchDialogShow () {
                this.searchDialog = true;
                if (this.upLoadFlag) {
                    this.$refs.upload.clearFiles();
                }
            },
            saveSearchChange () {
                // radio === 'a'  ---> checkboxs
                // checkboxs === '2' ---> input1 && input2
                // checkboxs === '3' ---> input3 && input4
                // checkboxs === '4' ---> input5 && input6
                // checkboxs === '5' ---> input7 && input8
                // checkboxs === '8' ---> input10 && input11
                // radio === 'b'  --->
                // radio === 'c'  ---> checkboxs2
                let status = this.saveSearchResult();
                if (status) {
                    if (this.saveSearch.radioFlag === 'b' &&
                        this.formData.radios === '2') {
                        this.upLoadFlag = true;
                        this.$refs.upload.submit();
                        return;
                    } else {
                        this.upLoadFlag = false;
                        this.searchAll(1, 10, this.saveSearch);
                    }
                    // 将所有的数据重置写于请求发送之后，以免影响参数
                    this.formData.radio = 'a'
                    this.formData.radios = '1'
                    this.formData.checkboxs = [];
                    this.formData.checkboxs2 = [];
                    this.formData.input1 = '';
                    this.formData.input2 = '';
                    this.formData.input3 = '';
                    this.formData.input4 = '';
                    this.formData.input5 = '';
                    this.formData.input6 = '';
                    this.formData.input7 = '';
                    this.formData.input8 = '';
                    this.formData.input9 = '';
                    this.formData.input10 = '';
                    this.formData.input11 = '';
                    this.x1 = [];
                    this.dialogSeach1 = [];
                    this.buttonForm1All = false;
                    if (this.button1Text) {
                        this.button1Text.innerText = '请选择';
                    }
                    this.x2 = [];
                    this.dialogSeach2 = [];
                    this.buttonForm2All = false;
                    if (this.button2Text) {
                        this.button2Text.innerText = '请选择'
                    }
                    this.x3 = [];
                    this.dialogSeach3 = [];
                    this.buttonForm3All = false;
                    if (this.button3Text) {
                        this.button3Text.innerText = '请选择'
                    }
                    this.x4 = [];
                    this.dialogSeach4 = [];
                    this.buttonForm4All = false;
                    if (this.button4Text) {
                        this.button4Text.innerText = '请选择'
                    }
                    this.$refs.upload.clearFiles();
                }
            },
            // 左下角表格分页
            // current -- 第几页，size --- 每页多少条
            tableBottomCurrent (val) {
                if (this.upLoadFlag) {
                    this.searchAll(val, this.tableBottom.pageOpt.pageSize)
                } else {
                    this.searchAll(val, this.tableBottom.pageOpt.pageSize, this.saveSearch)
                }
            },
            tableBottomSize (val) {
                this.tableBottom.pageOpt.pageSize = val
                if (this.tableBottom.pageOpt.total === 0) {
                    return;
                }
                if (this.upLoadFlag) {
                    this.searchAll(1, val)
                } else {
                    this.searchAll(1, val, this.saveSearch)
                }
            },
            // 查询传参接口 --- 左侧表格 -- 默认加载第一条数据
            async searchAll (page, rows, saveSearch) {
                this.allLoading = true;
                this.tableBottom.listLoading = true;
                this.tableBottom.emptyText = '';
                this.activeName = 0;
                this.activeNameIndex = 0;
                // 对分页page, rows状态进行赋值
                this.tableBottom.pageOpt.pageSize = rows;
                this.tableBottom.pageOpt.currentPage = page;
                // 清空所有数据（左侧 + 右侧）
                this.tableBottom.data = [];
                this.personTable.data = [];
                this.termData.forEach((item) => {
                    item.count = '';
                })
                this.rightAllTittle.msisdnTittle = '';
                this.saveMsisdn = '';
                this.rightAllTittle.locationTittle = '';
                this.rightAllTittle.operatorTittle = '';
                this.rightAllTittle.typeTittle = '';
                // 请求数据
                let resp;
                if (saveSearch) {
                    resp = await searchAll({
                        type: this.minType,
                        page: page,
                        rows: rows,
                        searchAll: saveSearch
                    })
                } else {
                    resp = await upLoadPage({
                        type: this.minType,
                        page: page,
                        rows: rows
                    })
                }
                if (resp.data) {
                    this.allLoading = false;
                    this.tableBottom.listLoading = false;
                    this.tableBottom.data = resp.data.rows
                    this.tableBottom.pageOpt.total = resp.data.total
                    if (resp.data.rows[0].list) {
                        let arr = resp.data.rows[0].list;
                        this.termArr = []
                        this.termArr = resp.data.rows[0].list.map(item => {
                            if (item === 'noTerm') {
                                item = 0;
                            }
                            return +item
                        })
                        this.frequency(arr);
                    }
                    this.rightAllTittle.msisdnTittle = resp.data.rows[0].usernum;
                    if (this.isPhoneJM) {
                        this.saveMsisdn = phoneNumChange(this.rightAllTittle.msisdnTittle)
                    } else {
                        this.saveMsisdn = this.rightAllTittle.msisdnTittle
                    }
                    this.rightAllTittle.locationTittle = resp.data.rows[0].homeCode;
                    this.rightAllTittle.operatorTittle = resp.data.rows[0].ascode;
                    this.rightAllTittle.typeTittle = resp.data.rows[0].ypResult;
                }
                if (resp.data.rows.length > 0) {
                    // ifFlag -- 告诉后台是否进行查询 -- 右侧表格数据
                    // 0 -- 不查； 1 -- 查
                    this.personTable.pagination = true;
                    if (this.termArr[0] === 0) {
                        this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 0);
                    } else {
                        this.personDetail(1, 10, 1, this.rightAllTittle.msisdnTittle, 1);
                    }
                }
            },
            // 显示研判弹窗
            daterDialogShow () {
                this.deterDialog = true;
                this.$refs.deterFormValue.setValue([{ id: 'determine', value: 'low' }])
            },
            deterChangeResult (val) {
                this.deterDialog = val
            },
            // 保存研判结果
            saveDeterChange () {
                this.deterDialog = false;
                let str = this.$refs.deterFormValue.getValue().determine;
                this.judgment(this.rightAllTittle.msisdnTittle, str);
            },
            // 右侧研判接口
            async judgment (phoneNumber, flag) {
                let resp = await Judgment({
                    type: this.minType,
                    msisdn: phoneNumber,
                    judgmentFlag: flag
                })
                if (resp.message) {
                    this.rightAllTittle.typeTittle = resp.data + '对象';
                    this.tableBottom.data.forEach(item => {
                        if (item.usernum === this.rightAllTittle.msisdnTittle) {
                            return (item.ypResult = resp.data)
                        }
                    })
                }
            },
            // 显示个人详情相应的弹窗
            personChangeResult (val) {
                this.personTableDialog = val;
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
            // 右侧上方判断依据
            frequency (arr) {
                this.termData.forEach((item, index) => {
                    if (arr[index] === 'noTerm') {
                        item.count = '----';
                    } else {
                        item.count = arr[index] + '次'
                    }
                })
            },
            // 个人详情分页
            personCurrent (val) {
                let flag = this.activeName - 0 + 1
                if (this.activeNameIndex < this.termArr.length &&
                    this.termArr[this.activeNameIndex] === 0) {
                    this.personDetail(val, this.personTable.pageOpt.pageSize, flag,
                    this.rightAllTittle.msisdnTittle, 0)
                } else {
                    this.personDetail(val, this.personTable.pageOpt.pageSize, flag,
                    this.rightAllTittle.msisdnTittle, 1)
                }
            },
            personSize (val) {
                this.personTable.pageOpt.pageSize = val
                if (this.personTable.pageOpt.total === 0) {
                    return;
                }
                let flag = this.activeName - 0 + 1
                if (this.activeNameIndex < this.termArr.length &&
                    this.termArr[this.activeNameIndex] === 0) {
                    this.personDetail(1, val, flag, this.rightAllTittle.msisdnTittle, 0)
                } else {
                    this.personDetail(1, val, flag, this.rightAllTittle.msisdnTittle, 1)
                }
            },
            // 个人详情
            async personDetail (page, rows, flag, usernum, num) {
                this.allLoading = true;
                this.personTable.listLoading = true;
                this.personTable.emptyText = '';
                this.personTable.pageOpt.currentPage = page;
                this.personTable.pageOpt.pageSize = rows;
                let resp = await personData({
                    type: this.minType,
                    page: page,
                    rows: rows,
                    flag: flag,
                    usernum: usernum,
                    isFlag: num
                })
                let tabs = flag - 1;
                let flagType;
                this.tabsRightData.forEach(item => {
                    if (item.showIndex === tabs) {
                        flagType = item.flag
                    }
                })
                if (resp.rows) {
                    if (flagType === 'map' && tabs === 4) {
                        // 这个this.flag貌似没啥作用
                        this.flag = 'map';
                        this.mapArr = resp.rows;
                        this.$nextTick(() => {
                            this.allLoading = false;
                            this.drawMap();
                        })
                        return
                    } else {
                        this.flag = 'table';
                    }
                    this.personTable.listLoading = false;
                    this.allLoading = false;
                    this.personTable.column = this.columnArr[tabs]
                    if (tabs === 1) {
                        this.$nextTick(() => {
                            resp.rows.forEach((item) => {
                                if (item.keywords) {
                                    this.$refs.personTables.setColumnKeys('oriContent', item.keywords)
                                    item.keywords = item.keywords.join(',')
                                }
                            })
                        })
                    } else if (tabs === 2 || tabs === 3) {
                        // 将时长和内容用一列表示
                        this.$nextTick(() => {
                            resp.rows.forEach((item) => {
                                if ((item.callTime === null || item.callTime === '') && (item.oriContent !== null && item.oriContent !== '')) {
                                } else {
                                    // 显示短信内容
                                    item.callTime = item.callTime
                                }
                            })
                        })
                    }
                    this.$nextTick(() => {
                        this.personTable.data = resp.rows;
                        this.personTable.pageOpt.total = resp.total;
                    })
                }
            },
            // 个人详情行点击事件
            // jzFlag -- 服务于短信类，与其余无关
            async rowClicks (ids, rightDialog, num, keywords) {
                let resp = await rightDialog({
                    id: ids,
                    JZflag: num,
                    keywords: keywords
                })
                this.personTableDialog = true;
                this.tabsRightData.forEach(item => {
                    if (item.showIndex === this.activeName) {
                        this.personTableTittle = item.shortKey
                    }
                })
                this.personTypeDialogs = {};
                if (this.activeName === 5 || this.activeName === 4) {
                    this.diaglogTable.data = [];
                    this.personTypeDialogs = this.personTypeDialog[this.activeName]
                    this.personTypeDialogs.type = resp.data.dialogType;
                    this.personTypeDialogs.tittleTop.forEach((item, index) => {
                        item.value = resp.data.info[index]
                    })
                    this.personTypeDialogs.tittleMiddle1.forEach((item, index) => {
                        item.value = resp.data.cname[index]
                    })
                    this.personTypeDialogs.titleContent = resp.data.timeInfo;
                    this.$nextTick(() => {
                        this.diaglogTable.data = this.personTypeDialogs.titleContent;
                    })
                } else {
                    // 假装……动态生成弹窗
                    this.personTypeDialogs = this.personTypeDialog[this.activeName];
                    this.personTypeDialogs.type = resp.data.dialogType;
                    // 弹框显示信息内容
                    // if (this.activeName === 1) {
                    //     let oriContent = this.highlight(keywords, resp.data.oriContent)
                    //     this.personTypeDialogs.titleContent = oriContent;
                    // } else {
                    //     this.personTypeDialogs.titleContent = resp.data.oriContent;
                    // }
                    if (this.activeName === 0) {
                        this.personTypeDialogs.titleContent = resp.data.oriContent;
                    }
                    // 弹窗号码的加密
                    if (this.isPhoneJM) {
                        if (this.activeName === 0) {
                            resp.data.info[2] = phoneNumChange(resp.data.info[2])
                        } else if (this.activeName === 1) {
                            resp.data.info[3] = phoneNumChange(resp.data.info[3])
                        } else if (this.activeName === 2 || this.activeName === 3) {
                            resp.data.info[0] = phoneNumChange(resp.data.info[0])
                        }
                    }
                    this.personTypeDialogs.tittleTop.forEach((item, index) => {
                        item.value = resp.data.info[index]
                    })
                    this.personTypeDialogs.tittleMiddle1.forEach((item, index) => {
                        item.value = resp.data.usernuminfo[index]
                    })
                    this.personTypeDialogs.tittleMiddle2.forEach((item, index) => {
                        item.value = resp.data.relatenuminfo[index]
                    })
                }
            },
//          人员列表选项卡
            handleClick (val, index) {
                if (this.rightAllTittle.msisdnTittle === '') {
                    return
                }
                // 点击的标签页高亮 -- 下标
                this.activeNameIndex = index;
                // 属性 -- 标签页的标识
                this.activeName = val;
                this.personTable.column = [];
                this.personTable.data = [];
                // flag参数 -- 页签标识
                let flag = val - 0 + 1;
                let usernum = this.rightAllTittle.msisdnTittle;
                // 活动区域和登陆基站排行异于其他
                if (this.activeName === 5 || this.activeName === 4) {
                    this.personTable.pagination = false;
                    let num = ((this.termData.length - 0) / 2) * 30;
                    this.personHeight.height = $('.ga-allProvince__personDetail').height() - 189 - num;
                } else {
                    this.personTable.pagination = true;
                    let num = ((this.termData.length - 0) / 2) * 30;
                    this.personHeight.height = $('.ga-allProvince__personDetail').height() - 159 - num;
                }
                // ifFlag -- 告诉后台是否进行查询
                // 判断依据相关标签页，其index必然正确对应termArr的下标
                // 0 -- 不查； 1 -- 查
                if ([0, 1, 2, 3, 6].includes(this.activeName)) {
                    if (this.termArr[this.activeNameIndex] === 0) {
                        this.personDetail(1, 10, flag, usernum, 0);
                    } else {
                        this.personDetail(1, 10, flag, usernum, 1);
                    }
                } else {
                    this.personDetail(1, 10, flag, usernum, 1);
                }
            }
        },
        components: {
            frameCom,
            tableComp,
            formComp,
            sysDialog
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
    .downLoadUrl {
        display: inline-block;
        position: absolute;
        margin-right: 42px;
        margin-top: 4px;
        top: 0;
        right: 0;
    }
    .downLoadUrl:hover {
        text-decoration: underline;
    }
    .downLoadUrls {
        display: inline-block;
        position: absolute;
        margin-right: 42px;
        margin-top: 4px;
        top: 0;
        right: 0;
    }
    .downLoadUrls:hover {
        cursor: not-allowed;
    }
    .dialogChecks1 {
        width: 98%;
        height: 170px;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .dialogChecks2 {
        width: 98%;
        height: 400px;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .dialogChecks3 {
        width: 98%;
        height: 400px;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .dialogChecks4 {
        width: 98%;
        height: 170px;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .el-input .el-input__inner{
        width: 130px;   
        height: 20px;
    }
    .szsjFormDivs {
        width: 100%;
        height :auto;
        margin-top: 5px;
    }
    .formCheckDivs {
        width: 100%;
        margin: 5px 0 0 30px;
        height: 25px;
        overflow: hidden;
    }
    .formCheckDivsSure2 {
        width: 100%;
        margin: 5px 0 0 30px;
        height: 30px;
        overflow: hidden; 
        color: #ccc;
        line-height: 30px;
        position: relative;
    }
    .formCheckDivsSure1 {
        width: 100%;
        margin: 5px 0 0 30px;
        height: 30px;
        overflow: hidden; 
        color: #9af5f6;
        line-height: 30px;
        position: relative;
    }
    .szsjFormDivs .formCheckDivsSure1 .el-upload-list {
        height: 40px;
        position: absolute;
        left: 250px;
        top: -3px;
    }
    .szsjFormDivs .formCheckDivsSure2 .el-upload-list { 
        height: 40px;
        position: absolute;
        left: 250px;
        top: -3px;
    }
    .formCheckDivs .formCheckDivs1 {
        width: 17%;
        float: left;
        height: 25px;
    }
    .formCheckDivs .formCheckDivs3 {
        width: 80%;
        float: left;
        height: 25px;
        color: #ccc;
    }
    .formCheckDivs .formCheckDivs2{
        width: 80%;
        float: left;
        height: 25px;
        color: #9af5f6;
    }
    .dialogContent {
        width: 100%;
        height: 60px;
        font-size: 20px;
        overflow-y: scroll; 
    }
    .dialogUl {
        width: 100%;
        height: 60px;
        list-style: none;
        display: table;
        table-layout: fixed;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUl li {
        display: table-cell;
        line-height: 30px;
        text-align: center;
    }
    .dialogUl li p {
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        min-height: 30px;
    }
    .dialogUl li p:first-child {
        background: #102546;
    }
    .dialogUlTable {
        width: 100%;
        height: 60px;
        list-style: none;
        display: table;
        table-layout: fixed;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUlTable li:not(:first-child) {
        width: 25%;
        display: table-cell;
        line-height: 30px;
    }
    .dialogUlTable li:first-child {
        width: 50%;
        display: table-cell;
        line-height: 30px;
    }
    .dialogUlTable li p {
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        text-align: center;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUlTable li p:first-child {
        background: #102546;
    }
    .dialogUlMap {
        width: 100%;
        height: 32px;
        list-style: none;
        border-bottom: 1px solid #4F8EE5;
        border-right: 1px solid #4F8EE5;
        margin-bottom: 6px;
    }
    .dialogUlMap li {
        height: 32px;
        width: 100%;
        overflow: hidden;
        line-height: 30px;
        text-align: center;
    }
    .dialogUlMap li p:first-child{
        width: 20%;
        height: 30px;
        background: #102546;
        float: left;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .dialogUlMap li p:last-child{
        width: 80%;
        float: left;
        height: 30px;
        border-top: 1px solid #4F8EE5;
        border-left: 1px solid #4F8EE5;
        min-height: 30px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .personTableContent {
        width: 100%;
        height: 31px;
        /*overflow: hidden;*/
        margin: 3px 0 5px 0;
        /*border-bottom: 1px solid #4F8EE5;*/
        background: rgba(27,117,184,0.2);
    }
    .ga-allProvince__term .ga-allProvince__term--content .yq-form {
        margin: -3px 0 0 0;
    }
    .personDetailTop {
        margin-top: 10px;
    }
    .personDetailBottom {
        margin-top: 6px;
        height: 74.3%;
    }
    .personDetailBottomCon {
        padding: 6px 6px 0 6px;
        width: 100%;
        height: 88%;
    }
    .ga-allProvince__personDetail--lis p {
        list-style: none;
        text-align: left;
        line-height: 32px;
        float: left;
        height: 32px;
        text-indent: 16px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        background: rgba(189,240,255,0.10);
    }
    .ga-allProvince__personDetail--lis p:first-child {
        width: 80%;
    }  
    .ga-allProvince__personDetail--lis p:nth-child(2) {
        width: 20%;
        text-align: center;
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
    .ga-allProvince__personDetail--tittleDeter {
        width: 98%;
        height: auto;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        line-height: 25px;
    }
    .ga-allProvince__personDetail--tittleDeter p {
        float: left;
        width: 30%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        margin-top: -3px;
        margin-right: 10px;     
    }
    .ga-allProvince__personDetail--tittle p {
        float: left;
        width: 19%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        margin-top: -3px;
        margin-right: 10px;
    }
    .ga-allProvince__personDetail--tittle p:first-child {
        width: 23%;
        height: 30px;
    }
    .ga-allProvince__personDetail--tittle p:nth-child(2) {
        width: 15%;
        height: 30px;
    }
    /*.ga-allProvince__personDetail--tittle .button1 {
        width: 60px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        font-size: 14px;
        margin-right: 10px;
        border: 0;
        background: #7E9DCB;
        border-radius: 3px;
        color: #fff;
        cursor: not-allowed;
    }*/
    /*.ga-allProvince__personDetail--tittle .button2 {
        width: 60px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        font-size: 14px;
        margin-right: 10px;
        border: 0;
        background: #2157A3;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
    }*/
    .ga-allProvince__personDetail--tittle span {
        width: 60px;
        height: 20px;
        display: inline-block;
        line-height: 20px;
        font-size: 14px;
        border: 1px solid #2157A3;
        background: #2157A3;
        border-radius: 3px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        font-weight: normal;
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
        z-index: 1;
        position: relative;
        cursor:pointer;
        line-height: 30px;
        text-align: center;
        color: #A2EEFF;
    }
    /*.lisTabs:before {
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
    }*/
    .isactive {
        color: #00FFBF;
    }
    /*.isactive:before {
        background: #2157a3;
    } */
/*    .isactive:first-child:after {
        background: #2157a3;
    }
    .isactive:last-child:after {
        background: #2157a3;
    }*/
    @component-namespace ga {
        @b allProvince {
            width: 100%;
            height: 96%;
            position: relative;
            @e leftContent {
                width: 28%;
                height: 100%;
                left: 2%;
                position: absolute;
                overflow: hidden;
            }
            @e term{
                position: absolute;
                width: 100%;
                height: 13%;
                overflow-y: scroll;
            }
            @e term p {
                width: 100%;
                height: 20px;
                font-size: 20px;
                margin: 10px 0 20px 0;
                color: #A2EEFF;
            }
            /*@e term button {
                width: 70px;
                height: 25px;
                display: inline-block;
                line-height: 25px;
                font-size: 14px;
                margin: 10px 10px 0 0;
                border: 0;
                background: #2157A3;
                border-radius: 3px;
                color: #fff;
            }*/
            @e term .exportUrl1 {
                width: 58px;
                height: 26px;
                display: inline-block;
                font-size: 14px;
                line-height: 26px;
                text-align: center;
                border-radius: 2px;
                color:#fff;
                margin: 0 0 0 12px;
                background:url("~assets/images/formImage/btn.png") no-repeat 0 center;
                background-size: 104% 100%;
                background-position: center;
            }
            /*@e term .exportUrl2 {
                width: 70px;
                height: 25px;
                display: inline-block;
                line-height: 25px;
                font-size: 14px;
                margin: 10px 10px 0 0;
                border: 0;
                background: #7E9DCB;
                border-radius: 3px;
                color: #fff;
                text-align: center;
                cursor: not-allowed;
            }*/
            @e tableBottom {
                width: 100%;
                height: 82%;
                bottom: 2%;
                padding: 0;
                /*-webkit-transition: all 0.5s ease-in-out 0s;
                -o-transition: all 0.5s ease-in-out 0s;
                transition: all 0.5s ease-in-out 0s;*/
                position: absolute;
                z-index: 1;
                /*background: rgba(0, 0, 0, 0.8);*/
            }
            @e personDetail {
                width: 66%;
                height: 98%;
                left: 32%;
                top: 0;
                padding: 0;
                -webkit-transition: all 0.5s ease-in-out 0s;
                -o-transition: all 0.5s ease-in-out 0s;
                transition: all 0.5s ease-in-out 0s;
                position: absolute;
                /*background: rgba(0, 0, 0, 0.8);*/
                @m tittle {
                    width: 98%;
                    height: auto;
                    font-size: 12px;
                    /*font-weight: bold;*/
                    text-align: left;
                    line-height: 25px;
                    margin-left: 10px;
                    float: left;
                    color: #A2EEFF;
                }
                @m basis {
                    width: 98%;
                    height: auto;
                    position: relative;
                    overflow: hidden;
                    margin: 0 auto;
                }
                @m lis {
                    list-style: none;
                    width: 47%;
                    height: 32px;
                    font-size: 12px;
                    float: left;
                    overflow: hidden;
                    color: #A2EEFF;
                    margin: 6px 11px 0 11px;
                    border-top: 1px solid rgba(110,222,255,0.40);
                    border-bottom: 1px solid rgba(110,222,255,0.40);
                    box-shadow: inset 0 -1px 0 0 rgba(110,222,255,0.40), inset 0 1px 0 0 rgba(110,222,255,0.40);
                }
                @m map {
                    width: 100%;
                    height: 100%;
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
    .bHeight {
        height: 87%;
    }
    .yq-form1 {
        margin: 2px 0 0 0;
    }
    .ga-allProvince .ga-frame {
        padding-bottom: 0;
    }
</style>
