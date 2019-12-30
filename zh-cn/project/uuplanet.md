
### 项目背景
- 时间：2018年4月
- 地点：封闭式开发-一个远离市区的小别墅内
- 环境：4个人，锁上门，昼夜轮撸，持续2周
- 背景：借助区块链技术热点，打造用户下单场景，加快用户增速

### 介绍

?>记录经历,也记录人生 

一张长桌从门口延伸到墙角，门一锁😭，几天送一次吃的，就此吹起冲锋号  `Time==Money`

别墅区😂

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190118163743_1547800852767.jpg)

大长桌🚬

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190118163750_1547800868594.jpg)

夜战(⓿_⓿)

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190118164031_1547801221910.jpg)

### 技术栈

!> 因为要在微信小程序/H5/APP内嵌页三端使用，所以果断选择了mpvue框架。喜忧参半，喜的是刚好有完整的解决方案，忧的是`mpvue`刚刚发布，一个连的坑在等着；  

- Vue+Vuex+Axios+mpvue+内部组件
- 客户端交互-桥接方式的js库
- 代码管理：GitLab
- 内部研发的[UU-cli](https://github.com/MaleWeb/UUcli) 公用依赖库脚手架
- pako加密

### 功能介绍

- 每个用户领取一个机器人，机器人有三种形态（蛋蛋，初级进化，中级进化，高级进化），高级进化会拥有更多的能力，表情，皮肤；
- 每个用户的机器人对应链上的一个私钥，私钥用于赠送/领取/兑换操作；
- 根据用户人数每天发放等额FLU，FLU的数量取决于用户自身算力，算力高，FLU高
- 算力绑定用户行为数据，即下单，充值，邀请等；
- UU黑市，提供FLU的兑换；

### 技术难点

!>了解区块链概念，熟悉业务以后，开发逻辑上没有太多问题了；难在游戏动画上面，开始考虑WebGL，但是团队都不会，学习需要又时间短时间内搞不了。后来查资料想用骨骼+帧动画做，但是游戏引擎又玩的不溜，很尴尬。只能用canvas搞event了；  
首页的表情和FLU领取动画着实耗费了一定精力的，简单罗列一下问题吧，开发应该都知道一句bug，可能就是几个通宵；
- 由于小程序无法进行DOM查询，所以获取不到FLU的动态位置（增加兼容方案-由前端随机生成固定序列的位置点）；
- mpvue里面很多api和wx冲突不兼容（放弃一些特有属性）；
- 动画切换不够流畅，快速领取响应延时（本地数据异步处理-长轮询+本地缓存）；
- H5登陆，微信免登陆，APP授权登陆（业务兼容-具体不列了）；

### UI设计稿

UURobot形态图-蛋蛋

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E9%A6%96%E9%A1%B5-new_1547805495550.png ':size=320')

UURobot形态图-初级进化

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E7%AC%AC%E4%B8%80%E4%BB%A3_1547805463782.png ':size=320')

UURobot形态图-中级进化

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E9%A6%96%E9%A1%B50410_1547805477053.png ':size=320')


### 项目截图

主页展示

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA_1547805838622.gif ':size=320')
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA01_1547806891609.gif ':size=320')
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA02_1547806898863.gif ':size=320')
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA03_1547806906132.gif ':size=320')
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA04%E5%A5%B3_1547806913239.gif ':size=320')
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uuplanet/%E6%98%9F%E7%90%83%E5%B1%95%E7%A4%BA05(%E4%BA%8C%E7%BA%A7)_1547806920309.gif ':size=320')

### UU星球地址(Onlie)
>不是图片，登陆看看  

[UU星球](https://uuplanet.uupt.com/#/login ':include :type=iframe width=375px height=667px')
### My Team

!> 左一：96前端小伙，聪明给力👍；中：93服务端小伙，敏捷高效；右二：UI小组负责人,唯一妹子；

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/uu%E6%98%9F%E7%90%83-%E5%B7%A5%E4%BD%9C%E7%85%A7_1547800197572.jpg)


