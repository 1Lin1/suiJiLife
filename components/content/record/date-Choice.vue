<template>
	<view class="date-c">
		<view class="top u-f-ac ">
			<view class="date-l comon-t-l">
				日期
			</view>
			<view class="date-r ">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		<view class="center u-f-ac">
			<view class="money-l comon-t-l" >
				金额
			</view>
			<view class="money-r comon-margin-l">
				
				<input type="number" placeholder="请输入记账金额" 
				v-model.number="sumMoney" 
				maxlength="11">
			</view>
		</view>
		<view class="bottom u-f-ac">
			<view class="tag comon-t-l">
				备注
			</view>
			<view class="tag-input comon-margin-l">
				<input type="text" placeholder="请输入备注内容" v-model="tag">
			</view>
		</view>
		
		<button type="default" class="send-btn" @tap="btnClick">确认</button>
	</view>
</template>

<script>
	import {dateFormat} from '../../../common/util.js'
	export default {
		mounted() {
			// 数据重置
			uni.$on('dateReset',() => {
				this.date = dateFormat("YYYY-mm-dd", new Date())
				this.sumMoney = 0
				this.tag = '备注'
			})
		},
		data() {
			
			return {
				date:dateFormat("YYYY-mm-dd", new Date()),
				sumMoney:0,
				tag:'备注'
			}
		},
	
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		
		methods:{
			
			// 输入正则限制
			
			// 日期转换
			
			
			btnClick(){
				let sumMoney = Number(this.sumMoney);
				let tag = this.tag;
				let info = {
					sumMoney,
					tag
				}
				this.$emit('btnClick',info)
			},
			 bindDateChange: function(e) {
			            this.date = e.target.value
						this.$emit('dateChange',this.date)
			},
			
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
		}
	}
</script>

<style lang="scss" scoped>
	.date-c{
		.send-btn{
			margin-top: 25rpx;
			background-color: #FEDB5A;
		}
	}
	.comon-margin-l {
		margin-left: 50rpx;
	}
	
	.comon-t-l{
		margin-left: 30rpx;
	}
	.comon-font-s {
		font-size: 30rpx;
	}

	.date-c {
		margin-top: $mokuai-size;
		background-color: #FFFFFF;
		padding: 15rpx;
		border-radius: 30rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		.top{
			.date-r{
				margin-left: 28rpx;
			}
		}
	}
</style>
