const actions = {
	saveLoginInfo ({commit}, payload) {			// 异步 action demo
		let infos = {
			token: payload.token
		}
		commit('SAVE_TOKEN', infos)
	},

	
}

export default actions