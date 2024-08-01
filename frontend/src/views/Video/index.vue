<template>
    <div class="video-container">
        <div class="header">
            <input type="text" placeholder="Please enter something">
        </div>
        <div class="content">
            <Video 
            :src="videoInfo.src" 
            :poster="videoInfo.poster"
            >
            </Video>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue" 
import Video from "../../components/Video.vue"

const videoInfo = reactive({
    src: "src/assets/videos/hairui.mp4",
    poster: "src/assets/pictures/mdn.png",
})

</script>

<style scoped lang="less">
.video-container {
    .header {
        input {
            width: 100%;
        }
    }
    .content {
        margin: 20px;
    }
}
</style>