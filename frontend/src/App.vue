<template>
    <Header />
    <div class="block sm:flex">
      <div class="left-menu hidden sm:block">
        <Menu></Menu>
      </div>
      <div class="app-content sm:sds" :style="`width: calc(100vw - ${leftMenuStyle.width})`">
        <RouterView>
        </RouterView>
      </div>
    </div>
  <MenuTabs></MenuTabs>
</template>

<script setup lang="ts">
import Header from './views/Header/index.vue'
import MenuTabs from './views/MenuTabs.vue';
import Menu from './views/Menu/index.vue';
import { onBeforeMount, onUnmounted, reactive } from 'vue';
import { StyleType, } from './types'

let leftMenuStyle = reactive<Pick<StyleType, "width">>({
  width: '0px'
})

const onResize = () => {
  const leftMenu = document.querySelector('.left-menu') ?
  document.querySelector('.left-menu') : null
  if(leftMenu) {
    const style = getComputedStyle(leftMenu)
    console.log(style.width);
    leftMenuStyle = {
      width: style.width,
    }
  }
}

onBeforeMount(() => {
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped lang="less">
.header {
  height: 50px;
}
.left-menu {
    width: 110px;
    height: calc(100vh - 50px);
}
.app-content {
    flex: 1;
    height: calc(100vh - 50px);
    overflow: auto;
}
//;
//
</style>
