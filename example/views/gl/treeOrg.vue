<template lang="html">
      <div id="c1">

      </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'treeOrg',
    data () {
        return {

        }
    },
    mounted () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            let resp = await axios.get('/example/static/mock/tree.json')
            this.init(resp.data)
        },

        init (data) {
            var tree = new G6.Tree({
                id: 'c1',            // 容器ID
                height: 600,         // 画布高
                fitView: 'autoZoom', // 自动缩放
                layoutFn: G6.Layout.CompactBoxTree,
                layoutCfg: {
                    direction: 'TB', // 方向（LR/RL/H/TB/BT/V）
                    getHGap: function (/* d */) { // 横向间距
                        return 20;
                    },
                    getVGap: function (/* d */) { // 竖向间距
                        return 100;
                    }
                }
            });

            // 注册节点
            // G6.registNode('photoImage', {
            //     draw: function (cfg, group) {
            //         var imageShape = group.addShape('image', {
            //             attrs: {
            //                 x: 100,
            //                 y: 100,
            //                 size: [100, 130],
            //                 shape: 'http://localhost:8111/exmaple/static/images/user.png'
            //             }
            //         });
            //         return imageShape;
            //     },
            //     // 设置锚点
            //     getAnchorPoints: function () {
            //         return [
            //             [1, 0.5], // 右边边的中点
            //             [0, 0.5] // 左边边的中点
            //         ];
            //     }
            // });

            tree.source(data);
            tree.node()
                  .label(function (obj) {
                      return obj.name;
                  })
                  .style({
                      fillOpacity: 1
                  })
            tree.edge().shape('smooth');
            tree.render();

            // 事件注册
            tree.on('itemhover', (ev) => {
                console.log(ev)
            });
        }
    }
}
</script>

<style lang="css">
</style>
