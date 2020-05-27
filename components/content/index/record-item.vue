<template>
	<view class="record-item u-f-ajs animated rotateInDownLeft">
		<view class="left u-f-aje">
			<view class="left-icon">
				<image :src="itemData.icon_url" mode="widthFix"></image>
			</view>
			<view class="left-title">
				{{itemData.recordType}} 
				<view class="desc">
					{{itemData.tag}}
				</view>
			</view>
		</view>
		<view class="right" :class="[{add:itemData.isAdd},{pay:!itemData.isAdd}]"> 
			<text v-if="itemData.isAdd">+</text>
			<text v-else>-</text>
			{{itemData.sumMoney | filterPrice}}
		</view>  
	</view>
</template>

<script>
	export default {
		props: {
			itemData: Object
		},
		filters: {
			filterPrice(price) {
				return  Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.record-item {
		border-bottom: 1rpx solid #e5e5e5;
		padding: 15rpx $my-padding-size;
		// 收入颜色
		.add{
			color:#FE5960;
		}
		
		// 支出颜色
		.pay{
			color:#00AD79;
		}

		.left {
			.left-icon {
				margin-right: 40rpx;

				image{
					width: 90rpx;
					height: 90rpx;
				}
			}

			.left-title {
				font-weight: bold;
				color: #000;
				font-size: $my-font-size-base;
				
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				.desc{
						color: #dddddd;
						width: 300rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
				}
				
			}
			
			.right{
				text{
					font-size: 30rpx;
				}
			}
		}
		
		// 钱数
		

	}
</style>
