<template>
	<view class="viewChart">
		<!-- 顶部导航切换收入支出 -->
		<tar-chart></tar-chart>
		<!-- 环形图 -->
		<u-charts-cpn></u-charts-cpn>
	</view>
</template>

<script>
	import tarChart from './tarChart.vue'
	import uChartsCpn from './uChartscpn.vue'
	export default{ 
		components:{
		tarChart,
		uChartsCpn
		}
	}
</script>

<style lang="scss" scoped>
	.viewChart{
		height: 700rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 15rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
</style>
