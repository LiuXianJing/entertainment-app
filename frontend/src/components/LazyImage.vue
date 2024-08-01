<template>
    <img 
    ref="imgRef"
    :src="isVisible ? src : ''" 
    :style="style"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    @load="handleLoad"
    @error="handleError"
    >
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    style: {
        type: Object,
        required: false
    },
    alt: {
        type: String,
        required: false
    },
    width: {
        type: [Number, String],
        required: false,
        default: 100,
    },
    height: {
        type: [Number, String],
        required: false,
        default: 100,
    },
    description: {
        type: String,
        required: false
    },
})
const { src, style, alt, width, height, } = props

const imgRef = ref<HTMLImageElement | null>(null)

const isVisible = ref<boolean>(false)

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                isVisible.value = true
                observer.unobserve(entry.target as HTMLElement) // 图片只观察一次
            }
        })
    }, 
    { 
        threshold: 0.5 // 图片进入视口50%时触发
    })
    if(imgRef.value) {
        observer.observe(imgRef.value)
    }
})

const handleLoad = () => {
    console.log('Image loaded')
}

const handleError = () => {
    console.error('Image failed to load')
}

</script>