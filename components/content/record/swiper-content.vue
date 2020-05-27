<template>
	<view class="swip-content">
		<block v-for="(item,index) in itemData" :key="item._id">
			<view class="imgItem animated" @click="typeClick(index)" :class="{'aciveType':curretnTypeIndex===index,'rubberBand':curretnTypeIndex === index}">
				<image :src="item.icon_url" mode="widthFix"></image>
				<view class="type">  
					{{item.title}} 
				</view> 
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		mounted() {
			// 类型重置
			uni.$on('typeReset',() =>{
				this.curretnTypeIndex = 0;
			})
		},
		data(){
			return {
				curretnTypeIndex:0,
				typeData:[],
			}
		},
		props:{
			itemData:Object
		},
		onReady() {
			// 获取类型数据
			this.get_type_data()
		},
		methods:{
			// 记账类型的切换
			typeClick(index){
				this.curretnTypeIndex = index;
				uni.$emit('typeClick',this.typeData[this.curretnTypeIndex].title,index)
			},
			get_type_data(){
				wx.cloud.callFunction({
				  name: 'get_data_type',
				  
				}).then(res => {
					this.typeData = res.result.data; 
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.swip-content {
		height: 300rpx;
		// 激活样式
		.aciveType{
			.type{
				font-size:30rpx;
				font-weight: bold;
			}
			image{
				transform: scale(1.3);
			}
		}
		display: flex;
		justify-content: space-evenly;
		align-content: space-around;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.imgItem {
			text-align: center;
			flex: 20%;
			.type{
				margin-top: 8rpx;
			}
			image {
				width: 70rpx;
				height: 70rpx;
			}
		}
	}
</style>
