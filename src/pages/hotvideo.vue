<template>
  <div ref="con" class="hotvideo">
    <good-video :isLoading="isLoading" :goodList="goodList"></good-video>
    <video-list
      :fixLoading="fixLoading"
      :isLoading="isLoading"
      :videoList="videoList"
    ></video-list>
  </div>
</template>
<script>
import GoodVideo from "@/components/goodVideo.vue";
import VideoList from "@/pages/videoList.vue";

export default {
  name: "hotVideo",
  components: {
    GoodVideo,
    VideoList,
  },
  data() {
    return {
      goodList: {},
      videoList: [],
      conHeight: 0,
      num2: 0,
      num3: 2,
      moreArr: [],
      isLoading: false,
      fixLoading: false,
      throt: null,
    };
  },
  methods: {
    myThrot(){
      if(this.throt !== null){
        clearTimeout(this.throt)
      }
      this.throt = setTimeout(() => {
        this.bottomRef();
      }, 500);
    },
    bottomRef(e) {
      let scrollTop = window.scrollY;
      //   let windowHeight = window.innerHeight - 88;
      let windowHeight = window.innerHeight;
      // let listHeight = this.$refs.con.clientHeight;
      let listHeight = document.body.clientHeight;
      // console.log(this.$refs.con.clientHeight);
      // console.log(scrollTop + windowHeight - (88))
      // console.log(scrollTop+windowHeight,listHeight)
      if (scrollTop + windowHeight >= listHeight) {
        // console.log(1)
        this.num2 = this.videoList.length;
        let arr = [];
        for (let i = 0; i < this.moreArr.length; i++) {
          this.num2++;
          arr.push(this.moreArr[this.num2]);
          if (this.num2 > this.moreArr.length) {
            return;
          }
          if (this.num2 >= this.num3 * 10) {
            this.num2 = this.num3 * 10;
            // console.log(this.num3,this.num2,num)
            // console.log(arr.join());

            this.num3 += 1;

            this.fixLoading = true;
            this.axios
              .get(`/index/moreComingList?movieIds=${arr.join()}`)
              .then((res) => {
                // console.log(res.data);

                this.videoList = this.videoList.concat(res.data.coming);

                this.fixLoading = false;
              })
              .catch((err) => {
                console.log("获取失败");
              });

            return;
          }
        }
      }
    },
  },
  mounted() {
    this.axios
      .get("/index/topRatedMovies")
      .then((res) => {
        this.goodList = res.data;
        this.isLoading = true;
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("获取失败");
        this.isLoading = false;
      });
    this.axios
      .get("/index/movieOnInfoList")
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.movieIds)
        this.videoList = res.data.movieList;
        // console.log(this.videoList)
        this.moreArr = res.data.movieIds;
      })
      .catch((err) => {
        console.log("获取失败");
      });
  },
  beforeRouteEnter(to,from,next){
    // console.log(to.name)
    next((vm) => {
      if (to.name == "HotVideo") {
        window.addEventListener("scroll", vm.myThrot);
      }
    });
  }
};
</script>