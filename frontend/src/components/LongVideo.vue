<template>
    <div 
    class="video-container" 
    @mouseenter="handleMouseEnter"
    @mouseleave="hadnleMouseLeave"
    >
        <div class="header">
            <button>{{ videoName }}</button>
        </div>
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
        <div 
        v-if="isShowControls"
        :style="`width: ${width};`" 
        class="footer" 
        >
            <div class="progress">
                <span class="time">Time: {{ `${videoTimeInfo.currentTime} / ${videoTimeInfo.videoDuration}` }}</span>
                <div class="box" :style="`width: ${width};`">
                    <div class="inner" :style="`width: ${progressInnerWidth};`">
                    </div>
                    <div 
                    class="operate" 
                    :style="`left: ${progressInnerWidth}`"
                    >
                        X
                    </div>
                </div>
            </div>
            <div class="operate">
                <div class="item">
                    <span class="icon-span" @click="handlePlay">
                        <video-play v-if="!isVideoPlay" />
                        <VideoPause v-if="isVideoPlay" />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span" @click="handleAdjustRate('sub')">
                        <CaretLeft />
                    </span>
                    <span class="icon-span" @click="handleAdjustRate('plus')">
                        <CaretRight />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span" @click="handleMuted">
                        <Open v-if="!isMuted" />
                        <Close v-if="isMuted" />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span" @click="handleFullScreen">
                        <FullScreen />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span" @click="handleDownloadVideo">
                        <Download />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span" @click="handlePictureInPicture">
                        <PictureRounded />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-span print-screen" @click="handleCaptureVideoFrame">
                        <PictureFilled />
                    </span>
                </div>
                <div class="item">
                    <span class="icon-spa" @click="handleLockVideo">
                        <Lock />
                    </span>
                </div>
            </div>
        </div>
        <div 
        v-if="isShowControls"
        class="right"
        >
            <div class="operate">
                <div class="item">
                    <p @click="handleAdjustVolume('plus')">
                        Vol+
                    </p>
                    <p @click="handleAdjustVolume('sub')">
                        Vol-
                    </p>
                </div>
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
    CaretLeft,
    CaretRight,
    FullScreen,
    Download,
    PictureFilled,
    PictureRounded,
    Lock,
    Open,
    Close,
 } from '@element-plus/icons-vue'

const props = defineProps({
    videoName: {
        type: String,
        required: false,
        default: 'Long Video'
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
        default: "300px",
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
const { videoName, src, controls, poster, height, width, } = props

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

const isShowControls = ref<boolean>(false) //

const handleMouseEnter = () => {
    isShowControls.value = true
}

const hadnleMouseLeave = () => {
    isShowControls.value = false
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

const handleAdjustRate = (type: "plus" | "sub") => {
    if(videoRef.value) {
        let oldRate: number = videoRef.value.playbackRate //[0.5, 2]
        if(type == "plus" && oldRate <= (2 - 0.5)) {
            videoRef.value.playbackRate = oldRate + 0.5
        }
        if(type == "sub" && oldRate >= 0.5) {
            videoRef.value.playbackRate = oldRate - 0.5
        }
    }
 
}

const handleAdjustVolume = (type: "plus" | "sub") => {
    if(videoRef.value) {
        let oldVolume: number = videoRef.value.volume //[0, 1]
        if(type == "plus" && oldVolume <= (1 - 0.1)) {
            videoRef.value.volume = oldVolume + 0.1
        }
        if(type == "sub" && oldVolume >= 0.1) {
            videoRef.value.volume = oldVolume - 0.1
        }
    }
}

const handleFullScreen = () => {
    if(videoRef.value) {
        videoRef.value.requestFullscreen()
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

const handlePictureInPicture = () => {
    if(videoRef.value) {
        if(document.pictureInPictureElement === videoRef.value) {
            document.exitPictureInPicture()
            return
        }
        videoRef.value.requestPictureInPicture()
    }
}

const handleCaptureVideoFrame = () => {
    if(!videoRef.value) {
        return
    }
    const video = videoRef.value
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context?.drawImage(video, 0, 0, video.width, video.height)
    const imageDataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.className = "temp-video-capture-down-link"
    link.href = imageDataUrl
    link.download = `screenshot-${new Date().toLocaleDateString().replaceAll("/", "-")}.png`
    link.click()
}

const handleLockVideo = () => {
    if(videoRef.value) {
        if(document.pointerLockElement === videoRef.value) {
            document.exitPointerLock()
            return
        }
        videoRef.value.requestPointerLock()
    }
}

const handleMuted = () => {
    if(videoRef.value) {
        isMuted.value = !isMuted.value
    }
}

</script>

<style scoped lang="less">
.video-container {
    position: relative;
    .xxx {
        position: absolute;
        padding: 20px;
    }
    .footer {
        position: absolute;
        bottom: -11px;
        padding: 10px;
        .progress {
            margin-bottom: 2px;
            .time {

            }
            .box {
                display: flex;
                position: relative;
                height: 2px;
                background-color: blue;
                .inner {
                    height: 2px;
                    background-color: aqua;
                }
                .operate {
                    position: absolute;
                    bottom: -10px;
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
        }
        .operate {
            display: flex;
            justify-content: space-between;
            .item {
                .icon-span {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                }
                button {
                    margin-right: 10px;
                    &:hover {
                        color: rgb(0, 195, 255);
                    }
                }
            }
        }
    }
    .right {
        position: absolute;
        height: 50%;
        width: 8%;
        right: 10px;
        top: 30%;
        .operate {
            display: flex;
            flex-direction: column;
            height: 100%;
            .item {
                flex: 1;
                display: flex;
                flex-direction: column;
                p {
                    flex: 1;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>