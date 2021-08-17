import axios from "axios"
const state = () => ({
	all: [],
	page: 1,
	favourites: [],
})

const getters = {
	isFavourites: (state) => (productId) => {
		return state.favourites.find((product) => product.id === productId)
	},
	allNames: (state) => {
		return state.all.map((obj) => obj.name)
	},
}

const actions = {
	getProducts({ state, commit }) {
		axios
			.get(`https://api.punkapi.com/v2/beers?page=${state.page}&per_page=9`)
			.then((response) => {
				commit("increasePage")
				commit("increaseItems", response.data)
			})
			.catch((error) => console.log(error))
	},
	addToFavourites({ commit }, product) {
		commit("addToFavourites", product)
	},
	removeFromFavourites({ commit }, productId) {
		commit("removeFromFavourites", productId)
	},
	searchByName({ commit }, input) {
		axios
			.get(`https://api.punkapi.com/v2/beers?beer_name=${input}`)
			.then((response) => {
				commit("searchByName", response.data)
			})
	},
}

const mutations = {
	increasePage(state) {
		state.page++
	},
	increaseItems(state, data) {
		state.all = [...state.all, ...data]
	},
	addToFavourites(state, product) {
		state.favourites.push(product)
	},
	removeFromFavourites(state, productId) {
		state.favourites = state.favourites.filter(
			(product) => product.id !== productId
		)
	},
	searchByName(state, data) {
		state.all = data
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
