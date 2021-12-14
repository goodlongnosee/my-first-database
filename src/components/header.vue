<template>
  <div class="tt_header">
    <div class="header">
      <div class="title">
        <h1>游娱电影</h1>
      </div>
      <div @click="isShow=!isShow" class="list_icon">
        <img src="https://s4.ax1x.com/2021/12/06/os56VU.png" alt="" />
        <nav v-if="isShow" class="list_box">
          <ul>
            <li><router-link @click.native="getI(0)" to="/home/homepage/hotvideo">首页</router-link></li>
            <li><router-link to="">榜单</router-link></li>
            <li><router-link to="">热点</router-link></li>
            <li><router-link to="">商城</router-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name:"Header",
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    ...mapMutations(['changeRouterIndex']),
    getI(i){
      // console.log(i)
      this.changeRouterIndex(i)
    }
  }
}
</script>
<style lang="less" scoped>
.tt_header {
  width: 100%;
  background-color: darkorange;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .header {
    height: 48px;
    line-height: 48px;
    width: 100%;
    .title {
      text-align: center;
      h1 {
        font-size: 20px;
        color: #fff;
      }
    }
    .list_icon {
      width: 40px;
      height: 48px;
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px 0 0 5px;
      box-sizing: border-box;
      img {
        width: 28px;
      }
      .list_box {
        position: absolute;
        top: 45px;
        right: 5px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 0 10px 1px #ccc;
        ul {
          width: 100px;
          li {
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            a {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>