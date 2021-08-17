<template>
	<v-toolbar class="searchInput">
		<v-autocomplete
			v-model="select"
			:loading="loading"
			:items="allNames"
			:search-input.sync="search"
			@blur="loseFocus"
			cache-items
			class="mx-4"
			flat
			solo
			hide-no-data
			hide-details
			append-icon="mdi-magnify"
			label="Search for beer..."
		/>
		<v-btn>Search</v-btn>
	</v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
	data() {
		return {
			loading: false,
			search: null,
			select: null,
		}
	},
	computed: {
		...mapGetters("products", ["allNames"]),
	},
	watch: {
		search(val) {
			val && val.trim() && this.querySelections(val.trim())

			val
				? this.$emit("setObserverStatus", false)
				: this.$emit("setObserverStatus", true)
		},
	},
	methods: {
		...mapActions("products", ["searchByName", "getProducts"]),
		querySelections(v) {
			this.loading = true
			this.searchByName(v)
			this.loading = false
		},
		loseFocus() {
			this.$emit("setObserverStatus", true)
		},
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
</style>
