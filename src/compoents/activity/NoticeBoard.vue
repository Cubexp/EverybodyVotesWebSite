<template>
  <div id="notice-board-wrapper" ref="noticeBoard">
    <ul id="notice-board">
      <li v-for="(item, index) in lists" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NoticeBoard',
  props: ['lists'],
  data() {
    return {
      timer: null
    }
  },
  methods: {
    move() {
        let _this = this;
        // 获取内容元素、内容区宽度、盒子宽度等
        let width = document.getElementById('notice-board') && document.getElementById('notice-board').scrollWidth
        let wrap = document.getElementById('notice-board-wrapper') && document.getElementById('notice-board-wrapper').offsetWidth
        let notice = document.getElementById('notice-board')
        console.log(width, wrap, notice)
        // 位移距离
        let speed = 0 
        // 设置位移
        _this.timer = setInterval(function () {
            speed = speed - 1
            // 如果位移超过文字宽度，则回到起点
            if (speed <= 0) {
                speed = wrap
            }
            notice.style.transform = 'translateX(' + speed + 'px)'
        }, 10)
        
        // 鼠标移入移除的滚动暂停事件
        this.$refs.noticeBoard.onmouseover = function () {
          clearInterval(_this.timer);
        }

        this.$refs.noticeBoard.onmouseout = function () {
          _this.timer = setInterval(function () {
            speed = speed - 1
            // 如果位移超过文字宽度，则回到起点
            if (speed <= 0) {
              speed = wrap
            }
            notice.style.transform = 'translateX(' + speed + 'px)'
          }, 10)
        }
    }
  },
  mounted() {
    this.move()
  },
  // 组件销毁之前清掉timer
  beforeDestroy() {
    clearInterval(this.timer)
  },
  // 缓存组件销毁之前清掉timer
  deactivated() {
    clearInterval(this.timer) 
  }
}
</script>

 <style scoped>
#notice-board-wrapper {
  font-size: 14px Base;
  color: red;
  overflow: hidden;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

#notice-board li {
    height: 100%;
    list-style: none;
    margin-right: 10px;
    display: inline-block;
}
</style>