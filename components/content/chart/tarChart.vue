<template>
	<view class="tabBar ">
		<!-- 月收入 -->
		<block v-for="(item,index) in moneyData">
			<view class="tab-item" 
			@tap="itemClick(index)"
			:class="{'activeBorder':index === currentIndex}">
				<view class="top-desc">
					{{item.topdesc}}
				</view>
				<view class="money" :class="{'addMoney':item.type === 0,'payMoney':item.type === 1}"  >
					{{item.money | filterPrice}}
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				currentIndex:0,//当前激活边框下标
				moneyData:[
					{
						topdesc:'月收入',
						money:9999,
						type:0,
					},
					{
						topdesc:'月支出',
						money:254631,
						type:1
					},
					{
						topdesc:'其他',
						money:0,
						type:2
					}
				]
			}
		},
		
		mounted() {
			// 获取接收的数据
			uni.$on('tarChartData',(addMoney,payMoney) => {
				this.moneyData[0].money = addMoney;
				this.moneyData[1].money = payMoney;
			})
			
			// 重置收入支出切换导航 监听事件
			uni.$on('chartTotarChartChange',() => {
				this.currentIndex = 0;
			})
		},
		
		methods:{
			// 收入支出切换
			itemClick(index){
				this.currentIndex = index;
				// 改变时发送事件去改变环形图数据
				uni.$emit('tarChartChangeToUcharts',index)
			}
		},
		
		filters: {
			filterPrice(price) {
				return '￥' + Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabBar{
		padding: 25rpx 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: #ffffff;
		.tab-item{
			height: 80rpx;
			font-weight: 900;
			padding: 10rpx;
			flex:0.25;
			
			
			// 收入为红色，支出为绿色
			.addMoney{
				color:$my-color-pink;
			}
			
			.payMoney{
				color:$my-color-green;
			}
		}
		
		// 激活边框
		.activeBorder{
			border-radius: 5rpx;
			border: 2rpx solid $my-color-pink;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}
	}
</style>
