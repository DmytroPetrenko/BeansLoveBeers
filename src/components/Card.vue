<template>
	<v-card
		class="overflow-hidden"
		outlinedx
		max-height="200px"
		@click="cardClickHandler"
	>
		<v-icon @click="addOrRemoveFavouritesProduct" color="cyan">{{
			icon
		}}</v-icon>
		<v-list-item>
			<v-list-item-avatar tile size="100">
				<v-img contain :src="item.image_url" />
			</v-list-item-avatar>
			<v-card elevation="0">
				<v-card-title class="text-h6 mb-1">
					<p>
						{{ item.name }}
					</p>
				</v-card-title>
				<v-card-subtitle>
					<div class="ellipsis">
						<div>
							<p>{{ item.description }}</p>
						</div>
					</div>
				</v-card-subtitle>
			</v-card>
		</v-list-item>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import router from "@/router/index"
import routeNames from "@/router/routeNames"
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
		cardClickHandler() {
			router.push({
				name: routeNames.productPage,
				params: { id: this.item.id },
			})
		},
	},
	mounted() {
		if (this.isFavourites(this.item.id)) {
			this.icon = "mdi-star"
		}
	},
}
</script>

<style lang="scss" scoped>
.v-card {
	display: flex;
	flex-direction: column;
	margin: 10px;

	.v-card__subtitle {
		.ellipsis {
			overflow: hidden;
			height: 90px;
		}

		.ellipsis:before {
			content: "";
			float: left;
			width: 5px;
			height: 90px;
		}

		.ellipsis > *:first-child {
			float: right;
			width: 100%;
			margin-left: -5px;
		}

		.ellipsis:after {
			content: "\02026";

			box-sizing: content-box;
			-webkit-box-sizing: content-box;
			-moz-box-sizing: content-box;

			float: right;
			position: relative;
			top: -25px;
			left: 100%;
			width: 3em;
			margin-left: -3em;
			padding-right: 5px;

			text-align: right;

			background-size: 100% 100%;
			/* 512x1 image, gradient for IE9. Transparent at 0% -> white at 50% -> white at 100%.*/
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAABCAMAAACfZeZEAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDWRdwAAAP90Uk5TgsRjMZXhS30YrvDUP3Emow1YibnM9+ggOZxrBtpRRo94gxItwLOoX/vsHdA2yGgL8+TdKUK8VFufmHSGgAQWJNc9tk+rb5KMCA8aM0iwpWV6dwP9+fXuFerm3yMs0jDOysY8wr5FTldeoWKabgEJ8RATG+IeIdsn2NUqLjQ3OgBDumC3SbRMsVKsValZplydZpZpbJOQco2KdYeEe36BDAL8/vgHBfr2CvTyDu8R7esU6RcZ5ecc4+Af3iLcJSjZ1ivT0S/PMs3LNck4x8U7wz7Bv0G9RLtHuEq1TbJQr1OtVqqnWqRdoqBhnmSbZ5mXapRtcJGOc4t2eYiFfH9AS7qYlgAAARlJREFUKM9jqK9fEGS7VNrDI2+F/nyB1Z4Fa5UKN4TbbeLY7FW0Tatkp3jp7mj7vXzl+4yrDsYoVx+JYz7mXXNSp/a0RN25JMcLPP8umzRcTZW77tNyk63tdprzXdmO+2ZdD9MFe56Y9z3LUG96mcX02n/CW71JH6Qmf8px/cw77ZvVzB+BCj8D5vxhn/vXZh6D4uzf1rN+Cc347j79q/zUL25TPrJMfG/5LvuNZP8rixeZz/mf+vU+Vut+5NL5gPOeb/sd1dZbTs03hBuvmV5JuaRyMfk849nEM7qnEk6IHI8/qn049hB35QGHiv0yZXuMdkXtYC3ebrglcqvYxoj1muvC1nDlrzJYGbpcdHHIMo2FwYv+j3QAAOBSfkZYITwUAAAAAElFTkSuQmCC);

			background: -webkit-gradient(
				linear,
				left top,
				right top,
				from(rgba(255, 255, 255, 0)),
				to(white),
				color-stop(50%, white)
			);
			background: -moz-linear-gradient(
				to right,
				rgba(255, 255, 255, 0),
				white 50%,
				white
			);
			background: -o-linear-gradient(
				to right,
				rgba(255, 255, 255, 0),
				white 50%,
				white
			);
			background: -ms-linear-gradient(
				to right,
				rgba(255, 255, 255, 0),
				white 50%,
				white
			);
			background: linear-gradient(
				to right,
				rgba(255, 255, 255, 0),
				white 50%,
				white
			);
		}
	}

	.text-h6 {
		p {
			font-size: 1rem !important;
			height: 1.25rem;
			overflow: hidden;
			line-height: 1.25rem !important;
		}
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

	.v-card__subtitle,
	.v-card__text,
	.v-card__title {
		padding: 0;
	}
}
</style>
