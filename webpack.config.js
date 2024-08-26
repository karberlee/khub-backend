const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = {
  target: 'node', // 生成适用于 Node.js 环境的代码。排除 Node.js 内置模块和 node_modules 目录中的模块
  mode: 'production', // 生产模式，开启各种优化功能以减少生成的文件体积，提高性能，进行代码压缩、删除未使用的代码、优化构建
  entry: { // 入口文件，通常是启动文件
    app: path.resolve(__dirname, 'src', 'main.ts')
  },
  output: { // 配置输出文件名和路径
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()], // 排除 Node.js 内置模块和 node_modules 中的模块，减小打包体积
  module: {
    rules: [
      { // 使用 ts-loader 处理 TypeScript 文件
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { // 设置 Webpack 解析文件扩展名
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ // 让 Webpack 读取 tsconfig.build.json 并应用路径别名配置
        configFile: path.resolve(__dirname, 'tsconfig.build.json')
      })
    ]
  },
  plugins: [ // plugins 使用各种插件来扩展 Webpack 的功能
    new CopyWebpackPlugin({ // CopyWebpackPlugin 插件用于将文件和目录从源位置复制到输出目录
      patterns: [
        { from: './package.json', to: 'package.json' },
      ]
    }),
    new CleanWebpackPlugin() // CleanWebpackPlugin 插件在每次构建之前清理（删除）输出目录中的旧文件，避免旧文件干扰新的构建结果
  ],
}