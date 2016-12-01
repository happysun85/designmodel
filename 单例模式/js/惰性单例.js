//==================================================[惰性单例]
//方式一：页面加载就创建了窗口，占用了DOM节点
/*var loginLayer = (function() {
 "use strict";
 var div = document.createElement('div');
 div.innerHTML = '我是登录窗口';
 div.style.display = 'none';
 document.body.appendChild(div);
 return div;
 })();
 document.getElementById('loginBtn').onclick = function() {
 loginLayer.style.display = 'block';
 }*/


//方式二：点击登录后才创建窗口
/*var createLoginLayer = (function() {
 var div;
 return function() {
 if (!div) {
 div = document.createElement('div');
 div.innerHTML = '我是登录窗口';
 div.style.display = 'none';
 document.body.appendChild(div);
 }
 return div;
 }
 })();

 document.getElementById('loginBtn').onclick = function() {
 var loginLayer = createLoginLayer();
 loginLayer.style.display = 'block';
 };*/

//方法三：把思想再次提高一层，变成通用创建标签
//管理实例
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};

//创建实例
var createLoginLayer = function() {
  var div = document.createElement('div');
  div.innerHTML = '窗口';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
}

//通过管理实例方法可以只绑定一次事件例子
var bindEvent = getSingle(function() {
  document.getElementById('div').onclick = function() {
    alert('click');
  };
  return true;
});
var reder = function() {
  console.log('开始');
  bindEvent();
};

/**
 * 小结
 * 用到了单一原则、代理模式。
 * getSingle用到了闭包和高级函数的概念。
 * 惰性单例技术。
 * 创建对象和管理单例的职责被分开，两种方法组合起来才具有单例模式的威力
 */
