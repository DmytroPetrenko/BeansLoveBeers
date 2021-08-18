<template>
	<v-toolbar class="searchInput">
		<v-autocomplete
			v-model="select"
			:items="allNames"
			:search-input.sync="search"
			cache-items
			class="mx-4"
			flat
			solo
			hide-no-data
			hide-details
			append-icon="mdi-magnify"
			label="Search for beer..."
		/>
		<div class="buttonsContainer">
			<v-btn>Search</v-btn>
			<v-btn @click="clearFounded">Clear</v-btn>
		</div>
	</v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import debounce from "lodash.debounce"
export default {
	data() {
		return {
			search: null,
			select: null,
			axiosGetByNameDebounced: null,
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
		...mapActions("products", ["axiosGetByName", "changeMode"]),
		querySelections(v) {
			this.changeMode("foundProducts")
			this.axiosGetByNameDebounced(v)
		},
		/* loseFocus() {
			this.changeMode("all")
			this.$emit("setObserverStatus", true)
		}, */
		clearFounded() {
			this.changeMode("all")
			this.search = null
			this.select = null
		},
	},
	created() {
		this.axiosGetByNameDebounced = debounce(this.axiosGetByName, 1000)
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
