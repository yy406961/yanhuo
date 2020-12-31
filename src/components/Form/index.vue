<script>
    import textComp from 'components/Form/text'
    import textNumberComp from 'components/Form/textNumber'
    import dateComp from 'components/Form/date'
    import selectComp from 'components/Form/select'
    import radioComp from 'components/Form/radio'
    import checkBoxComp from 'components/Form/checkbox'
    import switchComp from 'components/Form/switch'
    import buttonComp from 'components/Form/button'
    import keywordComp from 'components/Form/keyWord'
    import autoCompleteComp from 'components/Form/autoComplete'
    import keywordSelectComp from 'components/Form/keyWordSelect'
    import keywordAutoComp from 'components/Form/keyWordAuto'
    export default {
        name: 'vform',
        props: [
            'option'
        ],
        data () {
            return {
                // form label标签默认居右
                labelPos: '',
                labelWidth: null,
                temArray: [],
                sliderUp: false,
                wrapIndex: [],
                btnIndex: []
            }
        },
        created () {
            if (this.option.canSlider && this.option.items.length >= 3) {
                this.option.items.map((item, index) => {
                    if (item.wrap) {
                        this.wrapIndex.push(index)
                    }
                    if (item.type === 'button') {
                        this.btnIndex.push(index)
                    }
                })
                this.slider()
            }
        },
        mounted () {
            this.labelPos = this.option.labelPos || 'right';
            this.items = _.cloneDeep(this.formOpt.items) || [];
            // this.sliderUp = this.formOpt.defaultSlide || false;
            if (this.option.labelWidth) {
                this.labelWidth = this.option.labelWidth + 'px'
            }
        },
        computed: {
            formOpt () {
                return this.option;
            },
            sliderClass () {
                return !this.sliderUp ? 'slider-up el-icon-caret-bottom' : 'slider-up el-icon-caret-top'
            },
            btnsStyle () {
                let r = 10;
                if (this.formOpt.canSlider) {
                    r = 60;
                }
                return {
                    right: r + 'px'
                }
            }
        },
        components: {
            textComp,
            textNumberComp,
            dateComp,
            selectComp,
            radioComp,
            checkBoxComp,
            switchComp,
            buttonComp,
            keywordComp,
            autoCompleteComp,
            keywordSelectComp,
            keywordAutoComp
        },
        /* eslint-disable no-unused-vars */
        render (h) {
            let elItems, elBtns;
            let elSlider;
            let me = this;
            let br = <br />;
            elItems = me.formOpt.items.map((it, index) => {
                let comp;
                let ref = 'comp' + index;
                switch (it.type) {
                    case 'text':
                        comp = <textComp option={it.comOpt} ref={ref}></textComp>
                        break;
                    case 'textNumber':
                        comp = <textNumberComp option={it.comOpt} ref={ref}></textNumberComp>
                        break;
                    case 'date':
                        comp = <dateComp option={it.comOpt} ref={ref}></dateComp>
                        break;
                    case 'select':
                        comp = <selectComp option={it.comOpt} ref={ref}></selectComp>
                        break;
                    case 'radio':
                        comp = <radioComp option={it.comOpt} ref={ref}></radioComp>
                        break;
                    case 'checkbox':
                        comp = <checkBoxComp option={it.comOpt} ref={ref}></checkBoxComp>
                        break;
                    case 'switch':
                        comp = <switchComp option={it.comOpt} ref={ref}></switchComp>
                        break;
                    case 'keyWord':
                        comp = <keywordComp option={it.comOpt} ref={ref}></keywordComp>
                        break;
                    case 'keyWordSelect':
                        comp = <keywordSelectComp option={it.comOpt} ref={ref}></keywordSelectComp>
                        break;
                    case 'keyWordAuto':
                        comp = <keywordAutoComp option={it.comOpt} ref={ref}></keywordAutoComp>
                        break;
                    case 'button':
                        comp = <buttonComp option={it.comOpt} ref={ref}></buttonComp>
                        break;
                    case 'autoCompletet':
                        comp = <autoCompleteComp option={it.comOpt} ref={ref}></autoCompleteComp>
                        break;
                    default:break;
                }
                let formBox;
                let required;
                let divarrow;
                if (it.comOpt.show === undefined || it.comOpt.show) {
                    if (it.required) {
                        required = <span class='yq-form__required'>*</span>;
                    }
                    let eleArr = ['text', 'select', 'date']
                    if (eleArr.includes(it.type)) {
                        divarrow = <div class='yq-form__arrow'>
                        <span class='yq-form__arrow--arrowSpan yq-form__arrow--leftTop'></span>
                        <span class='yq-form__arrow--arrowSpan yq-form__arrow--rightTop'></span>
                        <span class='yq-form__arrow--arrowSpan yq-form__arrow--leftBottom'></span>
                        <span class='yq-form__arrow--arrowSpan yq-form__arrow--rightBottom'></span>
                        </div>
                    }
                    formBox = <el-form-item label={it.label}>
                        {comp}{divarrow} {required}
                    </el-form-item>
                }
                if (it.wrap) {
                    return <span>{formBox} {br}</span>
                }
                return formBox
            })
            if (me.formOpt.btns && _.isArray(me.formOpt.btns)) {
                elBtns = me.formOpt.btns.map((it, index) => {
                    let comp, formBox;
                    let ref = 'btn' + index;
                    comp = <buttonComp option={it.comOpt} ref={ref}></buttonComp>
                    if (it.comOpt.show === undefined || it.comOpt.show) {
                        formBox = <el-form-item label={it.label}>
                        {comp}
                    </el-form-item>
                    }
                    if (it.wrap) {
                        return <span>{formBox} {br}</span>
                    }
                    return formBox
                });
                if (this.formOpt.btnPos === 'right') {
                    elBtns = <div class='yq-form__btns' style = {this.btnsStyle}>{elBtns}</div>
                }
            }
            elSlider = me.formOpt.canSlider ? <i class={this.sliderClass} onClick={this.slider}></i> : ''
            return (
                <div class='yq-form'>
                     {elSlider}
                    <el-form inline={this.formOpt.inline} label-position={this.labelPos}
                        label-width={this.labelWidth} ref='form' >
                        {elItems}
                        {elBtns}
                    </el-form>
                </div>
            )
        },
        methods: {
            getValue () {
                let me = this;
                let returnData = {};
                me.formOpt.items.forEach((it, index) => {
                    if (it.show === undefined || it.show) {
                        if (me.$refs['comp' + index]) {
                            if (_.isFunction(me.$refs['comp' + index].getValue)) {
                                _.assign(returnData, me.$refs['comp' + index].getValue());
                            }
                        }
                    }
                });
                return returnData;
            },
            // data: [{id: 'text1', value: '22'},{id: 'checkbox1', value: ['1', '2']}]
            setValue (data) {
                let me = this;
                this.formOpt.items.forEach((it, index) => {
                    data.forEach(d => {
                        if (it.comOpt.id === d.id) {
                            me.$nextTick(() => {
                                me.$refs['comp' + index].setValue(d.value);
                            })
                        }
                    })
                });
            },
            // 清空value
            clearValue () {
                this.formOpt.items.forEach((it, index) => {
                    let vm = this.$refs['comp' + index];
                    if (vm && _.isFunction(vm.setValue)) {
                        vm.setValue('')
                    }
                });
            },
            // 获得当前form容器的高度
            getContainerHeight () {
                return $(this.$el).outerHeight(true)
            },
            setItemData (id, data) {
                let me = this;
                this.formOpt.items.forEach(it => {
                    if (it.comOpt.id === id) {
                        it.comOpt.data = data;
                    }
                });
            },
            setShow (data) {
                let me = this;
                this.formOpt.items.forEach((item) => {
                    data.forEach(d => {
                        if (item.comOpt.id === d.id) {
                            item.comOpt.show = d.value;
                        }
                    })
                });
            },
            // 设置form元素item属性
            setOtherAttribute (id, attr, data) {
                let me = this;
                this.formOpt.items.forEach(it => {
                    if (it.comOpt.id === id) {
                        it.comOpt[attr] = data;
                    }
                });
            },
            slider () {
                const LEN = this.formOpt.items.length
                let btnLen = this.btnIndex.length
                let INDEX = this.wrapIndex[0] + 1
                if (this.sliderUp) {
                    this.temArray = this.formOpt.items.slice(INDEX, LEN - btnLen)
                    this.formOpt.items.splice(INDEX, LEN - INDEX - btnLen)
                    this.formOpt.items[INDEX - 1].wrap = false
                } else {
                    this.formOpt.items.splice(INDEX, 0, ...this.temArray)
                    this.formOpt.items[INDEX - 1].wrap = true
                }
                this.sliderUp = !this.sliderUp
//                 let me = this;
// //                const LEN = this.formOpt.items.length;
// //                let btnLen = this.btnIndex.length
// //                let INDEX = this.wrapIndex[0] + 1
//                 if (this.sliderUp) {
//                     let itemsTemp = _.cloneDeep(this.formOpt.items);
//                     this.items = [];
//                     itemsTemp.forEach(it => {
//                         if (it.foldDisplay) {
//                             it.wrap = false;
//                             me.items.push(it);
//                         }
//                     });
// //                    this.temArray = this.formOpt.items.slice(INDEX, LEN - btnLen)
// //                    this.formOpt.items.splice(INDEX, LEN - INDEX - btnLen)
// //                    this.formOpt.items[INDEX - 1].wrap = false
//                     this.sliderUp = !this.sliderUp
//                 } else if (!this.sliderUp) {
// //                    this.formOpt.items.splice(INDEX, 0, ...this.temArray)
// //                    this.formOpt.items[INDEX - 1].wrap = true
//                     this.items = this.formOpt.items;
//                     this.sliderUp = !this.sliderUp
//                 }
                this.$nextTick(() => {
                    this.$emit('formSlideChange', this.sliderUp);
                })
            }
        }
    }
</script>
<style>
    @component-namespace yq {
        @b form {
            margin : 10px 0;
            position: relative;
            @e btns {
                position: absolute;
                right: 10px;
                bottom: 0;
            }
            @e required{
                color: #f00;
                position: absolute;
                top: 2px;
                right: -12px;
            }
            @e arrow{
                @m arrowSpan{
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    border-style: solid;
                    border-color: rgba(0,164,255,0.6);
                }
                @m leftTop{
                    top: 1px;
                    left: 0px;
                    border-width: 0px 0px 6px 6px;
                    border-top-color: transparent!important;
                    border-bottom-color: transparent!important;
                    border-color:   transparent rgba(0,164,255,0.6);
                }
                @m rightTop{
                    top: 1px;
                    right: 0px;
                    border-top-color: transparent!important;
                    border-bottom-color: transparent!important;
                    /* border-color:   transparent rgba(0,164,255,0.6); */
                    border-width: 0px 6px 6px 0;
                }
                @m leftBottom{
                        bottom: 0;
                        left: 0;
                        border-width: 0px 6px 6px 0;
                        border-left-color: transparent!important;
                        border-right-color: transparent!important;
                        /* border-color: rgba(0,164,255,0.6) transparent; */
                }
                @m rightBottom{
                        right: 0px;
                        bottom: 0;
                        border-width: 0px 0px 6px 6px;
                        border-left-color: transparent!important;
                        border-right-color: transparent!important;
                        /* border-color: rgba(0,164,255,0.6) transparent; */
                }
            }
        }
    }
    .slider-up {
       display: block;
       position: absolute;
       top: 10px;
       right: 30px;
       width: 20px;
       height: 20px;
       color: #4c84e0;
       font-size: 20px;
       z-index: 10;
   }
</style>
