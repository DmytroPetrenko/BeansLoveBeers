<template>
	<div class="header">
		<v-app-bar dense flat color="#22d4ad">
			<v-toolbar-title>Beans Love Beers</v-toolbar-title>
			<!-- <el-radio-group :change="switchLang" v-model="lang" size="mini">
				<el-radio-button label="ru">Ru</el-radio-button>
				<el-radio-button label="ua">Ua</el-radio-button>
				<el-radio-button label="en">Eng</el-radio-button>
			</el-radio-group> -->

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
	width: 60px;
	text-transform: uppercase;
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
