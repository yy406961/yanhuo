<template>
    <div class="ga-layout__body-section1">
        <div class="ga-layout__body-query">
            <div class="ga-layout__query-taskState">
                <FormComp :option="formOpt" ref="form"></FormComp>
                <!-- <span>任务状态： </span> -->
                <!-- <div class="ga-layout__taskstateSelect"
                     @click="stateListShow = !stateListShow">
                    {{ stateList[taskStatus-1] }}
                </div> -->
                <!-- <ul class="ga-layout__taskstateList"
                    v-show="stateListShow">
                    <li class="ga-layout__taskstateList-item"
                        v-for="(op, i) in stateList"
                        :key="i"
                        @click="stateSelect(i+1)">{{ op }}</li>
                </ul> -->
            </div>
        </div>
        <!-- <div class="ga-layout__body-add" @click='newTask'>
                新建任务
                 <router-link :to="{ name: '任务配置', params: { handleType: 'addTask', startTime:'', endTime: '', detailTitle: '' }}">新建任务</router-link> 
            </div> -->
    </div>
</template>

<script>
import FormComp from 'components/Form'
export default {
    name: 'actionbar',
    props: ['taskStatus'],
    data () {
        let me = this
        return {
            stateListShow: false,
            stateList: [
                { name: '在控', value: 1 },
                { name: '中止', value: 2 },
                { name: '到期', value: 3 }
            ],
            stateIndex: 0,
            // 表单
            formOpt: {
                inline: true,
                labelPos: 'left',
                labelWidth: '80',
                // 表单项
                items: [
                    {
                        label: '任务状态：',
                        type: 'select',
                        comOpt: {
                            id: 'taskStatus',
                            value: '',
                            disabled: false,
                            width: 180,
                            data: [
                                // { name: '全部', value: 0 },
                                { name: '在控', value: 1 },
                                { name: '中止', value: 2 },
                                { name: '到期', value: 3 }
                            ],
                            change: function (val) {
                                me.stateSelect(val)
                            }
                        }
                    }
                ]
            }
        }
    },
    mounted() {
        this.$refs.form.setValue([{ id: 'taskStatus', value: this.taskStatus }])
    },
    methods: {
        //    	状态选择方法
        stateSelect (i) {
            // this.stateListShow = false;
            this.$emit('update:taskStatus', i);
        },
        newTask () {
            this.$router.push({
                name: '任务配置',
                params: {
                    handleType: 'addTask',
                    startTime: '',
                    endTime: '',
                    detailTitle: ''
                }
            })
        }
    },
    components: {
        FormComp
    }
}
</script>

<style lang="postcss" scoped>
@component-namespace ga {
    @b layout {
        @e body-section1 {
            display: flex;
            justify-content: space-between;
            height: 8%;
            align-items: center;
            // padding: 0 1.6%;
            padding:0 12px;
        }
        @e body-query {
            display: flex;
            align-items: center;
            width: 60%;
            color: #fff;
        }
        @e query-taskState {
            display: flex;
            align-items: center;
            position: relative;
        }
        @e taskstateSelect {
            display: inline-block;
            text-align: center;
            width: 208px;
            height: 38px;
            line-height: 38px;
            padding: 0 16px;
            background: url("~assets/images/task/select.png") no-repeat 0 center;
            background-size: 100% 100%;
        }
        @e taskstateList {
            position: absolute;
            right: 0;
            top: 38px;
            width: 206px;
            background: rgba(10, 29, 65, 0.8);
            border: 1px solid #186887;
            z-index: 99;
            height: 110px;
            overflow: hidden;
        }
        @e taskstateList-item {
            line-height: 36px;
            text-align: center;
        }
        @e taskstateList-item:hover {
            background-color: #16356e;
        }
        @e body-add {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 114px;
            height: 100%;
            background: url("~assets/images/task/add.png") no-repeat 0 center;
            cursor: pointer;
            color: #fff;
        }
    }
}

@media only screen and (max-device-width: 1440px) {
    @component-namespace ga {
        @b layout {
            @e body-section1 {
                font-size: .9em;
            }
            @e taskstateSelect {
                width: 154px;
                height: 30px;
                line-height: 30px;
            }
            @e taskstateList {
                width: 154px;
                height: 92px;
                top: 29px;
            }
            @e taskstateList-item {
                line-height: 30px;
                background-position-y: -27px;
            }
            @e body-add {
                width: 90px;
            }
        }
    }
}
</style>

