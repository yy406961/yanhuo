<template>
    <section class="ga-layout__body-section2">
        <transition-group name="list"
                          tag="ul"
                          class="ga-layout__body-taskList">
            <!--<ul class="home-body-taskList">-->
            <li class="ga-layout__body-listItem"
                v-for="(item, index) in tasklist"
                :key="index">
                <frameCom>
                    <div class="ga-layout__body-listItem-titleWrap" @click="titleClick(item)">
                        <!-- <div class="ga-layout__body-listItem-title"> -->
                            <!-- item.available 用来判断是否达到任务开始时间，达到为 true -->
                            <!-- <router-link v-if="item.available"
                                        :to="{
                                            name: '任务详情',
                                            params: {
                                                taskId: 'T' + item.taskBaseId,
                                                taskName: item.taskName,
                                                startTime: item.beginTime,
                                                endTime:item.endTime,
                                                taskAreaNum: item.taskAreaCount,
                                                taskTarNum: item.taskTargetCount,
                                                taskStatus: item.taskStatus
                                            }
                                        }">
                            </router-link> -->
                            <p class="ga-layout__body-listItem-title">
                                <span v-if="item.taskName.length > 8">{{ item.taskName.substr(0, 8) }}...</span>
                                <span v-else>{{ item.taskName }}</span>
                            </p>
                            <!-- <span v-else @click="taskDisabled" style="cursor: pointer;">{{ item.taskName }}</span> -->
                        <!-- </div> -->
                    </div>
                    <div class="ga-layout__body-listItem-content">
                        <div class="ga-layout__body-listItem-warning">{{ item.alarmCount }}</div>
                        <div>{{ taskItemTit[0] }}</div>
                        <div class="ga-layout__body-listItem-time">{{ item.beginTime }} —— {{ item.endTime }}</div>
                        <div>{{ taskItemTit[1] }}</div>
                        <div class="ga-layout__body-listItem-header">{{ item.taskTargetCount }}个</div>
                        <div>{{ taskItemTit[2] }}</div>
                        <div class="ga-layout__body-listItem-creater">{{ item.taskAreaCount }}个</div>
                    </div>
                </frameCom>
            </li>
            <!--</ul> -->
        </transition-group>
    </section>
</template>

<script>
    import frameCom from 'components/monitor/frame'
    export default {
        name: 'taskList',
        props: ['tasklist'],
        data () {
            return {
                taskItemTit: [
                    '任务起止时间：',
                    '任务目标人数：',
                    '任务区域：'
                ]
            }
        },
        methods: {
            // 未达到任务开始时间时的提示信息
            taskDisabled () {
                this.$message.warning('未达到该任务开始时间！')
            },
            titleClick(item) {
                if (item.available) {
                    this.$router.push({
                        name: '任务详情',
                        params: {
                            taskId: 'T' + item.taskBaseId,
                            taskName: item.taskName,
                            startTime: item.beginTime,
                            endTime: item.endTime,
                            taskAreaNum: item.taskAreaCount,
                            taskTarNum: item.taskTargetCount,
                            taskStatus: item.taskStatus
                        }
                    })
                } else {
                    this.$message.warning('未达到该任务开始时间！')
                }
            }
        },
        components: {
            frameCom
        }
    }
</script>

<style>
    @component-namespace ga {
        @b layout {
            font-size: 16px;
            @e body-section2 {
                height: 92%;
            }
            @e body-taskList {
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
            @e body-listItem {
                box-sizing: border-box;
                /* background: url("~assets/images/task/listItemBg.png") no-repeat center 0;
                background-size: 86% 100%; */
                width: 25%;
                color: #fff;
                height: 46%;
                position: relative;
                display: flex;
                margin-top: 1%;
                padding: 0 12px;
                z-index: 0;
                /* padding-top: 2%; */
                .ga-layout__body-listItem-content {
                    /* margin: auto; */
                    font-size: 14px;
                    padding: 4px 12px;
                    padding-left:40px;
                    margin-top:12px;
                    > div {
                        margin-bottom: 10px;
                    }
                }
                .ga-layout__body-listItem-time,
                .ga-layout__body-listItem-header,
                .ga-layout__body-listItem-creater {
                    color: #d4b32f;
                }
            }
            @e body-listItem-titleWrap{
                height:42px;
                line-height:42px;
                width:100%;
                background: #11365D;
                cursor: pointer;
            }
            @e body-listItem-title {
                font-size:16px;
                width: 180px;
                margin: 0 auto;
                /* position: absolute;
                top: 2%;
                left: 50%;
                margin-left: -90px; */
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                a {
                    color: #fff;
                }
            }
            @e body-listItem-warning {
                color: #e54545;
                background: url("~assets/images/task/warning.png") no-repeat 0 4px;
                background-size: 1.2em;
                padding-left: 22px;
                height: 28px;
                line-height: 36px;
                position: absolute;
                /* top: 6%; */
                top:7px;
                right: 12%;
                width: 40px;
            }
            .list-enter-active,
            .list-leave-active {
                transition: all .4s;
            }
            .list-enter,
            .list-leave-active {
                opacity: 0;
                /*transform: translateX(20px);*/
            }
        }
    }

    @media only screen and (max-device-width: 1440px) {
        @component-namespace ga {
            @b layout {
                @e body-listItem {
                    font-size:14px;
                    /* font-size: 0.8em; */
                    .ga-layout__body-listItem-content {
                        > div {
                            margin-bottom: 6px;
                        }
                    }
                }
                @e body-listItem-title {
                    width: 130px;
                    /* margin-left: -65px; */
                    /* font-size: 1.2em; */
                    font-size:16px;
                    top: 1.6%;
                }
                @e body-listItem-warning {
                    right: 18px;
                    font-size: 1.2em;
                    padding-left: 26px;
                    height: 22px;
                    line-height: 28px;
                    width: 70px;
                }
            }
        }
    }
</style>

