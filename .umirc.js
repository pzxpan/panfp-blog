export default {
  disableCSSModules: true,
  treeShaking: true,
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: './user/login',
        },
        {
          path: '/user/register',
          name: 'register',
          component: './user/register',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/article',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/article/editor/:id',
          name: 'detail',
          component: './article/articleedit',
        },
        {
          path: '/article/editor',
          name: 'detail',
          component: './article/articleedit',
        },
        {
          path: '/article/:id',
          name: 'detail',
          component: './article/article',
        },

        {
          component: './404',
        },
      ],
    },

    {
      path: '/resume',
      component: '../layouts/EmptyLayout',
      routes: [
        {
          path: '/resume',
          name: 'resume',
          component: './resume/resume',
        },
      ],
    },

    {
      path: '/mine',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/mine/myarticle',
          name: 'myarticle',
          component: './mine/myarticle',
        },
        {
          path: '/mine/setting',
          name: 'setting',
          component: './mine/setting',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          name: 'home',
          component: './home/home',
        },
        {
          component: './404',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'Blog',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
