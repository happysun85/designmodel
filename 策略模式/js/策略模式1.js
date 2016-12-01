/**
 * 使用策略模式计算奖金
 * 描述：公司根据员工的工资基数和年底绩效情况来发放奖金，也就是按级别
 */

//--------------------------------------------------[初步代码实现]
/**
 * 计算奖金
 * @param performanceLevel  考核等级
 * @param salary            薪资
 * @returns {number}        计算后的数值
 * 这段代码十分简单，但是存在着显而易见的缺点。
 * 问题1：函数比较庞大，包含了许多if-else语句，这些语句需要覆盖所有的逻辑分之。
 * 问题2：函数缺乏弹性，如果增加了一种新的绩效等级C，或者想把绩效S的奖金系数改为5
 *       那我们必须深入该函数的内部实现，这是违反了开放-封闭原则。
 * 问题3：算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法，我们的选择
 *       只有复制和粘贴。
 * 总结 ：重构
 */
/*var calculateBonus = function(performanceLevel, salary) {
 if (performanceLevel === 'S') {
 return salary * 4;
 }
 if (performanceLevel === 'A') {
 return salary * 3
 }
 if (performanceLevel === 'B') {
 return salary * 2
 }
 };*/


//--------------------------------------------------[使用组合函数重构代码]
//把各种算法封装到一个个的小函数里面，这些小函数有良好的明明，可以一目了然
//地知道它对应着哪种算法、他们也可以被复用在程序的其他地方。

/**
 * 组合函数重构代码
 * @param performanceLevel  考核级别
 * @param salary            薪资
 * 程序得到一定改善，但这种改善非常有限，我们依然没有解决最重要的
 * 问题：calculateBonus函数有可能越来越panda，而且在系统变化的时候
 * 缺乏弹性
 */
/*var performaceS = function(salary) {
 return salary * 4;
 };

 var performaceA = function(salary) {
 return salary * 3;
 };

 var performaceB = function(salary) {
 return salary * 2;
 };

 var calculateBonus = function(performanceLevel, salary) {
 if (performanceLevel === 'S') {
 return performaceS(salary);
 }
 if (performanceLevel === 'A') {
 return performaceA(salary);
 }
 if (performanceLevel === 'B') {
 return performaceB(salary);
 }
 }*/



//--------------------------------------------------[使用策略模式重构代码]
//策略模式定义：一系列的算法，把他们一个个封装起来。
//将不变的部分和变化的部分隔离开是每个设计模式的主题
//目的：将算法的使用与算法的实现分离开来。

//一个基于策略模式的程序至少由两部分组成。
//第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
//第二个部分是环境类Context, Context接受客户的请求，随后把请求委托
//给某一个策略类。要做到这点，说明Context中药维持对某个策略对象的引用。

//版本一：模仿传统面向对象语言中的实现
//先把每种绩效的计算规则都封装在对应的策略类里面：
/*var performaceS = function() {
 };
 performaceS.prototype.calculate = function(salary) {
 return salary * 4;
 };

 var performaceA = function() {
 };
 performaceA.prototype.calculate = function(salary) {
 return salary * 3;
 };

 var performaceB = function() {
 };
 performaceB.prototype.calculate = function(salary) {
 return salary * 2;
 };

 //定义奖金类Bonus:
 var Bonus = function() {
 this.salary = null;   //原始工资
 this.strategy = null; //绩效等级对应的策略对象
 };
 Bonus.prototype.setSalary = function(salary) {
 this.salary = salary;
 };
 Bonus.prototype.setStrategy = function(strategy) {
 this.strategy = strategy;
 };
 Bonus.prototype.getBonus = function() {
 return this.strategy.calculate(this.salary);
 };

 var bonus = new Bonus();
 bonus.setSalary(10000);

 bonus.setStrategy(new performaceS()); //设置策略对象
 console.log(bonus.getBonus());

 bonus.setStrategy(new performaceA());
 console.log(bonus.getBonus());*/

//--------------------------------------------------[使用javascript策略模式重构代码]
//这里不用模拟传统面向对象语言的实现。
//javascript语言中，函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数
var strategies = {
  'S': function(salary) {
    return salary * 4;
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  }
};
//同样，Context也没有必要必须用Bonus类来表示，我们依然用calculateBonus函数充当Context
//来接受用户的请求。经过改造，代码的结构变得更加简洁：
var calculateBonus = function(level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus('S',2000));
console.log(calculateBonus('A',1000));
