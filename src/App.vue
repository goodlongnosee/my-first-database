<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
// body {
//   display: -webkit-box; /*对象作为伸缩盒子模型展示*/
//   -webkit-box-orient: vertical; /*设置或检索伸缩盒子对象的子元素的排列方式*/
//   -webkit-line-clamp: 3; /*显示的行数*/
//   overflow: hidden; /*隐藏超出的*/
//  }
body {
  margin: 0;
  font-family: "微软雅黑";
  user-select: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
ul,
ol {
  list-style: none;
}
i,
b {
  font-style: normal;
}
input,
button {
  border: 0;
}
input {
  outline: none;
}
a,
a:hover {
  color: #000;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
