// 获取月记录
export function _getRecordByCurrentMonth(date) {
				// 获取当前年份加月份
				// let date = dateFormat("YYYY-mm", new Date());
				// console.log('我是date',date)
				
				// 日期分割
				// let newDate = this.choiceCurrentDate.split("-")
				// newDate.splice(2,1)
				// let new2 = newDate.join("-")
				// date格式 2020-05
				// 调用云函数
				return new Promise((reslove,reject) => {
					wx.cloud.callFunction({
						name: 'get_RecordByCurrentMonth',
						data: {
							date: date
						}
					}).then(res => {
						reslove(res)
					})
				})
}