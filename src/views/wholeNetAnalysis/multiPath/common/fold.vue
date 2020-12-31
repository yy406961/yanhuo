<template>
    <div style="width: 100%;height: 100%">
        <div class="fold-wrap">
            <div class="fold-wrap__head">
                <span>{{option.title}}</span>
                <i @click="foldFun" :class="['fold-wrap__head--icon', 'fa', isFold ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
            </div>
            <div class="fold-wrap__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fold',
    props: ['option'],
    data () {
        return {
            isFold: false
        }
    },
    methods: {
        foldFun () {
            this.isFold = !this.isFold
            // let tab = $('.fold-wrap__content');
            // if (this.isFold) {
            //     tab.hide()
            // } else {
            //     tab.show()
            // }
            this.$emit('foldClick', this.isFold)
        }
    }
}
</script>

<style lang="postcss" scoped>
    @component-namespace fold {
        @b wrap {
            width: 100%;
            height: 100%;
            @e head {
                height: 30px;
                line-height: 30px;
                background-color: #124574;
                color: #fff;
                padding-left: 10px;
                @m icon {
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    font-size: 15px;
                    font-weight:normal;
                    color: #fff;
                    // &::after {
                    //     content: '\009B'
                    // }
                }
            }
            @e content {
                height: calc(100% - 30px);
                background-color: rgba(0,0,0,0.7);
            }
        }
    }
</style>
