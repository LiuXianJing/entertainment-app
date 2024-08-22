<template>
    <div class="chat-container">
        <div class="messages-box">
            <div 
            :class="[
                'message-item', 
                {'mine': messageItem.ownerType === 'mine'},
                {'other': messageItem.ownerType === 'other'}
            ]" 
            v-for="messageItem in chatMessagesArr"
            >
                <div class="box">
                    <div class="owner">
                        {{ messageItem.owner }}
                    </div>
                    <div class="message">
                        {{ messageItem.content }}
                    </div>
                </div>
            </div>
        </div>
        <div class="operate">
            <textarea class="message-textarea" name="" id="" cols="" rows=""></textarea>
            <el-button type="primary" class="send-btn">发送</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { MessageType, } from "../types"

const props = defineProps({
    chatMessagesArr: {
        type: Array<MessageType>,
        required: true,
        default: []
    }
})

const { chatMessagesArr } = props
</script>

<style scoped lang="less">
.chat-container {
    .messages-box {
        .message-item {
            margin: 10px;
            .box {
                width: fit-content;
                border: 1px solid #ae4;
                border-radius: 50%;
                .owner {
                    width: 30px;
                    height: 30px;
                    background-color: rgb(35, 170, 69);
                    color: rgb(235, 128, 114);
                    border-radius: 50%;
                    text-overflow: clip;
                    overflow: hidden;
                }
                .message {
                    padding: 10px;
                    font-size: 20px;
                    color: aquamarine;
                }
            }
        }
        .mine {
            display: flex;
            justify-content: end;
            .box {
                display: flex;
                flex-direction: row-reverse;
            }
        }
        .other {
            .box {
                display: flex;
                justify-content: flex-start;
            }
        }
    }
    .operate {
        display: flex;
        justify-content: space-between;
        .message-textarea {
            width: 100vw;
            height: 5vh;
            color: #000;
        }
        .send-btn {
            height: 5vh;
        }
    }
}
</style>