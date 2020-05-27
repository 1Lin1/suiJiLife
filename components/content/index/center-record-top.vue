<template>
	<view class="top-title ">
		<view class="content u-f-ajs">
			<view class="left-co u-f-aje">
				<view class="desc">
					<view class="uni-input desc">{{date}}</view>
				</view>
				<view class="desc">收入 </view>
				<view class="desc">{{addMoney | filterPrice}}</view>
				<view class="desc">支出 </view>
				<view class="desc">{{payMoney | filterPrice}}</view>
				
			</view>
			
			<view class="right-icon">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="icon iconfont icon-gengduo1">
			
					</view>
				</picker>
			</view>
		</view>

		<view class="isToday" v-if="isToday">今天</view>
	</view>
</template>

<script>
	import {dateFormat} from '../../../common/util.js'
	export default {
		data() {
			
			return {
				date: dateFormat("YYYY-mm-dd", new Date()),
				addMoney:0,//收入
				payMoney:0,//支出
			}
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			
			// 判断是否为今天
			isToday(){
				return this.date === dateFormat("YYYY-mm-dd", new Date())
			}
		},
		
		mounted(){
			uni.$on('centerRecordTotalM',(addMoney,payMoney) => {
				this.addMoney = addMoney;
				this.payMoney = payMoney
			})
		},
		methods: {
			
			// 日期格式转换
			
			
			// 日期改变
			bindDateChange: function(e) {
				this.date = e.target.value
				uni.$emit('indexDateChange',this.date)
			},
			// 获取日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		
		  filters:{
		      filterPrice(price){
		       return parseInt(price).toLocaleString();
		      }
		    }
	}
</script>

<style lang="scss" scoped>
	.top-title {
		.left-co {
			flex: 9;

			.desc {
				font-size: $my-font-size-sm;
			}
		}

		.right-icon {
			flex:1;
			display: flex;
			flex-direction: row-reverse;
			padding-right: $my-padding-size;
		}
		
		.isToday{
			font-size: $my-font-size-sm;
			margin-left: 40rpx;
			font-weight: bold;
		}
	}
</style>
