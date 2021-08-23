<template>
	<div class="home">
		<Header />
		<Search @setObserverStatus="setObserverStatus" />
		<v-container class="lighten-5">
			<v-row no-gutters>
				<v-col v-for="item in items" :key="item.id" cols="12" md="4" sm="6">
					<Card class="productCard" :item="item" />
				</v-col>
			</v-row>
		</v-container>
		<div v-if="isObserverActive && !isLastResponse">
			<Observer @intersect="axiosGetProducts" />
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
			items: (state) => state.products.forShow,
			isLastResponse: (state) => state.products.isLastResponse,
		}),
	},
	methods: {
		...mapActions("products", ["axiosGetProducts", "changeMode"]),
		setObserverStatus(val) {
			this.isObserverActive = val
		},
	},
}
</script>

<style lang="scss">
/* .cardsContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
} */
</style>
