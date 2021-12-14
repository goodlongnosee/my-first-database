<template>
  <div class="search">
    <div class="search_header">
      <div class="button">
        <button>
          <router-link to="/">
            <img src="https://s4.ax1x.com/2021/12/07/ocGds0.png" alt="" />
          </router-link>
        </button>
      </div>
      <div class="title">
        <span>游娱电影</span>
      </div>
    </div>
    <div class="search_form">
      <div>
        <img src="https://s4.ax1x.com/2021/12/08/oRNwM4.png" alt="" />
        <input
          @input="mySearch"
          v-model="searchValue"
          type="text"
          placeholder="搜电影、搜影院"
          autofocus
        />
        <!-- @click="myEmpty" -->
        <button v-if="searchValue" @click="myEmpty" class="close">x</button>
        <button @click="myEmpty">取消</button>
      </div>
    </div>
    <div v-if="!searchValue" class="sear_history">
      <ul>
        <li v-for="item in searchList" :key="item.id">
          <img src="https://s4.ax1x.com/2021/12/08/oRUGOH.png" alt="" />
          <span @click="getSearchValue(item.name)">{{ item.name }}</span>
          <!-- @click="myDelete(item.id)" -->
          <button @click="myDelete(item.id)">×</button>
        </li>
      </ul>
    </div>
    <div v-if="!searchValue" class="search_advice">
      <div class="advice_hot">热门搜索</div>
      <ul>
        <li
          @click="getSearchValue(item.nm)"
          v-for="item in adviceList"
          :key="item.id"
        >
          <button>{{ item.nm }}</button>
        </li>
      </ul>
    </div>
    <div v-if="ismovie" class="movie_list">
      <div class="movie_tit">电影/电视剧/综艺</div>
      <ul>
        <li @click="getItem(item.id)" v-for="item in movieList" :key="item.id">
          <div class="img_box">
            <img :src="item.poster" alt="" />
          </div>
          <div class="movie_content">
            <div class="movie_nm">
              {{ item.name }}
            </div>
            <div class="movie_cate">{{ item.catogary }}</div>
            <div class="movie_date">{{ item.release }}</div>
            <div class="movie_wish">
              <p v-if="item.wish" class="wish">
                <span>{{ item.wish }}</span
                ><i>人想看</i>
              </p>
              <p v-if="item.score" class="score">
                <span>{{ item.score }}</span
                ><i>分</i>
              </p>
              <p v-if="!item.score && !item.wish" class="no">暂无评分</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="more_movie">查看全部{{ allMovie }}部影视剧</div>
    </div>
    <!-- v-if="searchValue && cinemaList"  -->
    <div v-if="ismovie" class="cinema_list">
      <div class="cinema_tit">影院</div>
      <ul>
        <li>
          <div class="cinema_nm">自由人影城(广州无话自由里店)</div>
          <div class="cinema_address">花都区新芽街道自由人花园二街3号124铺</div>
          <div class="com">
            <ul>
              <li>座</li>
              <li>改签</li>
              <li>小吃</li>
            </ul>
          </div>
          <div class="price"><span>19.8</span>元起</div>
        </li>
        <li>
          <div class="cinema_nm">自由人影城(广州无话自由里店)</div>
          <div class="cinema_address">花都区新芽街道自由人花园二街3号124铺</div>
          <div class="com">
            <ul>
              <li>座</li>
              <li>改签</li>
              <li>小吃</li>
            </ul>
          </div>
          <div class="price"><span>19.8</span>元起</div>
        </li>
      </ul>
      <div class="all">查看全部31家电影院</div>
    </div>
    <div v-if="isLoading" class="loading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      timer: null,
      t: null,
      ismovie: false,
      movieList: [],
      cinemaList: [],
      allMovie: 0,
      allCinema: 0,
      adviceList: [],
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations(["changeSearchList", "changeMovieDetail"]),
    myEmpty() {
      this.searchValue = "";
      this.ismovie = false;
      this.movieList = [];
    },
    mySearch() {
      // 处理历史记录

      if (this.t !== null) {
        clearTimeout(this.t);
      }
      this.t = setTimeout(() => {
        if (this.searchValue.length != 0) {
          let time = new Date().getTime();
          let obj = { name: this.searchValue, id: time };
          let arr = JSON.parse(localStorage.getItem("searchList"));
          //   console.log("本地列表", arr);
          let newArr = [];
          if (arr == null || arr == "" || arr.length == 0) {
            arr = [];
            arr.push(obj);
            this.changeSearchList(arr);
            console.log("长度为0", this.searchList);
            localStorage.setItem("searchList", JSON.stringify(this.searchList));
            return;
          }
          if (arr.length > 0) {
            // console.log(arr)
            arr.unshift(obj);
            let n = 0;
            for (let i = 0; i < arr.length; i++) {
              //   if (arr[i] !== undefined) {
              //     newArr.push(arr[n]);

              //     if (n > 2) {
              //       break;
              //     }

              //     n++;
              //   }
              // console.log(arr[i])
              if (i >= 3) {
                break;
              }
              newArr.push(arr[i]);
            }

            this.changeSearchList(newArr);
            // console.log("长度不为0", this.searchList);
            localStorage.setItem("searchList", JSON.stringify(this.searchList));
          }
        }
      }, 3000);

      // 处理搜索结果
      if (this.timer !== null) {
        //   console.log(this.timer)
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (this.searchValue.length > 0) {
          this.isLoading = true;
          this.axios
            .get(`https://apis.netstart.cn/maoyan/search/movies?keyword=${this.searchValue}&ci=1`)
            .then((res) => {
              // console.log(res.data);
              //   console.log(1);
              if (res.data) {
                for (let i = 0; i < 3; i++) {
                  this.movieList.push(res.data[i]);
                }
                this.ismovie = true;
                this.allMovie = res.data.length;
                this.isLoading = false;
              }
            })
            .catch((err) => {
              console.log("获取失败", err);
            });

          // this.axios
          //   .get(`/search/cinemas?keyword=${this.searchValue}&ci=1`)
          //   .then((res) => {
          //     // console.log(res.data);
          //     if (res.data) {
          //       for (let i = 0; i < 2; i++) {
          //         this.cinemaList = [];
          //         this.cinemaList.push(res.data[i]);
          //         this.allCinema = res.data.length;
          //       }
          //     }
          //   })
          //   .catch((err) => {
          //     console.log("获取失败", err);
          //   });
        }
      }, 300);

      if (this.searchValue.length == 0) {
        this.cinemaList = false;
        this.ismovie = false;
        this.movieList = [];
      }
    },
    myDelete(Id) {
      //   console.log(Id);
      let arr = JSON.parse(localStorage.getItem("searchList"));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == Id) {
          arr.splice(i, 1);
        }
      }
      this.changeSearchList(arr);
      localStorage.setItem("searchList", JSON.stringify(this.searchList));
    },
    addHistory() {
      if (!this.t) {
        clearTimeout(this.t);
      }

      if (this.searchValue.length != 0) {
        this.t = setTimeout(() => {
          let obj = { name: this.searchValue, id: new Date().getDate() };
          let arr = JSON.parse(localStorage.getItem("searchList"));
          console.log("本地列表", arr);
          let newArr = [];
          if (arr == null || arr == "" || arr.length == 0) {
            arr = [];
            arr.push(obj);
            this.changeSearchList(arr);
            console.log("长度为0", this.searchList);
            localStorage.setItem("searchList", JSON.stringify(this.searchList));
            return;
          }
          if (arr.length != 0) {
            arr.unshift(obj);
            for (let i = 0; i < 3; i++) {
              newArr.push(arr[i]);
            }
            this.changeSearchList(newArr);
            console.log("长度不为0", this.searchList);
            localStorage.setItem("searchList", JSON.stringify(this.searchList));
          }
        }, 3000);
      } else {
        clearTimeout(this.t);
      }
    },
    getSearchValue(value) {
      if (value.length > 3) {
        // console.log(value.splice(0, 3).join(""));
        value = value.split("");
        this.searchValue = value.splice(0, 3).join("");
      } else {
        this.searchValue = value;
      }
      this.mySearch();
    },
    getItem(movieId) {
      // console.log(movieId)
      this.isLoading = true;
      this.axios
        .get(`https://apis.netstart.cn/maoyan/movie/detail?movieid=${movieId}`)
        .then((res) => {
          this.changeMovieDetail(res.data);
          this.$router.push({ path: "/videoDetail" });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err, "获取失败");
        });
    },
  },
  computed: {
    ...mapState(["searchList"]),
  },
  mounted() {
    let arr = JSON.parse(localStorage.getItem("searchList"));
    // console.log("mounted", arr);
    let newar = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null || arr[i] != undefined) {
        newar.unshift(arr[i]);
      }
    }

    this.changeSearchList(newar);

    // 热门搜索
    this.axios
      .get("https://apis.netstart.cn/maoyansearch/suggest?kw=电影&cityId=1")
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          this.adviceList = res.data.movies.list;
        }
      })
      .catch((err) => {
        console.log("获取失败", err);
      });
    this.axios
      .get("https://apis.netstart.cn/maoyansearch/suggest?kw=影&cityId=1")
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          this.adviceList = this.adviceList.concat(res.data.movies.list);
        }
      })
      .catch((err) => {
        console.log("获取失败", err);
      });
  },
};
</script>
<style lang='less' scoped>
.search {
  width: 100%;
  // background-color: #f0f0f0;
  img {
    width: 30px;
  }
  .search_header {
    height: 48px;
    line-height: 48px;
    background-color: darkorange;
    text-align: center;
    position: relative;
    .button {
      position: absolute;
      left: 0px;
      top: 5px;
      button {
        background-color: transparent;
      }
    }
    .title {
      span {
        color: #f0f0f0;
        font-size: 22px;
      }
    }
  }
  .search_form {
    width: 100%;
    height: 46px;
    background-color: #f0f0f0;
    div {
      padding: 4px 55px 0 12px;
      height: 46px;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #dadada;
      img {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 0;
        left: 20px;
        margin-top: 15px;
      }
      input {
        width: 100%;
        padding: 6px 30px;
        border-radius: 8px;
        box-sizing: border-box;
        font-size: 15px;
        vertical-align: middle;
        border: 1px solid #e4e4e4;
      }
      button {
        position: absolute;
        right: 6px;
        top: 11px;
        color: darkorange;
        background-color: transparent;
        font-size: 16px;
      }
      .close {
        width: 20px;
        height: 20px;
        background-color: #909090;
        right: 65px;
        top: 13px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .sear_history {
    width: 100%;
    background-color: #fff;
    margin-bottom: 20px;
    ul {
      li {
        width: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        position: relative;
        border-bottom: 1px solid #d6d6d6;
        img {
          width: 24px;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          font-size: 18px;
          vertical-align: middle;
          color: #909090;
        }
        button {
          background-color: transparent;
          position: absolute;
          right: 10px;
          top: 12px;
          font-size: 18px;
          color: #909090;
        }
      }
    }
  }
  .search_advice {
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    .advice_hot {
      font-size: 18px;
      padding: 5px 0 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex-shrink: 0;
        margin: 5px 5px;
        button {
          border-radius: 8px;
          padding: 5px 10px;
          background-color: #f0f0f0;
        }
      }
    }
  }
  .movie_list {
    width: 100%;
    .movie_tit {
      width: 100%;
      color: #909090;
      font-size: 16px;
      padding: 5px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
    ul {
      width: 100%;
      li {
        width: 100%;
        height: 130px;
        padding: 10px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        display: flex;
        .img_box {
          width: 80px;
          img {
            width: 80px;
            height: 110px;
          }
        }
        .movie_content {
          font-size: 14px;
          padding: 0 10px;
          box-sizing: border-box;
          position: relative;
          > div {
            width: 190px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #909090;
          }
          .movie_nm {
            font-weight: bold;
            box-sizing: border-box;
            font-size: 18px;
            color: #000;
          }
          .movie_cate {
            margin: 6px 0;
          }
          .movie_date {
            margin-bottom: 6px;
          }
          .movie_wish {
            width: 70px;
            position: absolute;
            right: -60px;
            top: 10px;
            p {
              color: #909090;
              text-align: right;
              span {
                font-size: 18px;
                color: darkorange;
              }
              i {
                color: darkorange;
              }
            }
          }
        }
      }
    }
    .more_movie {
      width: 100%;
      color: darkorange;
      text-align: center;
      font-size: 16px;
      padding: 10px 0;
      background-color: #f0f0f0;
    }
  }
  .cinema_list {
    width: 100%;
    .cinema_tit {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 10px 12px;
      box-sizing: border-box;
      color: #909090;
      font-size: 16px;
    }
    ul {
      li {
        font-size: 14px;
        padding: 10px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        position: relative;
        .cinema_nm {
          font-size: 18px;
        }
        .cinema_address {
          color: #909090;
          margin: 6px 0;
        }
        .com {
          ul {
            li {
              display: inline;
              border: 1px solid blue;
              color: blue;
              padding: 0 3px;
              margin-right: 7px;
            }
          }
        }
        .price {
          position: absolute;
          right: 30px;
          top: 10px;
          span {
            color: darkorange;
            font-size: 20px;
            margin-right: 2px;
          }
        }
      }
    }
    .all {
      padding: 10px 0;
      color: darkorange;
      width: 100%;
      text-align: center;
      font-size: 16px;
      background-color: #f0f0f0;
    }
  }
  .loading {
    width: 40px;
    position: fixed;
    top: 108px;
    left: 50%;
    margin-left: -20px;
  }
}
</style>