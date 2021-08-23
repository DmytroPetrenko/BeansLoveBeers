<template>
	<div class="header">
		<v-app-bar dense flat color="#22d4ad">
			<v-toolbar-title>{{ $t("title") }}</v-toolbar-title>

			<div class="selectContainer" ref="lang">
				<v-select
					v-model="lang"
					class="langSelector"
					:items="langs"
					:value="langs[0]"
					:attach="$refs.lang"
				/>
			</div>
			<v-tabs class="desktopTabs" v-model="activeTab">
				<v-tab v-for="tab in tabs" :key="tab.name" :to="{ name: tab.name }">
					{{ tab.value }}
				</v-tab>
			</v-tabs>

			<div class="mobileTabs">
				<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
				<v-navigation-drawer v-model="drawer" absolute temporary app>
					<v-list nav dense>
						<v-list-item-group v-model="tabs" active-class="asd">
							<v-list-item
								v-for="tab in tabs"
								:key="tab.name"
								:to="{ name: tab.name }"
							>
								<v-list-item-icon>
									<v-icon>{{ tab.icon }}</v-icon>
								</v-list-item-icon>
								<v-list-item-title>{{ tab.value }}</v-list-item-title>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-navigation-drawer>
			</div>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	data: () => ({
		activeTab: "",
		langs: ["en", "ru"],
		lang: "en",
		drawer: false,
	}),
	computed: {
		tabs() {
			return [
				{ name: "Home", value: this.$t("menu.home"), icon: "mdi-home" },
				{
					name: "Favourites",
					value: this.$t("menu.favourites"),
					icon: "mdi-account",
				},
			]
		},
	},
	watch: {
		lang() {
			this.$i18n.locale = this.lang
		},
	},
}
</script>

<style lang="scss" scoped>
.asd {
	color: #22d4ad !important;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
	z-index: 2 !important;
}
::v-deep .selectContainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 10px;
	float: right !important;
	.v-menu__content {
		border: none;
		box-shadow: none !important;
		top: 30px !important;
		left: auto !important;
	}
}
::v-deep .v-input.langSelector {
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
::v-deep
	.theme--light.v-text-field
	> .v-input__control
	> .v-input__slot:before {
	border-color: white !important;
}
::v-deep .theme--light.v-select .v-select__selections {
	color: white !important;
}
::v-deep .theme--light.v-icon {
	color: white !important;
}

.v-menu__content {
	.v-list {
		background-color: #22d4ad !important;
		::v-deep.v-list-item__content {
			text-transform: uppercase;
			color: white !important;
		}
	}
}
::v-deep .v-toolbar__title {
	color: white;
	margin-right: 10px;
}
::v-deep.v-tabs {
	width: auto !important;
}
::v-deep .v-tabs-bar {
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
.mobileTabs {
	display: none;
}

@media screen and (max-width: 496px) {
	.desktopTabs {
		display: none;
	}
	.mobileTabs {
		display: block;
		margin-left: auto;
		margin-right: 0;
		.v-navigation-drawer {
			background-color: #22d4ad !important;
			.v-list-item__title {
				color: white !important;
			}
		}
	}
}
</style>
