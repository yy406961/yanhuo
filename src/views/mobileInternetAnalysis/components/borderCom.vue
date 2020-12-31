<template>
    <div class="titleBox">
        <p class="title" v-text="titleName"></p>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'option'],
    data() {
        return {
        }
    },
    computed: {
        titleName() {
            return this.title
        }
    },
    watch: {
        'option.domain'(domain) {
            this.domain = domain
        }
    }
}
</script>
<style scoped>
.titleBox {
    width:100%;
    border:1px solid rgba(60,164,255,0.2);
    /* color: #9af5f6; */
    color:rgba(162,238,255,1);
    font-size: 14px;
    /* font-weight: 500; */
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
}
.title {
    width: 100%;
    height: 28px;
    line-height:28px;
    padding: 0 10px;
    background: rgba(27,117,184,0.20);
    box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.10);
    /* background: -webkit-gradient(linear, 0 0, 0 bottom, from(#6a5df8), to(#55f2fc)); */
    /* margin-right: 6px; */
}
.content{
    padding:0 10px;
}
</style>
