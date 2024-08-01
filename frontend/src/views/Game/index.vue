<template>
    <div style="color: red;">
        game
    </div>
    <div class="cells">
        <div
        v-for="(row, rowIndex) in cellsArr"
        :key="rowIndex"
        class="row"
        >
            <div
            v-for="(col, colIndex) in row"
            :key="colIndex"
            class="col"
            >
                {{ col.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, } from 'vue'
import { GameCellsInfo } from '../../types';

const cellsArr = reactive<Array<Array<GameCellsInfo>>>([])
const initCellsArrFun = () => {
    const len = 10
    for (let i = 0; i < len; i++) {
        cellsArr.push([])            
        for (let j = 0; j < len; j++) {
            const cellInfo: GameCellsInfo = {
                text: `vs${i}-${j}`
            }
            cellsArr[i].push(cellInfo)            
        }        
    }
}
onBeforeMount(() => {
    initCellsArrFun()
})

</script>

<style scoped lang="less">
.cells {
    .row {
        display: flex;
        margin: 10px;
        .col {
            display: flex;
            width: 50px;
            height: 50px;
            margin: 10px;
            text-align: center;
            line-height: 50px;
            background-color: #aaee22;
        }
    }
}
</style>