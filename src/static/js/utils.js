/*
 * utils.js工具函数文件
 * 引入方法：import utils from '@/static/js/utils'
 * 使用方法：utils.utilsDemoFunc()
 */ 


import { post } from '@/httpConfig/http'
import { MessageBox } from 'mint-ui'
import Router from '@/router/index'
import global from '@/static/js/global'

const utils = {
	utilsDemoFunc () {				
		console.log('Thanks to use ZXVUE-CLI!');
	},
}

export default utils

