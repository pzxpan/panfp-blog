import request,{BASE_URL} from '@/utils/request';
export async function getUserImg(params) {
  return request(BASE_URL + "get_user_img", {
    method: 'POST',
    data: params,
  });
}

export async function deleteImg(params) {
  return request(BASE_URL + 'delete_img', {
    method: 'POST',
    data: params,
  });
}

export async function uploadFile(params) {
  return request(BASE_URL + 'upload_file', {
    method: 'POST',
    data: params,
  });
}
