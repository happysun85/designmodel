//具体实现代码
var Event = (function() {
  var global = this,
      Event,
      _default = 'default';   //默认空间名，先发布、后订阅用的
  Event = (function() {
    //这里应该就是提供一些基础的方法,更灵活的应该在_create里
    var _listen,
        _trigger,
        _remove,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        find,
        each = function(ary, fn) {
          var ret;
          for (var i = 0, l = ary.length; i < l; i++) {
            var n = ary[i];
            ret = fn.call(n, i, n);//后面这俩参数没用，目的就是执行n这个函数
          }
          return ret;              //这个return 没用
        };
    /**
     * 把消息的KEY和FN存到cache里
     */
    _listen = function(key, fn, cache) {//当前层级没有cache。这里做的就是把要执行的回调放到cache里
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);            //把回调函数放到cache里
    };
    /**
     * 移除一个缓存，怎么还要对比Fn.更严谨？
     * @param key
     * @param cache
     * @param fn
     * @private
     */
    _remove = function(key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    /**
     * 触发
     */
    _trigger = function() {
      var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          ret,
          stack = cache[key];
      if (!stack || !stack.length) {
        return;
      }
      return each(stack, function() {
        return this.apply(_self, args);
      })
    };
    /**
     * 等于创建出一套通用的东西。谁来给谁，不管是发送者还是接收者
     * @param namespace
     * @returns {{listen: listen, one: one, remove: remove, trigger: trigger}}
     * @private
     */
    _create = function(namespace) { //创建命名空间
      var namespace = namespace || _default;    //取名
      var cache = {},
          offlineStack = [],    //离线事件
          ret = {
            /**
             * 监听
             * @param key   回调函数的名字
             * @param fn    回调函数
             * @param last  ？？
             */
            listen: function(key, fn, last) {
              _listen(key, fn, cache);      //把KEY的回调函数都存在一个数组缓存里
              if (offlineStack === null) {  //这步基本没用，上面刚创建完
                return;
              }
              if (last === 'last') {        //直接执行离线缓存的最后一个。根本没用
                offlineStack.length && offlineStack.pop()();
              } else {
                each(offlineStack, function() {   //遍历离线缓存，匹配到合适的KEY
                  this();
                });
              }
              offlineStack = null;
            },
            one: function(key, fn, last) {
              _remove(key, cache);
              this.listen(key, fn, last);
            },
            remove: function(key, fn) {
              _remove(key, cache, fn);
            },
            /**
             * 这是一个假trigger
             * 把一个空的cache添加到arguments 里  例子： (obj,'click',1)
             * 这里只是完成了一些存储流程，返回了一个真正执行的函数，等待执行
             * @returns {执行真_trigger的函数}
             */
            trigger: function() {
              var fn,
                  args,
                  _self = this;
              _unshift.call(arguments, cache);    //cache是存在当前闭包里的变量-》缓存下来要发布的东西
              args = arguments;
              fn = function() {
                return _trigger.apply(_self, args);
              };
              if (offlineStack) {
                return offlineStack.push(fn);         //存到离线里
              }
              //这里返回fn根本无意义
              return fn();
            }
          };
      //每次都要create；
      //通过namespace来分辨不同的对象并返回，再做调取之类的后续操作
      return namespace ?
          (namespaceCache[namespace] ? namespaceCache[namespace] :
              namespaceCache[namespace] = ret) : ret;
    };
    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function(key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function(key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last);      //执行真listen
      },
      trigger: function() {
        var event = this.create();    //先创建一个什么？
        event.trigger.apply(this, arguments);
      }
    };
  })();
  return Event;
})();

/**********先发布后订阅*************/
Event.trigger('click', 1);
/*Event.listen('click', function(a) {
 console.log(a);
 });*/
/**********使用命名空间*************/
/*Event.create('namespace1').listen('click', function(a) {
 console.log(a);
 });*/
Event.create('namespace1').trigger('click', 1);
Event.create('namespace2').listen('click', function(a) {
  console.log(a);
});
Event.create('namespace2').trigger('click', 2);
