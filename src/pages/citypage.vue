<template>
  <div class="cityPage">
    <div class="position_city">
      <div class="tit_position">定位城市</div>
      <div class="position_name">
        <span v-if="!isPosition" class="position_nm">定位失败，请稍后重试</span>
        <span v-if="isPosition" class="position_nm">广州</span>
      </div>
    </div>
    <div class="lately_city">
      <div class="tit_lately">最近访问城市</div>
      <ul>
        <li  @click="jumpHome('上海')">上海</li>
        <li  @click="jumpHome('广州')">广州</li>
        <li  @click="jumpHome('深圳')">深圳</li>
        <li  @click="jumpHome('武汉')">武汉</li>
      </ul>
    </div>
    <div class="hot_city">
      <div class="tit_hot">热门城市</div>
      <ul>
        <li @click="jumpHome(item.name)" v-for="item in hotList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <div class="city_show">
      <div v-for="(item, index) in letterList" class="letter" :key="index">
        <div class="tit">{{ item }}</div>
        <ul>
          <li @click="jumpHome(it.name)" v-for="it in cityList[index]" :key="it.id">{{ it.name }}</li>
        </ul>
      </div>
    </div>
    <div class="letter_position">
      <div class="letter_nm">定位热门</div>
      <ul>
        <li
          @click="getPisition(index)"
          v-for="(item, index) in letterList"
          :key="index + 100"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "CityPage",
  data() {
    return {
      isPosition: false,
      cityList: [],
      hotList: [],
      letterList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      cityHeight: "",
    };
  },
  methods: {
    ...mapMutations(["changeCityName"]),
    getPisition(i) {
      this.cityHeight = -i * 1000 + "px";
    },
    jumpHome(value) {
        this.changeCityName(value);
        this.$router.push({path:"/home/homepage/hotvideo"})
    },
  },
  mounted() {
    this.axios
      .get("cityData.json")
      .then((res) => {
        // console.log(res.data);
        for (let key in res.data) {
          this.cityList.push(res.data[key]);
        }
        // this.cityList = res.data;
        // console.log(this.cityList);
        this.hotList = res.data.hotCities;
      })
      .catch((err) => {
        console.log("获取失败", err);
      });

    // setTimeout(() => {
    //   this.cityHeight = document.querySelector(".city_show").offsetHeight;
    //   //   console.log(this.cityHeight);

    //   let arr = document.querySelectorAll(".letter .tit");
    //   //  console.log(arr.innerHTML)
    //   console.log(arr[10].offsetTop);
    //   //   arr[10].scrollTop = 0+"px";
    //   document.querySelectorAll(".letter .tit")[10].scrollTop = 0+"px";
    // }, 1000);
  },
};
</script>

<style lang="less" scoped>
.cityPage {
  width: 100%;
  font-size: 16px;
  > div {
    background-color: #f1f1f1;
  }
  [class^="tit"] {
    background-color: #e0e0e0;
    padding: 3px 12px;
    box-sizing: border-box;
  }
  .position_city {
    .position_name {
      padding: 15px 12px;
      box-sizing: border-box;
      .position_nm {
        padding: 2px 30px;
        box-sizing: border-box;
        border: 1px solid #dadada;
        background-color: #ffffff;
        border-radius: 3px;
      }
    }
  }
  .lately_city {
    padding-bottom: 15px;
    ul {
      padding: 0 12px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        box-sizing: border-box;
        border: 1px solid #dadada;
        background-color: #ffffff;
        padding: 3px 0;
        border-radius: 3px;
        flex-basis: 30%;
        text-align: center;
        margin-top: 15px;
        margin-right: 11px;
      }
    }
  }
  .hot_city {
    padding-bottom: 15px;
    ul {
      padding: 0 12px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        box-sizing: border-box;
        border: 1px solid #dadada;
        background-color: #ffffff;
        padding: 3px 0;
        border-radius: 3px;
        flex-basis: 30%;
        text-align: center;
        margin-top: 15px;
        margin-right: 11px;
      }
    }
  }
  .city_show {
    .letter {
      font-size: 18px;
      background-color: #f0f0f0;
      .tit {
        padding: 5px 30px;
        box-sizing: border-box;
      }
      ul {
        padding: 5px 20px;
        li {
          padding: 10px 0;
          font-size: 16px;
          border-bottom: #909090;
          border-bottom: 1px solid #ccc;
          box-sizing: border-box;
          color: #505050;
          &:last-of-type {
            border-bottom: 0;
          }
        }
      }
    }
  }
  .letter_position {
    position: fixed;
    right: 0;
    top: 40px;
    background-color: transparent;
    .letter_nm {
      width: 30px;
      font-size: 14px;
    }
    ul {
      li {
        text-align: center;
        padding: 2px 0;
        &:active {
          background-color: #ccc;
          color: white;
        }
      }
    }
  }
}
</style>