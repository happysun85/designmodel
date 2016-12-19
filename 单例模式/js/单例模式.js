/*
 * 单例模式：
 * 试想，当我们单机登录按钮的时候，页面中会出现一个登录窗口，而这个窗口是唯一的，
 * 无论点击多少次，都只会被创建一次。
 * 这种情况就适合用单例模式来创建。
 * */

/**
 * 用一个变量来标志当前是否已经为某个类创建过对象，
 * 如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。
 */

/**
 * 基础版的
 * @param name
 * @constructor
 */
/*var Singleton = function(name) {
 this.name = name;
 this.instance = null;
 };
 Singleton.prototype.getName = function() {
 alert(this.name);
 };
 Singleton.getInstance = function(name) {
 if (!this.instance) {
 this.instance = new Singleton(name);
 }
 return this.instance;
 };
 var a = Singleton.getInstance('sven1');
 var b = Singleton.getInstance('sven2');

 alert(a === b);  //true:  因为第二次调用的时候实例以存在并直接返回
 //
 */


//==================================================
/*透明的单例模式*/
/**
 * 此种方式是创建唯一的div，不论New几次
 * 缺点：假如某天需要用这个类创建n个div，既要把这个单例模式
 * 变成一个普通的可产多个实例的类，那就需要改CreatDiv构造函数、
 * 把控制创建唯一对象的那一段去掉，这种修改会给我们带来不必要的烦恼。
 * 另外的问题就是CreateDiv里注释提到的缺点
 */
/*var CreateDiv = (function() {
 var instance;
 var CreateDiv = function(html) {
 //此函数违反了“单一职责原则”的概念，
 //这里负责了2件事，1：保证一个对象 1：初始化init方法
 if (instance) {
 return instance;
 }
 this.html = html;
 this.init();
 return instance = this;
 };
 CreateDiv.prototype.init = function() {
 var div = document.createElement('div');
 div.innerHTML = this.html;
 document.body.appendChild(div);
 };
 return CreateDiv;
 })();
 var a = new CreateDiv('sven1');
 var b = new CreateDiv('sven2');*/


//==================================================[用代理实现单例模式]
/**
 * 通过引入代理类的方式，来解决上面提到的问题
 */
/*var CreateDiv = function(html) {
 this.html = html;
 return init();
 };
 CreateDiv.prototype.init = function() {
 var div = document.createElement('div');
 div.innerHTML = this.html;
 document.body.appendChild(div);
 };

 //引入代理类
 var ProxySingletonCreateDiv = (function() {
 var instance;
 return function(html) {
 if (!instance) {
 instance = new CreateDiv(html);
 }
 return instance;
 }
 })();

 var a = new ProxySingletonCreateDiv('sven1');
 var b = new ProxySingletonCreateDiv('sven2');*/

//==================================================[javascript中的代理模式]
//1. 使用命名空间
/*var MyApp = {};
 MyApp.namespace = function(name) {
 var parts = name.split('.');
 var current = MyApp;
 for (var i in parts) {
 if (!current[parts[i]]) {
 current[parts[i]] = {};
 }
 current = current[parts[i]];
 }
 };
 MyApp.namespace('event');
 MyApp.namespace('dom.style.cssText');*/

//2. 使用闭包封装私有变量
//这种方法把一些变量封装在闭包的内部，只暴露一些借口跟外界通信：
//用下划线来约定私有变量 __name 和 __age ，它们被封装在闭包产生的作用域中，外部是
//访问不到这两个变量的，这就避免了对全局的命令污染。
/*var user = (function() {
  var _name = 'sven',
      _age = 29;
  return {
    getUserInfo: function() {
      return _name + '-' + _age;
    }
  }
})();*/

