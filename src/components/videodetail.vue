<template>
  <div
    class="videodetail"
    :style="`background:${movieDetail.movie.backgroundColor};`"
  >
    <div class="video_title">
      <span @click="upPage">猫眼电影</span> > {{ movieDetail.movie.nm }}
    </div>
    <div class="detail_box">
      <div class="img_box">
        <img @click="VideoPlay" :src="posterImg" alt="" />
        <div class="play"></div>
      </div>
      <div class="detail_content">
        <div class="video_name">
          {{ movieDetail.movie.nm }}
        </div>
        <div class="enm">
          {{ movieDetail.movie.enm }}
        </div>
        <div class="cate">
          {{ movieDetail.movie.cat }}
        </div>
        <div class="star">
          {{ movieDetail.movie.star }}
        </div>
        <div class="show_video">
          {{ movieDetail.movie.pubDesc }} / {{ movieDetail.movie.dur }}分钟
        </div>
      </div>
    </div>
    <div class="btn_box">
      <button @click="myWish(movieDetail.movie.id)">
        <img
          :src="
            isWish == '想看'
              ? 'https://s4.ax1x.com/2021/12/07/o6eruj.png'
              : 'https://s1.ax1x.com/2021/12/09/ohGRT1.png'
          "
          alt=""
        />
        <!-- <img src="https://s4.ax1x.com/2021/12/07/o6eruj.png" alt="" /> -->
        <span>{{ isWish }}</span>
      </button>
      <button @click="myLook(movieDetail.movie.id)">
        <img
          :src="
            isLook == '看过'
              ? 'https://s4.ax1x.com/2021/12/07/o6esDs.png'
              : 'https://s4.ax1x.com/2021/12/07/o6eBvQ.png'
          "
          alt=""
        />
        <!-- <img src="https://s4.ax1x.com/2021/12/07/o6esDs.png" alt="" /> -->
        <span>{{ isLook }}</span>
      </button>
    </div>
    <div class="score_box">
      <div class="score_title">
        <p class="sco_left">
          <img src="https://s4.ax1x.com/2021/12/06/os5caF.png" alt="" />
          <span>游娱购票评分</span>
        </p>
        <p class="sco_right">
          <span>{{ wish }}人想看</span><span>{{ watched }}人看过></span>
        </p>
      </div>
      <div class="score_content">
        <div class="sco">
          <p class="sc">9.5</p>
          <p>1,212,322 人评</p>
        </div>
        <div class="sco_star">
          <p>
            <em>***** </em
            ><span
              ><i
                v-if="movieDetail.movie.distributions[0]"
                :style="`width:${movieDetail.movie.distributions[0].proportion}%`"
              ></i
            ></span>
          </p>
          <p>
            <em>**** </em>
            <span
              ><i
                v-if="movieDetail.movie.distributions[1]"
                :style="`width:${movieDetail.movie.distributions[1].proportion}%`"
              ></i
            ></span>
          </p>
          <p>
            <em>*** </em>
            <span
              ><i
                v-if="movieDetail.movie.distributions[2]"
                :style="`width:${movieDetail.movie.distributions[2].proportion}%`"
              ></i
            ></span>
          </p>
          <p>
            <em>** </em>
            <span
              ><i
                v-if="movieDetail.movie.distributions[3]"
                :style="`width:${movieDetail.movie.distributions[3].proportion}%`"
              ></i
            ></span>
          </p>
          <p>
            <em>* </em>
            <span
              ><i
                v-if="movieDetail.movie.distributions[4]"
                :style="`width:${movieDetail.movie.distributions[4].proportion}%`"
              ></i
            ></span>
          </p>
        </div>
      </div>
      <div v-if="movieDetail.reputation.movieRank" class="top">
        <div class="left">
          <p>TOP</p>
          <p>{{ movieDetail.reputation.movieRank }}</p>
        </div>
        <div class="right">
          <p>
            {{ new Date().getFullYear() }}年{{ new Date().getMonth() + 1 }}月
          </p>
          <p>{{ movieDetail.reputation.secondWord }}</p>
        </div>
      </div>
      <div v-if="movieDetail.movie.scm" class="other">
        <img src="https://s4.ax1x.com/2021/12/07/oyvd9P.png" alt="" />
        <span>{{ movieDetail.movie.scm }}</span>
      </div>
    </div>
    <!-- 简介 -->
    <div class="brief">
      <div class="top_tit">
        <span>简介</span>
        <button @click="showText">
          {{ isRan }}<span :class="isShow == true ? 'active' : ''">∨</span>
        </button>
      </div>
      <div class="content_box">
        <p :class="isShow == false ? 'active' : ''">
          {{ movieDetail.movie.dra }}
        </p>
      </div>
    </div>
    <!-- 演员 -->
    <div class="star_box">
      <div class="star_title">
        <span>演职人员</span>
        <router-link to="/StarList">
          <button @click="getAllStar(movieDetail.celebrities)">
            全部<span>></span>
          </button>
        </router-link>
      </div>
      <nav>
        <ul>
          <li v-for="(item, index) in starList" :key="index + Math.random()">
            <div class="img_box">
              <!-- <img src="" alt="" /> -->
              <img :src="item.avatar.replace(/\/w\.h/, '')" alt="" />
            </div>
            <div class="star_msg">
              <div v-if="item.cnm" class="name">{{ item.cnm }}</div>
              <div v-if="item.desc" class="post">{{ item.desc }}</div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 视频 -->
    <div
      :style="`background:${movieDetail.movie.backgroundColor};`"
      class="video_com"
      v-if="movieDetail.feedVideos"
    >
      <div class="video_com_tit">
        <span>视频推荐</span>
        <button>全部<span>></span></button>
      </div>
      <nav>
        <ul>
          <li
            v-for="(item, index) in movieDetail.feedVideos.feeds"
            :key="index + Math.random()"
          >
            <div class="video_box">
              <img v-if="item.images[0].url" :src="item.images[0].url" alt="" />
              <div class="play_box"></div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 剧照 -->
    <div
      v-if="movieDetail.movie.photos"
      :style="`background:${movieDetail.movie.backgroundColor};`"
      class="drama"
    >
      <div class="drama_tit">
        <span>剧照</span>
        <router-link to="/ImgList">
          <button @click="getAllImg(movieDetail.movie.photos)">
            全部{{ movieDetail.movie.pn }}张<span>></span>
          </button>
        </router-link>
      </div>
      <nav>
        <ul>
          <li
            v-for="(item, index) in movieDetail.movie.photos"
            :key="index + Math.random()"
          >
            <div class="video_box">
              <!-- <img :src="item.replace(/\/w\.h/, '')" alt="" /> -->
              <img
                @touchmove="myTouchMove"
                @click="bigImg(index)"
                v-if="item"
                :src="item.replace(/\/w\.h/, '')"
                alt=""
              />
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 票房 -->
    <div
      v-if="movieDetail.mbox.mbox"
      class="profit"
      :style="`background:${movieDetail.movie.backgroundColor};`"
    >
      <div class="profit_tit">
        <p><span>票房</span><button>票房详情 ></button></p>
      </div>
      <div class="pro_detail">
        <div class="left">
          <p>{{ movieDetail.mbox.mbox.lastDayRank }}</p>
          <p>昨日排名</p>
        </div>
        <div class="center">
          <p>{{ movieDetail.mbox.mbox.firstWeekBox }}</p>
          <p>首周票房(万)</p>
        </div>
        <div class="right">
          <p>{{ movieDetail.mbox.mbox.sumBox }}</p>
          <p>累计票房(万)</p>
        </div>
      </div>
    </div>

    <div v-if="isBigImg" class="big_img">
      <img
        class="myBigImg"
        :style="`margin-left:${imgX}px;`"
        @touchmove="toggleImg"
        @touchend="myTouchEnd"
        @click="hideBigImg"
        :src="bigUrl.replace(/\/w\.h/, '')"
        alt=""
      />
    </div>
    <div v-if="isVideoPlay" class="video_play">
      <div class="play_tit">
        <div @click="VideoPlay" class="return">
          <img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" />
          <span>
            {{ movieDetail.movie.videoName }}
          </span>
        </div>
      </div>
      <video
        :autoplay="isVideoPlay == true ? 'autoplay' : ''"
        controls
        loop
        :src="movieDetail.movie.videourl"
      ></video>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "videoDetail",
  data() {
    return {
      videoMsg: {},
      wish: 0,
      watched: 0,
      timer: null,
      isRan: "展开",
      starList: [],
      comVideo: [],
      isWish: "想看",
      isLook: "看过",
      flag: false,
      isShow: false,
      isBigImg: false,
      bigUrl: "",
      imgX: 0,
      imgIndex: 0,
      isVideoPlay: false,
      posterImg: "",
      Stills: [],
    };
  },
  methods: {
    ...mapMutations([
      "changeWishList",
      "changeLookList",
      "changeAllImg",
      "changeAllStar",
    ]),
    getAllStar(data) {
      this.changeAllStar(data);
    },
    getAllImg(data) {
      this.changeAllImg(data);
    },
    VideoPlay() {
      this.isVideoPlay = !this.isVideoPlay;
    },
    toggleImg(e) {
      // console.log(e.target.offsetWidth)
      this.imgX = e.touches[0].pageX - e.target.offsetWidth / 2;
      if (this.imgX > 100) {
        this.imgX = 100;
      }
      if (this.imgX < -100) {
        this.imgX = -100;
      }
    },
    myTouchEnd() {
      if (this.imgX <= -100) {
        this.imgIndex++;
        if (this.imgIndex > this.movieDetail.movie.photos.length - 1) {
          this.imgIndex = this.movieDetail.movie.photos.length - 1;
        }
        this.bigUrl = this.movieDetail.movie.photos[this.imgIndex];
        this.imgX = 0;
      } else if (this.imgX >= 100) {
        this.imgIndex--;
        if (this.imgIndex < 0) {
          this.imgIndex = 0;
        }
        this.bigUrl = this.movieDetail.movie.photos[this.imgIndex];
        this.imgX = 0;
      }
    },
    bigImg(index) {
      this.imgIndex = index;
      this.isBigImg = !this.isBigImg;
      this.bigUrl = this.movieDetail.movie.photos[this.imgIndex];
      setTimeout(() => {
        let _Top = document.querySelector(".myBigImg").offsetHeight;
        document.querySelector(".myBigImg").style["marginTop"] = -_Top + "px";
      }, 10);
    },
    hideBigImg(){
      this.isBigImg = !this.isBigImg;
    },
    myTouchMove() {
      this.isBigImg = false;
    },
    myWish(movieId) {
      // console.log(res.data)
      let arr = JSON.parse(localStorage.getItem("wishList"));
      // console.log(arr)
      if (arr == null || arr == undefined || arr == "" || arr == []) {
        arr = [];
        arr.push(movieId + "");
        this.changeWishList(arr);
        localStorage.setItem("wishList", JSON.stringify(arr));
        this.isWish = "已想看";
        return;
      }
      if (arr.length > 0) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
          if (arr[i] == movieId + "") {
            arr.splice(i, 1);
            i--;
            this.flag = true;
            this.isWish = "想看";
          }
        }
        if (!this.flag) {
          arr.push(movieId + "");
          this.isWish = "已想看";
        }
        this.flag = false;
        this.changeWishList(arr);
        localStorage.setItem("wishList", JSON.stringify(arr));
      }
    },
    myLook(movieId) {
      let arr = JSON.parse(localStorage.getItem("lookList"));
      // console.log(arr)
      if (arr == null || arr == undefined || arr == "" || arr == []) {
        arr = [];
        arr.push(movieId + "");
        this.changeLookList(arr);
        localStorage.setItem("lookList", JSON.stringify(arr));
        this.isLook = "已看过";
        return;
      }
      if (arr.length > 0) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
          if (arr[i] == movieId + "") {
            arr.splice(i, 1);
            i--;
            this.flag = true;
            this.isLook = "看过";
          }
        }
        if (!this.flag) {
          arr.push(movieId + "");
          this.isLook = "已看过";
        }
        this.flag = false;
        this.changeLookList(arr);
        localStorage.setItem("lookList", JSON.stringify(arr));
      }
    },
    upPage() {
      this.$router.go(-1);
    },
    showText() {
      if (this.isRan == "展开") {
        this.isRan = "收起";
      } else {
        this.isRan = "展开";
      }
      this.isShow = !this.isShow;
    },
  },
  computed: {
    ...mapState(["movieDetail", "isWishList", "isLookList"]),
  },
  mounted() {
    var str = this.movieDetail.movie.img;
    // console.log(this.movieDetail.celebrities);
    // console.log(this.movieDetail.celebrities)
    // 演员列表
    let len = this.movieDetail.celebrities.length;
    let len2 = this.movieDetail.movie.photos.length;
    for (let i = 0; i < parseInt(len / 10); i++) {
      this.starList.push(this.movieDetail.celebrities[i]);
    }

    for (let j = 0; j < parseInt(len2 / 2); j++) {
      this.Stills.push(this.movieDetail.movie.photos[j]);
    }

    this.posterImg = str.replace(/\/w\.h/, "");
    let wishList = JSON.parse(localStorage.getItem("wishList"));
    let lookList = JSON.parse(localStorage.getItem("lookList"));
    // console.log(wishList,lookList)
    if (wishList !== null) {
      for (let j = 0; j < wishList.length; j++) {
        if (wishList[j] == this.movieDetail.movie.id) {
          this.isWish = "已想看";
        }
      }
    }
    if (lookList !== null) {
      for (let q = 0; q < wishList.length; q++) {
        if (lookList[q] == this.movieDetail.movie.id) {
          this.isLook = "已看过";
        }
      }
    }

    // let starList = this.movieDetail.celebrities;
    // console.log(this.movieDetail.celebrities)
    // for (let i = 0; i < 16; i++) {
    //   this.starList.push(starList[i]);
    // }
    // console.log(this.movieDetail.movie.photos)
    let wish = this.movieDetail.movie.wish;
    let watched = this.movieDetail.movie.watched;
    // this.wish =
    // console.log(wish,watched)

    this.wish = parseInt(wish / 1.2);
    this.watched = parseInt(watched / 1.2);
    // console.log(watched / 1000)
    let num = parseInt(watched / 1000);
    let max = wish;
    if (max < watched) {
      max = watched;
    }
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.wish += 600;
        this.watched += num;
        if (this.wish >= wish) {
          this.wish = wish;
        }
        if (this.watched >= watched) {
          this.watched = watched;
        }
        if (this.wish == max || this.watched == max) {
          clearInterval(this.timer);
        }
      }, 10);
    }, 300);
  },
};
</script>

<style lang="less" scoped>
.videodetail {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  .video_title {
    margin: 10px 0 15px 0;
    color: #cccccc;
    font-size: 14px;
  }
  .detail_box {
    display: flex;
    .img_box {
      width: 100px;
      height: 140px;
      margin-right: 12px;
      position: relative;
      overflow: hidden;
      border: 1px solid #ccc;
      padding: 1px 1px;
      box-shadow: 0 0 10px 2px #ccc inset;
      img {
        width: 100px;
        height: 140px;
      }
      .play {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        bottom: -10px;
        left: -10px;
        &::after {
          display: block;
          content: "";
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-left: 5px solid #000;
          border-left-width: 7px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -7px;
        }
      }
    }
    .detail_content {
      color: #bbbbbb;
      font-size: 14px;
      overflow: hidden;
      .video_name {
        color: #fff;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .cate {
        margin: 5px 0;
      }
      .star {
        margin-bottom: 5px;
      }
    }
  }
  .btn_box {
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    button {
      background-color: rgba(255, 255, 255, 0.3);
      color: #fff;
      margin: 0 20px;
      padding: 5px 26px;
      border-radius: 10px;
      span {
        vertical-align: middle;
        font-size: 16px;
      }
      img {
        width: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
  .score_box {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 7px 10px;
    box-sizing: border-box;
    .score_title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      .sco_left {
        color: #f0f0f0;
        font-size: 12px;
        margin-right: 1px;
        img {
          width: 16px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 4px;
        }
        span {
          vertical-align: middle;
        }
      }
      .sco_right {
        font-size: 12px;
        color: #909090;
        span {
          margin-right: 2px;
        }
      }
    }
    .score_content {
      width: 100%;
      // height: 135px;
      display: flex;
      .sco {
        width: 50%;
        height: 60px;
        text-align: left;
        // float: left;
        text-align: center;
        margin-bottom: 10px;
        p {
          font-size: 12px;
          color: #6d6d6d;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .sc {
          font-size: 24px;
          font-weight: bold;
          color: darkorange;
        }
      }
      .sco_star {
        // float: left;
        height: 60px;
        width: 50%;
        padding-top: 4px;
        box-sizing: border-box;
        margin-bottom: 10px;
        p {
          color: #909090;
          font-size: 12px;
          margin-bottom: -7px;
          letter-spacing: 1px;
          position: relative;
          em {
            width: 45px;
            display: block;
            text-align: right;
          }
          span {
            position: absolute;
            left: 50px;
            top: 6px;
            display: block;
            width: 100px;
            height: 3px;
            background-color: rgba(255, 255, 255, 0.1);
            i {
              display: block;
              width: 0%;
              height: 100%;
              background-color: #909090;
            }
          }
        }
      }
    }
    .top {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      border-radius: 10px;
      border: 1px solid #ccc;
      padding: 3px 5px;
      box-sizing: border-box;
      .left {
        background-color: rgba(207, 162, 12, 0.199);
        border-radius: 6px;
        padding: 3px 10px;
        box-sizing: border-box;
        margin-right: 4px;
        p {
          text-align: center;
          color: #d49d37;
          &:nth-of-type(1) {
            font-size: 12px;
          }
          &:nth-of-type(2) {
            font-size: 18px;
            color: #f7c465;
          }
        }
      }
      .right {
        p {
          color: #d49d37;
          font-size: 14px;
          &:nth-of-type(1) {
            margin: 3px 0;
          }
          &:nth-of-type(2) {
            font-size: 18px;
            color: wheat;
            letter-spacing: 1px;
          }
        }
      }
    }
    .other {
      height: 36px;
      line-height: 36px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      padding-left: 12px;
      box-sizing: border-box;
      margin: 10px 0 5px;
      img {
        width: 16px;
        vertical-align: middle;
        margin-right: 7px;
        transform: rotate(-12deg);
      }
      span {
        vertical-align: middle;
        color: wheat;
        font-size: 15px;
      }
    }
  }
  .brief {
    width: 100%;
    color: #e4e4e4;
    font-size: 15px;
    margin: 10px 0 20px;
    .top_tit {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-right: 12px;
      box-sizing: border-box;
      button {
        background-color: transparent;
        color: #b6b6b6;
        font-size: 14px;
        position: relative;
        span {
          font-size: 14px;
          margin-left: 2px;
          position: absolute;
          &.active {
            transform: rotate(-180deg) translateY(-1px);
          }
        }
      }
    }
    .content_box {
      width: 100%;

      p {
        line-height: 28px;
        letter-spacing: 1px;
        &.active {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
  nav {
    width: 100%;
    height: 220px;
    overflow: scroll;
    ul {
      display: flex;
      li {
        width: 90px;
        text-align: center;
        margin-right: 10px;
        .img_box {
          width: 90px;
          height: 120px;
          margin-bottom: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
        .star_msg {
          font-size: 14px;
          .name {
            margin: 5px 0;
            color: #f0f0f0;
          }
          .post {
            color: #909090;
          }
        }
      }
    }
  }
  .star_box {
    width: 100%;
    .star_title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #fff;
      font-size: 15px;
      button {
        background-color: transparent;
        color: #b6b6b6;
        font-size: 14px;
        span {
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
  }
  .video_com {
    width: 100%;
    position: relative;
    top: -30px;
    left: 0;
    .video_com_tit {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #fff;
      font-size: 15px;
      button {
        background-color: transparent;
        color: #b6b6b6;
        font-size: 14px;
        span {
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
    nav {
      height: 140px;
      ul {
        li {
          width: 140px;
          .video_box {
            width: 140px;
            position: relative;
            .play_box {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: -15px;
              margin-top: -15px;
              background-color: #fff;
              &::after {
                display: block;
                content: "";
                width: 0;
                height: 0;
                border: 7px solid transparent;
                border-left: 7px solid #000;
                border-left-width: 9px;
                position: absolute;
                left: 12px;
                top: 8px;
              }
            }
            img {
              width: 100%;
              height: 80px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
  .drama {
    width: 100%;
    position: relative;
    top: -60px;
    left: 0;
    .drama_tit {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #fff;
      font-size: 15px;
      button {
        background-color: transparent;
        color: #b6b6b6;
        font-size: 14px;
        span {
          font-size: 16px;
          margin-left: 5px;
        }
      }
    }
    nav {
      height: 130px;
      ul {
        li {
          width: 140px;
          .video_box {
            width: 140px;
            // height: 80px;
            // box-sizing: border-box;
            img {
              width: 100%;
              height: 80px;
            }
          }
        }
      }
    }
  }
  .big_img {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10001;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
    }
  }
  .profit {
    margin-top: -80px;
    position: relative;
    top: 0px;
    width: 100%;
    color: #f0f0f0;
    .profit_tit {
      width: 100%;
      font-size: 15px;
      margin-bottom: 10px;
      p {
        display: flex;
        justify-content: space-between;
        button {
          color: #ccc;
          background-color: transparent;
        }
      }
    }
    .pro_detail {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 12px 0;
      > div {
        flex-grow: 1;
        flex-basis: 33.33%;
        text-align: center;
        p {
          &:nth-of-type(1) {
            color: darkorange;
            font-size: 18px;
            font-weight: bold;
          }
          &:nth-of-type(2) {
            color: #ccc;
            font-size: 14px;
          }
        }
      }
    }
  }
  .video_play {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10001;
    background-color: rgba(0, 0, 0, 0.9);
    .play_tit {
      padding: 10px 12px;
      text-align: center;
      .return {
        width: 100%;
        img {
          width: 25px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 16px;
          color: #f0f0f0;
        }
      }
    }
    video {
      width: 100%;
      margin-top: 50px;
    }
  }
}
</style>