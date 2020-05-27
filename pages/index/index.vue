<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search-input">
			<input type="text" :cursor="500" placeholder-class="icon iconfont icon-sousuo u-f-ajc" placeholder="搜索内容" />
		</view>
		<!-- 顶部记账 -->
		<top-money :recordDataByMonth="recordDataByMonth"></top-money>

		<!-- 中间流水账 -->
		<center-record :recordList="recordList"></center-record>





	</view>
</template>

<script>
	import topMoney from '../../components/content/index/topMoney.vue';
	import centerRecord from '../../components/content/index/center-record.vue';
	import {
		dateFormat
	} from '../../common/util.js';
	export default {
		components: {
			topMoney,
			centerRecord
		},

		data() {
			return {
				title: 'Hello',
				currentPage:0,//当前页数
				recordDataByMonth:[],//当前月记录
				recordList: [


				],
				choiceCurrentDate: dateFormat("YYYY-mm-dd", new Date()),

			}
		},
		onReady() {
			// 获取日记录
			this._get_index_record_list()
		},
		onShow() {
			
			// 获取月记录
			this._getRecordByCurrentMonth() 
			// 获取日记录 同时求和
			this._getTotalDayMoney()
			//日期不变化 展示时也请求一下
			// this._get_index_record_list()
			// this._getRecordByCurrentMonth()

			// 监听日期是否更改
			uni.$on('indexDateChange', (date) => {
				// 获取更改的日期当天的记录
				this.choiceCurrentDate = date;
				this.currentPage = 0;
				this._get_index_record_list()
				this._getRecordByCurrentMonth()
				this._getTotalDayMoney()
			})
		},
		methods: {

			// 获取月记录
			_getRecordByCurrentMonth() {
				// 获取当前年份加月份
				// let date = dateFormat("YYYY-mm", new Date());
				// console.log('我是date',date)
				
				// 日期分割
				let newDate = this.choiceCurrentDate.split("-")
				newDate.splice(2,1)
				let new2 = newDate.join("-")
				// 调用云函数
				wx.cloud.callFunction({
					name: 'get_RecordByCurrentMonth',
					data: {
						date: new2
					}
				}).then(res => {
					console.log('月份数据',res.result.data)
					this.recordDataByMonth = res.result.data;
				})

			},
		// 获取日记录 不限条数 一次性获取 同时计算出总和
		_getTotalDayMoney(){
			this.currentPage = 0;
			let date = this.choiceCurrentDate;
			wx.cloud.callFunction({
				name: 'get_totalDayMoney', 
				data: {
					choiceCurrentDate: date,
				}
			}).then(res => {
				let totalDayMoney = res.result.data;
				// 总收入钱数
				let addMoney = totalDayMoney.filter(item => item.isAdd)
					.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)
				
				// 总支出钱数
				let payMoney = totalDayMoney.filter(item => !item.isAdd)
					.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)
				
				
				// 总和
				let totalM = addMoney - payMoney;
				
				// 发送事件给顶部导航
				uni.$emit('centerRecordTotalM', addMoney,payMoney)
			})
		},

		// 获取日记录 限制六条一次
			_get_index_record_list() {
				uni.showLoading({
					title: '加载中'
				})
				let date = this.choiceCurrentDate
				wx.cloud.callFunction({
					name: 'get_allrecord',
					data: {
						choiceCurrentDate: date,
						currentPage:this.currentPage 
					}
				}).then(res => {
					
					// this.recordList = res.result.data;
					let record = res.result.data;
					if(record.length === 0){
						uni.showToast({
							title:'没有更多记录'
						})
						
						if(this.currentPage === 0){
							this.recordList = []
							// 重置  当天一条记录都没有
						}
					}else{
						// 若页数不为0 证明为同一天 若为0 则为新的一天 直接赋值
						if(this.currentPage !== 0){
							this.recordList.push(...record);
							console.log(this.recordList)
						}else{
							this.recordList =record;
						}
						
					}

					uni.hideLoading()
				})
			}
		},

		onReachBottom(e) {
			
			uni.showLoading({
				title:"加载中"
			})

			setTimeout(() => {
				this.currentPage = this.currentPage + 1;
				this._get_index_record_list()
				uni.hideLoading()
			},1000)
		}


	}
</script>
<style lang="scss" scoped>
	// 输入框
	.search-input {
		padding: 20rpx;

		input {
			padding: 0 20rpx;
			line-height: 70rpx;
			height: 70rpx;
			background-color: #F4F4F4;
		}
	}
</style>
