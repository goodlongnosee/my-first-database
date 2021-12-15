<template>
  <div class="minivideo">
    <div v-if="isFirst" class="first">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <ul>
      <li
        v-for="item,index in videoList"
        :key="item.id"
        @click="playVideo(item.video.url, item.title,item.id,item.user.avatarurl,index)"
      >
        <div class="img_box">
          <img :src="item.images[0].url" alt="" />
        </div>
        <div class="video_msg">
          <div class="introduce">
            {{ item.title }}
          </div>
          <div class="user_msg">
            <div class="user">
              <img :src="item.user.avatarurl" alt="" />
              <span>{{ item.user.nickName }}</span>
            </div>
            <div @click.stop="myGood(item.id)" class="good">
              <!-- https://s4.ax1x.com/2021/12/11/oT23sU.png -->
              <img
                :src="
                  item.video.isGood == true
                    ? 'https://s4.ax1x.com/2021/12/11/oT23sU.png'
                    : 'https://s4.ax1x.com/2021/12/11/o7iAZ8.png'
                "
                alt=""
              />
              <span>{{ item.upCount }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="isPlay" class="fuulVideo">
      <div class="return">
        <img
          @click="isreturn"
          src="https://s4.ax1x.com/2021/12/07/ocGds0.png"
          alt=""
        />
        <span>{{ videoTit }}</span>
      </div>

      <!-- @click="full" -->
      <video :src="videoUrl" @click="playStop" autoplay></video>
      <div @click="playStop" v-if="!isPlayStop" class="playIcon">
        <span></span>
      </div>
      <div class="video_author">
        <div class="img_box">
          <img :src="authorUrl" alt="" />
        </div>
        <div @click="myGood(fullId)" class="good">
          <!-- https://s4.ax1x.com/2021/12/11/oT23sU.png -->
          <img :src="videoList[indexI].video.isGood==false?'https://s4.ax1x.com/2021/12/11/o7iAZ8.png':'https://s4.ax1x.com/2021/12/11/oT23sU.png'" alt="" />
        </div>
        <div class="share">
          <img src="https://s4.ax1x.com/2021/12/11/oTyrU1.png" alt="" />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="isLoading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniVideo",
  data() {
    return {
      videoList: [],
      throt: null,
      isLoading: false,
      isPlay: false,
      value: -1,
      videoUrl: "",
      videoTit: "",
      isFirst: false,
      isPlayStop: true,
      isGood: false,
      isGood2: false,
      authorUrl:"",
      fullId:"",
      indexI:""
    };
  },
  methods: {
    myGood(videoId) {
      for (let j = 0; j < this.videoList.length; j++) {
        if (this.videoList[j].id == videoId) {
          if (!this.videoList[j].video.isGood) {
            this.videoList[j].video.isGood = true;
            this.videoList[j].upCount++;
          } else {
            this.videoList[j].video.isGood = false;
            this.videoList[j].upCount--;
          }
        }
      }
      let arr = JSON.parse(localStorage.getItem("goodList"));
      if (arr == null || arr.length == 0) {
        arr = [];
        arr.push(videoId);
        localStorage.setItem("goodList", JSON.stringify(arr));
        return;
      }
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == videoId) {
            arr.splice(i, 1);
            this.isGood = true;
          }
        }
        if (!this.isGood) {
          arr.push(videoId);
        }
      }
      localStorage.setItem("goodList", JSON.stringify(arr));
    },
    playStop() {
      let video = document.querySelector("video");
      if (this.isPlayStop) {
        video.pause();
        this.isPlayStop = false;
      } else {
        video.play();
        this.isPlayStop = true;
      }
    },
    full() {
      this.isFull = true;
    },
    isreturn() {
      this.isPlay = false;
      this.videoUrl = "";
    },
    playVideo(url, tit, videoId,authorUrl,index) {
      this.isPlayStop = true;
      this.videoTit = tit;
      this.isPlay = true;
      this.videoUrl = url;
      this.authorUrl = authorUrl;
      this.fullId = videoId;
      this.indexI = index;
      if (this.isPlayStop) {
        setTimeout(() => {
          let video = document.querySelector("video");
          video.addEventListener("ended", () => {
            video.pause();
            this.isPlayStop = false;
          });
        }, 300);
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
    bottomRef(e) {
      let scrollTop = window.scrollY;
      let windowHeight = window.innerHeight;
      let listHeight = document.body.clientHeight;
      if (scrollTop + windowHeight == listHeight) {
        this.isLoading = true;
        this.getList();
      }
    },
    myRandom() {
      return Math.floor(Math.random() * 1000000);
    },
    getList() {
      let value = this.myRandom();
      this.axios
        .get(`https://apis.netstart.cn/maoyan/video/short/${value}`)
        .then((res) => {
          // console.log(res.data.data.feeds);
          if (this.videoList.length == 0) {
            for (let i = 0; i < res.data.data.feeds.length; i++) {
              res.data.data.feeds[i].video.isGood = false;
            }
            this.videoList = res.data.data.feeds;
          } else {
            let arr = res.data.data.feeds;
            for (let i = 0; i < arr.length; i++) {
              arr[i].video.isGood = false;
            }
            this.videoList = this.videoList.concat(arr);
          }
          this.isLoading = false;
          this.isFirst = false;
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
      if (to.name == "MiniVideo") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.minivideo {
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
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    li {
      flex-basis: 50%;
      box-sizing: border-box;
      position: relative;
      margin-bottom: 2px;
      overflow: hidden;
      .img_box {
        width: 100%;
        height: 300px;
        img {
          width: 260%;
          margin-left: -60%;
        }
      }
      .video_msg {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #f0f0f0;
        z-index: 100;
        .introduce {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 16px;
          width: 100%;
          padding: 0 8px;
          box-sizing: border-box;
        }
        .user_msg {
          display: flex;
          justify-content: space-between;
          padding: 0 9px 15px;
          box-sizing: border-box;
          img {
            width: 20px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 2px;
          }
          span {
            font-size: 14px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .isLoading {
    width: 30px;
    position: fixed;
    bottom: 60px;
    left: 50%;
    margin-left: -15px;
    img {
      width: 100%;
    }
  }
  .fuulVideo {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 1);
    .return {
      width: 100%;
      padding: 8px 40px;
      box-sizing: border-box;
      position: relative;
      top: 0;
      left: 0;
      background-color: #000;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      z-index: 1000;
      img {
        width: 24px;
        position: absolute;
        left: 12px;
        top: 8px;
      }
      span {
        vertical-align: middle;
        color: #909090;
        font-size: 16px;
      }
    }
    video {
      width: 100%;
      height: 100%;
      //   &.active {
      //     width: 190%;
      //     transform: rotate(90deg) translateX(95px) translateY(165px);
      //   }
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -50%;
      z-index: 100;
    }
    .playIcon {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 70px;
      width: 70px;
      margin-left: -35px;
      margin-top: -35px;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 102;
      border-radius: 50%;
      box-sizing: border-box;
      span {
        display: block;
        width: 0;
        border: 12px solid transparent;
        border-left: 15px solid #ccc;
        border-left-width: 14px;
        margin: 22px 0 0 32px;
      }
    }
    .video_author {
      position: absolute;
      right: 12px;
      bottom: 26%;
      z-index: 101;
      > div {
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 25px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        box-sizing: border-box;
      }
      img {
        width: 24px;
      }
      .img_box {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
        }
      }
      .good {
        padding: 10px 10px;
      }
      .share {
        padding: 10px 10px;
        // img {
        //   margin-top: 2px;
        // }
      }
    }
  }
  .isReturn {
    position: fixed;
    z-index: 10001;
    top: 10px;
    right: 12px;
    transform: rotate(90deg);
    img {
      width: 30px;
    }
  }
}
</style>