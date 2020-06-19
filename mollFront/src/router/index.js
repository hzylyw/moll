import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/views/homePage'
import goods from '@/views/goods'
import signIn from '@/views/signIn'
import login from '@/views/login'
import myOrders from '@/views/myOrders'
import shoppingCart from '@/views/shoppingCart'
import productDetails from '@/views/productDetails'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'homePage',
    component: homePage
  }, {
    path: '/signIn',
    name: 'signIn',
    component: signIn
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/goods/:name',
    name: 'goods',
    component: goods
  }, {
    path: '/myOrders',
    name: 'myOrders',
    component: myOrders
  }, {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: shoppingCart
  }, {
    path: '/productDetails/:id',
    name: 'productDetails',
    component: productDetails
  }]
})
