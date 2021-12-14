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
            name: "Yingyuan",
            component: () => import("@/pages/yingyuan.vue")
          },
          {
            path: "daiying",
            name: "DaiYing",
            component: () => import("@/pages/daiying.vue")
          },
          {
            path: "jingdian",
            name: "JingDian",
            component: () => import("@/pages/jingdian.vue")
          },
        ]
      },
      {
        path: "video",
        name: "Shipin",
        component: () => import("@/views/video.vue")
      },
      {
        path: "minivideo",
        name: "MiniVideo",
        component: () => import("@/views/minivideo.vue")
      },
      {
        path: "user",
        name: "User",
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
  },
  {
    path: "/BuyTicket",
    name: "Ticket",
    component: () => import("@/views/ticket.vue")
  },
  {
    path: "/Order",
    component: () => import("@/pages/order.vue")
  },
  {
    path: "/Discount",
    component: () => import("@/pages/discount.vue")
  },
  {
    path: "/City",
    component: () => import("@/pages/citypage.vue")
  },
]

const router = new VueRouter({
  routes
})


export default router
