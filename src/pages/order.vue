<template>
  <div class="order">
    <div class="order_header">
      <router-link to="/home/user">
          <img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" />
      </router-link>
      <span>订单列表</span>
    </div>
    <div class="dingdan">
      <div class="img_null">
        <img src="https://s4.ax1x.com/2021/12/14/oviVyD.png" alt="" />
      </div>
      <div class="text_null">您最近还没有新订单，赶快去下一单吧</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.order {
  width: 100%;
  .order_header {
    height: 50px;
    line-height: 50px;
    background-color: darkorange;
    text-align: center;
    position: relative;
    img {
      width: 30px;
      position: absolute;
      left: 8px;
      top: 10px;
    }
    span {
      font-size: 20px;
      color: #f0f0f0;
    }
  }
  .dingdan {
      width: 100%;
      margin-top: 200px;
      .img_null {
          text-align: center;
          margin-bottom: 10px;
          img {
              width: 60px;
          }
      }
      .text_null {
          font-size: 18px;
          color: #707070;
          text-align: center;
      }
  }
}
</style>