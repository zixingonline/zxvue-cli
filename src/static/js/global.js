/*
 *	全局变量配置文件
 *	入口文件中已添加到 Vue的原型中 （Vue.prototype.GLOBAL = global）
 *	vue文件中使用 this.GLOBAL.REQUEST_UR 获取参数
 */

let REQUEST_URL;
if (process.env.NODE_ENV === 'production') {		// 生产环境配置
	REQUEST_URL = '';
} else {											// 开发环境配置
	REQUEST_URL = '';
}

export default {
	REQUEST_URL,
}
