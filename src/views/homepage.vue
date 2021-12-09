<template>
  <div ref="con" class="homepage">
    <div class="top_list">
      <div class="city"><span class="cityName">广州</span></div>
      <nav class="cate_box">
        <ul>
          <li>
            <router-link
              exact
              active-class="active"
              to="/home/homepage/hotvideo"
              >热映</router-link
            >
          </li>
          <li>
            <router-link
              exact
              active-class="active"
              to="/home/homepage/yingyuan"
              >影院</router-link
            >
          </li>
          <li>
            <router-link exact active-class="active" to="/home/homepage/daiying"
              >待映</router-link
            >
          </li>
          <li>
            <router-link
              exact
              active-class="active"
              to="/home/homepage/jingdian"
              >经典电影</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="search_box">
        <router-link to="/Search">
          <img src="https://s4.ax1x.com/2021/12/06/os5WG9.png" alt="" />
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Homepage",
};
</script>
<style lang="less" scoped>
.homepage {
  width: 100%;
  padding-top: 40px;
  .top_list {
    width: 100%;
    height: 40px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    background-color: #fff;
    position: fixed;
    top: 48px;
    left: 0;
    z-index: 100;
    background-color: #f0f0f0;
    .city {
      height: 40px;
      width: 60px;
      .cityName {
        display: block;
        height: 40px;
        line-height: 42px;
        font-size: 16px;
        color: #909090;
        position: relative;
        &::after {
          display: block;
          content: "";
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top: 5px solid #ccc;
          position: absolute;
          right: 10px;
          top: 50%;
        }
      }
    }
    .cate_box {
      flex-basis: 60%;
      ul {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          a {
            font-size: 18px;
            display: block;
            height: 40px;
            box-sizing: border-box;
            &.active {
              border-bottom: 2px solid darkorange;
              font-weight: 600;
            }
          }
        }
      }
    }
    .search_box {
      width: 30px;
      height: 40px;
      text-align: center;
      position: relative;
      img {
        width: 20px;
        position: absolute;
        top: 25%;
        right: 5px;
      }
    }
  }
}
</style>