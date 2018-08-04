import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
    	savePosts: []
    },
    getters: {
    	getSavePostById: (state) => (id) => {
    		return state.savePosts.find(savePost => savePost._id == id)
    	}
    },
    mutations: {
		addPost (state, savePost) {
			state.savePosts.unshift(savePost)
		},
        removePost(state, index) {
            state.savePosts.splice(index, 1)
        }
	}
})