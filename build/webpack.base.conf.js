var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getEntry(){
    let obj = {}
    let bizPage = process.env.NODE_ENV === 'production'
        ? config.build.bizPage
        : config.dev.bizPage
    bizPage.forEach(it => {
        let path = '';
        if(it.entry === 'app'){
            path = './src/main.js'
        }else if(it.entry === 'demo'){
            path = './example/index.js';
        }else {
            path = './src/bizPages' + it.template +'.js';
        }
        obj[it.entry] = path
    })
    return obj;
}

module.exports = {
    entry:getEntry(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    externals: {
        jquery: 'jQuery',
        moment:'moment',
        BMap: 'BMap',
        BMapLib: 'BMapLib'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'example':resolve('example'),
          'components':'@/components',
          'common':'@/common',
          'router':'@/router',
          'store':'@/store',
          'api': '@/api',
          'assets':'@/assets',
          'constant':'@/constant',
          'views':'@/views',
          'utils':'@/utils'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                  formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp3)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
