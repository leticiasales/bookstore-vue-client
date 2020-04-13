import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'

import AuthorsIndex from '@/components/authors/Index'
import AuthorsShow from '@/components/authors/Show'
import AuthorsNew from '@/components/authors/New'

import CategoriesIndex from '@/components/categories/Index'
import CategoriesShow from '@/components/categories/Show'
import CategoriesNew from '@/components/categories/New'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/authors',
      name: 'Authors',
      component: AuthorsIndex
    },
    {
      path: '/authors/new',
      name: 'New Author',
      component: AuthorsNew
    },
    {
      path: '/authors/:id/edit',
      name: 'Edit Author',
      component: AuthorsNew
    },
    {
      path: '/authors/:id',
      name: 'Author',
      component: AuthorsShow
    },
    {
      path: '/categories',
      name: 'Categories',
      component: CategoriesIndex
    },
    {
      path: '/categories/new',
      name: 'New Category',
      component: CategoriesNew
    },
    {
      path: '/categories/:id/edit',
      name: 'Edit Category',
      component: CategoriesNew
    },
    {
      path: '/categories/:id',
      name: 'Category',
      component: CategoriesShow
    }
  ]
})
