<template>
	<div class="home">
		<Header />
		<h1>This is a Home page</h1>
	</div>
</template>

<script>
import Header from "@/components/Header"

export default {
	name: "Home",

	components: {
		Header,
	},
}
</script>
