const getUUID = () => {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    var uuid = s.join('')
    return uuid
}

/**
 * [loading组件]
 * @type {[type]}
 */
export default class Loading {
    constructor({ message = '正在加载...' }) {
        this.message = message
        this.fontSize = 16
        this.type = 3
    }
    // loading动画样式
    loadingType() {
        let tpl = ''
        switch (this.type) {
            case 1:
                tpl = `<div class="self-building-square-spinner">
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square clear"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                            <div class="square clear"></div>
                            <div class="square"></div>
                            <div class="square"></div>
                        </div>`
                break
            case 2:
                tpl = `<div class="df-loading__spinner">
                </div>`
                break
            case 3:
                tpl = `<div class="atom-spinner">
                            <div class="spinner-inner">
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <!--Chrome renders little circles malformed :(-->
                            <div class="spinner-circle">
                                &#9679;
                            </div>
                            </div>
                        </div>`
                break
            default:
                break
        }
        return tpl
    }
    createTmpl() {
        let loadtpl = this.loadingType()
        return `<div class="df-loading">
                    <div class="df-loading__inner">
                        ${loadtpl}
                        <div class="df-loading__text" style="font-size: ${this.fontSize}px">${
            this.message
        }</div>
                    </div>
                </div>`
    }
    // mounted
    mount() {
        let html = this.createTmpl()
        let wrapper = document.createElement('div')
        wrapper.className = 'df-loading__wrapper'
        wrapper.id = `loading${getUUID()}`
        wrapper.innerHTML = html
        document.body.appendChild(wrapper)
    }
    open(msg, type) {
        this.message = msg
        if (type) this.type = type
        this.mount()
    }
    // destory
    close() {
        if (!document.querySelector(`.df-loading__wrapper`)) return
        let nodes = document.querySelectorAll(`.df-loading__wrapper`)
        if (nodes && nodes.length) {
            nodes.forEach(n => {
                document.body.removeChild(n)
            })
        }
    }
}
