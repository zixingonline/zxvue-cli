const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 				// 打包关联html文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");		// css提取到一个文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');		// css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;		// 图片压缩工具
const VueLoaderPlugin = require('vue-loader/lib/plugin')



module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: process.env.NODE_ENV === 'production' ? 'static/js/bundle.[chunkhash].js' : 'static/js/bundle.js',
		chunkFilename: process.env.NODE_ENV === 'production' ? 'static/js/[name].[chunkhash].js' : 'static/js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/, 
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: './static/image/[name].[hash:7].[ext]',
					}
				}]
			},{
				test: /\.html$/, 
				use: [{
		            loader: "html-loader",
		            options: { minimize: false }
		    	}]
			},{
		        test: /\.css$/,
		        use: [
		        	{
					    loader: MiniCssExtractPlugin.loader,
					    options: {
					      	publicPath: '../../' 
					    }
					},
		        	"css-loader"
		        ]
		  	},{
	            test: /\.less$/,
	            use: [
					{
					    loader: MiniCssExtractPlugin.loader,
					    options: {
					      	publicPath: '../../' 
					    }
					},
					'css-loader',
					'less-loader'
		        ],
	        },{
		  		test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
		  		loader: 'url-loader',
		  		options: {
				    limit: 10000,
				    name: 'static/fonts/[name].[hash:8].[ext]',
				}
		  	}, {
				test:/\.js$/,
				exclude:/node_modules/,
				use:'babel-loader'
		    }, {
		        test: /\.vue$/,
		        loader: 'vue-loader'
	      	}
		]
	},
	plugins: [
		new VueLoaderPlugin(),

		new ImageminPlugin({									// 图片压缩
	      	disable: process.env.NODE_ENV !== 'production',
	      	pngquant: {//图片质量
	        	quality: '95-100'
	      	}
	    }),

		new MiniCssExtractPlugin({								// 提取CSS到单独的css文件
			filename: './static/css/[name].[hash:8].css',
	    }),

		new HtmlWebpackPlugin({	
    	 	filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
        }),
	],

	resolve:{
        //引入路径是不用写对应的后缀名
        extensions: ['.js', '.vue', '.json'],
        //缩写扩展
        alias:{
            //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
            '@': path.resolve(__dirname,'./src'),
            'vue$':'vue/dist/vue.esm.js',	// 解决webpack渲染.vue文件报错的Runtime版本
        }
    },

    // externals: {		// 如果使用CDN引入js文件就放开注释
    // 	'vue': 'Vue',
    // 	'vue-router': 'VueRouter',
    // },

    optimization: {
    	// minimize: process.env.NODE_ENV === 'production' ? true : false,		// 兼容IOS10版本在混淆压缩下的白屏问题--“参数与方法不能同名（如 e (e) {}）”
    	minimizer: [
			new UglifyJsPlugin({
			    sourceMap: process.env.NODE_ENV === "development",
			    parallel: 4,
			    uglifyOptions: {
			        keep_classnames: true,
			        keep_fnames: true
			    }
			})
    	],
	    splitChunks: {
	        cacheGroups: {
	            vendor:{				
	                chunks:"initial",
	                test: /[\\/]node_modules[\\/]/,
	                name:"vendor",
	                minChunks: 1, 			
	                maxInitialRequests: 5,
	                minSize: 0,
	                priority:100,
	                maxAsyncRequests: 3,
	                // enforce: true?
	            },
	            common: {				
	                chunks:"all",
	                test:/[\\/]src[\\/]static[\\/]js[\\/]/,		
	                name: "common", 				
	                minChunks: 1,
	                maxInitialRequests: 5,
	                minSize: 0,
	                priority:1
	            }
	        }
	    },
		runtimeChunk: {
		  	name: 'manifest'
		}
	},
}


