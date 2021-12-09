<template>
  <div class="moreHope">
    <nav class="more_list">
      <ul>
        <li @click="getItem(item.id)" v-for="item in moreList" :key="item.id">
          <div class="more_date">{{ item.comingTitle }}</div>
          <div class="more_video">
            <div class="img_box">
              <img :src="item.img" alt="" />
            </div>
            <div class="more_content">
              <div class="more_tit">{{ item.nm }}</div>
              <div class="more_wish">
                <span>{{ item.wish }}</span
                >人想看
              </div>
              <div class="more_star">主演:{{ item.star }}</div>
              <div class="more_upshow">{{ item.rt }} 上映</div>
            </div>
            <div class="more_btn">
              <button
                v-if="item.showStateButton"
                :style="`box-shadow:0 0 10px 2px ${item.showStateButton.shadowColor};color:white;background:${item.showStateButton.color};`"
              >
                {{ item.showStateButton.content }}
              </button>
              <button v-if="!item.showStateButton">想看</button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: "MoreHope",
  props: {
    moreList: {
      type: Array,
    },
  },
  methods:{
    ...mapMutations(['changeMovieDetail']),
    getItem(movieId){
      // console.log(movieId)
      this.axios.get(`/movie/detail?movieid=${movieId}`).then(
        res =>{
          // console.log(res.data)
          this.changeMovieDetail(res.data);
          this.$router.push({path:"/videoDetail"});
        }
      ).catch(
        err => {
          console.log("获取失败")
        }
      )
    }
  }
};
</script>

<style lang="less" scoped>
.moreHope {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  top: -50px;
  .more_list {
    width: 100%;
    ul {
      width: 100%;
      li {
        margin-bottom: 20px;
        .more_date {
          width: 100%;
          color: #666666;
          font-size: 15px;
          margin: 10px 0;
        }
        .more_video {
          display: flex;
          justify-content: flex-start;
          position: relative;
          font-size: 14px;
          .img_box {
            flex-basis: 25%;
            height: 115px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            img {
              width: 90px;
              height: 115px;
            }
          }
          .more_content {
            flex-basis: 75%;
            padding: 0 10px;
            box-sizing: border-box;
            color: #555555;
            overflow: hidden;
            .more_tit {
              font-size: 20px;
              font-weight: bold;
              color: #000;
            }
            .more_wish {
              margin: 7px 0;
              span {
                color: darkorange;
                font-size: 16px;
                font-weight: bold;
              }
            }
            .more_star {
              width: 70%;
              margin-bottom: 7px;
            }
          }
          .more_btn {
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -20px;
            button {
              background-color: darkorange;
              padding: 4px 15px;
              border-radius: 16px;
              font-size: 16px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>