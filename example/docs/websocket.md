## websocket

## websocket 实例使用说明

``` vue
    import Io from 'utils/websocket'
    ...
    data () {
        return {
            ...
            socket: new Io()
        }
    }
    ...
    ...
    this.socket.connect('ws://...')
    ...
```
1. 实例路径

   utils/websocket.js

2. 实例属性

方法名 | 含义 | 类型 |参数
---|---|---|--
connect | 建立 socket 连接 | function | url
on | 监听事件|function|eventName, callback
emit | 触发事件 |function|eventName, data
disconnect | 关闭 socket 连接  |function| 无
JSONparse| 将数据格式转换为json| function | data
io.readyState| 只读属性 readyState 表示连接状态 | Number | 0/1/2/3


2-1. on 方法参数（事件参数仅支持原生 socket 事件，不支持自定义事件）

参数名 | 含义 | 类型 |
---|---|---|--
open | 连接建立时触发 | String |
message | 客户端接收服务端数据时触发|String|
error | 通信发生错误时触发 |String|
close | 连接关闭时触发  | String | 
callback | 回调函数  | function | 

2-2. emit 方法参数 （支持自定义事件）

参数名 | 含义 | 类型 |
---|---|---|--
eventName | 自定义事件名 | String |
data | 发送给后端的数据  | object/String | 

2-3 io.readyState

值 | 含义 | 
---|---|
0 | 表示连接尚未建立 | 
1 | 表示连接已建立，可以进行通信 |
2 | 表示连接正在进行关闭 |
3 | 表示连接已经关闭或者连接不能打开  | 

```JS

this.socket = io.connect('ws://192.168.3.196:8080/policeBusiness/websocket/tarInAreaAlarmSocket/12');

console.log(this.socket.io.readyState); // 连接中，打印值为 0

this.socket.on('open', () => {
    // 连接建立后触发此事件
    console.log(this.socket.io.readyState); // 连接成功，打印值为 1
    do something...
})

this.socket.on('message', resp => {
    // 接收到推送的数据后触发此事件
    // 对接收到的数据进行转换
    let data = this.socket.JSONparse(resp.data);
    
    do something...
})

this.socket.on('error', () => {
    // 连接出错触发此事件
    do something...
})

this.socket.on('close', () => {
    // 连接断开触发此事件
    do something...
})

// 触发一个自定义事件，给后端传输数据，通过监听 message 事件接收数据
this.socket.emit('some event', data);

this.socket.on('message', resp => {

    // 对接收到的数据进行转换
    let data = this.socket.JSONparse(resp.data);
    // 接收到后端传过来得数据时对数据包得标签进行判断，判断条件为 emit 中的 eventName 
    if (data.eventLabel === 'some event') {
        do something...
    }
})

```

