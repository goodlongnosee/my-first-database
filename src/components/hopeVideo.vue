<template>
  <div class="hope_box">
    <div class="hope_tit">近期最受期待</div>
    <nav class="hope_list">
      <ul>
        <li @click="getItem(item.id)" v-for="item,index in hopeList" :key="item.id">
          <div class="img_box">
            <img
              :src="item.img"
              alt=""
            />
            <p>{{item.wish}}人想看</p>
          </div>
          <div class="hope_msg">
            <div class="name">{{item.nm}}</div>
            <div class="date">{{dateList[index]}}</div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: "HopeVideo",
  props: {
    hopeList: {
      type: Array,
    },
  },
  data(){
      return {
          dateList:[]
      }
  },
  methods:{
    ...mapMutations(['changeMovieDetail']),
    getItem(movieId){
        this.axios.get(`/movie/detail?movieid=${movieId}`).then(
          res =>{
            this.changeMovieDetail(res.data);
            this.$router.push({path:"/videoDetail"})
          }
        ).catch(
          err => {
            console.log(err,"获取失败")
          }
        )
    }
  },
  mounted(){
      let data = this.hopeList;
      data.forEach(item => {
        //   console.log(item.comingTitle.split(" ")[1])
          this.dateList.push(item.comingTitle.split(" ")[0])
      })
  }
};
</script>

<style lang="less" scoped>
.hope_box {
    width: 100%;
    padding: 5px 12px 10px;
    box-sizing: border-box;
  .hope_tit {
      width: 100%;
      color: #6e6e6e;
      font-size: 15px;
      margin: 10px 0;
  }
  .hope_list {
      width: 100%;
      overflow: scroll;
      height: 220px;
      ul {
          display: flex;
          li {
              width: 90px;
              margin-right: 10px;
              .img_box {
                  width: 100%;
                  position: relative;
                  overflow: hidden;
                  img {
                    width: 90px;
                  }
                  p {
                      padding: 0 3px;
                      box-sizing: border-box;
                      font-size: 14px;
                      font-weight: bold;
                      color: #ffbb00;
                      position: absolute;
                      bottom: 10px;
                      left: 0;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                  }
              }
              .hope_msg {
                  width: 100%;
                  .name {
                      width: 100%;
                      font-size: 16px;
                      font-weight: bold;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin: 5px 0;
                  }
                  .date {
                      font-size: 15px;
                      color: #919191;
                  }
              }
          }
      }
  }
}
</style>