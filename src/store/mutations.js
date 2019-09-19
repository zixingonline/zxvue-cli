const mutations = {
	SAVE_TOKEN (state, payload) {				// 同步 mutations demo
		state.token = payload.token;
	},
}

export default mutations