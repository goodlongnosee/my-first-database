<template>
  <div class="discount">
    <div class="discount_header">
      <router-link to="/home/user">
          <img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" />
      </router-link>
      <span>我的优惠卷</span>
    </div>
    <div class="form">
      <div>
        <input v-model="discountPassword" type="text" placeholder="请输入优惠卷密码">
        <button @click="addDiscount">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Discount",
  data(){
    return {
      discountPassword:""
    }
  },
  methods:{
    addDiscount(){
      if(this.discountPassword.length == 0 || this.discountPassword == " "){
        console.log("请输入优惠卷密码!")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.discount {
  width: 100%;
  .discount_header {
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
  .form {
    width: 100%;
    padding: 10px 12px;
    box-sizing: border-box;
    input {
      width: 70%;
      height: 22px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding-left: 8px;
      margin-right: 5px;
    }
    button {
      background-color: transparent;
      color: darkorange;
      font-size: 16px;
    }
  }
}
</style>