export default {
  trim(value) {
    if (Object.prototype.toString.call(value) !== '[object String]') {
      return value;
    }
    return String.prototype.trim ? value.trim() : value.replace(/(^\s*)|(\s*$)/g, '');
  },
  issbccase(strTmp) {
    // 验证全角
    for (let i = 0; i < strTmp.length; i += 1) {
      if (strTmp.charCodeAt(i) > 128) {
        return true;
      }
    }
    return false;
  },
  toCDB(str) {
    // 全角转半角
    let tmp = '';
    for (let i = 0; i < str.length; i += 1) {
      if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else {
        tmp += String.fromCharCode(str.charCodeAt(i));
      }
    }
    return tmp;
  },
  dateAdd(day, be) {
    const dd = new Date();
    dd.setDate(dd.getDate() + day);// 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1;// 获取当前月份的日期
    const d = dd.getDate();
    if (be) {
      return `${y}-${m}-${d} 23:59:59`;
    }
    return `${y}-${m}-${d} 00:00:00`;
  },

  delCookie(objName) {
    const date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = `${objName}=a;path=/; expires=${date.toGMTString()}`;
  },
  setSessionStorage(objName, objValue) {
    window.sessionStorage.setItem(objName, objValue);
  },
  getSessionStorage(objName) {
    return window.sessionStorage.getItem(objName);
  },
  removeSessionStorage(objName) {
    window.sessionStorage.removeItem(objName);
  },
  setLocalStorage(objName, objValue) {
    window.localStorage.setItem(objName, objValue);
  },
  getLocalStorage(objName) {
    return window.localStorage.getItem(objName);
  },
  removeLocalStorage(objName) {
    window.localStorage.removeItem(objName);
  },
  stringLength(str) {
    let len = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  },

  // 获得页面内选中的文字信息
  getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } if (document.getSelection) {
      return document.getSelection();
    } if (document.selection) {
      return document.selection.createRange().text;
    }
    return '';
  },
  isPc() {
    const system = {
      win: false,
      mac: false,
      xll: false,
      ipad: false,
    };
    // 检测平台
    const p = navigator.platform;
    system.win = p.indexOf('Win') === 0;
    system.mac = p.indexOf('Mac') === 0;
    system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null);
    // 桌面端
    if (system.win || system.mac || system.xll || system.ipad) {
      return true;
      // 移动端
    }
    return false;
  },
  isAndroid() {
    const u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  },
  isIos() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },

  asyncRun(cb = () => {}, interval = 30) { // 异步执行:  cb, 异步执行的函数，interval: 延迟时间
    setTimeout(() => {
      cb();
    }, interval);
  },
  // 因为页面可能被嵌套,替代window.top,取得顶级页面index.html
  getTopWindow(val) {
    const win = val || window;
    if (win.javascriptProjectName === 'xdfcrm' || win === win.parent) {
      return win;
    }
    return this.getTopWindow(win.parent);
  },

  downloadFileForm(url, data = {}, method = 'post') {
    const form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);
    form.target = '_blank';
    form.action = url;
    form.method = method;
    form.enctype = 'application/x-www-form-urlencoded';
    form.innerHTML = '';
    Object.keys(data).forEach((key) => {
      const input = document.createElement('input');
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    });
    form.submit();
  },

  downloadFileBlob(data, name, type = 'application/vnd.ms-excel;charset=utf-8') {
    const blob = new Blob([data], { type });
    const url = window.URL || window.webkitURL || window.moxURL;
    const downloadHref = url.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadHref;
    downloadLink.download = name;
    downloadLink.click();
  },
};
