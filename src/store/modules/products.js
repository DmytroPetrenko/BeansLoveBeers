import axios from "axios"
const state = () => ({
	all: [],
	foundProducts: [],
	forShow: [],
	page: 1,
	favourites: [],
	isLastResponse: false,
	perPage: 24,
	mode: "all",
})

const getters = {
	isFavourites: (state) => (productId) => {
		return state.favourites.find((product) => product.id === productId)
	},
}

const actions = {
	async axiosGetProducts({ state, commit }) {
		try {
			const response = await axios.get(
				`https://api.punkapi.com/v2/beers?page=${state.page}&per_page=${state.perPage}`
			)
			if (response.data.length < state.perPage) {
				commit("setIsLastResponse", true)
			}
			commit("increasePage")
			commit("increaseItems", response.data)
		} catch (error) {
			console.log(error)
		}
	},
	initLocalStorage({ state }) {
		window.localStorage.setItem(
			"productsId",
			JSON.stringify(state.favourites.map((item) => item.id))
		)
	},
	addToFavourites({ commit, dispatch }, product) {
		commit("addToFavouritesArray", product)
		dispatch("initLocalStorage")
	},
	removeFromFavourites({ commit, dispatch }, productId) {
		commit("removeFromFavouritesArray", productId)
		dispatch("initLocalStorage")
	},
	async axiosGetByName({ commit }, input) {
		try {
			const response = await axios.get(
				`https://api.punkapi.com/v2/beers?beer_name=${input}`
			)
			commit("setIsLastResponse", false)
			commit("searchByName", response.data)
		} catch (error) {
			console.log(error)
		}
	},
	changeMode({ commit }, mode) {
		commit("changeForShowValue", mode)
	},
	async getFromLocalStorage({ commit }) {
		const productsId = JSON.parse(window.localStorage.getItem("productsId"))
		if (productsId) {
			try {
				for (const id of productsId) {
					const response = await axios.get(
						`https://api.punkapi.com/v2/beers/${id}`
					)
					commit("addToFavouritesArray", response.data[0])
				}
			} catch (error) {
				console.log(error)
			}
		}
	},
}

const mutations = {
	increasePage(state) {
		state.page++
	},
	increaseItems(state, data) {
		state.all = [...state.all, ...data]
		if (state.mode === "all") {
			state.forShow = state.all
		}
	},
	addToFavouritesArray(state, product) {
		state.favourites.push(product)
	},
	removeFromFavouritesArray(state, productId) {
		state.favourites = state.favourites.filter(
			(product) => product.id !== productId
		)
	},
	searchByName(state, data) {
		state.foundProducts = data
		if (state.mode === "foundProducts") {
			state.forShow = data
		}
	},
	setIsLastResponse(state, value) {
		state.isLastResponse = value
	},
	changeForShowValue(state, mode) {
		state.mode = mode
		mode === "all"
			? (state.forShow = state.all)
			: (state.forShow = state.foundProducts)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
