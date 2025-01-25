document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi aplikasi
    console.log('Aplikasi berhasil dimuat');

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
  let tkn = '';
  if(typeof $('#mp') != 'undefined'){
    tkn = $('#mp').attr('data-scr');
  }
  return tkn;
}

function refToken(dt=false)
{
  if(!dt){
    _request(urls('api/ref-token'),'POST',_stringify({}),true,function(r){
      if(r.success && r.data != 0){
        $('#mp').attr('data-scr',r.data);
        $(".app_token").val(r.data);
      }
    });
  }
  else{
    $(".app_token").val(dt);
    $('#mp').attr('data-scr',dt);
  }
}

function _request(_url,_type,_data,_headers,_callback)
{
  let tkn = '';
  if(_headers != null){
    tkn = `Bearer ${getToken()}`;
  }
  _type = _type ? _type : 'GET';
  _data = _data ? _data : '';

  $.ajax({
    url: _url,
    type: _type,
    data: _data,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-Type", 'application/json');
      xhr.setRequestHeader("Authorization", tkn);
    },
    success: (res) => {
      // console.clear();
      refToken(res._token);
      return _callback(res);
    },
    error(err){
      refToken();
      return _callback(err);
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


function registerSummernote(element, placeholder, max, callbackMax) {
    $(element).summernote({
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['codeview']]
        ],
        placeholder,
        height: 300,
        callbacks: {
            onImageUpload: function(image) {
                sendFile(image[0], element);
            },
            onKeydown: function(e) {
                // var t = e.currentTarget.innerText;
                // if (t.length >= max) {
                //     //delete key
                //     if (e.keyCode != 8)
                //         e.preventDefault();
                // }
            },
            onKeyup: function(e) {
                var t = e.currentTarget.innerText;
                // if (typeof callbackMax == 'function') {
                //     callbackMax(max - t.length);
                // }
            },
            onPaste: function(e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                // var all = t + bufferText;
                var all = bufferText;
                document.execCommand('insertText', false, all.trim().substring(0, 10000));
                // if (typeof callbackMax == 'function') {
                //     callbackMax(max - t.length);
                // }
            }
        }
    });
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

function getDate(by)
{
  by = by ? by : "";
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  const m = (parseInt(today.getMonth()) + 1);
  let mm = String(m).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  if(by==""){
    today = dd + '/' + mm + '/' + yyyy;
  }
  else if(by=='full_en'){
    today = yyyy + '/' + mm + '/' + dd;
  }
  else if(by=='full_en_plus'){
    today = yyyy + '/' + mm + '/' + dd;
  }
  else if(by == "d"){
    today = dd;
  }else if(by == "m"){
    today = mm;
  }else if(by == "y"){
    today = yyyy;
  }
  else if(by == "Y"){
    today = String(yyyy).substring(2,4);
  }
  return today;
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

function convertDateID(string,char=" ",bulanStr=true) {
  char = char ? char : " ";
  bulanID = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
  tanggal = string.split("-")[0];
  bulan = string.split("-")[1];
  tahun = string.split("-")[2];
  if(bulanStr){
    return tanggal + char + bulanID[parseInt(bulan)] + char + tahun;
  }else{
    return tanggal + char + bulan + char + tahun;
  }
}

function convertDateToID(string,char=" ",bulanStr=true) {
  char = char ? char : " ";
  bulanID = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
  tanggal = string.split("-")[2];
  bulan = string.split("-")[1];
  tahun = string.split("-")[0];
  if(bulanStr){
    return tanggal + char + bulanID[parseInt(bulan)] + char + tahun;
  }else{
    return tanggal + char + bulan + char + tahun;
  }
}

function formatRupiah(angka, prefix){
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
    split           = number_string.split(','),
    sisa            = split[0].length % 3,
    rupiah          = split[0].substr(0, sisa),
    ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}


function cleanDotsComass(num)
{
  if(num){
    const regex = /[.,\s]/g;
    const result = num.replace(regex, '');
    return parseInt(result);
  }
}

function times() { 
  let dates = new Date(); 
  let hr = dates.getHours();
  let mn = dates.getMinutes();
  let sc = dates.getSeconds();
  if(hr <= 9){ hr = '0'+hr; }
  if(mn <= 9){ mn = '0'+mn; }
  if(sc <= 9){ sc = '0'+sc; }
  setTimeout("times()",1000); 
  document.getElementById("t_hours").innerHTML = hr; 
  document.getElementById("t_minute").innerHTML = mn;
  document.getElementById("t_second").innerHTML = sc;
} 


function timePicker(elm_id)
{
  $('#'+elm_id).timepicker({
    minuteStep: 1,
    template: 'modal',
    appendWidgetTo: 'body',
    showSeconds: true,
    showMeridian: false,
    defaultTime: false
  });
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
            refToken(res._token);
            callback(res.data);
          }
        },
        error: function (e) {
          refToken();
          callback(e);
        }

    });
}


function loadAllImageFiles() {
    if($(".box-list-images").length > 0)
    {
        _request(
            base_url + "api/load-all-images",
            "POST",
            _stringify({}),
            true,
            function (res) {
                if (res.success) {
                    $(".box-list-images").html("");
                    let _html = "";
                    const data = res.data;
                    $.each(data, function (i, v) {
                        _html += `
              <div class="img-modal-selected col-sm-2 pl-1 pr-1 mb-2">
                <img src="${v.url}" data-fname="${v.filename}" style="width:100%;height:100px;border:2px solid #ccc;">
              </div>
            `;
                    });
                    $(".box-list-images").html(_html);
                    console.clear();
                    $(document).on("click", ".img-modal-selected img", function (e) {
                        $(".btn-del-image, .btn-ok-selected").hide();
                        $(".img-modal-selected img.border-blue").removeClass("border-blue");
                        $(this).addClass("border-blue");

                        if ($("#image_view").length > 0) {
                            $("#image_view").attr("src", e.currentTarget.src);
                        }
                        if ($("#thumbnail").length > 0) {
                            $("#thumbnail").val(e.currentTarget.src);
                        }
                        if ($(".modal-images").length > 0) {
                            $(".modal-images").modal("hide");
                        }
                        $("#cover_top").val(e.currentTarget.dataset.fname);
                        $(".btn-del-image").attr("data-del", e.currentTarget.src);
                        $(".btn-ok-selected").attr("data-selected", e.currentTarget.src);
                        $(".btn-ok-selected").attr(
                            "data-fname",
                            e.currentTarget.dataset.fname
                        );
                        $(".btn-del-image, .btn-ok-selected").show();
                    });
                }
            }
        );
    }
}


function sendFile(image,elements) {
  let data = new FormData();
  data.append("file", image);

    $.ajax({
      data: data,
      type: "POST",
      url: base_url+"api/updimage",
      cache: false,
      contentType: false,
      processData: false,
      success: function (res) {
        if(res.success && res.data != 0){
          const image = res.data.url;
          load_all_images();
          refToken();
          $(elements).summernote("insertImage", image);
        }
      },
      error: function (data) {
        refToken();
        console.log(data);
      }
    });
}

function formatRupiah(angka, prefix){
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
    split           = number_string.split(','),
    sisa            = split[0].length % 3,
    rupiah          = split[0].substr(0, sisa),
    ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
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

function numFormat2(id="IDR",num,symbol=true)
{
    // FORMAT NUMBER
    let fmt = id.toLowerCase();
    if(id == "IDR"){
        fmt = id.toLowerCase().substr(0,2)+"-"+id.substr(0,2);
    }
    const cur = id
    let res = Intl.NumberFormat(fmt, {
        style: "currency",
        currency: cur,
        maximumFractionDigits: 0
    });
    if(symbol == false){
        res = Intl.NumberFormat(fmt);
    }
    return res.format(num);
    // END FORMAT NUMBER
}

function counted(number, sufix){
  if(number=="" || number==null || number=="null" || number==undefined){
    return "";
  } else {
    // number = number.replace(/[^,\d]/g, '');
    number = onlyNumber(number.toString());
      let text="";
      let num   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
      let word    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
      let level = new Array('','Ribu','Juta','Milyar','Triliun');
      let number_length = number.length;
 
      /* pengujian panjang number */
      if(number_length > 15){
          text = "Diluar Batas";
      }else{
          /* mengambil angka-angka yang ada dalam number, dimasukkan ke dalam array */
          for(let i = 1; i <= number_length; i++) {
              num[i] = number.substr(-(i),1);
          }
 
          let i = 1;
          let j = 0;
 
          /* mulai proses iterasi terhadap array angka */
          while(i <= number_length){
              sub_text = "";
              word1 = "";
              word2 = "";
              word3 = "";
 
              /* untuk Ratusan */
              if(num[i+2] != "0"){
                  if(num[i+2] == "1"){
                      word1 = "Seratus";
                  }else{
                      word1 = word[num[i+2]] + " Ratus";
                  }
              }
 
              /* untuk Puluhan atau Belasan */
              if(num[i+1] != "0"){
                  if(num[i+1] == "1"){
                      if(num[i] == "0"){
                          word2 = "Sepuluh";
                      }else if(num[i] == "1"){
                          word2 = "Sebelas";
                      }else{
                          word2 = word[num[i]] + " Belas";
                      }
                  }else{
                      word2 = word[num[i+1]] + " Puluh";
                  }
              }
 
              /* untuk Satuan */
              if (num[i] != "0"){
                  if (num[i+1] != "1"){
                      word3 = word[num[i]];
                  }
              }
 
              /* pengujian aggka apakah tidak nol semua, lalu ditambahkan level */
              if ((num[i] != "0") || (num[i+1] != "0") || (num[i+2] != "0")){
                  sub_text = word1+" "+word2+" "+word3+" "+level[j]+" ";
              }
 
              /* gabungkan variabe sub text (untuk Satu blok 3 num) ke variabel text */
              text = sub_text + text;
              i = i + 3;
              j = j + 1;
          }
 
          /* mengganti Satu Ribu jadi Seribu jika diperlukan */
          if ((num[5] == "0") && (num[6] == "0")){
              text = text.replace("Satu Ribu","Seribu");
          }
      }
      text = text.trim();
      return sufix == undefined ? text : text + " "+sufix;
  }
}

function convertTimeToBahasa(time) {
    // Pisahkan jam dan menit dari input waktu (format HH:mm)
    const [jam, menit] = time.split(":").map(Number);

    // Susun output berdasarkan jam dan menit
    let hasil = "";
    if (jam > 0) {
        hasil += `${jam} jam`;
    }
    if (menit > 0) {
        hasil += (jam > 0 ? " " : "") + `${menit} menit`;
    }
    return hasil || "0 menit"; // Default jika jam dan menit adalah 0
}

function convertTime(decc)
{

  if(!decc || decc < 1){
    return 0;
  }
  var decimalTimeString = decc;
  var decimalTime = parseFloat(decimalTimeString);
  decimalTime = decimalTime * 60 * 60;
  var hours = Math.floor((decimalTime / (60 * 60)));
  decimalTime = decimalTime - (hours * 60 * 60);
  var minutes = Math.floor((decimalTime / 60));
  decimalTime = decimalTime - (minutes * 60);
  var seconds = Math.round(decimalTime);
  if(hours < 10)
  {
    hours = hours;
  }
  if(minutes < 10)
  {
    minutes = minutes;
  }
  if(seconds < 10)
  {
    seconds = seconds;
  }
  // console.log(hours+"."+minutes);
  return hours + " Jam " + minutes + " Menit";
}

function convertTime2(decc,by)
{
  if(!decc || decc < 1){
    return 0;
  }
  by = by ? by : "";
  var decimalTimeString = decc;
  var decimalTime = parseFloat(decimalTimeString);
  decimalTime = decimalTime * 60 * 60;
  var hours = Math.floor((decimalTime / (60 * 60)));
  decimalTime = decimalTime - (hours * 60 * 60);
  var minutes = Math.floor((decimalTime / 60));
  decimalTime = decimalTime - (minutes * 60);
  var seconds = Math.round(decimalTime);
  if(hours < 10)
  {
    hours = hours;
  }
  if(minutes < 10)
  {
    minutes = minutes;
  }
  if(seconds < 10)
  {
    seconds = seconds;
  }

  let result = hours + " Jam " + minutes + " Menit";
  if(by == 'h'){
    result = hours;
  }
  else if(by == 'm'){
    result = minutes;
  }
  else if(by == 'hm'){
    result = hours,minutes;
  }
  // console.log(hours+"."+minutes);
  return result;
}

function magicTimeStr(t, ident)
{
  ident = ident ? ident : ":";
  let tms = t.split(ident);
  const result = tms[0]+" Jam "+tms[1]+" Menit";
  return result;
}