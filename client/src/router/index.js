import Vue from 'vue'
import VueRouter from 'vue-router'

import PageList from '../components/PageList.vue'
import PagePost from '../components/PagePost.vue'
import AddPost from '../components/AddPost.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'page-list',
    component: PageList
  },
  {
    path: '/post/:id',
    name: 'page-post',
    component: PagePost
  },
  {
    path: '/addpost',
    name: 'add-post',
    component: AddPost
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
