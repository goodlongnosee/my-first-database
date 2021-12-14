<template>
  <nav class="videoList">
    <div v-if="jumpLoading" class="jump">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <div v-if="!isLoading" class="loading">
      <img src="https://s4.ax1x.com/2021/12/07/oc9Y8A.gif" alt="" />
    </div>
    <ul v-if="isLoading">
      <li @click="getItem(item.id)" v-for="item in videoList" :key="item.id">
        <div class="img_box">
          <!-- <img :src="item.img" alt="" /> -->
          <img src="https://img0.baidu.com/it/u=3347450064,1264909238&fm=26&fmt=auto" alt="" />
        </div>
        <div class="video_msg">
          <div class="video_title">{{ item.nm }}</div>
          <div v-if="item.sc" class="scode">
            观众评 <span>{{ item.sc }}</span>
          </div>
          <div v-if="!item.sc" class="no">暂无评分</div>
          <div v-if="item.sc == 0" class="wish">
            <span>{{ item.wish }}</span> 人想看
          </div>
          <div v-if="item.star" class="star">主演:{{ item.star }}</div>
          <div v-if="item.showInfo" class="showinfo">{{ item.showInfo }}</div>
          <div class="button">
            <button
              @click.stop="BuyTicket(item.id)"
              :style="`box-shadow:0 0 2px 2px ${item.showStateButton.shadowColor};background:${item.showStateButton.color};color:white`"
            >
              {{ item.showStateButton.content }}
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="fixLoading" class="fixLoading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
  </nav>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "videoList",
  props: {
    videoList: Array,
    isLoading: Boolean,
    fixLoading: Boolean,
  },
  data() {
    return {
      jumpLoading: false,
    };
  },
  methods: {
    ...mapMutations(["changeMovieDetail", "changeUserInfo", "changeBuyTicket","changeTicketDate"]),
    BuyTicket(videoId) {
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/intro?movieid=${videoId}`)
        .then((res) => {
          // console.log(res.data.data.movie)
          this.changeBuyTicket(res.data.data.movie);
        })
        .catch((err) => {
          console.log(err);
        }),
        this.axios
          .get(`https://apis.netstart.cn/maoyan/movie/showdays?movieId=${videoId}&cityId=20`)
          .then((res) => {
            // this.cinemaTime = res.data;
            // console.log(res.data.data.dates)
            this.changeTicketDate(res.data.data.dates)
          })
          .catch((err) => {
            console.log("获取失败", err);
          });
      this.$router.push({ path: "/BuyTicket" });
    },
    getItem(videoId) {
      this.jumpLoading = true;
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/detail?movieid=${videoId}`)
        .then((res) => {
          this.changeMovieDetail(res.data);

          this.$router.push({ path: "/videoDetail" });
          this.jumpLoading = false;
        })
        .catch((err) => {
          console.log("获取失败");
        });
      // console.log(videoId)
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.changeUserInfo(userInfo);
    }
  },
};
</script>
<style lang="less" scoped>
.videoList {
  position: relative;
  top: -20px;
  left: 0;
  z-index: 0;
  background-color: #fff;
  border-top: 12px solid #f0f0f0;
  padding-bottom: 30px;
  .jump {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    img {
      width: 100%;
    }
  }
  .loading {
    width: 100%;
    text-align: center;
    img {
      width: 200px;
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      .img_box {
        width: 90px;
        height: 110px;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid #ccc;
        img {
          width: 100%;
          height: 110px;
        }
      }
      .video_msg {
        flex-basis: 80%;
        height: 110px;
        font-size: 14px;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        .video_title {
          font-size: 19px;
          font-weight: bold;
        }
        .scode {
          margin: 7px 0;
          span {
            color: darkorange;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .wish {
          span {
            font-size: 16px;
            font-weight: bold;
            color: darkorange;
          }
        }
        .star {
          margin: 0 0 7px 0;
          width: 70%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .button {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -15px;
          z-index: 100;
          button {
            border-radius: 20px;
            font-size: 15px;
            padding: 4px 15px;
          }
        }
      }
    }
  }
  .fixLoading {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    position: fixed;
    bottom: 80px;
    left: 50%;
    margin-left: -20px;
    box-shadow: 0 0 10px 5px #fff;
    img {
      width: 40px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>