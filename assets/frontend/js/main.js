document.addEventListener('DOMContentLoaded', function() {

    console.log('Isfiframework Started...');

    if(typeof __alert != 'undefined')
    {
        isAlert(__alert.type.toUpperCase(), __alert.message, __alert.type);
        setTimeout( () => {
            $(".isalert-text").html(__alert.message)
        }, 155);
    }
    
    $(document).on('click', '#btn_del', function(){
        const target = $(this).attr('data-target');
        const vl = $(this).attr('data-id');
        const direct = $(this).attr('data-direct');
        const msg = ($(this).attr('data-msg')) ? $(this).attr('data-msg') : "Apakah kamu yakin ingin menghapus data ini?";
        isAlert({
            title: "Pemberitahuan", 
            text: msg, 
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                del(target,vl,direct);
            } else {
                return false;
            }
        });
    });

    $(document).on('click', '#btn_prompt', function(){
        const target = $(this).attr('data-target');
        const vl = $(this).attr('data-id');
        const direct = $(this).attr('data-direct');
        const msg = ($(this).attr('data-msg')) ? $(this).attr('data-msg') : "Apakah kamu yakin ingin memproses data ini?";
        isAlert({
            title: "Pemberitahuan", 
            text: msg, 
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                alertPromp(target,vl,direct);
            } else {
                return false;
            }
        });
    });

    $(document).on('click', '#btn_del_prompt', function() {
        const target = $(this).attr('data-target');
        const vl = $(this).attr('data-id');
        const direct = $(this).attr('data-direct');
        const msg = ($(this).attr('data-msg')) ? $(this).attr('data-msg') : "Apakah kamu yakin ingin menghapus data ini?";
        let {
            value: text
        } = isAlert({
            content: "input",
            title: msg,
            icon: "warning",
            text: 'Tulis Komentar anda',
            buttons: true,
            dangerMode: true
        });
        $(".isalert-button--confirm").on("click", function() {
            text = $(".isalert-content__input").val();
            del(target, vl, direct, text);
        });
    });

    $(document).on('click', '.btn_del', function() {
        const target = $(this).attr('data-target');
        const vl = $(this).attr('data-id');
        const direct = $(this).attr('data-direct');
        const msg = ($(this).attr('data-msg')) ? $(this).attr('data-msg') : "Apakah kamu yakin ingin menghapus data ini?";
        isAlert({
            title: "Pemberitahuan",
            text: msg,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                del(target, vl, direct);
            } else {
                return false;
            }
        });
    });

    $(document).on('click', '#btn_click_post', function() {
        const target = $(this).attr('data-target');
        const vl = $(this).attr('data-id');
        const msg = $(this).attr('data-msg') ? $(this).attr('data-msg') : "Message";
        isAlert({
            title: "Pemberitahuan",
            text: msg,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((ok) => {
            if (ok) {
                clickPost(target, vl);
            } else {
                return false;
            }
        });
    });
    
    
}); 


function ls(type, name, data) {
    if (type === 'set') {
      return localStorage.setItem(name, data);
    } else if (type === 'get') {
      return localStorage.getItem(name);
    } else if (type === 'cls') {
      let rmb = localStorage.getItem("rmb");
      localStorage.clear();
      if (rmb === null) {
        rmb = "";
      }
      localStorage.setItem("rmb", rmb);
      return;
    } else if (type === 'rm') {
      return localStorage.removeItem(name);
    }
}


function toggleFullscreen(event) {
    let element = document.body;
    if (event instanceof HTMLElement) {
        element = event;
    }
    let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
    c_clear();
}

function c_clear(){
    setTimeout(function(){
        console.clear();
    }, 300);
}


function urls(path)
{
    path = path ? path : '';
    const url = base_url+path;
    return url;
}


function getToken()
{
    const csrfToken = document.querySelector('meta[name="_token"]');
    return csrfToken ? csrfToken.getAttribute('content') : '';
}


/**
 * _request function
 * @param {string} _url - endpoint URL
 * @param {string} _type - request method (e.g., 'POST')
 * @param {object|string|FormData} _data - data to send
 * @param {boolean} _withCsrf - include CSRF token
 * @param {function} _callback - success/error callback
 * @param {function|null} _onProgress - optional progress callback
 */
// example
// _request('/api/user/upload', 'POST', formData, true, function(res) {
//     console.log('Upload success:', res);
// }, function(progress) {
//     // Update progress bar
//     document.getElementById('uploadProgress').value = progress;
// });
function _request(_url, _type = 'GET', _data = {}, _withCsrf = true, _callback, _onProgress = null) {
    const isFormData = _data instanceof FormData;
    const isJson = typeof _data === 'object' && !isFormData;
    const sendData = isJson ? JSON.stringify(_data) : _data;

    $.ajax({
        url: _url,
        type: _type,
        data: sendData,
        processData: !isFormData && !isJson ? true : false,
        contentType: isJson ? 'application/json' : false,
        xhr: function () {
            const xhr = new window.XMLHttpRequest();
            if (_onProgress && xhr.upload) {
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        const percentComplete = Math.round((evt.loaded / evt.total) * 100);
                        _onProgress(percentComplete);
                    }
                }, false);
            }
            return xhr;
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            if (_withCsrf && _type.toUpperCase() !== 'GET') {
                xhr.setRequestHeader('X-CSRF-TOKEN', getToken());
            }
        },
        success: function (res) {
            if (typeof _callback === 'function') _callback(res);
        },
        error: function (err) {
            if (typeof _callback === 'function') _callback(err);
        }
    });
}

function del(path,v,d,msg)
{
  const data_direct = (d) ? d : "";
  const data_msg = (msg) ? msg : "";
  const data_post = _stringify({
    data_id: v, data_direct: data_direct, data_msg: data_msg,
    csrf_token_name: getToken()
  });
  _request(urls(path),'POST',data_post,true,function(res){
    
    isAlert({
      title: res.message,
      text: "Proses Hapus Data "+ucwords(res.message),
      icon: res.message,
    }).then(function() {
      if(res.success && res.data != 0){
        if(typeof res.data.direct != "undefined"){
          window.location = base_url+res.data.direct;
        }
        else{
          location.reload();
        }
      }
      else{
        isAlert({
          title: "Error",
          text: "Proses Hapus Data Gagal!",
          icon: "error",
        });
      }
    });
  });
}


function alertPromp(path,v,d,msg)
{
  const data_direct = (d) ? d : "";
  const data_msg = (msg) ? msg : "";
  const data_post = _stringify({
    data_id: v, data_direct: data_direct, data_msg: data_msg,
    csrf_token_name: getToken()
  });
  _request(urls(path),'POST',data_post,true,function(res){
    
    isAlert({
      title: res.message,
      text: "Proses "+ucwords(res.message),
      icon: res.message,
    }).then(function() {
      if(res.success && res.data != 0){
        if(typeof res.data.direct != "undefined"){
          window.location = base_url+res.data.direct;
        }
        else{
          location.reload();
        }
      }
      else{
        isAlert({
          title: "Error",
          text: "Proses Data Gagal!",
          icon: "error",
        });
      }
    });
  });
}

function prompDirection(url, msg="")
{
    if(url)
    {
        isAlert({
            title: "Pemberitahuan",
            text: (msg ? msg : "Apakah anda yakin?"),
            icon: "info",
            buttons: true,
            dangerMode: true
        }).then((isOke) => {
            if (isOke) {
                window.location = url;
            } else {
                return false;
            }
        });
    }
}


function clickPost(path,v)
{
  const data_post = _stringify({data_id: v});
  _request(urls(path),'POST',data_post,true,function(res){
    
    isAlert({
      title: res.message,
      text: "Proses Data "+ucwords(res.message),
      icon: res.message,
    }).then(function() {
      if(res.success && res.data != 0){
        location.reload();
      }
      else{
        isAlert({
          title: "Error",
          text: "Proses Data Gagal!",
          icon: "error",
        });
      }
    });
  });
}

function submitPrompt(formId, message)
{
    const msg = (message) ? message : "Apakah Anda Yakin?";
    isAlert({
        title: "Pemberitahuan", 
        text: msg, 
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((ok) => {
        if (ok) {
            isfiLoader("show");
            $("#"+formId).submit();
        } else {
            return;
        }
    });
}


function _cjson(str, by) {
    by = by ? by : "parse";
    let parse = JSON.parse;

    JSON = {
        stringify: JSON.stringify,
        validate: function(str) {
            try {
                parse(str);
                return true;
            } catch (err) {
                return 0;
            }
        },
        parse: function(str) {
            try {
                return parse(str);
            } catch (err) {
                return 0;
            }
        }
    }
    if (by == 'validate') {
        return JSON.validate(str);
    } else if (by == 'parse') {
        return JSON.parse(str);
    } else if (by == 'stringify') {
        return JSON.stringify(str);
    }
}


function generateRandomNDigits(n) {
    return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
}

function _alert(type, msg, direct = "reload") {
    type = type ? type : "info";
    type = (type == "failed") ? "warning" : type;
    msg = msg ? msg : "Alert Message";
    isAlert(type.toUpperCase(), msg, type).then(function() {
        if (direct != 'reload') {
            location.href = urls(direct);
        } else {
            location.reload();
        }
    });
}


function _alertStay(type, msg) {
    type = type ? type : "info";
    type = (type == "failed") ? "warning" : type;
    msg = msg ? msg : "Alert Message";
    isAlert(type.toUpperCase(), msg, type);
}

function _alertDirection(type, msg, direct_url) {
    type = type ? type : "info";
    type = (type == "failed") ? "warning" : type;
    msg = msg ? msg : "Alert Message";
    direct_url = direct_url ? direct_url : base_url;

    isAlert({
        title: type.toUpperCase(),
        text: ucwords(msg),
        icon: type,
        buttons: true,
        dangerMode: false
    }).then(function(yes) {
        if (yes) {
            window.location = direct_url;
        } else {
            return false;
        }
    });
}

function getFormData($form) {
    let unindexed_array = $form.serializeArray();
    let indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function URLToArray(url) {
    let request = [];
    if (url) {
        let pairs = url.substring(url.indexOf('?') + 1).split('/');
        for (let i = 0; i < pairs.length; i++) {
            if (!pairs[i])
                continue;
            let pair = pairs[i].split('/')[0];
            request.push(pair)
        }
    }
    return request;
}

function dateToEng(str)
{
  let res = getDate();
  if(str){
    let data = str.split("-");
    res = data[2]+"-"+data[1]+"-"+data[0];
  }
  return res;
}

function dateNow()
{
    let dateNow = new Date();
    const offset = dateNow.getTimezoneOffset()
    dateNow = new Date(dateNow.getTime() - (offset*60*1000))
    return dateNow.toISOString().split('T')[0]
}


function cleanDotsComass(num)
{
  if(num){
    const regex = /[.,\s]/g;
    const result = num.replace(regex, '');
    return parseInt(result);
  }
}

function numFormat(number)
{
  let number_string = number.toString(),
    sisa  = number_string.length % 3,
    rupiah  = number_string.substr(0, sisa),
    ribuan  = number_string.substr(sisa).match(/\d{3}/g);
      
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return rupiah;
}

function _requestFormData(target,data,callback)
{
    $.ajax({
        type: "POST",
        contentType: "multipart/form-data",
        url: target,
        data: data,
        success: function (res) {
            if(res.success && res.data != 0){
                callback(res.data);
            }
        },
        error: function (e) {
            callback(e);
        }
    });
}


function btnClikDirection(path, arr_id, char) {
    char = char ? char : "/";
    let uri = base_url;
    let pr = "";
    for (let i = 0; i < arr_id.length; i++) {
        if ($(arr_id[i]).val() == "") {
            return _alertStay("info", "Isi isian terlebih dulu!");
        }
        pr += $(arr_id[i]).val() + char;
    }
    uri = uri + path + "/" + pr.substr(0, pr.length - 1);
    window.location.href = uri;
}


function btnClikDirectionBlank(path, arr_id, char) {
    char = char ? char : "_";
    let uri = base_url;
    let pr = "";
    for (let i = 0; i < arr_id.length; i++) {
        pr += $(arr_id[i]).val() + char;
    }
    uri = uri + path + "/" + pr.substr(0, pr.length - 1);
    window.open(uri, '_blank');
}

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

function ucwords(str) {
    let res = '';
    if (typeof str !== 'undefined') {
        res = str.toLowerCase().replace(/(?<= )[^\s]|^./g, a => a.toUpperCase());
    }
    return res;
}

function atb(s) {
    return atob(s);
}

function _atb(s) {
    return atob(atob(s));
}

function commas(n){
  let vl = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  this.value = vl;
}

function onlyNumber(vr)
{
    return vr.replace(/[^0-9,]/g, '');
}

function _jParse(json)
{
  return JSON.parse(json);
}

function _stringify(obj)
{
  return JSON.stringify(obj);
}
