<template>
  <div
    class="videodetail"
    :style="`background:${movieDetail.movie.backgroundColor};`"
  >
    <div class="video_title">猫眼电影 > {{ movieDetail.movie.nm }}</div>
    <div class="detail_box">
      <div class="img_box">
        <img :src="movieDetail.movie.img" alt="" />
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
      <button>
        <img src="https://s4.ax1x.com/2021/12/07/o6eruj.png" alt="" />
        <span>想看</span>
      </button>
      <button>
        <img src="https://s4.ax1x.com/2021/12/07/o6esDs.png" alt="" />
        <span>看过</span>
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
        <button>{{ isRan }}<span>∨</span></button>
      </div>
      <div class="content_box">
        <p>
          答案是大师大卫带出来那种开心呢擦去说的阿斯顿；阿斯顿答案是大师大卫带出来那种开心呢擦去说的阿斯顿；阿斯顿答案是大师大卫带出来那种开心呢擦去说的阿斯顿；阿斯顿答案是大师大卫带出来那种开心呢擦去说的阿斯顿；阿斯顿答案是大师大卫带出来那种开心呢擦去说的阿斯顿；阿斯顿
        </p>
      </div>
    </div>
    <!-- 演员 -->
    <div class="star_box">
      <div class="star_title">
        <span>演职人员</span>
        <button>全部<span>></span></button>
      </div>
      <nav>
        <ul>
          <li v-for="item in starList" :key="item.id">
            <div class="img_box">
              <img src="" alt="" />
            </div>
            <div class="star_msg">
              <div class="name">{{ item.cnm }}</div>
              <div class="post">{{ item.desc }}</div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 视频 -->
    <div
      :style="`background:${movieDetail.movie.backgroundColor};`"
      class="video_com"
    >
      <div class="video_com_tit">
        <span>视频推荐</span>
        <button>全部<span>></span></button>
      </div>
      <nav>
        <ul>
          <li v-for="item in movieDetail.feedVideos.feeds" :key="item.id">
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
      :style="`background:${movieDetail.movie.backgroundColor};`"
      class="drama"
    >
      <div class="drama_tit">
        <span>剧照</span>
        <button>全部{{ movieDetail.movie.pn }}张<span>></span></button>
      </div>
      <nav>
        <ul>
          <li v-for="(item, index) in movieDetail.movie.photos" :key="index">
            <div class="video_box">
              <img v-if="item" :src="item" alt="" />
              <div class="play_box"></div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 票房 -->
    <div
      class="profit"
      :style="`background:${movieDetail.movie.backgroundColor};`"
    >
      <div class="profit_tit">
        <p><span>票房</span><button>票房详情 ></button></p>
      </div>
      <div class="pro_detail">
        <div class="left">
          <p>2</p>
          <p>昨日排名</p>
        </div>
        <div class="center">
          <p>13,049</p>
          <p>首周票房(万)</p>
        </div>
        <div class="right">
          <p>76627</p>
          <p>累计票房(万)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    };
  },
  computed: {
    ...mapState(["movieDetail"]),
  },
  mounted() {
    let starList = this.movieDetail.celebrities;
    for (let i = 0; i < 16; i++) {
      this.starList.push(starList[i]);
    }
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
      margin-right: 12px;
      img {
        width: 100px;
        height: 140px;
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
      .show_video {
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
      button {
        background-color: transparent;
        color: #b6b6b6;
        font-size: 14px;
        span {
          font-size: 16px;
          margin-left: 2px;
        }
      }
    }
    .content_box {
      width: 100%;

      p {
        line-height: 28px;
        letter-spacing: 1px;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
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
            img {
              width: 100%;
              height: 80px;
            }
          }
        }
      }
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
}
</style>