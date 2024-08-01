<template>
    <div>
        chat
    </div>
    <div>
        <el-button 
        type="primary"
        @click="handleDisplayMedia"
        >
            共享屏幕
        </el-button>
    </div>
</template>

<script setup lang="ts">

const handleDisplayMedia = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
        ? "video/webm;codecs=h264"
        : "video/webm";
    const mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
    const chunks: any[] = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {
        chunks.push(e.data);
    });
    mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: chunks[0].type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video.webm";
        a.click();
    });
    mediaRecorder.start();
}
</script>