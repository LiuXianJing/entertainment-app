<template>
    <div class="mine-container">
        <div class="background">

        </div>
        <div class="simple-info">
            <div class="avatar-info">
                <div class="avatar-img">
                    <img src="../../assets/pictures/mdn.png" alt="">
                </div>
                <div class="name">
                    <span class="text">
                        Luxangn
                    </span>
                </div>
            </div>
            <div class="operate">
                查看主页>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.mine-container {
    .background {
        height: 15vh;
        background-image: url("../../assets/pictures/mdn.png");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .simple-info {
        display: flex;
        justify-content: space-between;
        height: 20%;
        padding: 20px 10vw;
        .avatar-info {
            .avatar-img {
                width: 20vw;
                height: 20vw;
                img {
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid #6cd3bc;
                }
            }
            .name {
                text-align: center;
            }
        }
    }
    .operate {

    }
}
</style>