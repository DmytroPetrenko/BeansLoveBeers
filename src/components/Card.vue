<template>
	<v-card outlined max-width="26%" max-height="200px">
		<v-icon @click="addOrRemoveFavouritesProduct" color="cyan">{{
			icon
		}}</v-icon>
		<v-list-item>
			<v-list-item-avatar tile size="100">
				<v-img contain :src="item.image_url" />
			</v-list-item-avatar>
			<v-card elevation="0">
				<v-card-title class="text-h6 mb-1">
					{{ title }}
				</v-card-title>
				<v-card-subtitle>
					{{ desc }}
				</v-card-subtitle>
			</v-card>
		</v-list-item>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
	data() {
		return {
			icon: "mdi-star-outline",
		}
	},
	props: {
		item: Object,
	},
	computed: {
		...mapGetters("products", ["isFavourites"]),
		name() {
			return this.item.name.split(" ").slice(0, 4).join(" ").concat("...")
		},
		title() {
			return this.name.length - 3 === this.item.name.length
				? this.item.name
				: this.name
		},
		desc() {
			return this.item.description
				.split(" ")
				.slice(0, 13)
				.join(" ")
				.concat("...")
		},
	},
	methods: {
		...mapActions("products", ["addToFavourites", "removeFromFavourites"]),
		addOrRemoveFavouritesProduct() {
			if (this.icon == "mdi-star-outline") {
				this.icon = "mdi-star"
				this.addToFavourites(this.item)
			} else {
				this.icon = "mdi-star-outline"
				this.removeFromFavourites(this.item.id)
			}
		},
	},
	mounted() {
		if (this.isFavourites(this.item.id)) this.icon = "mdi-star"
	},
}
</script>

<style lang="scss" scoped>
.v-card {
	display: flex;
	flex-direction: column;
	margin: 10px;

	.text-h6 {
		font-size: 1rem !important;
		line-height: 1.25rem !important;
	}

	.v-list--three-line .v-list-item .v-list-item__content,
	.v-list-item--three-line .v-list-item__content {
		align-self: flex-start;
	}

	.v-icon {
		align-self: flex-end;
		margin-right: 20px;
		margin-top: 20px;
	}
}
</style>
