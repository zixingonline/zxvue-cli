// process.env.NODE_ENV = 'production'
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');			// 清空文件夹插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');		// css压缩


module.exports = merge(baseConfig, {
	plugins: [
		new CleanWebpackPlugin(),		// 清理dist文件夹
		new OptimizeCSSAssetsPlugin(),
	]
})

