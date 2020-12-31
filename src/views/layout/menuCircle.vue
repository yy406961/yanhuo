<template>
    <div class="menu">
        <div class="menuIcon">
            <div class="menuDisplay menuIcon" @click="menuShow" v-show="menuDisplayShow"></div>
        </div>
        <div class="menuBoxBG" :style="menuBoxHeight"></div>
        <div class="menuBox" :style="menuBoxHeight">
            <!-- <div class="menuOneBoxCenter">
                <div class="menu-arc" :style="menuCenterBGRotate"></div>
                <div class="menu-centerBG" :style="menuCenterBGRotate"></div>
            </div> -->
            <!-- <div class="menuOneBox" :style="menuOneBoxRotate">
                <div v-for="(item, index) in mlist" class="menuOneItem" :class="[oneItemIndex === index? 'menuOneItemActive': '']" @click="menuOneClick(menuOneArr[index], index)" :style="oneItemRotate(index)">
                    <div class="menuOneItemChild" :style="oneItemChildRotate(index)" style="transition: all 1s">
                        <div class="oneItemChild-img" :class="item.image"></div>
                        <div class="oneItemChild-text">{{item.name}}</div>
                    </div>
                </div>
            </div> -->
            <div class="menuSecondBox" :class="[msAnimation ? 'menuSecondBoxAnimation': '']">
                <!-- <div class="menuSecondLine">
                    <div class="menuSLineCenter"></div>
                    <div class="menuSLineRight" :style="menuSLineHeight"></div>
                </div> -->
                <div class="menuSecondItems" ref="menuSecond" :style="menuSecondTranslate">
                    <div v-for="item in menuSecondData" class="menuSecondItem" @click="menuSecondClick(item.path,item.id)">
                        <!-- <div class="menuSecondItem-left"></div> -->
                        <div class="menuSecondItem-right">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="menuHidden menuIcon" @click="menuHidden" v-show="menuHiddenShow"></div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { getMenuList } from 'api/login'
    import { storage } from 'common'
    import { routerMenuConfig } from 'router/router.config'
    export default {
        data () {
            return {
                APP_CONFIG: {
                    designWidth: 640,
                    base: 32
                },
                menuBoxRotateIndex: 0,
                oneItemIndex: 0,
                menuSecondHeight: '',
                fontSize: '',
                menuDisplayShow: true,
                menuIsShow: false,
                menuSecondW: 1,
                msAnimation: true,
                menuHiddenShow: true,
                overIndex: 0,
                init: true,
                oneMenuCenterRotate: 0,
                menu: []
            }
        },
        created () {
            this.menu = routerMenuConfig.map(item => {
                return item.path
            })
        },
        mounted () {
            this.root = document.documentElement
            this.initResize()
            window.addEventListener('resize', this.initResize, false)
            this.getMenuSecondHeight()
            if (localStorage.menuList !== undefined) {
                JSON.parse(localStorage.menuList).map((item) => {
                    this.mlist.push(item)
                })
            } else {
                this.saveMenuList()
            }
        },
        watch: {
            mlist: {
                deep: true,
                handler () {
                    this.getMenuSecondHeight()
                }
            }
        },
        computed: {
            ...mapGetters({
                'mlist': 'global/menuList'
            }),
            menuSecondData () {
                if (this.mlist && this.mlist.length) {
                    // return this.mlist[this.oneItemIndex].child
                    // 仅显示系统管理中的页面
                    return this.mlist[4].child
                }
            },
            menuBoxHeight () {
                let left
                if (this.menuIsShow) {
                    left = '0'
                } else {
                    left = '-100%'
                }
                return {
                    top: 63 + 'px',
                    height: window.innerHeight - 70 + 'px',
                    left: left
                }
            },

            menuOneBoxRotate () {
                return {
                    transform: `translateY(-3rem) rotate(${this.menuBoxRotateIndex * 72}deg)`
                }
            },
            menuCenterBGRotate () {
                const me = this
                const arr1 = [0, 1, 2, 3, 4]
                let arr2 = []
                arr2 = arr1.slice(arr1.indexOf(me.overIndex)).concat(arr1.slice(0, arr1.indexOf(me.overIndex)))
                arr2 = arr2.slice(3)
                if (arr2.indexOf(me.oneItemIndex) !== -1) {
                    me.oneMenuCenterRotate += 72
                } else {
                    me.oneMenuCenterRotate -= 72
                }
                return {
                    transform: `rotate(${me.oneMenuCenterRotate}deg)`
                }
            },
            menuOneArr () {
                const arr = []
                for (let i = 0; i < 5; i++) {
                    let num = i - this.oneItemIndex
                    if (num < 0) num = 5 - Math.abs(num)
                    arr.push(num)
                }
                return arr
            },
            menuSecondTranslate () {
                return {
                    transform: `translateY(${-this.menuSecondHeight / 2}px)`
                }
            },
            menuSLineHeight () {
                const height = this.menuSecondHeight - parseInt(parseInt(this.fontSize, 0) * 0.7, 0)
                return {
                    height: `${height}px`,
                    transform: `translateY(${-height / 2}px)`
                }
            }
        },
        methods: {
            menuShow () {
                this.menuDisplayShow = false
                this.menuIsShow = true
                this.menuHiddenShow = true
            },
            menuHidden () {
                this.menuDisplayShow = true
                this.menuIsShow = false
                this.menuHiddenShow = false
            },
            initResize () {
                const w = this.APP_CONFIG.designWidth
                const b = this.APP_CONFIG.base
                this.root.style.fontSize = this.root.getBoundingClientRect().width / w * b + 'px'
                this.fontSize = this.root.style.fontSize
            },
            oneItemRotate (index) {
                return {
                    transform: `rotate(${-72 * index}deg)`
                }
            },
            oneItemChildRotate (index) {
                return {
                    transform: `rotate(${72 * (index - this.oneItemIndex)}deg)`
                }
            },
            menuOneClick (arrIndex, index) {
                this.overIndex = this.menuBoxRotateIndex % 5
                this.oneItemIndex = index
                this.menuBoxRotateIndex += arrIndex
                this.getMenuSecondHeight()
                this.menuSecondW = 0
            },
            menuSecondClick (path, id) {
                // if (!this.menu.includes(path.replace(/[\r\n]/g, ''))) {
                //     this.$message.error('您访问的页面不存在！')
                //     return
                // }
                if (this.controlModule(id)) {
                    return
                } else {
                    if (path) {
                        this.$router.push({ path })
                        this.menuHidden()
                    }
                }
            },
            getMenuSecondHeight () {
                this.msAnimation = false
                this.$nextTick(() => {
                    this.menuSecondHeight = this.$refs.menuSecond.clientHeight
                    this.msAnimation = true
                })
            },
            // 控制模块执行问题
            controlModule (id) {
                const whiteMenu = []
                return whiteMenu.includes(id)
            },
            async saveMenuList () {
                let resp = await getMenuList();
                storage.local.set('menuList', resp.rows)
                this.fetchMenuList(resp.rows);
            },
            ...mapActions({
                'fetchMenuList': 'global/fetchMenuList'
            })
        }
    }
</script>
<style scoped>
    .menu{
        position:absolute;
        z-index: 9999;
    }
    .menuIcon{
        position: fixed;
        height: 2rem;
        width: 0.4rem;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 50%;
        transform: translateY(-1rem);
    }
    .menuDisplay{
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("~assets/menu/1.png");
        background-size: 100% 100%;
        transform: translateY(-12px);
        cursor: pointer;
    }
    .menuBoxBG{
        background-image: url("~assets/menu/bg.png");
        width: 5rem;
        position: fixed;
        overflow: hidden;
        left: -100%;
        top: 0;
        opacity: 0.95;
        transition: all 0.3s;
    }
    .menuBox{
        width: 5rem;
        position: fixed;
        overflow: hidden;
        left: -100%;
        top: 0;
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, 0);
    }
    .menuOneBox{
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 2rem;
        top: 50%;
        border: 1px #ccc dashed;
        transition: all 1s;
        border-radius: 50%;
        background-size: 40% 40%;
    }
    .menuOneBoxCenter{
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 2rem;
        top: 50%;
        border-radius: 50%;
        transform: translateY(-3rem);
    }
    .menu-arc{
        width: 3rem;
        height: 3rem;
        position: absolute;
        left: 25%;
        top: 25%;
        border: 2px rgb(0, 187, 236) solid;
        border-radius: 50%;
        clip:rect(0.6rem, 3rem, 2.4rem, 1.5rem);
        transition: all 1s;
    }
    .menu-centerBG{
        width: 3rem;
        height: 3rem;
        position: absolute;
        left: 25%;
        top: 25%;
        border-radius: 50%;
        background-image: url("~assets/menu/img1.png");
        background-size:80% 80%;
        background-position: center center;
        background-repeat: no-repeat;
        transition: all 1s;
    }
    .menuOneItem{
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 5rem;
        top: 2rem;
        border-radius: 50%;
        transform-origin: -2rem 1rem;
        cursor: pointer;
        background-image: url("~assets/menu/itemBG.png");
        background-size: 100% 100%;
        transition: background-image 1s;
    }
    .menuOneItemActive{
        background-image: url("~assets/menu/itemActiveBG.png");
    }
    .menuOneItemChild{
        width: 100%;
        height: 100%;
    }
    .oneItemChild-img{
        width: 100%;
        height: 1.3rem;
        background-position: 50% 80%;
        background-repeat: no-repeat;
    }
    .oneItemChild-text{
        width: 100%;
        height: 0.7rem;
        text-align: center;
        color: rgb(88, 213, 243);
    }
    .menuSecondBox{
        position: absolute;
        left: -0.4rem;
        top: 50%;
        height:10rem;
        transform: translateY(-5rem);
        transition: all 1s;
        overflow: hidden;
        width: 5rem;
    }
    .menuSecondBoxAnimation{
        animation: menuSecondBox 0s linear;
    }
    .menuSecondLine{
        width: 1.2rem;
        height: 10rem;
        position: relative;
    }
    .menuSLineCenter{
        position: absolute;
        left: 0;
        top: 50%;
        height: 1px;
        width: 1.2rem;
        background-color: rgb(26, 73, 145);
    }
    .menuSLineRight{
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        background-color: rgb(26, 73, 145);
    }
    .menuSecondItems{
        width: 4.2rem;
        position: absolute;
        top: 50%;
        left: 1.2rem;
    }
    .menuSecondItem{
        width: 4.2rem;
        height: .7rem;
        margin-bottom: 0.25rem;
        cursor: pointer;
    }
    .menuSecondItem:last-child{
        margin-bottom: 0;
    }
    .menuSecondItem-left{
        width: 0.75rem;
        height: .7rem;
        background-image: url("~assets/menu/img2.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 80%;
        float: left;
    }
    .menuSecondItem-right{
        margin-left: 0rem;
        width: 3.2rem;
        height: .7rem;
        background-image: url("~assets/menu/img3.png");
        background-repeat: no-repeat;
        background-position: left center;
        float: left;
        text-align: center;
        line-height: .7rem;
        color: #fff;
        font-size: 1em;
        background-size: 100% 100%;
    }
    .menuHidden{
        width: .6rem;
        height: .6rem;
        top: 50%;
        transform: translate(-0.5rem);
        background-image: url("~assets/menu/img5.png");
        background-size: 100% 100%;
        background-color: rgba(0,0,0,0);
        position: absolute;
        left: 5rem;
        cursor: pointer;
    }
    .menuOneItem1{
        background-image: url("~assets/menu/item1.png");
    }
    .menuOneItem2{
        background-image: url("~assets/menu/item2.png");
    }
    .menuOneItem3{
        background-image: url("~assets/menu/item3.png");
    }
    .menuOneItem4{
        background-image: url("~assets/menu/item4.png");
    }
    .menuOneItem5{
        background-image: url("~assets/menu/item5.png");
    }
    @-webkit-keyframes menuSecondBox {
        0% {
            width: 5rem
        }
        30% {
            width: 0
        }
        100% {
            width: 5rem
        }
    }
</style>
