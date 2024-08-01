<template>
    <Header />
    <div class="block sm:flex">
      <div class="left-menu hidden sm:block">
        <Menu></Menu>
      </div>
      <div class="app-content">
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

</script>

<style scoped lang="less">
.header {
  height: 50px;
}
.left-menu {
    width: 200px;
    height: calc(100vh - 50px);
}
.app-content {
    flex: 1;
    height: calc(100vh - 50px);
    padding: 10px 10px;
}
</style>
