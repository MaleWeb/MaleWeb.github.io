### 项目背景
- 时间：2018年5月
- 地点：封闭式开发-北京一个远离市区的小区内
- 环境：6个人，未上锁，昼夜轮撸，持续1月
- 背景：从小B入口，打造本地服务生活平台，立足小程序，切入市场；

### 介绍

?>UU星球业务打出去以后，引起很大的反响，连我的砍价群都是漫天的邀请码；后期的功能迭代，业务拓展也蜂拥而至；回归办公室，成立了独立事业部-UUPlanet;  
独立APP客户端打出，紧接着ios审核受限，各方区块链相关政策收紧，项目入口仅限于主APP/H5；  
原班人逐渐抽离，最终我也离场，交付其他同事维稳；  
赶往北京投入优小U。。。


### 技术栈
这个项目整套架构相对比较复杂，可以说囊括了电商，微商，商超零售，O2O等业务，再融合UU跑腿的配送服务；  
服务端需要对接第三方小程序模板，承接商户模板的研发，更改，发布业务；  
推出平台版（一个独立小程序），商家版（多个独立小程序）；  
根据用户区分：用户版，商户版；
- mpvue+3名前端研发
- 分包处理（最大限制2M）`pages.js` 分包加载方案（参考[mpvue-loader](http://mpvue.com/build/mpvue-loader/)）
- 购物车数据异步加载（看着很简单，其实复杂的一P）
- 重写路由（路由层级跳转受限，估计很少有业务超出规定值的吧，我PM任性）
- 截屏，坐标解析/逆解析，坐标系转换
- 各种版本兼容（低版本用户伤不起）
- 分类组件拖拽功能实现
- [左滑删除功能](./leftdelete.js)
- canvas绘制图片/文字截取
- [30-seconds-of-code](https://30secondsofcode.org/)节流 防重复点击  
......

```js
//处理距离
distance(lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        return s; //返回数值单位：公里
    }

 Math.floor(this.distance(lat1, lng1, lat2, lng2)*100)/100;
```

```js
// 营业时间格式化 示例：'0-140,180-300' => ['00:00-02:20','03:00-05:00']
    // 返回一个数组，使用的时候直接String转化为字符串，做相应操作
    const openTime = str => {
        const two = n => {
            return n < 10 ? '0' + n : '' + n;
        }
        if (str.indexOf(',') > -1) {
            return str.split(',').map(e => {
                let a = two(Math.floor(e.split('-')[0] / 60))
                let b = two(Math.floor(e.split('-')[0] % 60))
                let c = two(Math.floor(e.split('-')[1] / 60))
                let d = two(Math.floor(e.split('-')[1] % 60))
                return e = `${a}:${b}-${c}:${d}`;
            })
        } else {
            let a = two(Math.floor(str.split('-')[0] / 60))
            let b = two(Math.floor(str.split('-')[0] % 60))
            let c = two(Math.floor(str.split('-')[1] / 60))
            let d = two(Math.floor(str.split('-')[1] % 60))
            return [`${a}:${b}-${c}:${d}`];
        }
    }

```
### 功能介绍

1.基于LBS提供附近商超-就近买服务  
2.一键派单服务    
3.优惠券/会员卡/领券中心系统  
4.活动拼团系统  
5.分享红包系统      
6.商品管理  
7.优惠管理  
8.活动管理  
9.会员管理  
10.模板管理  
11.复杂的功能都在商家版（看图便知）  
......  


### 项目截图
-----------------------------------------------
#### 优小U-用户端
<div align="center">
<p>用户端-首页👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E9%A6%96%E9%A1%B5_1547882870979.gif"/>
</div>
<div align="center">
<p>用户端-下单👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E4%B8%8B%E5%8D%95%E9%A1%B5_1547882882215.gif"/>
</div>
<div align="center">
 <p>用户端-订单👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E8%AE%A2%E5%8D%95%E9%A1%B5_1547882890380.gif"/>
</div>
<div align="center">
<p>用户端-分享👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E7%94%A8%E6%88%B7%E7%AB%AF-%E5%88%86%E4%BA%AB_1547886998549.gif"/>
</div>

#### 优小U-商户端
<div align="center">
<p>商户端-数据👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E6%95%B0%E6%8D%AE_1547889249921.gif"/>
</div>

<div align="center">
<p>商户端-分类👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E5%88%86%E7%B1%BB_1547889256276.gif"/>
</div>
<div align="center">
<p>商户端-商品管理👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E5%95%86%E5%93%81%E7%AE%A1%E7%90%86_1547889263145.gif"/>
</div>
<div align="center">
<p>商户端-店铺管理👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E5%BA%97%E9%93%BA%E7%AE%A1%E7%90%86_1547889281226.gif"/>
</div>
<div align="center">
<p>商户端-优惠券管理👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E4%BC%98%E6%83%A0%E5%88%B8%E7%AE%A1%E7%90%86_1547889287591.gif"/>
</div>
<div align="center">
<p>商户端-我的👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E6%88%91%E7%9A%84_1547889298413.gif"/>
</div>
<div align="center">
<p>商户端-会员卡👇</p>
<img src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%95%86%E6%88%B7%E7%AB%AF-%E4%BC%9A%E5%91%98%E5%8D%A1_1547889305121.gif"/>
</div>
......  

截取了大概60%的页面
团队还在不停的更新需求中:neckbeard:......  
可能当再你看的时候界面已经迭代N个版本了 :sob:   
### 优小U官网  
[优小U官网](http://uxu.uupt.com/)  


### My Team
?>这边UU星球上线之际，那边马不停蹄地抽离主力组建了优小U的团队。  
5月-6月的攻坚战，5人作战小分队——1个前端，1个产品，2个后端，2个UI。  
5月8号，我带着团队里的一妹子赶往北京增援。  `Time==Money`
截至2019-1-19，优小U事业部拓展到20+的团队

!> 前端→PM→服务端→UI*2→前端  

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/IMG_7622_1547882853963.JPG)

!> 这些照片都很珍贵并且容易被遗忘

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/IMG_6763_1547882844623.JPG)

!> 我的床

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190119173728_1547892581705.jpg)  

!> 记录工作一角  

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190119173733_1547892589933.jpg)

!> 因为总部有些事情，所以在高铁上完成了钱包模块，其中的事就不累述了，总之一波>3折.

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190119173737_1547892623683.jpg)





