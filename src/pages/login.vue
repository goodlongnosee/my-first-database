<template>
  <div class="login">
    <transition
      enter-to-class="animate__animated animate__fadeInDownBig"
      enter-active-class="animate__animated animate__fadeInDownBig"
      leave-to-class="animate__animated animate__fadeOutUpBig"
      leave-active-class="animate__animated animate__fadeOutUpBig"
    >
      <div :style="`top:${distanceY}px;`" v-if="isRandom" class="code_tip">
        <p>
          您的验证码是
          <span>{{ randomCode }}</span>
          ，请勿泄露您的验证码，如果不是您本人操作，那么您的手机号或已泄露。
        </p>
        <button
          @touchstart="myTouchStart"
          @touchmove="myTouchMove"
          @touchend="myTouchEnd"
        >
          <img src="https://s4.ax1x.com/2021/12/06/os56VU.png" alt="" />
        </button>
      </div>
    </transition>
    <div class="header_return">
      <p>
        <a href="/"
          ><img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" /></a
        ><span>游娱电影</span>
      </p>
    </div>
    <div class="form">
      <div>
        <input v-model="userAccout" type="text" placeholder="请输入手机号" />
        <button @click="getCode" class="sendCode">{{ downNum }}</button>
      </div>
      <div>
        <input v-model="userCode" type="text" placeholder="请输入短信验证码" />
      </div>
      <div>
        <button @click="userLogin" class="login_btn">登录</button>
      </div>
    </div>
    <div class="tip">
      <p>未注册的手机号将自动生成新账号</p>
      <p class="session">&copy; 游娱电影 客服电话: <span>100-100-1111</span></p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userAccout: "",
      userCode: "",
      randomCode: "",
      isRandom: false,
      isTouch: false,
      startY: 0,
      moveY: 0,
      distanceY: 0,
      timer: null,
      downNum: "发送验证码",
    };
  },
  methods: {
    ...mapMutations(["changeUserInfo","changeRouterIndex"]),
    myTouchStart(event) {
      this.isTouch = true;
      this.startY = event.touches[0].pageY;
    },
    myTouchMove(event) {
      if (this.isTouch) {
        this.moveY = event.touches[0].pageY;
        this.distanceY = this.moveY - this.startY;
        // console.log(this.distanceY);
        if (this.distanceY < -60) {
          this.isRandom = false;
        } else if (this.distanceY > 30) {
          this.distanceY = 30;
        }
      }
    },
    myTouchEnd() {
      this.distanceY = 0;
      this.isTouch = false;
    },
    myRandom() {
      return Math.floor(Math.random() * 100);
    },
    getCode() {
        if(this.userAccout.length !== 11){
            console.log('请输入正确的手机号');
            return;
        }
      if (this.downNum == "发送验证码" || this.downNum == "重新发送") {
        this.downNum = 60;
        this.timer = setInterval(() => {
          this.downNum--;
          if (this.downNum < 0) {
            this.downNum = "重新发送";
            clearInterval(this.timer);
          }
        }, 1000);
      }
      setTimeout(() => {
        let v1 = this.myRandom();
        let v2 = this.myRandom();
        v1 = v1 < 10 ? "0" + v1 : v1;
        v2 = v2 < 10 ? "0" + v2 : v2;
        this.randomCode = v1 + "" + v2;
        this.isRandom = true;
        setTimeout(() => {
          this.isRandom = false;
        }, 5000);
      }, 4000);
    },
    userLogin() {
      if (this.userAccout.length == 0 || this.userCode.length == 0) {
        console.log("输入框不能为空");
        return;
      }
      if(this.userCode !== this.randomCode){
          console.log("验证码输入有误")
          return;
      }
      if (
        this.userAccout == "13800000000" &&
        this.userCode == this.randomCode
      ) {
        this.changeUserInfo(true);
        localStorage.setItem("userInfo",true);
        this.changeRouterIndex(3);
        this.$router.push({path:"/home/user"})
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.downNum = "发送验证码";
    next();
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  .code_tip {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 15px 10px;
    color: #000;
    font-size: 16px;
    background-color: #e7e7e7;
    box-shadow: 0 -15px 5px 20px #e7e7e7;
    z-index: 1001;
    line-height: 30px;
    box-sizing: border-box;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    span {
      color: darkorange;
      text-decoration: underline;
      font-size: 20px;
    }
    button {
      display: block;
      background-color: transparent;
      margin: 10px auto 0;
      img {
        width: 40px;
        height: 20px;
      }
    }
  }
  .header_return {
    background-color: darkorange;
    height: 48px;
    line-height: 40px;
    p {
      text-align: center;
      position: relative;
      img {
        position: absolute;
        left: 8px;
        top: 10px;
        width: 26px;
        vertical-align: middle;
      }
      span {
        font-size: 20px;
        vertical-align: middle;
        color: #fff;
      }
    }
  }
  .form {
    width: 100%;
    padding-top: 10px;
    > div {
      width: 100%;
      height: 40px;
      padding: 0 14px;
      box-sizing: border-box;
      position: relative;
      input {
        width: 100%;
        padding-left: 5px;
        height: 30px;
        color: #909090;
        font-size: 18px;
        box-sizing: border-box;
        border-radius: 5px;
        border-bottom: 1px solid #f0f0f0;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
      .sendCode {
        padding: 2px 10px;
        position: absolute;
        right: 15px;
        top: 10px;
        color: #909090;
        background-color: #ccc;
        border-radius: 5px;
        &:active {
          color: #fff;
          background-color: #909090;
        }
      }
      .login_btn {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #909090;
        border-radius: 5px;
        &:active {
          background-color: #ccc;
          color: #fff;
        }
      }
    }
  }
  .tip {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    p {
      color: #ccc;
      font-size: 12px;
    }
    .session {
      color: #000;
      margin-top: 6px;
      span {
        color: #f00;
      }
    }
  }
}
</style>