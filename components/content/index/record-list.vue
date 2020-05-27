<template>
	<view class="record-list">
		<block v-for="item in recordList" :key="item.id">
			<record-item :itemData="item"></record-item>
		</block>
	</view>
</template>

<script>
	import recordItem from './record-item.vue';
	export default {
		components:{
			recordItem
		},
		props:{
			recordList:Array
		},
		
		onReady() {
			uni.showLoading({
				title:'加载中'
			})
			
			setTimeout(() => {
				uni.hideLoading()
			},1000)
		}
		
		
	}
</script>

<style>
</style>
