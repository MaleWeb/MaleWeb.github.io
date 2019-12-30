### 项目背景
- 时间：2018年8月
- 地点：UU总部-优小U事业部
- 环境：一间独立的会议室，后来搬迁到了新办公大楼
- 背景：发力C端，深度结合各类营销活动，打造下单场景，带动用户增长
### 介绍  

?>这个项目是将运营和业务深度结合，推出更多的玩法；很无奈的是没有整体和长久的规划，导致前端不停的在变化；很早就想干提取组件、改造框架的活了，但一直没有找到合适的点；
在跑腿业务里面也开发了很多运营活动，玩法大同小异，是可以提取可复用的组件或者模板的；只能说，跟随公司项目的步伐吧。`Time==Money`
### 技术栈
- 采用Taro框架，多端兼容（看好后期的快应用）
- React+Mobx+内部UI库
- gulp打包生成zip

### taro遇到的坑

- 组件传递函数属性名以 on 开头(父组件传递方法通过子组件来调用的情况)
- 不支持高阶组件以及混入
- 组件传递参数不支持扩展符
- 需要给子组件设置 defaultProps

```javascript
    //只做演示
    static defaultProps = {
        defaultImg:'',
        onClickImg:function(){}
    }
```

> ref获取元素或者组件（微信支持，支付宝不支持）

### 项目截图
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BF%AB%E8%B4%AD-%E9%A6%96%E9%A1%B5_1548055433820.gif)
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BF%AB%E8%B4%AD-%E4%B8%8B%E5%8D%95_1548055433805.gif)
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E4%BC%98%E5%B0%8FU/%E5%BF%AB%E8%B4%AD-%E5%85%A5%E5%8F%A3_1548055432414.gif)  

?>视频  

[](../video/uuseckill.mp4 ':include :size=375')