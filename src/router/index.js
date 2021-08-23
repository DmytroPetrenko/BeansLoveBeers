import Vue from "vue"
import VueRouter from "vue-router"
import routeNames from "./routeNames"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: routeNames.home,
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/favourites",
		name: routeNames.favourites,
		component: () => import("@/views/Favourites.vue"),
	},
	{
		path: "/product/:id",
		name: routeNames.productPage,
		component: () => import("@/views/ProductPage.vue"),
	},
]

const router = new VueRouter({
	routes,
})

export default router
