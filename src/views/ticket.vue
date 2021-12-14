<template>
  <div class="buy_ticket">
    <div v-if="isLoading" class="isLoading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <div
      :style="`background:${buyTicket.backgroundColor};`"
      class="video_detail"
      @click="getItem(buyTicket.id)"
    >
      <div class="video_poster">
        <img :src="buyTicket.videoImg" alt="" />
      </div>
      <div class="video_content">
        <div class="video_nm">{{ buyTicket.nm }}</div>
        <div v-if="buyTicket.enm" class="video_enm">{{ buyTicket.enm }}</div>
        <div class="video_score">
          <span>{{ buyTicket.sc }}</span> ({{ buyTicket.snum }}万人评)
        </div>
        <div class="video_cate">{{ buyTicket.cat }}</div>
        <div class="video_region">
          {{ buyTicket.src }}/{{ buyTicket.dur }}分钟
        </div>
        <div class="video_upshow">{{ buyTicket.pubDesc }}</div>
        <div class="jump_detail">
          <img src="https://s4.ax1x.com/2021/12/07/oc8WVS.png" alt="" />
        </div>
      </div>
    </div>
    <div class="play_time">
      <ul>
        <li
          @click="getDate(item.date)"
          v-for="(item, index) in ticketDate"
          :key="index"
          :class="active == item.date ? 'active' : ''"
        >
          {{ item.date }}
        </li>
      </ul>
    </div>
    <div class="play_cinema">
      <div class="screen">
        <ol>
          <li @click="toggleIndex(0)" :class="tog==0?'active':''"><a href="#">全城</a><span></span></li>
          <li @click="toggleIndex(1)" :class="tog==1?'active':''"><a href="#">品牌</a><span></span></li>
          <li @click="toggleIndex(2)" :class="tog==2?'active':''"><a href="#">筛选</a><span></span></li>
        </ol>
      </div>
      <div v-if="cinema_loading" class="cinema_loading">
        <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
        <span>正在加载...</span>
      </div>
      <div class="cinema_list">
        <ul>
          <li v-for="item in cinemaList" :key="item.id">
            <div class="cinema_nm">
              <span>{{ item.name }}</span
              ><i
                ><b>{{ item.sellPrice }}</b> 元起</i
              >
            </div>
            <div class="address">{{ item.addr }}</div>
            <div class="chara">
              <ol>
                <li
                  v-for="(item, index) in item.labels"
                  :key="index + 100"
                  :style="`border:1px solid ${item.color};color:${item.color};`"
                >
                  {{ item.name }}
                </li>
              </ol>
            </div>
            <div v-if="item.promotion.cardPromotionTag" class="car">
              <i>卡</i>
              <span>{{ item.promotion.cardPromotionTag }}</span>
            </div>
            <div class="numb">{{ item.showTimes }}</div>
          </li>
        </ul>
      </div>
      <div v-if="fixLoading" class="fixLoading">
        <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Ticket",
  data() {
    return {
      cinemaTime: [],
      active: "",
      cinemaList: [],
      limit: 2,
      isLoading: false,
      cinema_loading: false,
      fixLoading: false,
      throt: null,
      tog:0
    };
  },
  methods: {
    ...mapMutations(["changeMovieDetail"]),
    toggleIndex(index){
        this.tog = index;
    },
    myThrot() {
      if (this.throt !== null) {
        clearTimeout(this.throt);
      }
      this.throt = setTimeout(() => {
        this.bottomRef();
      }, 500);
    },
    bottomRef(e) {
      let scrollTop = window.scrollY;
      let windowHeight = window.innerHeight;
      let listHeight = document.body.clientHeight;
      if (scrollTop + windowHeight >= listHeight) {
        this.fixLoading = true;
        this.limit++;
        this.getCinemaList();
      }
    },
    getItem(videoId) {
      this.isLoading = true;
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/detail?movieid=${videoId}`)
        .then((res) => {
          this.changeMovieDetail(res.data);

          this.$router.push({ path: "/videoDetail" });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    getDate(date) {
      this.active = date;
      this.getCinemaList();
    },
    getCinemaList() {
      this.cinema_loading = true;
      this.axios
        .get(
          `https://apis.netstart.cn/maoyan/movie/select/cinemas?limit=${this.limit * 10}&showDate=${
            this.active
          }`
        )
        .then((res) => {
          //   console.log(res.data.data);
          this.cinemaList = res.data.data.cinemas;
          this.cinema_loading = false;
          this.fixLoading = false;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
  },
  computed: {
    ...mapState(["buyTicket", "ticketDate"]),
  },
  mounted() {
    let date = new Date();
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    this.active = `${yy}-${mm}-${dd}`;
    //   console.log(this.buyTicket)
    // this.active = this.ticketDate[0].date;
    this.getCinemaList();
    // console.log(this.buyTicket)
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.name)
    next((vm) => {
      if (to.name == "Ticket") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.buy_ticket {
  width: 100%;
  .isLoading {
    width: 30px;
    position: fixed;
    top: 70px;
    left: 50%;
    margin-left: -15px;
    z-index: 1;
    img {
      width: 100%;
    }
  }
  .video_detail {
    width: 100%;
    padding: 12px 15px;
    box-sizing: border-box;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    .video_poster {
      width: 30%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .video_content {
      width: 70%;
      position: relative;
      left: 10px;
      color: #bdbdbd;
      font-size: 14px;
      .video_nm {
        font-size: 22px;
        color: #fff;
        margin-bottom: 4px;
      }
      .video_score {
        margin-top: 4px;
        span {
          font-size: 19px;
          color: darkorange;
        }
      }
      .video_cate {
        margin: 4px 0;
      }
      .video_region {
        margin-bottom: 4px;
      }
      .jump_detail {
        width: 25px;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -22px;
        transform: rotate(180deg);
        img {
          width: 100%;
        }
      }
    }
  }
  .play_time {
    width: 100%;
    overflow: scroll;
    height: 50px;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      li {
        flex-shrink: 0;
        font-size: 15px;
        color: #909090;
        padding: 7px 16px;
        &.active {
          color: darkorange;
          border-bottom: 3px solid darkorange;
        }
      }
    }
  }
  .play_cinema {
    position: relative;
    top: -13px;
    background-color: #fff;
    .screen {
      width: 100%;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      ol {
        display: flex;
        justify-content: space-around;
        li {
          flex-grow: 1;
          text-align: center;
          padding: 7px 0;
          font-size: 15px;
          color: #555555;
          position: relative;
          a {
            display: block;
          }
          &:nth-of-type(2) {
            a {
              border-left: 1px solid #ccc;
              border-right: 1px solid #ccc;
            }
          }
          &.active {
            a {
              color: #f00;
            }
            span {
              border-top: 5px solid #f00;
              transform: rotate(180deg) translateY(7px);
            }
          }
          span {
            position: absolute;
            right: 28px;
            top: 50%;
            display: block;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-top: 5px solid #555555;
          }
        }
      }
    }
    .cinema_loading {
      width: 100%;
      position: absolute;
      top: 20px;
      left: 0;
      z-index: 101;
      text-align: center;
      img {
        width: 20px;
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        vertical-align: middle;
      }
    }
    .cinema_list {
      width: 100%;
      ul {
        > li {
          font-size: 14px;
          padding: 10px 12px;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          color: #5e5e5e;
          .cinema_nm {
            font-size: 18px;
            color: #000;
            position: relative;
            margin-bottom: 7px;
            i {
              position: absolute;
              right: 0;
              top: 35px;
              font-size: 14px;
              color: #f00;
              b {
                font-size: 18px;
              }
            }
          }
          .address {
          }
          .chara {
            margin: 5px 0;
            ol {
              display: flex;
              flex-wrap: wrap;
              li {
                padding: 1px 3px;
                color: darkorange;
                border: 1px solid darkorange;
                border-radius: 3px;
                margin-right: 4px;
                margin-bottom: 3px;
              }
            }
          }
          .car {
            margin-bottom: 5px;
            i {
              display: inline-block;
              background-color: deepskyblue;
              border-radius: 4px;
              color: #fff;
              padding: 1px 2px;
              vertical-align: middle;
              margin-right: 2px;
            }
            span {
              vertical-align: middle;
            }
          }
          .numb {
          }
        }
      }
    }
  }
  .fixLoading {
    width: 30px;
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -15px;
    z-index: 101;
    img {
      width: 100%;
    }
  }
}
</style>