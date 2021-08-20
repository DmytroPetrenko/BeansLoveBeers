<template>
	<div class="favourites">
		<Header />
		<v-container class="lighten-5">
			<v-row no-gutters>
				<v-col
					v-for="item in favourites"
					:key="item.id"
					cols="12"
					md="4"
					sm="6"
				>
					<Card class="productCard" :item="item" />
				</v-col>
			</v-row>
		</v-container>
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
