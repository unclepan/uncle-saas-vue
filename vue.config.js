const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
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
        a[0].title = '内容管理系统';
        a[0].chunksSortMode = (c1) => (c1.names[0].indexOf('loading') > -1 ? -1 : 1);
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
  configureWebpack: (config) => {
    const base = {
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
    };
    Object.assign(config, base);
    const con = config;
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
      con.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }),
        ],
      };
      Object.assign(config, {
        optimization,
      });
    } else {
      // 为开发环境修改配置
      con.mode = 'development';
    }
  },
};
