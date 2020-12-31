var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000);

io.of('/taskList').on('connection', function (socket) {
    // let handshake = socket.handshake;
    // console.log(handshake)
    console.log('taskList connected')
    socket.emit('open', 'taskList successfully connected!')
    socket.on('dataUpdate', function (obj) {
        console.log(obj);
        setTimeout(() => {
        // setInterval(() => {
            let taskListData = {
                rows: []
            }
            for (let i = 0; i < obj.taskBaseId.length; i++) {
                let count = parseInt(Math.random() * 10 + 1, 10);
                // if (i === count) {
                taskListData.rows.push({
                    taskBaseId: obj.taskBaseId[i],
                    alarmCount: count
                })
                // } else {
                //     taskListData.rows.push({
                //         taskBaseId: obj.taskIdList[i].tid,
                //         count: obj.taskIdList[i].count
                //     })
                // }
            }
            socket.emit('dataUpdate', taskListData)
        }, 3000)
    })
})

io.of('/alarm1').on('connection', function (socket) {
    console.log('task1 connected')

    socket.emit('open', 'alarm1 successfully connected!')
    socket.on('dataUpdate', function (obj) {
        console.log(obj);
        setTimeout(() => {
        // setInterval(() => {
            let count = parseInt(Math.random() * 20 + 1, 10);
            let alarmListData = {
                alarmArea: [
                    {
                        latitude: 38.491,
                        longtitude: 105.24,
                        radius: 10000
                    }
                ],
                alarmMsisdn: [
                    {
                        goalLocations: [
                            {
                                locationCname: '汇民街',
                                latitude: 38.491,
                                longtitude: 105.24,
                                goalArriveTime: '2017-09-03 18:59:48'
                            },
                            {
                                locationCname: '汇民街',
                                latitude: 37.491,
                                longtitude: 105.84,
                                goalArriveTime: '2017-09-03 18:59:48'
                            }
                        ],
                        alarmResultId: 'value',
                        name: '王嘉尔',
                        msisdn: '8618666666666',
                        imei: '32535434525245',
                        imsi: '32535434525245',
                        goalArriveTime: '32535434525245'
                    }
                ],
                eventLabel: 'tarIntoArea',
                alarmCount: count,
                alarmTime: '2017-12-21 12:09:30',
                alarmTaskId: obj.alarmTaskId
            };
            socket.emit('dataUpdate', alarmListData)
        }, 3000)
    })
})
io.of('/alarm2').on('connection', function (socket) {
    console.log('task2 connected')

    socket.emit('open', 'alarm2 successfully connected!')
    socket.on('dataUpdate', function (obj) {
        console.log(obj);
        setTimeout(() => {
        // // setInterval(() => {
            let count = parseInt(Math.random() * 20 + 1, 10);
            let alarmListData = {
                alarmArea: [
                    {
                        latitude: 38.491,
                        longtitude: 105.24,
                        radius: 10000
                    }
                ],
                alarmMsisdn: [
                    {
                        goalLocations: [
                            {
                                locationCname: '汇民街',
                                latitude: 38.491,
                                longtitude: 105.24,
                                goalArriveTime: '2017-09-03 18:59:48'
                            },
                            {
                                locationCname: '汇民街',
                                latitude: 37.491,
                                longtitude: 105.84,
                                goalArriveTime: '2017-09-03 18:59:48'
                            }
                        ],
                        alarmResultId: 'value',
                        name: '王嘉尔',
                        msisdn: '8618666666666',
                        imei: '32535434525245',
                        imsi: '32535434525245',
                        goalArriveTime: '32535434525245'
                    }
                ],
                eventLabel: 'tarIntoArea',
                alarmCount: count,
                alarmTime: '2017-12-21 12:09:30',
                alarmTaskId: obj.alarmTaskId
            };
            socket.emit('dataUpdate', alarmListData)
        }, 3000)
    })
})

