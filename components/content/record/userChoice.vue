<template>
	<view class="userChoice">
		<view class="top-content u-f-ac">
			<view class="icon iconfont icon-qianbao">
			</view>
			<view class="title">
				账户选择
			</view>
		</view>
		
		<!-- 选择类型 v-for事件处理 不要给每个元素绑定 会增加处理时间-->
		<view class="choice u-f-aje"  @click="itemClick">
			<block v-for="(item,index) in choiceData" :key="item.id">
				<view class="cItem" :class="{active:currentIndex === index ?true:''}" :id="item.id">
					{{item.name}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		mounted(){
			uni.$on('userChoiceReset',()=> {
				this.currentIndex = 0;
			})
		},
		data(){
			return{
				currentIndex:0,
				choiceData:[
					{
						id:0,
						name:'现金'
					},
					{
						id:1,
						name:'微信钱包'
					},
					{
						id:2,
						name:'支付宝'
					},
					{
						id:3,
						name:'储蓄卡'
					},
					{
						id:4,
						name:'信用卡'
					},
					
					
				]
			}
		},
		methods:{
			itemClick(e){
				this.currentIndex = Number(e.target.id);
				this.$emit('userChoice',this.choiceData[this.currentIndex].name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userChoice{
		border-radius: 30rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		margin-top:30rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		
		padding: 20rpx 15rpx;
		.top-content{
			margin-left: 30rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #EEEEEE;
			.icon{
				margin-right: 5rpx;
				font-size: 40rpx;
			}
			.title{
				font-size: 36rpx;
			}
		}
		
		.choice{
			margin-top: 40rpx;
			.cItem{
				padding: 0 12rpx;
				border-radius: 20rpx;
				background-color: #f5f5f5;
				color: #aaaaaa;
				text-align: center;
			}
			
			.active{
				color:#FFFFFF;
				background-color: #ffaa00;
			}
		}
		
		
	}
</style>
