import {
  getArticleList,
  getArticleHot,
  getArticleCourse,
  getArticleDetail,
  addArticleComment,
  getUserArticle,

  getArticleComment,
  getUserArticleComment,
  delArticleComment,
  getArticleLabels,
  getAllLabels,
  addArticleLike,
  addArticleView,

  isArticleLike,
  cancelArticleLike,
  getCategory,
  getRecommendCategory,
  getAllHeaderCategory,
  postArticleContent,
  postDraftContent
} from '@/services/article';


export default {
  namespace: 'article',

  state: {
  },

  effects: {
    * articleList({ payload, callback}, { call, put }) {
      const data = yield call(getArticleList, payload);
      if (callback && data) callback(data)
    },
    * articleListHot({ payload,callback }, { call, put }) {
      const data = yield call(getArticleHot, payload);
      if (callback && data) callback(data)
    },
    * articleListCourse({ payload,callback }, { call, put }) {
      const data = yield call(getArticleCourse, payload);
      if (callback && data) callback(data)
    },

    * userArticles({ payload,callback }, { call, put }) {
      const data = yield call(getUserArticle, payload);
      if (callback && data) callback(data)
    },

    * articleDetail({ payload,callback }, { call, put }) {
      const data = yield call(getArticleDetail, payload);
      if (callback && data) callback(data)
    },

    * articleUser({ payload,callback }, { call, put }) {
      const data = yield call(getArticleDetail, payload);
      if (callback && data) callback(data)
    },

    * addComment({ payload, callback }, { call, put }) {
      const data = yield call(addArticleComment, payload);
      if (callback && data) callback(data)
    },

    * delComment({ payload, callback }, { call, put }) {
      const data = yield call(delArticleComment, payload);
      if (callback && data) callback(data)
    },

    * commentList({ payload,callback}, { call, put }) {
      const data = yield call(getArticleComment, payload);
      if (callback && data) callback(data)
    },

    * userCommentList({ payload,callback}, { call, put }) {
      const data = yield call(getUserArticleComment, payload);
      if (callback && data) callback(data)
    },

    * getArticleLabel({ payload ,callback }, { call, put }) {
      const data = yield call(getArticleLabels, payload);
      if (callback && data) callback(data)
    },

    * getAllLabels({ payload ,callback }, { call, put }) {
      const data = yield call(getAllLabels, payload);
      if (callback && data) callback(data)
    },

    * addLike({ payload, callback }, { call, put }) {
      const data = yield call(addArticleLike, payload);
      if (callback && data) callback(data)
    },

    * addArticleView({ payload, callback }, { call, put }) {
      const data = yield call(addArticleView, payload);
      if (callback && data) callback(data)
    },

    * cancelLike({ payload, callback }, { call, put }) {
      const data = yield call(cancelArticleLike, payload);
      //data为0时，会导致判断callback && data为假,
      if (callback) callback(data)
    },

    * isLike({ payload, callback }, { call, put }) {
      const data = yield call(isArticleLike, payload);
      if (callback && data) callback(data)
    },

    * category({ payload,callback }, { call, put }) {
      const data = yield call(getCategory, payload);
      if (callback && data) callback(data)
    },

    * recommendCategory({ payload,callback }, { call, put }) {
      const data = yield call(getRecommendCategory, payload);
      if (callback && data) callback(data)
    },

    * allHeaderCategories({ payload,callback }, { call, put }) {
      const data = yield call(getAllHeaderCategory, payload);
      if (callback && data) callback(data)
    },

    * addArticleContent({ payload,callback }, { call, put }) {
      const data = yield call(postArticleContent, payload);
      if (callback && data) callback(data)
    },

    * addDraftContent({ payload,callback }, { call, put }) {
      const data = yield call(postDraftContent, payload);
      if (callback && data) callback(data)
    },
  },
};
