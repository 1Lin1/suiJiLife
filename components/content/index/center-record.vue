<template>
	<view class="center-record" >
		<!-- 顶部标题 -->
		<center-record-top></center-record-top>
		
		<record-list :recordList="recordList"></record-list>
		
		
	</view>
</template>

<script>
	import centerRecordTop from './center-record-top.vue'
	import recordList from './record-list.vue'
	export default {
		components:{
			centerRecordTop,
			recordList
		},
		props:{
			recordList:Array
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.center-record{
		margin-top: 20rpx;
		color: #BBBBBB;
	}
</style>
