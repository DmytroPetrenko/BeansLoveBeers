<template>
	<div class="header">
		<v-app-bar dense flat color="#22d4ad">
			<v-toolbar-title>Beans Love Beers</v-toolbar-title>

			<div class="selectContainer">
				<v-select
					v-model="lang"
					class="langSelector"
					:items="langs"
					:value="langs[0]"
				></v-select>
			</div>
			<v-tabs v-model="activeTab">
				<v-tab v-for="tab in tabs" :key="tab.name" :to="{ name: tab.name }">
					{{ $t(`menu.${tab.localName}`) }}
				</v-tab>
			</v-tabs>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	data: () => ({
		activeTab: "",
		tabs: [
			{ name: "Home", localName: "home" },
			{ name: "Favourites", localName: "favourites" },
		],
		langs: ["en", "ru"],
		lang: "en",
	}),
	watch: {
		lang() {
			this.$i18n.locale = this.lang
		},
	},
}
</script>

<style lang="scss">
.selectContainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 10px;
	float: right !important;
}
.v-input.langSelector {
	width: 47px;
	text-transform: uppercase;

	.v-input__slot {
		margin-bottom: 0;

		.v-select__selection--comma {
			margin: 0;
		}

		#input-10 {
			max-width: 0;
		}

		.v-input__append-inner {
			padding-left: 0;
		}
	}
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
	border-color: white !important;
}
.theme--light.v-select .v-select__selections {
	color: white !important;
}
.theme--light.v-icon {
	color: white !important;
}

.v-menu__content {
	border: none;
	box-shadow: none !important;
	top: 30px !important;
	color: white !important;
	text-transform: uppercase;
	.v-list {
		background-color: #22d4ad !important;
		.v-list-item__content {
			color: white !important;
		}
	}
}
.v-toolbar__title {
	width: 200px;
	color: white;
}
.v-tabs {
	width: auto !important;
}
.v-tabs-bar {
	float: right !important;

	.v-tabs-slider {
		display: none;
	}

	.v-tab.v-tab--active {
		color: white !important;
	}

	.v-tab {
		text-transform: none !important;
		color: #d9d9d9 !important;
		padding: 0 10px;
	}
}
</style>
