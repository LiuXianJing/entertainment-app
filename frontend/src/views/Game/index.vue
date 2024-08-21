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
                <LazyImage src="src/assets/pictures/mdn.png" alt="cell" />
                <span>{{ col.text }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, } from 'vue'
import { GameCellsInfo } from '../../types';
import LazyImage from '../../components/LazyImage.vue'; 

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
        flex-wrap: wrap;
        margin: 10px;
        .col {
            display: flex;
            flex-direction: column;
            width: 100px;
            height: 100px;
            margin: 4%;
            text-align: center;
            line-height: 50px;
            background-color: #aaee22;
        }
    }
}
</style>