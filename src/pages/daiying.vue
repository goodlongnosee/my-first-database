<template>
  <div ref="com" class="daiying">
    <hope-video :hopeList="hopeList"></hope-video>
    <more-hope :moreList="moreList"></more-hope>
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
    };
  },
  components: {
    HopeVideo,
    MoreHope,
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
      // let listHeight = this.$refs.com.clientHeight;
      let listHeight = document.body.clientHeight;
      // console.log(scrollTop+windowHeight,listHeight)
      if (scrollTop + windowHeight >= listHeight) {
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
              .get(`/index/moreComingList?ci=1&limit=10&movieIds=${this.value}`)
              .then((res) => {
                this.moreList = this.moreList.concat(res.data.coming);
                // console.log(res.data.coming);
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
    this.axios
      .get("/index/mostExpected?ci=1&limit=10&offset=0")
      .then((res) => {
        // console.log(res.data.coming)
        this.hopeList = res.data.coming;
      })
      .catch((err) => {
        console.log("获取失败");
      });
    this.axios
      .get("/index/comingList?ci=1&limit=10")
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