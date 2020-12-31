<template >
    <div  class="layui-layout layui-layout-admin" >
        <div class="layui-header header header-demo">
          <div class="layui-main">
            <a class="logo" href="javascript:;">
               <h1><strong>{{title}}</strong>example</h1>
            </a>
          </div>
        </div>
        <div class="layui-side layui-bg-black" >
            <div class="layui-side-scroll">
                <MenuBar></MenuBar>
            </div>
        </div>
        <div class="layui-body site-demo">
            <App-main></App-main>
        </div>
    </div>
</template>

<script>
    import AppMain from './AppMain'
    import MenuBar from './MenuBar'
    export default {
        name: 'layout',
        data () {
            return {
                title: '组件后台测试'
            }
        },
        components: {
            AppMain,
            MenuBar
        }
    }
</script>
<style scoped>
     .logo {
       color: antiquewhite;
       h1 strong {
         font-size: 30px;
         color: darkorange;
       }
     }
     .layui-body.site-demo {
       z-index: 1000;
       padding: 10px !important;
     }
</style>
