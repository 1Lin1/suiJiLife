<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 云开发设置
			if (!wx.cloud) {
				console.error('请使用 2.23 或以上基础库使用云能力')
			} else {
				wx.cloud.init({
					traceUser: true,
					env: 'lin-serve-lh' //环境id
				})
				console.log('云开发初始化成功')
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	body{
		// 淘宝字体
		font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
	}

	/*每个页面公共css */

	/* 官方uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/css/uni.css';

	/* 引入阿里图标 */
	@import './common/css/iconfont.css';

	/* 引入最新阿里图标 */
	@import './common/newiconfont/iconfont.css';

	/* 引入动画库 */
	@import './common/css/animate.css';

	/* // 引入自定义样式 */
	@import './common/css/common.css';
</style>
