<template>
	<div id="observer" />
</template>

<script>
export default {
	props: ["options"],
	data: () => ({
		observer: null,
	}),
	mounted() {
		const options = this.options || {
			rootMargin: "2px",
			threshold: 0,
		}
		this.observer = new IntersectionObserver(([entry]) => {
			if (entry && entry.isIntersecting) {
				this.$emit("intersect")
			}
		}, options)

		this.observer.observe(this.$el)
	},
	destroyed() {
		this.observer.disconnect()
	},
}
</script>
