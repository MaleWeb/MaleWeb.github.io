# 深浅拷贝
--------------------------------------------------
什么是浅拷贝？什么是深拷贝？

?> 浅拷贝：只复制引用，未复制其内部值  ps:对于基础数据类型，不区分深浅拷贝。深浅拷贝相对于引用类型来讲；

```js
let test = {
    name:'male'
}
let online = test
test.name = 'make'
console.log(online.name) // make
```
?>深拷贝：是对其目标的完全拷贝，包含属性值和引用地址；可以理解为真假美猴王，一摸一样却不是一个；
- 利用JSON对象中的parse和stringgify
- 利用递归来实现每一层的重新创建对象并赋值

```js
let test = {
    name:'male',
    age:18,
    job:{
        first:'PM'
    }
}
let my = JSON.parse(JSON.stringify(test))
test.job.first = 'FE'
console.log(my.job.first) // PM
```
深拷贝的缺陷：  
- 1.会忽略undefined,symobl  
- 2.不能序列化函数  
- 3.不能解决循环引用的对象  

# 原型 And 原型链
--------------------------------------------------

- 每个函数都具有`prototype`属性，它被默认成一个对象，即原型对象  
- 原型链：当对象使用属性的时候，先从自身查找，有就用；没有就沿着_proto_这条链继续往下查找，直到找到对象原型位置，有就返回对应值，没有就返回`undefined`  

原型链的内部原理：  

![](https://user-gold-cdn.xitu.io/2018/11/16/1671d387e4189ec8?w=618&h=781&f=png&s=266099)

通俗易懂总结：
- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- 函数的 prototype 是一个对象
- 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链

# 原型继承 And Class继承
----------------------------------------------------
?> class的本质还是函数，其本身只是语法糖
```js
class Person{}
Person instanceof Function //true
```
### 原型链继承
```js
function One(){
    this.name = 'male'
}
function Two(){
    this.age = 20
}
Two.prototype = new One();
var other = new Two()
console.log(other.name) // male
```
### 构造函数继承（对象冒充继承）
```js
function Box(age){
    this.name = ['a','b','c']
    this.age = age
}
function Dist(age){
    Box.call(this,age) //对象冒充
}
var dist = new Dist(200)
console.log(dist.age)//200
console.log(dist.name)//['a','b','c']
dist.name.push('d')
console.log(dist.name) //['a','b','c','d']
```
### 组合继承（原型链继承+构造函数继承）
```js
function Box(age){
    this.name = ['a','b','c']
    this.age = age
}
Box.prototype.run = function(){
    return this.name+this.age
}
function Dist(age){
    Box.call(this,age) //对象冒充
}
Dist.prototype = new Box()//原型链继承
var dist = new Dist(100)
console.log(dist.run())

```js
###寄生组合式继承
寄生组合式继承解决了两次调用的问题，组合式继承就会有两次调用的情况  
```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype);  //创建对象
    prototype.constructor = subType;              //增强对象
    subType.prototype = prototype;                //指定对象
}
```
# JS排序算法  
------------------  
## 冒泡排序  
基础款  
```js
function bubbleSort(arr) {
　　let len = arr.length - 1
  for (let j = 0; j < len; j++) {
    for (let i = 0; i < len - j; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
　　return arr;
}

let arr = [3,25,365,877,51,5,64,82,1];
console.log(bubbleSort(arr))
//[1, 3, 5, 25, 51, 64, 82, 365, 877]
```  
ES6版本：  `排除无效循环，就是本身是有序排列`  
```js
function bubbleSort(arr) {
    const len = arr.length;
    let count;
    let tmp;
    for (let i = len; i > 0; i--) {
        count = 0;
        for (let i = 0; i < len; i++) {
            if (arr[i] && arr[i + 1] && arr[i].createTime < arr[i + 1].createTime) {
                tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                count ++;
            }
        }
        if (count === 0) {
            return arr;
        }
    }
    return arr;
}
let arr1 = [7,5,87,6,45,54,2,12];  
let arr2 = [1,2,3,4,5,7]
console.log(bubbleSort(arr1));
console.log(bubbleSort(arr2));
```


