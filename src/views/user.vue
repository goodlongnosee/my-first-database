<template>
  <div class="user">
    <div class="poster">
      <div class="user_head">
        <img src="https://z3.ax1x.com/2021/11/10/INLvTO.jpg" alt="" />
      </div>
    </div>
    <div class="order">
      <div class="order_tit"><span>我的订单</span></div>
      <div class="order_content">
        <div class="movie">
          <div>
            <router-link to="/Order">
            <img src="https://s1.ax1x.com/2021/12/10/ooSG6S.png" alt="" />
            </router-link>
          </div>
          <p>电影</p>
        </div>
        <div class="store">
          <div>
            <router-link to="/Order">
              <img src="https://s4.ax1x.com/2021/12/06/os5hx1.png" alt="" />
            </router-link>
          </div>
          <p>商城</p>
        </div>
      </div>
    </div>
    <div class="other">
      <ul>
        <li><router-link to="/Discount">优惠卷</router-link><span>></span></li>
        <li><a href="#">折扣卡</a><span>></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  computed: {
    ...mapState(["userInfo"]),
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to,)
    next((vm) => {
      if (vm.userInfo) {
        next("/home/user");
      } else {
        next("/login");
      }
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  .poster {
    width: 100%;
    background-color: #ec8f1d;
    height: 120px;
    position: relative;
    .user_head {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top: -30px;
      img {
        width: 100%;
      }
    }
  }
  .order {
    width: 100%;
    padding: 10px 12px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    border-top: 10px solid #f0f0f0;
    border-bottom: 10px solid #f0f0f0;
    .order_tit {
      padding: 5px 0;
      text-align: center;
      font-size: 18px;
      span {
        position: relative;
        &::before,
        &::after {
          display: block;
          content: "";
          width: 50px;
          height: 1px;
          background-color: #e6e6e6;
          position: absolute;
          bottom: 50%;
          margin-top: -1px;
          border-radius: 5px;
        }
        &::before {
          left: -70px;
        }
        &::after {
          right: -70px;
        }
      }
    }
    .order_content {
      display: flex;
      justify-content: center;
      padding: 15px 0;
      .movie {
        div {
          background-color: darkorange;
        }
      }
      .store {
        div {
          background-color: green;
        }
      }
      > div {
        margin: 0 20px;
        p {
          padding-top: 5px;
          font-size: 18px;
          text-align: center;
          color: #505050;
        }
        div {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          padding: 11px 11px;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .other {
    width: 100%;
    // margin-top: 10px;
    ul {
      li {
        height: 30px;
        padding: 5px 12px;
        border-bottom: 1px solid #dfdfdf;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f6f6f6;
        a {
          display: block;
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
        }
        span {
          color: #ccc;
        }
      }
    }
  }
}
</style>