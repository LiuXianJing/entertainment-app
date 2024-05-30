<template>
    <div>
        hello
        <el-button type="primary" @click="count++">count is {{ count }}</el-button>
        <div>
            {{ route.path }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.fullPath);

const count: Ref<number> = ref(0);
</script>