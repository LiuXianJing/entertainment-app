<template>
    <div 
    :style="`transform: translateY(${videoContainerTransformInfo}px);`"
    class="short-video-container" 
    @touchstart="handleTouchStart"
    @touchmove="hadnleTouchMove"
    @touchend="handleTouchEnd"
    >
        <!-- <div class="header">
            <button>{{ videoName }}</button>
        </div> -->
        <div class="xxx">
            <p>弹幕</p>
            <p>jhgjhvfgdf gthtrhjyt gtrhtyg弹幕</p>
        </div>
        <video 
        ref="videoRef"
        :height="height"
        :width="width"
        :src="src"
        :controls="controls" 
        loop
        :poster="poster"
        >
        Your browser does not support the video tag.
        </video>
        <div class="video-play-cions">
            <span class="icon-span" @click="handlePlay">
                <video-play v-if="!isVideoPlay" />
                <VideoPause v-if="isVideoPlay" />
            </span>
        </div>
        <div 
        :style="`width: ${width};`" 
        class="footer" 
        >
            <div class="progress">
                <span class="time">
                    {{ `${transformToTime(videoTimeInfo.currentTime)} / ${transformToTime(videoTimeInfo.videoDuration)}` }}
                </span>
                <div class="box" :style="`width: ${width};`">
                    <div class="inner" :style="`width: ${progressInnerWidth};`">
                    </div>
                </div>
            </div>
            <div class="operate">
                
            </div>
        </div>
        <div 
        class="right-operate"
        >
            <div class="operate-item-group">
                <div class="operate-item user">
                    <div class="circle">
                        <User />
                    </div>
                </div>
                <div class="operate-item good">
                    <Opportunity style="" />
                </div>
                <div class="operate-item comment">
                    <Comment />
                </div>
                <div class="operate-item star">
                    <Star />
                </div>
            </div>
            <div class="other">
                <MoreFilled />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    defineProps, 
    onMounted, 
    reactive, 
    ref, 
    watch, 
    watchEffect, 
    ComputedRef,
    computed,
} from 'vue'
import { 
    VideoPlay,
    VideoPause,
    User,
    Opportunity,
    Comment,
    Star,
    MoreFilled,
 } from '@element-plus/icons-vue'
 import { transformToTime } from '../utils'

const props = defineProps({
    videoName: {
        type: String,
        required: false,
        default: 'Short Video'
    },
    src: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "100%",
    },
    controls: {
        type: Boolean,
        required: false,
        default: false,
    },
    poster: {
        type: String,
        required: false,
    },
})
const { src, controls, poster, height, width, } = props

const videoRef = ref<HTMLVideoElement | null>(null)

const videoTimeInfo = reactive({
    videoDuration: 0,
    currentTime: 0,
})

const progressInnerWidth: ComputedRef<string | number> = computed(() => {
    if(videoTimeInfo.videoDuration === 0) {
        return 0
    } else {
        return (videoTimeInfo.currentTime / videoTimeInfo.videoDuration * 100 + '%')
    }
})

const isVideoPlay = ref<boolean>(false)
watch(isVideoPlay, (newVal) => {
    if(videoRef.value) {
        if(newVal) {
            videoRef.value.play()
        } else {
            handleStop()
        }
    }
})

const isMuted = ref<boolean>(false) //是否静音
watchEffect(() => {
    if(videoRef.value) {
        videoRef.value.muted = isMuted.value
    }
})

onMounted(() => {
    if(videoRef.value) {
        videoRef.value.addEventListener('loadedmetadata', () => {
            videoTimeInfo.videoDuration = videoRef.value?.duration || 0
        })
        videoRef.value.volume = 0.1
        videoRef.value.addEventListener("timeupdate", () => {
            const currentTime: number = videoRef.value?.currentTime || 0
            videoTimeInfo.currentTime = currentTime
        })
    }
})

const touchVideoStartInfo = ref<number | null>(null)
const videoContainerTransformInfo = ref<number>(0)

const handleTouchStart = (event: any) => {
    const pageY: number = event.changedTouches[0].pageY
    if(touchVideoStartInfo.value === null) {
        touchVideoStartInfo.value = pageY
    }
}

const hadnleTouchMove = (event: any) => {
    const currentPageY: number = event.changedTouches[0].pageY
    if(touchVideoStartInfo.value === null) {
        return
    }
    const movePageY = (currentPageY - touchVideoStartInfo.value)
    videoContainerTransformInfo.value = movePageY
}

const handleTouchEnd = (event: any) => {
    const touchEndPageY: number = event.changedTouches[0].pageY
    const touchMove: number = 300
    if(touchVideoStartInfo.value === null) {
        return;
    }
    if((touchVideoStartInfo.value - touchEndPageY) >= touchMove) {
        console.log('next video');
    } else {
        videoContainerTransformInfo.value = 0
    }
    touchVideoStartInfo.value = null
}

const handlePlay = () => {
    isVideoPlay.value = !isVideoPlay.value
}

const handleStop = () => {
    if(videoRef.value) {
        videoRef.value.pause()
        console.log('currentTime==', videoRef.value.currentTime);
    }
}

const handleDownloadVideo = () => {
    if(videoRef.value) {
        const a = document.createElement("a")
        a.className = "temp-video-download"
        a.setAttribute("href", src)
        const srcPathsArr = src.split("/")
        a.download = srcPathsArr[srcPathsArr.length - 1]
        a.click()
        document.removeChild(a)
    }
}

</script>

<style scoped lang="less">
.short-video-container {
    position: relative;
    will-change: transform;;
    video {
        height: calc(100vh - 50px); // 50px为tabBar的高度
        background-color: #000000;
    }
    .video-play-cions {
        position: absolute;
        top: calc(50% - 30px);
        left: calc(50% - 30px);
        z-index: 10;
        .icon-span {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
    }
    .xxx {
        position: absolute;
        z-index: 10;
        padding: 20px;
    }
    .footer {
        position: absolute;
        bottom: -11px;
        padding: 10px;
        .progress {
            margin-bottom: 10px;
            .time {

            }
            .box {
                display: flex;
                position: relative;
                height: 4px;
                margin-top: 2px;
                background-color: rgb(234, 245, 245);
                .inner {
                    height: 4px;
                    background-color: rgb(255, 153, 0);
                }
            }
        }
        .operate {
            display: flex;
            justify-content: space-between;
            .item {
                button {
                    margin-right: 10px;
                    &:hover {
                        color: rgb(0, 195, 255);
                    }
                }
            }
        }
    }
    .right-operate {
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 70%;
        width: 14%;
        right: 10px;
        top: 30%;
        .operate-item-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            .operate-item {
                flex: 1;
            }
            .user {
                margin-bottom: 20px;
                .circle {
                    width: 100%;
                    height: auto;
                    border-radius: 20%;
                    background-color: gray;
                }
            }
        }
        .other {
            flex: 1;
            display: flex;
            align-items: end;
            margin-bottom: 30px;
            span {
                display: inline-block;
            }
        }
    }
}
</style>