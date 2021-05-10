<template>
  <div class="error_404">
    <div class="error_row">
         <img :src="require('@/assets/image/401.png')" alt="" class="error_image" />
         <p class="color-gray">Sorry...你没有权限访问这个网页</p>
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
