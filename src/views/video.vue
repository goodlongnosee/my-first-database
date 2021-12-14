<template>
  <div class="video">
    <div v-if="isFirst" class="first">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <ul>
      <li v-for="(item, index) in videoList" :key="item.id">
        <div class="video_box">
          <div v-if="value == index ? false : true" class="video_tit">
            {{ item.title }}
          </div>
          <div v-if="value == index ? false : true" class="play_stop">
            <span></span>
          </div>
          <div class="video_link">
            <video
              @click="playStop(index)"
              v-if="item.video"
              :src="item.video.url"
            ></video>
            <img v-if="!item.video" :src="item.images[0].url" alt="" />
          </div>
          <div class="video_long">{{ item.video.time }}</div>
        </div>
        <div class="video_user">
          <div class="left">
            <img :src="item.user.avatarurl" alt="" />
            <span>{{ item.user.nickName }}</span>
          </div>
          <div class="right">
            <ol>
              <li @click="Good(item.id)">
                <!-- https://s4.ax1x.com/2021/12/07/oyvw1f.png -->
                <img
                  :src="
                    item.flag == false
                      ? 'https://s4.ax1x.com/2021/12/07/oyvd9P.png'
                      : 'https://s4.ax1x.com/2021/12/11/oT23sU.png'
                  "
                  alt=""
                />
                <span>{{ item.upCount }}</span>
              </li>
              <li @click="share(item.images[0].url, item.title)">
                <img src="https://s4.ax1x.com/2021/12/11/oTyrU1.png" alt="" />
                <span>{{ item.shareCount }}</span>
              </li>
            </ol>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="fixLoading" class="fixLoading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <div v-if="isShare" class="share_box">
      <div class="share_fix">
        <div class="share_tit">
          <span>分享到：</span><button @click="closeShare">x</button>
        </div>
        <div class="share_msg">
          <img :src="shareImg" alt="" />
          <span>{{ shareTit }}</span>
        </div>
        <div class="share_way">
          <ul>
            <li>
              <div class="img_box">
                <img src="https://s4.ax1x.com/2021/12/11/oThCTg.png" alt="" />
              </div>
            </li>
            <li>
              <div class="img_box">
                <img src="https://s4.ax1x.com/2021/12/11/oThikQ.png" alt="" />
              </div>
            </li>
            <li>
              <div class="img_box">
                <img src="https://s4.ax1x.com/2021/12/11/oTh90S.png" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Video",
  data() {
    return {
      videoList: [],
      idList: [],
      shareImg: "",
      shareTit: "",
      isShare: false,
      fixLoading: false,
      throt: null,
      value: -1,
      flag: false,
      isFirst: false,
    };
  },
  methods: {
    playStop(value) {
      let videos = document.querySelectorAll("video");
      if (value !== this.value) {
        videos[value].play();
        if (this.value != -1) {
          videos[this.value].pause();
        }
        this.value = value;
      } else {
        videos[value].pause();
        this.value = -1;
      }
    },
    myThrot() {
      if (this.throt !== null) {
        clearTimeout(this.throt);
      }
      this.throt = setTimeout(() => {
        this.bottomRef();
      }, 300);
    },
    bottomRef() {
      let scrollTop = window.scrollY;
      let windowHeight = window.innerHeight;
      let listHeight = document.body.clientHeight;
      //   console.log(scrollTop+windowHeight,listHeight)
      if (scrollTop + windowHeight >= listHeight) {
        this.fixLoading = true;
        this.getList();
      }
    },
    closeShare() {
      this.isShare = false;
    },
    share(url, tit) {
      this.shareImg = url;
      this.shareTit = tit;
      this.isShare = true;
    },
    Good(value) {
      let flag = false;
      let index = "";
      for (let i = 0; i < this.videoList.length; i++) {
        if (this.videoList[i].id == value) {
          this.videoList[i].flag = !this.videoList[i].flag;
          if (this.videoList[i].flag) {
            this.videoList[i].upCount++;
          } else {
            this.videoList[i].upCount--;
          }
        }
      }
      //   for (let i = 0; i < this.idList.length; i++) {
      //     if (this.idList[i] == value) {
      //       index = i;
      //       this.videoList[index].flag = false;
      //       this.videoList[index].upCount --;
      //       flag = true;
      //       this.idList.splice(i, 1);
      //     }
      //   }
      //   if (!flag) {
      //     this.idList.push(value);
      //     for (let i = 0; i < this.idList.length; i++) {
      //         if(this.idList[i] == value){
      //             this.videoList[i].flag = true;
      //             this.videoList[i].upCount ++;
      //         }
      //     }
      //   }
      //   console.log(this.idList);
    },
    myRandom() {
      return Math.floor(Math.random() * 1000000);
    },
    getList() {
      let vulue = this.myRandom();
      this.axios
        .get(`https://apis.netstart.cn/maoyan/video/${vulue}`)
        .then((res) => {
          let arr = [];
          if (this.videoList.length > 0) {
            arr = res.data.data.feeds;
            arr.forEach((item) => {
              let mm = parseInt(item.video.dur / 60);
              let ss = parseInt(item.video.dur % 60);
              mm = mm < 10 ? "0" + mm : mm;
              ss = ss < 10 ? "0" + ss : ss;
              let time = `${mm}:${ss}`;
              item.video.time = time;
              item.flag = false;
            });
            this.videoList = this.videoList.concat(arr);
          } else {
            let arr = res.data.data.feeds;

            for (let i = 0; i < res.data.data.feeds.length; i++) {
              let mm = parseInt(arr[i].video.dur / 60);
              let ss = parseInt(arr[i].video.dur % 60);
              mm = mm < 10 ? "0" + mm : mm;
              ss = ss < 10 ? "0" + ss : ss;
              let time = `${mm}:${ss}`;
              res.data.data.feeds[i].flag = false;
              res.data.data.feeds[i].video.time = time;
            }
            this.videoList = res.data.data.feeds;
          }
          // console.log(res.data.data.feeds);
          //   console.log(this.videoList);
          this.fixLoading = false;
          this.isFirst = false;

          // console.log(this.videoList);
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
  },
  mounted() {
    this.isFirst = true;
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.name)
    next((vm) => {
      if (to.name == "Shipin") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.video {
  width: 100%;
  padding-bottom: 60px;
  .first {
    width: 40px;
    position: fixed;
    top: 108px;
    left: 50%;
    margin-left: -20px;
    z-index: 100;
    img {
      width: 100%;
    }
  }
  .share_box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1001;
    .share_fix {
      width: 80%;
      background-color: #fff;
      margin: 200px auto 0;
      border-radius: 12px;
      padding: 10px 10px;
      .share_tit {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        button {
          font-size: 24px;
          background-color: transparent;
        }
      }
      .share_msg {
        border: 3px solid #ccc;
        padding: 4px 3px;
        margin: 10px 0;
        img {
          width: 50px;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          width: 70%;
          font-size: 16px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .share_way {
        width: 100%;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-around;
          li {
            flex-basis: 33.33%;
            .img_box {
              width: 30px;
              height: 30px;
              border: 1px solid #ccc;
              padding: 5px;
              border-radius: 50%;
              margin: 0 auto;
              img {
                width: 30px;
              }
            }
          }
        }
      }
    }
  }
  ul {
    width: 100%;
    > li {
      width: 100%;
      .video_box {
        width: 100%;
        position: relative;
        .video_tit {
          position: absolute;
          top: 0;
          left: 0;
          color: #d8d8d8;
          font-size: 18px;
          padding: 2px 10px;
          box-sizing: border-box;
        }
        .play_stop {
          width: 65px;
          height: 65px;
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          margin-left: -32px;
          margin-top: -32px;
          box-sizing: border-box;
          padding-left: 28px;
          padding-top: 22px;
          span {
            display: block;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-left: 10px solid #ccc;
            border-left-width: 13px;
          }
        }
        .video_link {
          width: 100%;
          height: 210px;
          video {
            width: 100%;
            height: 210px;
          }
          img {
            width: 100%;
            height: 210px;
          }
        }

        .video_long {
          position: absolute;
          right: 10px;
          bottom: 12px;
          color: #f0f0f0;
          font-size: 15px;
        }
      }
      .video_user {
        width: 100%;
        padding: 10px 20px 15px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        background-color: #f0f0f0;
        img {
          width: 20px;
          vertical-align: middle;
          margin-right: 8px;
        }
        span {
          color: #909090;
          vertical-align: middle;
        }
        .left {
          flex-basis: 50%;
          img {
            border-radius: 50%;
          }
        }
        .right {
          ol {
            display: flex;
            li {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .fixLoading {
    width: 40px;
    position: fixed;
    bottom: 60px;
    left: 50%;
    margin-left: -20px;
    img {
      width: 100%;
    }
  }
  .firstLoading {
    width: 30px;
    position: fixed;
    top: 108px;
    left: 50%;
    margin-left: -15px;
    img {
      width: 100%;
    }
  }
}
</style>