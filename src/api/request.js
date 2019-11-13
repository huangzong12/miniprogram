let count = 0; //当前请求接口的次数

export function request(url, method = "POST", data = {}, header = {}, showLoading = true) {
  //数据请求前loading
  if (showLoading) {
    count === 0 && wx.showLoading({title: '加载中...', mask: true});
    count++;
  }
  return new Promise((resolve, reject) => {
    const requestData = Object.assign({}, data);
    const requestHeader = Object.assign({'Content-Type': 'application/json'}, data);
    wx.request({
      url: url,
      method: method,
      data: requestData,
      header: requestHeader,
      success: function (res) {
        resolve(res.data);
      },
      fail: function (error) {
        reject(error)
      },
      complete: function () {
        if (showLoading) {
          --count;
          count === 0 && wx.hideLoading();
        }
      }
    })
  })
}

export function get(url, data, header = {}, showLoading = true) {
  const headerData = {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...header
  };
  return request(url, 'GET', data, headerData, showLoading)
}

export function post(url, data, header = {}, showLoading = true) {
  return request(url, 'POST', data, header, showLoading)
}

export function put(url, data, header = {}, showLoading = true) {
  return request(url, 'PUT', data, header, showLoading)
}

export function form(url, data, header = {}, showLoading = true) {
  const headerData = {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...header
  };
  return request(url, 'POST', data, headerData, showLoading)
}
