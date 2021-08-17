<template>
	<div class="home">
		<Header />
		<Search @setObserverStatus="setObserverStatus" />
		<div class="cardsContainer">
			<Card v-for="item in items" :key="item.id" :item="item" />
		</div>
		<div v-if="isObserverActive">
			<Observer @intersect="getProducts" />
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header"
import Card from "@/components/Card"
import Observer from "@/components/Observer"
import Search from "@/components/Search"
import { mapActions, mapState } from "vuex"

export default {
	name: "Home",

	data() {
		return {
			isObserverActive: true,
		}
	},

	components: {
		Header,
		Card,
		Observer,
		Search,
	},

	computed: {
		...mapState({
			items: (state) => state.products.all,
		}),
	},
	methods: {
		...mapActions("products", ["getProducts"]),
		setObserverStatus(val) {
			this.isObserverActive = val
		},
	},
}
</script>

<style lang="scss">
.cardsContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
</style>
