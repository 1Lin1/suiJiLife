<template>
	<view class="chartList ">
		<block v-for="(item,index) in detailData" >
			<chart-list-item :itemData="item" :key="item._id"></chart-list-item>
		</block>
	</view>
</template>

<script>
	import chartListItem from './chartListItem.vue'
	export default {
		components:{
			chartListItem
		},
		data(){
			return{
				detailData:[],
				detailAddM:[],//该月全部收入数据
				detailPayM:[],//该月全部支出诗句
				detailDChartList:[],//当天全部数据
				
			}
		},
		mounted() {
			// 监听初始化发送过来的数据
			uni.$on('detailToChartList',(detailAddM,detailPayM) => {
				console.log('uni',detailAddM,detailPayM)
				this.detailAddM = detailAddM;
				this.detailPayM = detailPayM;
				this.detailData = this.detailAddM;
			})
			
			// 监听支出收入切换点击
			uni.$on('tarChartChangeToUcharts',(index) => {
				switch(index){
					case 0:
					this.detailData = this.detailAddM;
					break;
					case 1:
					this.detailData = this.detailPayM;
					break;
					case 2:
					this.detailData = [];
					uni.showToast({
						title:'其他暂无数据'
					})
					break;
				}
			})
			
			// 监听日期中天数的切换时获取 当天的数据
			uni.$on('detailDayData',(detailDChartList) => {
				// 默认先展示收入
				// this.detailDAddM = detailDAddM;
				// this.detailDPayM = detailDPayM;
				this.detailDChartList = detailDChartList;
				this.detailData = this.detailDChartList;
				uni.showToast({
					title:'已切换至当日数据'
				})
				
			})
		}
	}
</script>

<style lang="scss" scoped>
	.chartList{
		border-top: 1rpx solid #EEEEEE;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
</style>
