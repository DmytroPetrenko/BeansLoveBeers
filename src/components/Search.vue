<template>
	<v-toolbar class="searchInput">
		<v-autocomplete
			v-model="select"
			:items="allProductForSearch"
			item-text="name"
			item-value="name"
			:search-input.sync="search"
			class="mx-4"
			flat
			solo
			hide-no-data
			hide-details
			append-icon="mdi-magnify"
			:label="searchInput"
			@update:search-input="fetchGetByName"
		/>
		<div class="buttonsContainer">
			<v-btn>Search</v-btn>
			<v-btn @click="clearFounded">Clear</v-btn>
		</div>
	</v-toolbar>
</template>

<script>
import { mapActions, mapState } from "vuex"
import debounce from "lodash.debounce"
export default {
	data() {
		return {
			search: "",
			select: [],
		}
	},
	computed: {
		...mapState("products", ["all"]),
		searchInput() {
			return this.$t("searchInput")
		},
		allProductForSearch: {
			get() {
				return [{ name: "", id: "finder" }, ...this.all]
			},
			set(value) {
				value
					? (this.allProductForSearch[0].name = value)
					: (this.allProductForSearch[0].name = "")
			},
		},
	},
	watch: {
		search(val) {
			this.allProductForSearch = val
			const formattedValue = val?.trim()
			if (formattedValue) {
				this.changeMode("foundProducts")
				this.$emit("setObserverStatus", false)
				return
			}
			this.$emit("setObserverStatus", true)
		},
	},
	methods: {
		...mapActions("products", ["axiosGetByName", "changeMode"]),

		clearFounded() {
			this.changeMode("all")
		},
		fetchGetByName: debounce(function (value) {
			if (value) {
				this.axiosGetByName(value)
			}
		}, 350),
	},
}
</script>

<style lang="scss" scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
	box-shadow: none !important;
	border: 1px solid gray;
	margin-top: 10px !important;
	width: 80%;
	margin: auto;
}
::v-deep .v-toolbar__content {
	* {
		z-index: 0 !important;
	}
}

::v-deep .primary--text {
	color: inherit !important;
}

@media screen and (max-width: 496px) {
	.v-sheet.v-toolbar:not(.v-sheet--outlined) {
		width: 100%;
		border: 0;
	}
	.buttonsContainer {
		display: flex;
		flex-direction: column;
		.v-btn {
			padding: 0 2px !important;
			height: 20px !important;
			margin: 3px 0;
		}
		.v-btn.v-size--default {
			font-size: 0.75rem;
		}
	}
}
</style>
