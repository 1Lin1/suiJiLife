<template>
	<view class="tabBar u-f-aje" @tap="tabClick">
		<block v-for="(item,index) in tabBars" :key="item.id"  >
			<view class="tabItem"
			 :class="{activeItem:tabIndex === index ? true : ''}"
			 :id="item.id"
			 >
				{{item.name}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			tabBars:Array,
			tabIndex:Number
		},
		methods:{
			tabClick(e){
				// 事件代理 比每个view绑定监听 高效 节流
				if(e.target.id === 'zhichu'){
					this.$emit('tabClick',0)
				}else{
					this.$emit('tabClick',1)
				}
				// 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabBar{
		padding: 30rpx 120rpx;
		background-color: #FFFFFF;
		color: #FEDB5A;
		.tabItem{
		
			border: 2rpx solid #FEDB5A;
			flex:1;
			text-align: center;
			// 支出
			&:first-child{
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}
			// 收入
			&:last-child{
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
			
			
		}
	}
	
	// 激活样式
	.activeItem{
		background-color: #FEDB5A;
		color: #FFFFFF;
	}
</style>
