import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home/homepage/hotvideo"
  },
  {
    path: "/home",
    component: () => import("@/views/home.vue"),
    children: [
      {
        path: "homepage",
        component: () => import("@/views/homepage.vue"),
        children: [
          {
            path: "hotvideo",
            name: "HotVideo",
            component: () => import("@/pages/hotvideo.vue")
          },
          {
            path: "yingyuan",
            component: () => import("@/pages/yingyuan.vue")
          },
          {
            path: "daiying",
            name: "DaiYing",
            component: () => import("@/pages/daiying.vue")
          },
          {
            path: "jingdian",
            component: () => import("@/pages/jingdian.vue")
          },
        ]
      },
      {
        path: "video",
        component: () => import("@/views/video.vue")
      },
      {
        path: "minivideo",
        component: () => import("@/views/minivideo.vue")
      },
      {
        path: "user",
        component: () => import("@/views/user.vue")
      }
    ]
  },

  {
    path: "/show",
    component: () => import("@/views/show.vue")
  },
  {
    path: "/videoDetail",
    component: () => import("@/components/videodetail.vue")
  }, 
  {
    path: "/login",
    component: () => import("@/pages/login.vue")
  },
  {
    path: "/Search",
    component: () => import("@/pages/search.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
