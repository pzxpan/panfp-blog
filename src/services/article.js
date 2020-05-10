import { stringify } from 'qs';
import request ,{BASE_URL} from '@/utils/request';

export async function getArticleList(params) {
  return request(BASE_URL + 'articles', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleHot(params) {
  return request(BASE_URL + 'hot_articles', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleCourse(params) {
  return request(BASE_URL + 'articles', {
    method: 'POST',
    data: {"category_id": 2},
  });
}

export async function getArticleDetail(params) {
  return request(BASE_URL + 'article_detail', {
    method: 'POST',
    data: params,
  });
}
//auth
export async function addArticleComment(params) {
  return request(BASE_URL +'add_article_comment', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleComment(params) {
  return request(BASE_URL +'article_comments', {
    method: 'POST',
    data: params,
  });
}

export async function getUserArticleComment(params) {
  return request(BASE_URL +'user_article_comments', {
    method: 'POST',
    data: params,
  });
}

export async function delArticleComment(params) {
  return request(BASE_URL +'del_article_comment', {
    method: 'POST',
    data: params,
  });
}

export async function getArticleLabels(params) {
  return request(BASE_URL +'article_labels', {
    method: 'POST',
    data: params,
  });
}

export async function getAllLabels(params) {
  return request(BASE_URL +'all_labels', {
    method: 'POST',
    data: params,
  });
}

export async function getUserArticle(params) {
  return request(BASE_URL +'user_articles', {
    method: 'POST',
    data: params,
  });
}
export async function addArticleView(params) {
  return request(BASE_URL +'add_view_cnt', {
    method: 'POST',
    data: params,
  });
}
//auth
export async function addArticleLike(params) {
  return request(BASE_URL +'add_like', {
    method: 'POST',
    data: params,
  });
}

export async function cancelArticleLike(params) {
  return request(BASE_URL +'cancel_like', {
    method: 'POST',
    data: params,
  });
}

export async function isArticleLike(params) {
  return request(BASE_URL +'is_like', {
    method: 'POST',
    data: params,
  });
}

export async function getCategory(params) {
  return request(BASE_URL +'categories', {
    method: 'POST',
    data: params,
  });
}

export async function getRecommendCategory(params) {
  return request(BASE_URL +'recommend_categories', {
    method: 'POST',
    data: params,
  });
}

export async function getAllHeaderCategory(params) {
  return request(BASE_URL +'all_header_categories', {
    method: 'POST',
    data: params,
  });
}

export async function postArticleContent(params) {
  return request(BASE_URL +'add_article', {
    method: 'POST',
    data: params,
  });
}

export async function postDraftContent(params) {
  return request(BASE_URL +'add_draft', {
    method: 'POST',
    data: params,
  });
}




