<template>
    <div class="titleBox">
        <span class="titlcCircle"></span>
        {{ titleName }}
    </div>
</template>
<script>
export default {
    props: ['title', 'option'],
    data() {
        return {
            domain: ''
        }
    },
    computed: {
        titleName() {
            return this.domain === '' ? this.title : `${this.title} (${this.domain})`
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
    /* color: #rgba(255, 255, 255, 0.9); */
    color: #9af5f6;
    font-size: 14px;
    font-weight: 500;
}
.titlcCircle {
    width: 10px;
    height: 10px;
    display: inline-block;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#6a5df8), to(#55f2fc));
    margin-right: 6px;
}
</style>
