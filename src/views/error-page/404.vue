<template>
  <div class="error_404">
    <div class="error_row">
         <img :src="require('@/assets/image/404.png')" alt="" class="error_image" />
         <h1>Sorry...页面没有找到</h1>
         <p class="color-gray">似乎你所寻找的网页已移动或丢失了</p>
    </div>
  </div>
</template>

<style>
.error_404 {
  width: 100%;
  text-align: center;
}

.error_row {
    height: 100%;
}

.error_image {
    height: 350px;
}

.color-gray {
    color: #999!important;
    padding: 0 5px;
}
</style>
