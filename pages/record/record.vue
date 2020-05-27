<template>
	<view class="record">

		<view class="white-bg">
			<!-- 支出 和收入导航栏 -->
			<tab-bar :tabBars="tabBar" @tabClick="tabClick" :tabIndex="tabIndex"></tab-bar>

			<!-- 轮播图 -->
			<top-swiper @swiperChange="swiperChange" :currentIndex="tabIndex"></top-swiper>


			<!-- 账户选择 -->
			<user-choice @userChoice="userChoice" ></user-choice>

			<!-- 日期选择 -->
			<date-choice @dateChange="dateChange" @btnClick="btnClick" id="date-choice"></date-choice>


		</view>


	</view>
</template>

<script>
	import topSwiper from '../../components/content/record/topSwiper.vue';
	import tabBar from '../../components/common/tabBar.vue';
	import userChoice from '../../components/content/record/userChoice.vue'
	import dateChoice from '../../components/content/record/date-Choice.vue';
	import {dateFormat} from '../../common/util.js';
	export default {
		components: {
			topSwiper,
			tabBar,
			userChoice,
			dateChoice
		},
		data() {
			return {
				sumMoney: 0,
				tag: '备注',
				tabIndex: 0,
				isAdd:false,//是否为收入
				tabBar: [{
						id: 'zhichu',
						name: '支出'
					},
					{
						id: 'shouru',
						name: '收入'
					},
				],
				recordAllData: {
					moneyM: '支出', //钱的记录方式
					recordType: '餐饮', //默认为第一种类型
					userChoice: '现金', //记账账户选择类型
					currentDate: dateFormat("YYYY-mm-dd", new Date()), //目前的日期
					sumMoney: 0,
					tag: '备注',
					isAdd:false,
					icon_url:'../../../static/images/typeImages/type1.png'
				}
			};
		},

		methods: {
			// 导航栏点击
			tabClick(index) {
				this.tabIndex = index;
				switch (this.tabIndex) {
					case 0:
						this.recordAllData.moneyM = '支出';
						this.recordAllData.isAdd = false;
						break;

					case 1:
						this.recordAllData.moneyM = '收入';
						this.recordAllData.isAdd = true;
						break;
				}
			},
			swiperChange(index) {
				this.tabIndex = index;
				switch (this.tabIndex) {
					case 0:
						this.recordAllData.moneyM = '支出';
						this.recordAllData.isAdd = false;
						break;

					case 1:
						this.recordAllData.moneyM = '收入';
						this.recordAllData.isAdd = true;
						break;
				}
			},

			userChoice(name) {
				this.recordAllData.userChoice = name;

			},

			// 日期获取
			dateChange(date) {
				this.recordAllData.currentDate = date;
			},
			// 获取填写的信息并发送
			btnClick(info) {
				this.recordAllData.sumMoney = info.sumMoney;
				this.recordAllData.tag = info.tag;

				uni.showLoading({
					title: '保存中...'
				})
				// 调用云函数
				wx.cloud.callFunction({
					name: 'add_record',
					data: this.recordAllData

				}).then(res => {
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							title: '保存成功'
						})
						
						
						// 重置
						this.tabIndex = 0;
						this.recordAllData = {
							moneyM: '支出', //钱的记录方式
							recordType: '餐饮', //默认为第一种类型
							userChoice: '现金', //记账账户选择类型
							currentDate: dateFormat("YYYY-mm-dd", new Date()), //目前的日期
							sumMoney: 0,
							tag: '备注',
							icon_url:'../../../static/images/typeImages/type1.png',
							isAdd:false
						}
						
						
						// 重置数据
						uni.$emit('userChoiceReset')
						uni.$emit('dateReset')
						uni.$emit('typeReset')
					}, 1000)

					
				// 	// const query = uni.createSelectorQuery().in(this);
				// 	// query.select('#date-choice').boundingClientRect(data => {
				// 	// 	console.log("得到布局位置信息", data);

				// 	// }).exec();

				})
			}
		},
		onShow() {
			uni.$on('typeClick', (name,index) => {
				this.recordAllData.recordType = name;
				this.recordAllData.icon_url = `../../../static/images/typeImages/type${index + 1}.png`
			})

			
		},

	}
</script>

<style lang="scss" scoped>
	.record {

		padding: 25rpx;

		.white-bg {

			height: 500rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 30rpx;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

			.top-tabBar {

				border-radius: 10rpx;
				width: 300rpx;
				border: 2rpx solid #FEDB5A;
				margin: 0 auto;

				position: relative;
				top: 30rpx;
				background-color: #FFFFFF;
				color: #FEDB5A;

				// 激活样式
				.active {}
			}
		}
	}
</style>
