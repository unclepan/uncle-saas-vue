const path = require('path');
const absolutePath = require('./absolute.path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const a = args;
        a[0].title = '你想设置的title名字';
        return a;
      });
  },
  css: {
    sourceMap: true,
  },
  devServer: {
    port: 8989,
    host: 'localhost',
    open: true,
    disableHostCheck: true,
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  configureWebpack: {
    entry: {
      loading: './src/entry/loading/index.js',
      app: './src/entry/main/index.js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        $static: resolve('static'),
        jquery: 'jquery',
        ...absolutePath,
      },
    },
    performance: {
      maxEntrypointSize: 2048000,
      maxAssetSize: 2048000,
    },
  },
};
