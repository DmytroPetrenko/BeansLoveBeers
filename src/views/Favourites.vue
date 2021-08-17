<template>
	<div class="favourites">
		<Header />
		<div class="cardsContainer">
			<Card v-for="item in favourites" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header"
import Card from "@/components/Card"
import { mapState } from "vuex"

export default {
	name: "Favourites",

	components: {
		Header,
		Card,
	},

	computed: {
		...mapState("products", ["favourites"]),
	},
}
</script>
