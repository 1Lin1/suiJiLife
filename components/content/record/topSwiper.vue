<template>
	<view class="top-swiper">
		<swiper  :duration="1000" @change="swiperChange" :current="currentIndex">
				<swiper-item :key="swiper1">
					<view class="swiper-item" >
						<swiper-content :itemData="itemData" ></swiper-content>
					</view>
				</swiper-item>
				
				<swiper-item :key="swiper2">
					<view class="swiper-item">
						<swiper-content :itemData="itemData2" ></swiper-content>
					</view>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import swiperContent from './swiper-content.vue'
	export default{
		components:{
			swiperContent
		},
		data() {
			return {
				itemData: {},
				itemData2:{}
			}
		}, 
		props:{
			currentIndex:Number
		},
		
		onReady() {
			this.get_type_data()
		},
		methods:{ 
			// 轮播图切换
			swiperChange(e){
				this.$emit('swiperChange',e.detail.current)
			},
			get_type_data(){
				uni.showLoading({
					title:'加载中'
				})
				wx.cloud.callFunction({
				  name: 'get_data_type',
				  
				}).then(res => {
					let data = res.result.data; 
					let data2 = res.result.data;
					
					this.itemData = data;
					this.itemData2 = data2;
					uni.hideLoading()
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.top-swiper{
		swiper{
				height: 400rpx;
		}
	}
</style>
