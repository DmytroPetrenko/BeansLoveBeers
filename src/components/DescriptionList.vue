<template>
	<dl>
		<div v-for="(value, name) in list" :key="name" class="listPair">
			<dt class="characteristics-full__label">
				<span>{{ name }}</span>
			</dt>
			<dd class="characteristics-full__value">{{ value }}</dd>
		</div>
	</dl>
</template>
<script>
export default {
	props:  ["list"],
}
</script>

<style lang="scss" scoped>
.listPair {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 24px;

	.characteristics-full__label {
		position: relative;
		align-self: flex-start;
		width: 40%;
	}
	.characteristics-full__label:before {
		position: absolute;
		left: 0;
		bottom: 4px;
		width: 100%;
		border-bottom: 1px dotted #d2d2d2;
		content: "";
	}
	.characteristics-full__label span {
		position: relative;
		display: inline-block;
		padding-right: 16px;
		background-color: #fff;
	}

	.characteristics-full__value {
		width: 60%;
		padding-left: 16px;
		box-sizing: border-box;
	}
}
</style>
