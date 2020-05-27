<template>
	<view class="test">
		<button @click="onAdd">增加</button>
		<button @click="onQuery">查询</button>
		<button type="warn" @click="onRemove">删除</button>

		<button type="primary" @click="onUpdate">更新</button>
		<button type="default" @tap="sqlGet">数据库获取数据</button>
		<button type="default" @tap="yunGet">云函数获取数据</button>

		<button type="default" @tap="uploadImg">上传图片</button>


		<!-- <button @click="login">获取login</button>

		<button @click="testAdd">测试两个数相加</button>

		<button @click="getUpload">获取上传的文件</button> -->

		<view class="image">
			<image :src="imgSrc" mode="widthFix"></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: ''
			}
		},
		methods: {
			// 上传图片
			uploadImg() {
				// 上传视频
				
				// 上传图片
				// uni.chooseImage({
				//     count: 6, //默认9
				//     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				//     success: res => {
				//         console.log(res.tempFilePaths);

				// 		// 上传该图片
				// 		wx.cloud.uploadFile({
				// 		  cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
				// 		  filePath: res.tempFilePaths[0], // 小程序临时文件路径
				// 		  success: res => {
				// 		    // 返回文件 ID
				// 		    console.log(res.fileID)
				// 			this.imgSrc = res.fileID
				// 		  },
				// 		  fail: console.error
				// 		})
				//     }
				// });
			},
			// 数据库获取数据 一次最多只能获取二十条数据
			sqlGet(){
				const db = wx.cloud.database()
				db.collection('user').get()
				.then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 云函数获取数据 能获取全部数据
			yunGet() {
				wx.cloud.callFunction({
					name: 'getUser',
				}).then(res => {
					console.log(res.result)
				}).catch(err => {
					console.error(err)
				})

			},
			// 获取上传的文件
			// getUpload() {
			// 	wx.cloud.downloadFile({
			// 		fileID: 'cloud://lin-serve-lh.6c69-lin-serve-lh-1302184692/demo2.jpg', // 文件 ID
			// 		success: res => {
			// 			// 返回临时文件路径
			// 			console.log(res.tempFilePath)
			// 			this.imgSrc = res.tempFilePath
			// 		},
			// 		fail: console.error
			// 	})
			// },
			// testAdd() {
			// 	wx.cloud.callFunction({
			// 			// 云函数名称
			// 			name: 'add',
			// 			// 传给云函数的参数
			// 			data: {
			// 				a: 5,
			// 				b: 3,
			// 			},
			// 		})
			// 		.then(res => {
			// 			console.log(res.result) // 3
			// 		})
			// 		.catch(console.error)
			// },


			// login() {
			// 	wx.cloud.callFunction({
			// 			// 云函数名称
			// 			name: 'login',
			// 			// 传给云函数的参数
			// 		})
			// 		.then(res => {
			// 			console.log(res) // 
			// 		})
			// 		.catch(console.error)
			// },


			//新增
			onAdd() {
				const db = wx.cloud.database()
				db.collection('user').add({
					data: {
						name: "Rose",
						age: 38,
						sex: 'w'
					},
					success: res => {
						// 在返回结果中会包含新创建的记录的 _id
						uni.showToast({
							title: '新增记录成功',
						})
						console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
					},
					fail: err => {
						console.error('[数据库] [新增记录] 失败：', err)
					}
				})
			},

			// 查询
			onQuery() {
				const db = wx.cloud.database()
				const _ = db.command
				// 查询当前用户所有的 counters openid都相同  查询单个用id唯一
				db.collection('user').where({}).get({
					success: res => {
						console.log('[数据库] [查询记录] 成功: ', res)
					},
					fail: err => {
						wx.showToast({
							icon: 'none',
							title: '查询记录失败'
						})
						console.error('[数据库] [查询记录] 失败：', err)
					}
				})

			},

			// 删除
			onRemove() {
				const db = wx.cloud.database();
				db.collection('user').doc('5e847ab25ec378220141c60c3178792b').remove().then(res => {
					console.log('删除成功' + res)
				})
			},

			// 更新
			onUpdate() {
				// 若更新属性 不存在 则默认新增该字段
				const db = wx.cloud.database()
				const _ = db.command
				// 更新
				db.collection('user').doc('a9bfcffc5ec3828500d0fa517176b4be').update({
					data: {
						'money': 9999
					}
				}).then(res => {
					console.log(res + '年龄增大10岁')
				})
			}

		}
	}
</script>

<style>
</style>
