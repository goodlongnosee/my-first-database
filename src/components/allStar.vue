<template>
  <nav class="allStar">
    <div class="return_btn">
      <button @click="returnUpPage">
        <img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" />
      </button>
      <p>全部演职人员</p>
    </div>
     <ul>
      <li v-for="(item, index) in allStar" :key="index">
        <img
          @click="showBigImg(item.avatar)"
          :src="item.avatar.replace(/\/w\.h/, '')"
          alt=""
        />
        <p v-if="item.cnm">{{item.cnm}}</p>
      </li>
    </ul>
    <div @click.stop="hideBigImg" v-if="isBig" class="big_img">
        <p></p>
      <img class="big" :src="imgUrl.replace(/\/w\.h/, '')" alt="" />
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ImgAll",
  data() {
    return {
      isBig: false,
      imgUrl: "https://s4.ax1x.com/2021/12/07/ocGds0.png",
    };
  },
  methods: {
    returnUpPage() {
      this.$router.go(-1);
    },
    showBigImg(url) {
      this.imgUrl = url;
      this.isBig = !this.isBig;
      setTimeout(() => {
        let _Top = document.querySelector(".big").offsetHeight / 2;
        document.querySelector(".big").style["marginTop"] = -_Top + "px";
      }, 10);
    },
    hideBigImg() {
      this.isBig = !this.isBig;
    },
  },
  computed: {
    ...mapState(["allStar"]),
  },
};
</script>

  
<style lang="less" scoped>
.allStar {
  width: 100%;
  .return_btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: darkorange;
    position: relative;
    button {
      position: absolute;
      left: 8px;
      top: 10px;
      background-color: transparent;
      img {
        width: 24px;
      }
    }
    p {
      text-align: center;
      font-size: 20px;
      color: white;
    }
  }
   ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    flex-wrap: wrap;
    li {
      flex-basis: 49.5%;
      flex-shrink: 0;
      position: relative;
      img {
        width: 100%;
      }
      p {
          width: 100%;
          position: absolute;
          bottom: 10px;
          left: 0;
          text-align: center;
          font-size: 18px;
          color: white;
      }
    }
  }
  .big_img {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    img {
      position: absolute;
      top: 50%;
      width: 100%;
    }
  }
}
</style>