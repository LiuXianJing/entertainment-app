<template>
    <div class="menu-tabs-container flex sm:hidden">
        <div 
        v-for="item in menuItems" 
        :class="['menu-item text-red-100', 
        (activeMenuItem && item.path === activeMenuItem.path) ? 'active' : 'default']"
        @click="handleClickMenuItem(item)"
        >
          <router-link :to="`${item.path}`" class="router-link">
            <div class="icon">
                <span class="icon-span">
                    <grape v-if="item.name.toLocaleLowerCase() === 'game'" />
                    <VideoCamera v-if="item.name.toLocaleLowerCase() === 'video'" />
                    <chat-round v-if="item.name.toLocaleLowerCase() === 'chat'" />
                    <user v-if="item.name.toLocaleLowerCase() === 'mine'" />
                </span>
            </div>
            <div class="name">
                {{ item.name }}
            </div>
          </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, } from 'vue';
import { MenuItem } from '../types';
import { useRoute } from 'vue-router';
import {
    Grape,
    VideoCamera,
    ChatRound,
    User,
  } from '@element-plus/icons-vue';

const route = useRoute();

const menuItems = reactive<MenuItem[]>([
    {
        name: 'Game',
        path: '/game',
    },
    {
        name: 'Video',
        path: '/video'
    },
    {
        name: 'Chat',
        path: '/chat',
    },
    {
        name: 'Mine',
        path: '/mine'
    },
])
const handleClickMenuItem = (item: MenuItem) => {
    activeMenuItem.value = item
}

const activeMenuItem = ref<MenuItem>()
watchEffect(() => {
    activeMenuItem.value = route.path.length > 1 ?
    {
        name: route.name as string,
        path: route.path
    } : {
        name: 'Game',
        path: '/game'
    }
})
</script>

<style scoped lang="less">
.menu-tabs-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    .menu-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        .router-link {
            .icon {
                text-align: center;
                height: 25px;
                .icon-span {
                    display: inline-block;
                    width: 30px;
                }
            }
            .name {
                text-align: center;
            }
        }
        &:hover {
            background-color: #5369df;
        }
        &:not(:last-child) {
            border-right: #5369df solid 1px;
        }
    }
    .default {
        color: #fff;
        background-color: aquamarine;
    }
    .active {
        color: #4ee9bb;
        background-color: #5369df;
    }
}
</style>