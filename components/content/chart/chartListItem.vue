<template>
	<view class="chart-Item u-f-ajc">
		<view class="left">
			<image :src="itemData.icon_url" mode="widthFix"></image>
		</view>
		<view class="center u-f-ajs">
			<view class="title">
				{{itemData.recordType}} 
				<view class="zhan">
					{{itemData.tag}}
				</view>
			</view>
			<view class="money":class="[{add:itemData.isAdd},{pay:!itemData.isAdd}]">
				<text v-if="itemData.isAdd">+</text>
				<text v-else>-</text>
				{{itemData.sumMoney | filterPrice}}
				<view class="num">
					1笔
				</view>
			</view>
		</view>
		
		<view class="right">
			<view class="icon iconfont icon-jinru">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		props:{
			itemData:Object
		},
		
		filters: {
			filterPrice(price) {
				return  Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart-Item{
		padding: 20rpx 10rpx;
		.left{
			flex:1;
			
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
		
		.center{
			flex: 8;
			padding: 0 20rpx;
			font-weight: bolder;
			.title{
				color:$my-color-text-primary;
			}
			.money{
				color:$my-color-pink;
				.num{
					color:$my-color-text-grey;
				}
			}
			
			// 收入颜色
			.add{
				color:#FE5960;
			}
			
			// 支出颜色
			.pay{
				color:#00AD79;
			}
			
			
		}
		.right{
			flex:1;
			.icon{
				color:$my-color-text-grey;
			}
		}
	}
</style>
