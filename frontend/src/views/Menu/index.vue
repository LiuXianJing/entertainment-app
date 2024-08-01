<template>
    <el-row class="tac">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="game"
          text-color="#fff"
          @open="handleClick"
        >
          <el-menu-item index="game">
            <el-icon><Grape /></el-icon>
            <span>Game</span>
          </el-menu-item>
          <el-menu-item index="video">
            <el-icon><video-camera /></el-icon>
            <span>Video</span>
          </el-menu-item>
          <el-menu-item index="chat">
            <el-icon><ChatRound /></el-icon>
            <span>Chat</span>
          </el-menu-item>
          <el-menu-item index="mine">
            <el-icon><User /></el-icon>
            <span>Mine</span>
          </el-menu-item>
        </el-menu>
    </el-row>
</template>
  
<script lang="ts" setup>
import { useRouter } from "vue-router"
import {
  Grape,
  VideoCamera,
  ChatRound,
  User,
} from '@element-plus/icons-vue'

const router = useRouter()
const handleClick = (key: string, keyPath: string[]) => {
  console.log(key,keyPath);
  router.push(key)
}

</script>

<style scoped lang="less">
.tac {
    height: 100%;
}
</style>
  