/**
 *  webSocket
 */

const Socket = function() {
    function productionUrl() {
        const realUrl = window.location.href.match(/\:.*\/policeBusiness/)
        const protocol =
            window.location.href.substr(0, 5) === 'https' ? 'wss' : 'ws'
        return protocol + realUrl
    }
    function connect(url) {
        const wsUrl =
            process.env.NODE_ENV === 'production' ? productionUrl() + url : url
        // console.log(wsUrl)
        this.io = new WebSocket(wsUrl)
        this.io.onclose = function(evnt) {
            console.log('websocket service closed ', evnt)
        }
        this.io.onerror = function(evnt) {
            console.log('websocket service error ', evnt)
        }
        return this
    }
    function on(event, callback) {
        if (event === 'open') {
            this.io.onopen = callback
        } else if (event === 'error') {
            this.io.onerror = callback
        } else if (event === 'close') {
            this.io.onclose = callback
        } else if (event === 'message') {
            this.io.onmessage = callback
        }
    }
    function emit(event, value) {
        let obj
        if (typeof value === 'object' && !value.eventLabel) {
            value.eventLabel = event
            obj = JSON.stringify(value)
        } else {
            obj = {
                eventLabel: event,
                data: value
            }
        }
        // console.log(obj)
        this.io.send(obj)
    }
    function disconnect() {
        if (this.io) {
            this.io.close()
        }
    }
    function JSONparse(val) {
        try {
            return JSON.parse(val)
        } catch (e) {
            return val
        }
    }
    this.connect = connect
    this.on = on
    this.emit = emit
    this.disconnect = disconnect
    this.JSONparse = JSONparse
}

export default Socket
