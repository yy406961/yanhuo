<template>
    <ul class="layui-nav layui-nav-tree site-demo-nav">
        <li class="layui-nav-item" :class="{'layui-nav-itemed': m1.current}" v-for="m1 in listData" @click="m1.current = !m1.current">
          <a class="javascript:;" href="javascript:;">{{m1.name}}<span class="layui-nav-more"></span></a>
          <dl class="layui-nav-child" v-if="m1.children && m1.children.length > 0">
            <dd :class="{'layui-this': m2.current}" v-for="m2 in m1.children" @click="setCurrentMenu(m2, $event)">
                <router-link v-if="m2.param && m2.param.length > 0" :to="{name:m2.name,'path':m2.path,'params':{url:m2.param}}">{{m2.name}}</router-link>
                <router-link :to="m2.path" v-else>{{m2.name}}</router-link>
            </dd>
          </dl>
        </li>
        <li class="layui-nav-item" style="height: 30px; text-align: center"></li>
        <span class="layui-nav-bar" style="top: 472.5px; height: 0px; opacity: 0;"></span>
    </ul>
</template>
<script>
    import { menuData } from '../../menu'
    export default {
        name: 'Menubar',
        data() {
            return {
                listData: menuData,
                prevMenu: null
            }
        },
        mounted() {
        },
        methods: {
            setCurrentMenu(menu, evt) {
                const me = this;
                if (evt) evt.stopPropagation();
                if (me.prevMenu)me.$set(me.prevMenu, 'current', false);
                me.$set(menu, 'current', true);
                me.prevMenu = menu;
            }
        }
    }
</script>

<style  scoped>
</style>
