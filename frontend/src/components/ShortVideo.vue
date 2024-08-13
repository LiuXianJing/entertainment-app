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
                <div class="operate-item comment" @click="handleClickCommentIcon">
                    <span class="icon">
                        <Comment />
                    </span>
                    <span class="text comments-number">
                        {{ transformNumber(videoCommentInfo.length) }}
                    </span>
                </div>
                <div class="operate-item star">
                    <Star />
                </div>
            </div>
            <div class="other" @click="handleClickMoreIcon">
                <MoreFilled />
            </div>
        </div>
        <el-drawer
        v-model="videoCommentDrawerVisible"
        direction="btt"
        :with-header="false"
        :append-to-body="true"
        size="60%"
        class="short-video-comment-drawer"
        >
            <div class="short-video-comment-drawer-container">
                <div class="header">
                    {{videoCommentInfo.length}}条评论!
                </div>
                <div class="comments">
                    <div class="group" v-for="group in videoCommentInfo">
                        <div class="avatar">
                            <span><User style="width: 20px;" /></span>
                            <span class="user-name">
                                {{ group.name }}
                            </span>
                        </div>
                        <div class="content">{{ group.content }}</div>
                        <div class="time">{{ group.time }}</div>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-drawer
        v-model="videoMoreDrawerVisible"
        direction="btt"
        :with-header="false"
        :append-to-body="true"
        size="30%"
        class="short-video-more-drawer"
        >
            <div class="short-video-more-drawer-container">
                <div class="operate-item">
                    <span class="icon">
                        <Share />
                    </span>
                    <span class="text">
                        Share
                    </span>
                </div>
                <div class="operate-item">
                    <span class="icon">
                        <CopyDocument />
                    </span>
                    <span class="text">
                        Copy
                    </span>
                </div>
                <div class="operate-item">
                    <span class="icon">
                        <Download />
                    </span>
                    <span class="text">
                        Down
                    </span>
                </div>
            </div>
        </el-drawer>
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
    Share,
    CopyDocument,
    Download,
 } from '@element-plus/icons-vue'
 import { 
    transformToTime, 
    transformNumber, 
} from '../utils'

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

const videoCommentDrawerVisible = ref<boolean>(false)
const handleClickCommentIcon = () => {
    videoCommentDrawerVisible.value = true
}

const videoCommentInfoArr = [
    {
        id: 'id-1',
        name: 'user-1',
        content: '这是一个不错的短视频！',
        time: '2022-08-15 18:00:00',
    },
    {
        id: 'id-2',
        name: 'user-2',
        content: '������！',
        time: '2022-08-15 17:30:00',
    },
    {
        id: 'id-3',
        name: 'user-3',
        content: '������',
        time: '2022-08-15 17:00:00',
    },
]
const videoCommentInfo = ref<object[]>(videoCommentInfoArr)

const videoMoreDrawerVisible = ref<boolean>(false)
const handleClickMoreIcon = () => {
    videoMoreDrawerVisible.value = true
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
            span {
                display: inline-block
            }
            .operate-item {
                flex: 1;
                position: relative;
                margin: 5px;
                span {
                    width: 100%;
                }
                .text {
                    position: absolute;
                    left: 0;
                    bottom: -5px;
                    text-align: center;
                }
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

.short-video-comment-drawer {
    .short-video-comment-drawer-container {
        color: #000000;
        .header {
            text-align: center;
            font-weight: bold;
        }
        .comments {
            .group {
                margin-bottom: 20px;
                .avatar {
                    display: flex;
                    align-items: start;
                    span {
                        display: inline-block;
                    }
                    .user-name {
                        margin-left: 10px;
                        color: rgb(174, 224, 35)
                    }
                }
                .content {
                    font-size: 18px;
                }
                .time {
                    font-size: 12px;
                }
            }
        }
    }
}

.short-video-more-drawer {
    .short-video-more-drawer-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        color: #000000;
        .operate-item {
            width: 15%;
            span {
                display: inline-block;
                width: 100%;
            }
            .icon {
                color: #b38989;
            }
            .text {
                text-align: center;
                height: 24px;
                text-overflow: ellipsis;
                word-break: break-all;
            }
        }
    }
}

</style>