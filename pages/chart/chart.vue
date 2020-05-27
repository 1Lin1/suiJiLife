<template>
	<view class="chart">
		<!-- 导航栏 -->
		<view class="nav u-f-ajc">
			<!-- 年 -->
			<view class="year u-f-aje">
				{{currentYear}}年
				<view class="icon iconfont icon-xialazhankai" @tap="yearListClick">

				</view>


			</view>

			<view class="year-list animated slideInDown" v-show="isYearFixed">
				<scroll-view scroll-y="true" class="year-scroll">
					<block v-for="(item,index) in yearList" :key="item">
						<view class="year-item " @tap="yearItemClick(item.id)">
							{{item.id}}年
						</view>
					</block>
				</scroll-view>
			</view>
 
			<!-- 月份类型 -->
			<view class="month u-f-ajc">
				<scroll-view class="u-f-ajc" scroll-x="true" scroll-left="120">
					<block v-for="(item,index) in monthType" :key="item.id">
						<view class="month-type" @tap="monthClick(index)">
							<text :class="{isActiveM:currentMonthIndex === index}">
								{{item.id}}月
							</text>
						</view>
					</block>
				</scroll-view>
			</view>

			<view class="right-sel u-f-ajc">
				筛选
				<view class="icon iconfont icon-gengduo" @tap="dayListClick">

				</view>
			</view>

			<view class="day-list animated slideInDown" v-show="isDayListFixed">
				<scroll-view scroll-y="true" class="day-scroll">
					<block v-for="(item,index) in dayList">
						<view class="day-item" :key="item.id" wx:key="key" @click="dayItemClick(item.id)">
							{{item.id}}日
						</view>
					</block>
				</scroll-view>
			</view>

		</view>



		<!-- 切换日月视图 -->
		<!-- 图表 -->
		<view-chart></view-chart>
		
		<!-- 各类详细信息列表 -->
		<chart-list></chart-list>

	</view>
</template>

<script>
	import {
		dateFormat
	} from '../../common/util.js';

	import viewChart from '../../components/content/chart/viewChart.vue'
	import chartList from '../../components/content/chart/chartList.vue'

	import {
		_getRecordByCurrentMonth
	} from '../../network/_getRecordByCurrentMonth.js'
	import {
		RingItem
	} from '../../common/util.js'
	export default {
		data() {
			return {
				choiceFinalDate: dateFormat("YYYY-mm-dd", new Date()), //最终选择日期
				currentYearMonthToCharts: dateFormat("YYYY-mm", new Date()), //当前时间的月份，初始化图表的数据
				currentMonthIndex: 0, //当前月份列表下标
				currentYear: 2020, //当前选择年数
				dayList: [],
				isYearFixed: false,
				isDayListFixed: false, //日数列表是否fixed
				yearList: [
						{
							id: 2020,
							title: '2020'
						},{
						id: 2021,
						title: '2021'
					},
					{
						id: 2022,
						title: '2022'
					},
					{
						id: 2023,
						title: '2023'
					},
					{
						id: 2024,
						title: '2024'
					},
					{
						id: 2025,
						title: '2025'
					},
					{
						id: 2026,
						title: '2026'
					},
					{
						id: 2027,
						title: '2027'
					},
				], //年份表
				monthType: [{
						id: 1,
						title: '1月'
					},
					{
						id: 2,
						title: '2月'
					},
					{
						id: 3,
						title: '3月'
					},
					{
						id: 4,
						title: '4月'
					},
					{
						id: 5,
						title: '5月'
					},
					{
						id: 6,
						title: '6月'
					},
					{
						id: 7,
						title: '7月'
					},
					{
						id: 8,
						title: '8月'
					},
					{
						id: 9,
						title: '9月'
					},
					{
						id: 10,
						title: '10月'
					},
					{
						id: 11,
						title: '11月'
					},
					{
						id: 12,
						title: '12月'
					},
				]

			};
		},
		components: {
			viewChart,
			chartList
		},

		onShow() {
			// 今天的日期数 初始化
			let today = dateFormat("YYYY-mm-dd", new Date());
			let todayArr = today.split('-')
			this.currentYear = Number(todayArr[0]);
			this.currentMonthIndex = Number(todayArr[1]) - 1;

			// 初始化图表的数据 默认为当前月的数据
			this._resolveGetCurrentMonthRecord(this.currentYearMonthToCharts)
		},

		onReady() {
			for (let i = 1; i < 32; i++) {
				let obj = {
					id: i
				}
				this.dayList.push(obj)
			}
		},
		methods: {
			// 年份list是否fixed
			yearListClick() {
				this.isYearFixed = !this.isYearFixed;
			},
			// 年份每一项的点击
			yearItemClick(num) {
				//关闭fixed
				this.isYearFixed = false;
				this.currentYear = num;
			},

			// 月份列表每一项点击
			monthClick(index) {
				console.log(index + 1);
				this.currentMonthIndex = index;

				// 请求月份数据
				let year = this.currentYear;
				let month = this.currentMonthIndex + 1;
				let arr = [year, "0" + month];
				let date = arr.join("-");
				
				// 重置收入支出切换导航
				uni.$emit('chartTotarChartChange')

				this._resolveGetCurrentMonthRecord(date)

			},

			// 处理月份获取数据
			_resolveGetCurrentMonthRecord(date) {
				_getRecordByCurrentMonth(date).then(res => {
					// 对数据进行处理
					console.log("云函数获取的月份长度",res.result.data.length)
					
					if(res.result.data.length !== 0){
						
						let totalDayMoney = res.result.data;
						// 总收入钱数
						let addMoney = totalDayMoney.filter(item => item.isAdd)
							.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)
						
						// 总支出钱数
						let payMoney = totalDayMoney.filter(item => !item.isAdd)
							.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)
						
						
						// 总和
						let totalM = addMoney - payMoney;
						
						
						
						uni.$emit('tarChartData', addMoney, payMoney)
						
						// 去重之前 发送给图表最下面列表详情
						let detailChartList = res.result.data;
						let detailAddM = detailChartList.filter(item => item.isAdd)
						let detailPayM = detailChartList.filter(item => !item.isAdd)
						console.log('详情收入列表',detailAddM)
						console.log('详情支出列表',detailPayM)
						uni.$emit('detailToChartList',detailAddM,detailPayM)
						
						// 对环形图数据的处理
						let ringData = res.result.data;
						console.log(ringData)
						let newRingArr = []
						ringData.forEach(item => {
							let obj = new RingItem(item);
							newRingArr.push(obj)
						})
						
						console.log(newRingArr)
						
						// 全部收入分类
						let addMRingArr = newRingArr.filter(item => item.isAdd)
						console.log('我是收入', addMRingArr)
						let payMRingArr = newRingArr.filter(item => !item.isAdd)
						console.log('我说支出', payMRingArr)
						// 去重之前
						
						
						// 去重之后
						console.log('最终月收入', this.resolveData(addMRingArr))
						console.log('最终月支出', this.resolveData(payMRingArr))
						
						// 最终月收入
						let finalAddMData = {
							series: this.resolveData(addMRingArr)
						}
						
						// 最终月支出
						let finalPayMData = {
							series: this.resolveData(payMRingArr)
						}
						
						console.log('最终数据',finalAddMData,finalPayMData)
						uni.$emit('uChartscpnData', finalAddMData, finalPayMData)
						
					}else{
						let arr = {series:[]};
						let arr2 = {series:[]};
						uni.$emit('tarChartData', 0, 0)
						uni.$emit('uChartscpnData',arr,arr2)
						uni.showToast({
							title:'该月暂无数据'
						})
						
						uni.$emit('detailToChartList',[],[])
						
					}
				})
			},

			// 去重 然后 合并
			resolveData(newRingArr) {
				// 去重 然后合并相同项
				let map = {},
					dest = [];
				for (let i = 0; i < newRingArr.length; i++) {
					let ai = newRingArr[i];
					if (!map[ai.name]) {
						dest.push({
							name: ai.name, 
							data: ai.data,
						});
						map[ai.name] = ai;
					} else {
						for (let j = 0; j < dest.length; j++) {
							let dj = dest[j];
							if (dj.name == ai.name) {
								dj.data = (parseFloat(dj.data) + parseFloat(ai.data));
								break;
							}
						}
					}
				};
				return dest;
			},

			// 日数点击事件
			dayListClick() {
				this.isDayListFixed = !this.isDayListFixed;
			},
			// 日的每一项点击
			dayItemClick(index) {
				this.isDayListFixed = false;

				// 选中对的年月日进行拼接 并请求云函数
				let year = this.currentYear;
				let month = this.currentMonthIndex + 1;
				let day = index;
				let arr = [year, "0" + month, day]
				let date = arr.join("-");

				if (date !== this.choiceFinalDate) {
					this.choiceFinalDate = date;
					this._getTotalDayMoney(this.choiceFinalDate)
				}

			},

			// 获取日记录
			_getTotalDayMoney(date) {
				console.log(date)
				wx.cloud.callFunction({
					name: 'get_totalDayMoney',
					data: {
						choiceCurrentDate: date,
					}
				}).then(res => {
					console.log('获取的ri数据', res);
					let detailDChartList = res.result.data;
					
					uni.$emit('detailDayData',detailDChartList)
					// let totalDayMoney = res.result.data;
					// // 总收入钱数
					// let addMoney = totalDayMoney.filter(item => item.isAdd)
					// 	.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)

					// // 总支出钱数
					// let payMoney = totalDayMoney.filter(item => !item.isAdd)
					// 	.reduce((prv, item) => prv + item.sumMoney, 0).toFixed(2)


					// // 总和
					// let totalM = addMoney - payMoney;

					// 发送事件给顶部导航
					// uni.$emit('centerRecordTotalM', addMoney,payMoney)
				})
			}

		}
	}
</script>

<style lang="scss">
	.chart {
		color: $my-color-text-primary;
		padding: $my-chart-padding;

		.nav {
			background-color: #FEDB5A;
			position: relative;

			// 筛选
			.right-sel {
				position: relative;

				// 添加线条
				&:before {
					content: '';
					height: 30rpx;
					width: 2rpx;
					background-color: #999897;
					position: absolute;
					left: 0;
					bottom: 28rpx;
				}
			}

			.year,
			.right-sel {
				width: 160rpx;
				height: 80rpx;
				font-weight: bold;
			}

			// 年份
			.year-list {

				position: fixed;
				z-index: 99;
				left: 25rpx;
				top: 105rpx;
				width: 160rpx;
				background-color: #FEDB5A;

				.year-scroll {
					height: 500rpx;

					.year-item {
						&:first-child {
							border-top: 1rpx solid #ededef;
						}

						font-weight: bold;
						padding-left: 15rpx;
						height: 80rpx;
						line-height: 80rpx;
						border-bottom: 1rpx solid #ededef;
					}


				}
			}

			// 日列表
			.day-list {
				position: fixed;
				z-index: 99;
				right: 25rpx;
				top: 105rpx;
				width: 160rpx;
				background-color: #FEDB5A;

				.day-scroll {
					height: 500rpx;

					.day-item {

						&:first-child {
							border-top: 1rpx solid #ededef;
						}

						text-align: center;
						font-weight: bold;
						margin-left: 6rpx;
						height: 80rpx;
						line-height: 80rpx;
						border-bottom: 1rpx solid #ededef;
					}
				}
			}

			.month {
				width: calc(100% - 320rpx);
				height: 80rpx;

				// 禁止换行
				white-space: nowrap;

				.month-type {
					display: inline-block;
					padding: 20rpx;
					font-weight: bold;
					color: #999897;

					text {
						padding: 5rpx;
					}
				}

				// 月激活样式
				.isActiveM {
					color: $my-color-text-primary;
					border-bottom: 4rpx solid $my-color-text-primary;
				}
			}
		}
	}
</style>
