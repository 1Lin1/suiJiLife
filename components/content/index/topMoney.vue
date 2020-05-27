<template>
	<view class="header">
		<!-- 本月结余 -->
		<view class="top-title">
			本月结余
		</view>
		<!-- 余额 -->
		<view class="leave-money">
			{{totalMoneyByMonth | filterPrice}}
		</view>

		<!-- 本月收入和支出 -->
		<view class="u-f-ajs bottom-money">
			<view class="l-title">
				本月收入
			</view>
			<!-- 收入 -->
			<view class="l-add">
				{{addMoneyByMonth | filterPrice}}
			</view>

			<view class="r-title">
				本月支出
			</view>

			<view class="r-pay">
				{{payMoneyByMonth | filterPrice}}
			</view>
		</view>





	</view>
</template>

<script>
	import {dateFormat} from '../../../common/util.js'
	export default {
		data(){
			return {
			}
		},
		props:{
			recordDataByMonth:Array,
		},
		computed:{
			//本月收入
			addMoneyByMonth(){
				return this.recordDataByMonth.filter(item => item.isAdd)
				.reduce((prv,item) => prv + item.sumMoney,0).toFixed(2)
			},
			
			//本月支出
			payMoneyByMonth(){
				return this.recordDataByMonth.filter(item => !item.isAdd)
				.reduce((prv,item) => prv + item.sumMoney,0).toFixed(2)
			},
			
			//总和
			totalMoneyByMonth(){
				return this.addMoneyByMonth - this.payMoneyByMonth;
			}
		},
		methods:{
			
		},
		
		filters: {
			filterPrice(price) {
				return '￥' + Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$title-color:#b48513;

	.header {
		height: 400rpx;
		background-image: linear-gradient(to right, #fedb5a, #fccf49);
		padding: 20rpx 26rpx;

		.top-title {
			font-size: $my-font-size-sm;
			color: $title-color;
			font-weight: bold;
		}

		.leave-money {
			font-size: $my-font-size-lg;
			color: #000;
			font-weight: bold;
		}

		// 收入与支出
		.bottom-money {
			margin-top: 80rpx;
			font-weight: bold;

			.l-title,
			.r-title {
				font-size: $my-font-size-sm;
				color: $title-color;
			}

			.l-add,
			.r-pay {
				font-size: $my-font-size-sm;
				color: #000;
			}

			// 竖线
			.r-title {
				position: relative;

				&::before {
					content: '';
					height: $my-font-size-base;
					width: 4rpx;
					background-color: $title-color;
					position: absolute;
					left: -8rpx;
					top: 10rpx;
				}
			}
		}
	}
</style>
