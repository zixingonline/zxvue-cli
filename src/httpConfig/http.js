import axios from 'axios'
import qs from 'qs'
import GLOBAL from '@/static/js/global'				// 引入全局变量配置文件
import Router from '@/router/index'					// 引入路由对象
import utils from '@/static/js/utils'				// 引入工具对象
import { MessageBox, Indicator } from 'mint-ui';

let baseUrl = GLOBAL.REQUEST_URL;


	// axios默认配置
axios.defaults.timeout = 10*1000;   // 超时时间
axios.defaults.baseURL = baseUrl;  // 默认地址
// axios.defaults.withCredentials=true;


const ls = window.localStorage;
	//添加请求拦截器
axios.interceptors.request.use((config) => {
	if (!config.headers['Content-Type']) {
		// Request 拦截器代码start
		// ...
		// Request 拦截器代码end

		config.data = qs.stringify(config.data);
		config.headers = {
	      	'Content-Type':'application/x-www-form-urlencoded'
	    }
    };

	Indicator.open({
		spinnerType: 'fading-circle'
	});

	return config;
}, function(error){
	Indicator.close();
	return Promise.reject(error);
});

	//添加响应拦截器
axios.interceptors.response.use((response) => {
	Indicator.close();

	// Response 拦截器代码start
	// ...
	// Response 拦截器代码end

	return response.data;
}, function(err){
	Indicator.close();
	if (err && err.response) {
        switch (err.response.status) {
            case 400:
            err.message = '请求错误'
            break
    
            case 401:
            err.message = '未授权，请登录'
            break
    
            case 403:
            err.message = '拒绝访问'
            break
    
            case 404:
            err.message = `请求地址出错: ${err.response.config.url}`
            break
    
            case 408:
            err.message = '请求超时'
            break
    
            case 500:
            err.message = '服务器内部错误'
            break
    
            case 501:
            err.message = '服务未实现'
            break
    
            case 502:
            err.message = '网关错误'
            break
    
            case 503:
            err.message = '服务不可用'
            break
    
            case 504:
            err.message = '网关超时'
            break
    
            case 505:
            err.message = 'HTTP版本不受支持'
            break
    
            default:
        }
    }
	return Promise.reject(err);
});

export function post(url,data = {}){				// 重写 POST 方法
   	return new Promise((resolve,reject) => {
     	axios.post(url, data)
		.then(response => {
			resolve(response);
		},err => {
			// reject(err)
			MessageBox({
				title: "提示",
				message: err.message
			})
		})
   	})
}
