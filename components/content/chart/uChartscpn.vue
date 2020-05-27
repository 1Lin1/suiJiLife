<template>
	<view class="qiun-columns">
		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">环形图</view>
		</view> -->
		<view class="qiun-charts qiun-padding">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaRing = null;

	export default {
		props: {
			uChartsData: Array
		},

		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				finalAddMData: [], //最终月收入
				finalPayMData: [], //最终月支出
			}
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// this.getServerData();
		},

		mounted() {
			// this.getServerData()

			// 接收导航收入支出切换
			uni.$on('tarChartChangeToUcharts', (index) => {
				switch (index) {
					case 0:
						console.log('我是导航收入', this.finalAddMData)
						if (this.finalAddMData.length === 0) {
							console.log('77777')
							this.finalAddMData = [{
								name: '无',
								data: 100,
							}]
						}

						this.getServerData(this.finalAddMData, '收入')
						break;

					case 1:
						console.log(this.finalPayMData.length)
						if (this.finalPayMData.length === 0) {
							console.log('77777')
							this.finalPayMData = [{
								name: '无',
								data: 100,

							}]
						}
						console.log('我是导航支出', this.finalPayMData)
						this.getServerData(this.finalPayMData, '支出')
						break;

					case 2:
						console.log('我是其他 暂无数据')
						uni.showToast({
							title: '其他暂无记录'
						})
						let arr = [{
							name: '无',
							data: 100,
						}]
						this.getServerData(arr, '其他')
						break;
				}


			})

			// 监听月份点击发来的数据
			uni.$on('uChartscpnData', (finalAddMData, finalPayMData) => {
				console.log(finalAddMData.series.length, finalPayMData.series.length)
				let addMlength = finalAddMData.series.length; //收入长度
				let payMlength = finalPayMData.series.length; //支出长度

				if (addMlength !== 0 && payMlength !== 0) {
					// 月收入和支出的总数据
					this.finalAddMData = finalAddMData.series;
					this.finalPayMData = finalPayMData.series;
				}
				if (addMlength === 0 && payMlength === 0) {
					this.finalAddMData = [{
						name: '无',
						data: 100,
						type: -1,
					}]

					this.finalPayMData = [{
						name: '无',
						data: 100,
					}]

					console.log('我变化了', this.finalAddMData)

				}

				if (addMlength === 0 && payMlength!==0) {
					this.finalAddMData = [{
						name: '无',
						data: 100,
					}]
					
					this.finalPayMData = finalPayMData.series;

					console.log('66666')

				}

				if (addMlength !== 0 && payMlength===0) {

					this.finalAddMData = finalAddMData.series;
					this.finalPayMData = [{
						name: '无',
						data: 100,
					}]

					console.log('我变化了', this.finalPayMData, this.finalPayMData.length)
				}
				// 默认收入数据发过去
				let type = '收入';
				this.getServerData(this.finalAddMData, type)
			})

		},
		methods: {
			getServerData(data, type) {


				let Ring = {
					series: []
				};

				Ring.series = data; //渲染数据
				if (Ring.series.length !== 0) {
					_self.showRing("canvasRing", Ring, type);
				}
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data: {},
				// 	success: function(res) {
				// 		console.log(res.data.data)

				// 	},
				// 	fail: () => {
				// 		_self.tips = "网络错误，小程序端请检查合法域名";
				// 	},
				// });

				// let Ring = {
				// 	series: [{
				// 		"name": "一班",
				// 		"data": 50
				// 	}, {
				// 		"name": "二班",
				// 		"data": 30
				// 	}, {
				// 		"name": "三班",
				// 		"data": 20
				// 	}, {
				// 		"name": "四班",
				// 		"data": 18
				// 	}, {
				// 		"name": "五班",
				// 		"data": 8
				// 	},
				// 	{
				// 		"name": "六班",
				// 		"data": 20
				// 	},
				// 	{
				// 		"name": "七班",
				// 		"data": 25
				// 	},
				// 	]
				// };
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// Ring.series=res.data.data.Ring.series;

			},
			showRing(canvasId, chartData, type) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 13,
					legend: true,
					title: {
						name: type,
						color: '#2E2D2C',
						fontSize: 15 * _self.pixelRatio,
						offsetY: -5 * _self.pixelRatio,
					},
					subtitle: {
						name: '',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 30 * _self.pixelRatio,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 25 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>
	.qiun-padding {
		padding-right: 5%;
		width: 95%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
		overflow-x: hidden;

	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
