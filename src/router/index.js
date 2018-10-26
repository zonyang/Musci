import Vue from 'vue'
import Router from 'vue-router'

const Recommend = () => import('components/recommend/recommend') // 进行页面按需加载的引入方式
const Singer = () => import('components/singer/singer')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const SingerDetail = () => import('components/singer-detail/singer-detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer,
      children: {
        path: ':id',
        component: SingerDetail
      }
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
