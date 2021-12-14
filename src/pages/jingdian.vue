<template>
  <div class="jingdian">
    <div v-if="isLoading" class="loading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <ul>
      <li
        v-for="item in jindianList"
        :key="item.movieId"
        @click="getItem(item.movieId)"
      >
        <div class="img_box">
          <img :src="item.poster" alt="" />
        </div>
        <div class="movie_content">
          <div class="movie_tit">
            {{ item.movieInfo.title }}
          </div>
          <div v-if="item.movieInfo.englishTitle" class="movie_eng">
            {{ item.movieInfo.englishTitle }}
          </div>
          <div class="movie_cate">{{ item.movieInfo.actors }}</div>
          <div class="movie_date">{{ item.movieInfo.showInfo }}</div>
          <div class="score">
            <p v-if="!item.score">暂无评分</p>
            <p v-if="item.score">
              <span>{{ item.score }}</span
              >分
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="isFixedLoading" class="fixed_loading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Jingdian",
  data() {
    return {
      jindianList: [],
      limit: 1,
      isFixedLoading: false,
      isLoading: false,
      throt: null,
    };
  },
  methods: {
    ...mapMutations(["changeMovieDetail"]),
    getItem(valueId) {
      console.log(valueId);
      this.isLoading = true;
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/detail?movieid=${valueId}`)
        .then((res) => {
          //   console.log(res)
          this.changeMovieDetail(res.data);
          this.$router.push({ path: "/videoDetail" });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    myThrot() {
      if (this.throt !== null) {
        clearTimeout(this.throt);
      }
      this.throt = setTimeout(() => {
        this.bottomRef();
      }, 300);
    },
    bottomRef(e) {
      let scrollTop = window.scrollY;
      let windowHeight = window.innerHeight;
      let listHeight = document.body.clientHeight;
      //   console.log(scrollTop + windowHeight + "==" + listHeight);
      if (scrollTop + windowHeight >= listHeight) {
        this.limit += 1;
        this.getList();
      }
    },
    getList() {
      this.isFixedLoading = true;
      this.axios
        .get(
          `https://apis.netstart.cn/maoyan/index/moreClassicList?sortId=1&showType=3&limit=${
            this.limit * 10
          }&offset=0`
        )
        .then((res) => {
          this.isFixedLoading = false;
          this.jindianList = res.data;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
  },
  mounted() {
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.name)
    next((vm) => {
      if (to.name == "JingDian") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.jingdian {
  width: 100%;
  padding-bottom: 50px;
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      padding: 10px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      .img_box {
        flex-shrink: 0;
        width: 80px;
        height: 110px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      .movie_content {
        width: 75%;
        font-size: 14px;
        color: #909090;
        position: relative;
        > div {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .movie_tit {
          font-size: 18px;
          color: #000;
          font-weight: bold;
          width: 70%;
        }
        .movie_eng {
          width: 70%;
          margin: 7px 0;
        }
        .movie_cate {
          width: 70%;
          margin-bottom: 7px;
        }
        .movie_date {
          width: 70%;
        }
        .score {
          position: absolute;
          right: 0;
          top: 20px;
          text-align: right;
          p {
            color: #ccc;
            font-size: 15px;
            span {
              color: darkorange;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .loading {
    width: 40px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -20px;
    margin-top: -20p;
    img {
      width: 100%;
    }
  }
  .fixed_loading {
    width: 40px;
    position: fixed;
    bottom: 70px;
    left: 50%;
    margin-left: -20px;
    img {
      width: 100%;
    }
  }
}
</style>
