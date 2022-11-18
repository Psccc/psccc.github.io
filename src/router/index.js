import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import userInfomation from '../views/userInfomation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/userInfomation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



// router.afterEach((to, from) => {
 
// 	let isTabbarData = checkIsTabbar(to);
// 	if (isTabbarData.isTabbar) {
// 		store.commit('SET_TABBAR_CURRENT', isTabbarData.tabbarName);
// 	}
 
// 	checkPageStack(to, from);
 
// 	// 设置标题
// 	document.title = to.query.title || to.meta.title|| '广州颐生妇儿综合门诊';
// });

export default router
