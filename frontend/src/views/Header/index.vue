<template>
    <div class="header hidden sm:flex">
      <div class="title">
        <span>
            Entertainment App
        </span>
      </div>
    </div>
</template>

<style scoped lang="less">
.header {
    padding: 10px;
    border-bottom: 1px solid gray;
    .title {
        width: 20%;
        height: 30px;
        line-height: 30px;
        background-color: aqua;
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
        text-align: center;
        font-size: 16px;
        color: #ee1189;
        span {
            display: inline-block;
            height: 100%;
            background-color: blue;
        }
    }
}
</style>