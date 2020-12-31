var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * [getMultiHtmlWebpack 构建多个业务界面 创建HtmlWebpackPlugin]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.getMultiHtmlWebpack = function(){
    var path = process.env.NODE_ENV === 'production' ? config.build.staticPath : config.dev.staticPath;
    var data = process.env.NODE_ENV === 'production' ? config.build.bizPage : config.dev.bizPage;
    var plugins = [];
    if(data){
        data.forEach(it =>{
            var entry ;
            var name ;
            var template;
            if(it.entry === 'app'){
                name =  config.build.index;
                template = it.template;
            }else if(it.entry === 'demo'){
                template = 'example/' + it.template;
            }else {
                template = './src/bizPages' + it.template;
            }
            template += '.html';
            name = it.pageName + '.html';
            entry = it.entry;

            var conf = {
              filename: name,
              template: template,
              inject: true,
              chunks: [entry],
              path:path
            }

            if(process.env.NODE_ENV === 'production'){
                conf.minify =  {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true
                }
                conf.chunks = [entry,'vendor','manifest'];
                conf.chunksSortMode = 'dependency'
            }
            plugins.push(new HtmlWebpackPlugin(conf))
        })
    }

    return plugins;
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
