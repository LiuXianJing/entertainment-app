<template>
    <div class="chat-page">
        <el-button 
        type="primary"
        @click="handleDisplayMedia"
        >
            共享屏幕
        </el-button>
        <Chat :chatMessagesArr="chatMessagesArr" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Chat from "../../components/Chat.vue"
import { MessageType, } from "../../types"

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

const messagesArrTemp: MessageType[] = []
for (let i = 0; i < 10; i++) {
    const obj: MessageType = {
        id: `id-${i}`,
        content: i + 'fdsgds',
        type: 'text',
        time: new Date(),
        ownerType:['mine', 'other'][i % 2] as any,
        owner: ['mine', 'other'][i % 2] as any,
    }
    messagesArrTemp.push(obj)
}
const chatMessagesArr = reactive<MessageType[]>(messagesArrTemp)
</script>

<style scoped lang="less">
.chat-page {
    padding: 5%;
}
</style>