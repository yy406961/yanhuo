<template>
	<div class="ga-square" :style="squareStyle">
        <div class="ga-square__titleBox">
            <div class="ga-square__titleBox--line"></div>
            <span>{{title}}</span>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        computed: {
            squareStyle () {
                if (this.minHeight) {
                    return {
                        minHeight: this.minHeight + 'px'
                    }
                } else {
                    return {
                        minHeight: '360px'
                    }
                }
            }
        },
        props: ['title', 'minHeight']
    }
</script>
<style scoped>
    @component-namespace ga {
        @b square {
            min-height: 360px;
            margin-top: 10px;
            padding: 20px;
            border: 1px solid #006aa4;
            position: relative;
            @e titleBox {
                position: absolute;
                top: -17px;
                left: 50px;
                font-size: 16px;
                color: #fff;
                span {
                    background: rgba(16,42,74,1);
                }
                &:before {
                    content: '';
                    width: 5px;
                    height: 5px;
                    background: #ddb93a;
                    border-radius: 50%;
                    display: inline-block;
                    top: 14px;
                    position: absolute;
                    left: -20px;
                };
                &:after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    background: #ddb93a;
                    border-radius: 50%;
                    display: inline-block;
                    top: 14px;
                    position: absolute;
                    right: -20px;
                };
                @m line {
                    width: 100%;
                    position: absolute;
                    /* top: 16px; */
                    top: 50%;
                    height: 1px;
                    z-index: 13;
                    &:before {
                        content: '';
                        width: 15px;
                        background: rgba(16,42,74,1);
                        position: absolute;
                        height: 1px;
                        left: -15px;
                    };
                    &:after {
                        content: '';
                        width: 15px;
                        background: rgba(16,42,74,1);
                        position: absolute;
                        height: 1px;
                        right: -15px;
                    };
                }
            }
        }
    }
</style>
