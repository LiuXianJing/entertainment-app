<template>
    <div class="video-container">
        <div class="long-video-header hidden sm:block">
            <input 
            type="text" 
            placeholder="Please enter something"
            class=""
            >
        </div>
        <div class="long-video-content hidden sm:block">
            <LongVideo 
            :src="videoInfo.src" 
            :poster="videoInfo.poster"
            >
            </LongVideo>
        </div>
        <div class="short-video-header hidden sm:hidden">
            <input 
            type="text" 
            placeholder="Please enter something"
            class=""
            >
        </div>
        <div class="short-video-content block sm:hidden">
            <ShortVideo
            :src="videoInfo.src" 
            :poster="videoInfo.poster"
            >
            </ShortVideo>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue" 
import LongVideo from "../../components/LongVideo.vue"
import ShortVideo from "../../components/ShortVideo.vue"

const videoInfo = reactive({
    src: "src/assets/videos/hairui.mp4",
    poster: "src/assets/pictures/mdn.png",
})

</script>

<style scoped lang="less">
.video-container {
    .long-video-header {
        margin: 20px;
        input {
            width: 100%;
        }
    }
    .long-video-content {
        margin: 20px;
    }
}
</style>