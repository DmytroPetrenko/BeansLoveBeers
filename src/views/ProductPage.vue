<template>
	<div class="productPage">
		<Header />
		<div class="main">
			<v-container class="lighten-5">
				<v-row no-gutters>
					<v-breadcrumbs :items="productRoute" dark />
				</v-row>
				<v-row>
					<h1>
						{{ activeProduct.name }}
					</h1>
				</v-row>
				<v-row class="mat-5">
					<v-col cols="12" sm="4">
						<v-carousel hide-delimiters :show-arrows="false">
							<v-carousel-item :src="activeProduct.image_url" />
						</v-carousel>
					</v-col>
					<v-col cols="12" sm="8">
						<v-card elevation="0">
							<v-card-title class="pa-0">$170</v-card-title>
							<v-btn color="green" elevation="0" @click="buy_btnHandler">
								{{ $t("product.buy_btn") }}
							</v-btn>
						</v-card>

						<v-tabs
							v-model="tab"
							background-color="transparent"
							color="basil"
							grow
						>
							<v-tab v-for="item in items" :key="item">
								{{ $t(`product.${item.toLowerCase()}`) }}
							</v-tab>
						</v-tabs>

						<v-tabs-items v-model="tab">
							<v-tab-item>
								<v-card color="basil" flat>
									<DescriptionList
										class="mmat-2"
										:list="productDescriptionObj"
									/>
								</v-card>
							</v-tab-item>
							<v-tab-item>
								<v-card color="basil" flat>
									<p>{{ activeProduct.description }}</p>
									<p>{{ activeProduct.brewers_tips }}</p>
									<p>
										{{ $t("product.contributed_by") }}
										{{ activeProduct.contributed_by }}
									</p>
								</v-card>
							</v-tab-item>
						</v-tabs-items>

						<!-- <h3 class="mmat-5">{{ $t("product.characteristics") }}</h3>
						<DescriptionList class="mmat-2" :list="productDescriptionObj" /> -->
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header"
import { mapActions, mapState } from "vuex"
import routeNames from "@/router/routeNames"
import DescriptionList from "@/components/DescriptionList"
export default {
	name: "ProductPage",
	components: {
		Header,
		DescriptionList,
	},
	data() {
		return {
			tab: null,
			items: ["Characteristics", "Description"],
		}
	},
	computed: {
		...mapState("products", ["activeProduct"]),
		productRoute() {
			return [
				{
					text: this.$t("menu.home"),
					exact: true,
					disabled: false,
					to: { name: routeNames.home },
				},
				{
					text: this.activeProduct.name,
					disabled: true,
					to: { name: routeNames.product, params: this.$route.params.id },
				},
			]
		},
		productDescriptionObj() {
			let objCopy = Object.assign({}, this.activeProduct)
			objCopy = this.spliceOnObj(objCopy, 6, 8)
			return objCopy
		},
	},
	methods: {
		...mapActions("products", ["fetchProductById", "setActiveProduct"]),
		buy_btnHandler() {
			console.log("buy_btn handler")
		},
		spliceOnObj(object, number, number2) {
			let newObj = {}

			if (!number2) {
				number2 = 1
			}
			Object.entries(object).forEach(function ([key, item], index) {
				if (index >= number && index - number < number2) {
					newObj[key] = item
				}
			})
			return newObj
		},
	},
	created() {
		this.setActiveProduct(this.$route.params.id)
	},
}
</script>
<style lang="scss" scoped>
::v-deep .v-breadcrumbs {
	li {
		.v-breadcrumbs__item {
			color: black !important;
		}
		.v-breadcrumbs__item--disabled {
			color: rgba(0, 0, 0, 0.5) !important;
		}
	}
}
::v-deep .v-breadcrumbs__divider {
	color: black !important;
}

::v-deep .v-window-item > .v-image {
	max-height: 300px !important;
	width: auto !important;
}
::v-deep .v-image__image {
	background-size: contain;
}
::v-deep .v-btn__content {
	color: white !important;
}
.mmat-5 {
	margin-top: 20px;
}
.mmat-2 {
	margin-top: 8px;
}
</style>
