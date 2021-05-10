<template>
    <div class="error">
        <router-view></router-view>
        <div class="link">
            <el-row>
                <el-button type="success" @click="$router.push('/')">返回首页</el-button>
            </el-row>
        </div>
    </div>
</template>


<style>
    .error {
        position: flixed;
        padding: 100px 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
</style>