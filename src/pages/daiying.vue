<template>
  <div ref="com" class="daiying">
    <img v-if="loading" class="loading" src="https://s4.ax1x.com/2021/12/07/ocZHRU.gif" alt="">
    <hope-video @my-click="myRev" :firstLoading="firstLoading" :hopeList="hopeList"></hope-video>
    <more-hope @my-click="myRev" :isLoading="isLoading" :moreList="moreList"></more-hope>
  </div>
</template>
<script>
import HopeVideo from "@/components/hopeVideo.vue";
import MoreHope from "@/pages/moreHope.vue";
export default {
  name: "Daiying",
  data() {
    return {
      hopeList: [],
      moreList: [],
      movieIds: [],
      num: 0,
      num2: 2,
      value: "",
      throt: null,
      firstLoading:false,
      isLoading:false,
      loading:false
    };
  },
  components: {
    HopeVideo,
    MoreHope,
  },
  methods: {
    myRev(boo){
      this.loading = boo;
    },
    myThrot() {
      if (this.throt !== null) {
        // console.log(this.throt)
        clearTimeout(this.throt);
      }
      this.throt = setTimeout(() => {
        this.bottomRef();
      }, 300);
    },
    bottomRef(e) {
      let scrollTop = window.scrollY;
      let windowHeight = window.innerHeight;
      // let listHeight = this.$refs.com.clientHeight;
      let listHeight = document.body.clientHeight;
      // console.log(scrollTop+windowHeight,listHeight)
      if (scrollTop + windowHeight >= listHeight) {
        this.isLoading = true;
        let arr = [];
        this.num = this.moreList.length;

        for (let i = 0; i < this.movieIds.length; i++) {
          //   console.log(this.movieIds[this.num]);
          this.num++;
          arr.push(this.movieIds[this.num]);
          if (this.num > this.movieIds.length) {
            return;
          }
          if (this.num >= this.num2 * 10) {
            this.num2 += 1;
            // console.log(arr.join(","));
            this.value = arr.join();
            // console.log(this.value);
            this.axios
              .get(`https://apis.netstart.cn/maoyan/index/moreComingList?ci=1&limit=10&movieIds=${this.value}`)
              .then((res) => {
                this.moreList = this.moreList.concat(res.data.coming);
                // console.log(res.data.coming);
                this.isLoading = false;
              })
              .catch((err) => {
                console.log(err, "获取失败");
              });

            return;
          }
        }
      }
    }
  },
  mounted() {
    this.firstLoading = true;
    this.axios
      .get("https://apis.netstart.cn/maoyan/index/mostExpected?ci=1&limit=10&offset=0")
      .then((res) => {
        // console.log(res.data.coming)
        this.hopeList = res.data.coming;
        this.firstLoading = false;
      })
      .catch((err) => {
        console.log("获取失败");
      });
    this.axios
      .get("https://apis.netstart.cn/maoyan/index/comingList?ci=1&limit=10")
      .then((res) => {
        // console.log(res.data)
        this.moreList = res.data.coming;
        this.movieIds = res.data.movieIds;
      })
      .catch((err) => {
        console.log("获取失败");
      });

    // window.addEventListener("scroll", this.bottomRef);
    // this.$refs.con.addEventListener("scroll", this.bottomRef)
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.name)
    next((vm) => {
      if (to.name == "DaiYing") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  },
};
</script>

<style lang='less' scoped>
.loading {
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
  z-index: 1001;
  img {
    width: 100%;
  }
}
</style>