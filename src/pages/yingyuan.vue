<template>
  <div class="yingyuan">
    <div v-if="isFirst" class="first_loading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
      <span>正在加载中...</span>
    </div>
    <div v-if="!isFirst" class="screen_box">
      <ul>
        <li class="active">
          <a href="#">全城<span></span></a>
        </li>
        <li>
          <a href="#">品牌<span></span></a>
        </li>
        <li>
          <a href="#">特色<span></span></a>
        </li>
      </ul>
    </div>
    <div v-if="!isFirst" class="cinema_list">
      <ul>
        <li v-for="item in cinemaList" :key="item.cinemaId" @click="getCityId(item.cinemaId)">
          <div class="cinema_nm">
            <p class="tit">{{ item.title }}</p>
            <a
              ><span>{{ item.price.n }}</span
              ><i> {{ item.price.q }}</i></a
            >
          </div>
          <div class="cinema_address">
            {{ item.location }}
          </div>
          <div class="cinema_charact">
            <ol>
              <li
                v-for="(item, index) in item.services"
                :key="index + new Date().getTime()"
              >
                {{ item.text }}
              </li>
            </ol>
          </div>
          <div v-if="item.discount[0]" class="cinema_discount">
            <img :src="item.discount[0].card" alt="" />
            <span>{{ item.discount[0].text }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="fixedLoading" class="fixedLoading">
      <img src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="" />
    </div>
    <!-- <div class="screen_list">

    </div> -->
  </div>
</template>

<script>
export default {
  name: "Yingyuan",
  data() {
    return {
      isFirst: false,
      limit: 0,
      cinemaList: [],
      throt: null,
      fixedLoading: false,
    };
  },
  methods: {
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
      // console.log(scrollTop + windowHeight + "==" + listHeight);
      if (scrollTop + windowHeight == listHeight) {
        this.fixedLoading = true;
        this.getList();
      }
    },
    getList() {
      this.limit += 1;
      this.axios
        .get(`https://apis.netstart.cn/maoyan/index/moreCinemas?limit=${this.limit * 10}`)
        .then((res) => {
            // console.log(res.data);
          this.cinemaList = res.data;
          this.isFirst = false;
          this.fixedLoading = false;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    getCityId(Id){
        console.log("无接口,影院Id=>",Id)
    }
  },
  mounted() {
    this.isFirst = true;
    this.getList();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.name == "Yingyuan") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.yingyuan {
  width: 100%;
  .first_loading {
    width: 100%;
    font-size: 15px;
    color: #797979;
    height: 40px;
    line-height: 40px;
    text-align: center;
    span {
      vertical-align: middle;
    }
    img {
      width: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .screen_box {
    width: 100%;
    border-bottom: 1px solid #ccc;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      li {
        flex-wrap: 1;
        flex-shrink: 0;
        flex-basis: 33.33%;
        padding: 7px 0;
        &.active {
          span {
            transform: rotate(180deg);
            top: 3px;
            border-top: 5px solid #f00;
          }
          a {
            color: #f00;
          }
        }
        a {
          font-size: 15px;
          display: block;
          width: 100%;
          text-align: center;
          position: relative;
          color: #909090;
          span {
            display: block;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-top: 5px solid #909090;
            position: absolute;
            right: 28px;
            top: 10px;
          }
        }
        &:nth-of-type(2) {
          a {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
        }
      }
    }
  }
  .cinema_list {
    width: 100%;
    padding-bottom: 60px;
    ul {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      > li {
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        padding-top: 8px;
        .cinema_nm {
          font-size: 18px;
          width: 100%;
          position: relative;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          .tit {
            max-width: 80%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
          }
          a {
            vertical-align: middle;
            span {
              color: #f00;
            }
            i {
              color: #f00;
              font-size: 14px;
            }
          }
        }
        .cinema_address {
          margin: 5px 0;
          width: 95%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #606060;
        }
        .cinema_charact {
          margin-bottom: 5px;
          width: 95%;
          ol {
            display: flex;
            flex-wrap: wrap;
            li {
              flex-shrink: 0;
              border: 1px solid darkorange;
              padding: 1px 2px;
              border-radius: 3px;
              margin: 0 5px 5px 0;
              color: darkorange;
            }
          }
        }
        .cinema_discount {
          color: #606060;
          padding-bottom: 12px;
          img {
            width: 20px;
            margin-right: 3px;
            vertical-align: middle;
          }
          span {
            color: #707070;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .fixedLoading {
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 70px;
    left: 50%;
    margin-left: -15px;
    img {
      width: 100%;
    }
  }
}
</style>