<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">二级联动菜单</router-link> |
      <router-link to="/about">From表单组件</router-link> 
      <router-view></router-view> 
    </nav> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
  /*看板娘初始化
    参数说明
    model 模型的配置
       json 文件资源路径，可以支持网络路径，此处使用的是相对路径
       scale 模型缩放系数
    display 模型布局
       position 位置
       width 宽度
       height 高度
       hOffset 水平偏移量
       vOffset 垂直偏移量
    mobile 移动端配置
       show 显示/隐藏
       scale 缩放比例
    react 模型矩形框样式
       opacity 透明度
       opacityDefault 默认透明度
       opacityOnHover 鼠标悬浮透明度
  */
  // created() {
  //   setTimeout(() => {
  //     window.L2Dwidget.init({
  //       pluginRootPath: '../live2dw/',
  //       pluginJsPath: 'lib/',
  //       pluginModelPath: 'live2d-widget-model-hibiki/assets/', //中间这个hibiki就是你的老婆,想换个老婆,换这个就可以了
  //       tagMode: false,
  //       debug: false,
  //       model: { jsonPath: '../live2dw/live2d-widget-model-hibiki/assets/hibiki.model.json' },
  //       display: { position: 'right', width: 300, height: 600 },  //调整大小,和位置
  //       mobile: { show: true },   //要不要盯着你的鼠标看
  //       log: false,
  //     })
  //   }, 1000)
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
