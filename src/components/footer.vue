<template>
  <div class="tt_footer">
    <div class="footer">
      <router-link @click.native="getIndex(0)" to="/home/homepage/hotvideo"
        ><img
          :src="routerIndex == 0 ? routerList[0].src2 : routerList[0].src"
          alt=""
        />
        <div>电影/影院</div></router-link
      >
      <router-link @click.native="getIndex(1)" to="/home/video"
        ><img
          :src="routerIndex == 1 ? routerList[1].src2 : routerList[1].src"
          alt=""
        />
        <div>视频</div></router-link
      >
      <router-link @click.native="getIndex(2)" to="/home/minivideo"
        ><img
          :src="routerIndex == 2 ? routerList[2].src2 : routerList[2].src"
          alt=""
        />
        <div>小视频</div>
      </router-link>
      <router-link to="/show"
        ><img src="https://s4.ax1x.com/2021/12/06/os5f2R.png" alt="" />
        <div>演出</div></router-link
      >
      <router-link @click.native="getIndex(3)" to="/home/user"
        ><img
          :src="routerIndex == 3 ? routerList[3].src2 : routerList[3].src"
          alt=""
        />
        <div>我的</div></router-link
      >
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
  name: "Footer",
  data() {
    return {
      index: 0,
      routerList: [
        {
          src: "https://s4.ax1x.com/2021/12/06/os5DK0.png",
          src2: "https://s4.ax1x.com/2021/12/06/os5rrV.png",
        },
        {
          src: "https://s4.ax1x.com/2021/12/06/os57VO.png",
          src2: "https://s4.ax1x.com/2021/12/06/os5HaD.png",
        },
        {
          src: "https://s4.ax1x.com/2021/12/06/os5g54.png",
          src2: "https://s4.ax1x.com/2021/12/06/os5RPJ.png",
        },
        {
          src: "https://s4.ax1x.com/2021/12/06/os55Kx.png",
          src2: "https://s4.ax1x.com/2021/12/06/os5Ir6.png",
        },
      ],
    };
  },
  methods: {
    // .native 
    // - 主要是给自定义的组件添加原生事件
    // 可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签
    // 并且该修饰符对普通HTML标签是没有任何作用的。
    ...mapMutations(['changeRouterIndex']),
    getIndex(i) {
        // this.index = i;
        this.changeRouterIndex(i);
    },
  },
  computed:{
    ...mapState(['routerIndex'])
  }
};
</script>
<style lang="less" scoped>
.tt_footer {
  height: 56px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  .footer {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -2px 10px 2px #ccc;
    padding: 2px 0;
    border-top: 1px solid #ccc;
    a {
      display: block;
      flex-grow: 1;
      font-size: 12px;
      text-align: center;

      img {
        width: 24px;
        &.active {
        }
      }
    }
  }
}
</style>