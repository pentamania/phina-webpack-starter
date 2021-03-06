const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const package = require('./package.json');
const isProduction = (process.env.NODE_ENV != null && process.env.NODE_ENV.trim() === "production");

/* ビルド設定 */
const buildMode = (isProduction) ? "production" : "development";
const outputDirectory = path.resolve("dist");

/* ローカルサーバー設定 */
const hostIp = '0.0.0.0'; // デフォルトではローカルIPを使用
const portNum = null; // ポート番号
const autoOpenBrowser = true; // ローカルサーバー起動時、ブラウザを開く

/* プラグイン設定 */
const plugins = [

  // dist/index.htmlの生成
  new HtmlWebpackPlugin({
    title: package.title,
    author: package.author,
    template: 'src/index.html',
  }),

  // アプリに環境変数等を渡す
  new webpack.DefinePlugin({
    ENV_IS_DEV: JSON.stringify(!isProduction),
    ENV_APP_VERSION: JSON.stringify(package.version),
  }),
];
if (isProduction) {
  // 出力先clean
  plugins.push(new CleanWebpackPlugin(outputDirectory))
}

module.exports = {
  /* productionにすることでminifyされる */
  mode: buildMode,

  /* メインとなるファイル（エントリーポイント） */
  entry: path.resolve("src", "entry.js"),

  /* ファイルの出力設定 */
  output: {
    // 出力ファイルのディレクトリ名
    path: outputDirectory,
    // 出力ファイル名
    filename: 'bundle.js',
  },

  resolve: {
    /* root扱いにしたいパスを指定 */
    modules: [
      path.resolve("src"),
      "node_modules",
    ],

    /**
     * エイリアス　パスを省略して書きたい場合に利用
     * 例)
     *  import enemy from './src/assets/images/enemy.png';
     *  -> import enemy from '@IMAGES/enemy.png';
     */
    alias: {
      '@ASSETS': path.resolve("src", "assets"),
      '@IMAGES': path.resolve("src", "assets", "images"),
      '@SOUNDS': path.resolve("src", "assets", "sounds"),
    },
  },

  module: {
    rules: [
      {
        /**
         * アセットファイルをrequireした場合、基本はURLパスを返す
         * 出力先： ./dist/assets/ファイル名.拡張子
         */
        test: /\.(png|jpg|jpeg|gif|mp3|wav|ogg|txt|xml)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: 'assets/[name].[ext]?[hash]', // キャッシュ対策のため、ハッシュ値をつける場合
              name: 'assets/[name].[ext]',
            }
          }
        ]
      },
    ]
  },

  /* 開発中のソースマップを有効にする */
  devtool: (isProduction) ? false :'inline-source-map',

  plugins: plugins,

  /* 開発用サーバー設定 */
  devServer: {
    contentBase: outputDirectory, // 出力先と同じであること
    useLocalIp: (hostIp === '0.0.0.0') ? true : false,
    host: hostIp,
    port: portNum,
    open: autoOpenBrowser,
  },

};