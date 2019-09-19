import Vue from 'vue'
import VueRouter from 'vue-router'

	// 正常路由配置
import Index from '@/views/Index'	
		
Vue.use(VueRouter)
export default new VueRouter({
	routes: [
		{		
			path: "/",
			name: "index",
			component: Index,
			// meta: { requireAuth: true },			// 路由原信息，做权限校验		
		},
	]
})


	// 懒加载路由配置（无需使用 import 提前引入组件）(组件打包成多个文件，而不是默认的一次性打包进去app.bundle.js里面，首屏加载速度更快)
// Vue.use(VueRouter)
// export default new VueRouter({
// 	routes: [
// 		{		
// 			path: "/copys",
// 			name: "copys",
// 			component: resolve => require(['@/views/Index'], resolve),
// 		},
// 	]
// })

