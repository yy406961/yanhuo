import Io from 'socket.io-client'

const Socket = function (io) {
    this.io = io;
    function connect (url) {
        this.socket = this.io.connect(url);
    }
    function on (event, callback) {
        this.socket.on(event, callback);
    }
    function emit (event, value) {
        function parseVal (val) {
            try {
                return JSON.parse(val);
            } catch (e) {
                return val;
            }
        }
        const obj = typeof value === 'object'
                        ? value : parseVal(value);
        this.socket.emit(event, obj);
    }
    function disconnect () {
        this.socket.disconnect()
    }
    this.connect = connect;
    this.disconnect = disconnect;
    this.on = on;
    this.emit = emit;
}

export default new Socket(Io);

