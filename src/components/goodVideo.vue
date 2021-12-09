<template>
  <nav class="goodList">
    <div v-if="!isLoading" class="loading">
      <img src="https://s4.ax1x.com/2021/12/07/oc9Y8A.gif" alt="">
    </div>
    <h3>{{ goodList.title }}</h3>
    <ul v-if="isLoading">
      <li
        @click="getItem(item.movieId)"
        v-for="item in goodList.movieList"
        :key="item.movieId"
      >
        <div class="img_box">
          <img :src="item.poster" alt="" />
          <i>观众评分 {{ item.score }}</i>
        </div>
        <div class="video_name">
          {{ item.name }}
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "GoodVideo",
  props: {
    goodList: {
      type: Object,
    },
    isLoading:{
      type:Boolean
    }
  },
  methods: {
    ...mapMutations(["changeMovieDetail"]),
    getItem(valueId) {
      console.log(valueId);
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/detail?movieid=${valueId}`)
        .then((res) => {
          // console.log(res.data)
          this.changeMovieDetail(res.data);

          this.$router.push({ path: "/videoDetail" });
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
  },
};
</script>
<style lang="less" scoped>
.goodList {
  width: 100%;
  background-color: #fff;
  .loading {
    width: 100%;
    text-align: center;
    img {
      width: 200px;
    }
  }
  h3 {
    font-size: 15px;
    padding: 10px 12px;
    color: #4d4c4c;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: scroll;
    padding: 0 12px;
    box-sizing: border-box;
    li {
      flex-shrink: 0;
      width: 100px;
      margin-right: 10px;
      height: 190px;
      .img_box {
        width: 100%;
        position: relative;
        img {
          display: block;
          width: 100px;
          height: 130px;
          box-shadow: 0 0px 5px 2px #000 inset;
        }
        i {
          display: block;
          width: 100%;
          height: 20px;
          color: darkorange;
          font-weight: bold;
          font-size: 12px;
          position: absolute;
          bottom: 5px;
          left: 0;
          background-color: rgba(0, 0, 0, 0.1);
          padding-left: 5px;
          box-sizing: border-box;
        }
      }
      .video_name {
        width: 100%;
        height: 30px;
        margin: 5px 0;
        font-size: 15px;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>