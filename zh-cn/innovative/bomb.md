### CNPM  
---------  
2015年使用sea.js的时候接触CDN,于是将所有通用性的静态文件通过CDN的方式托管;  

随着资源之前的依赖增加、调用关系复杂化、私有化，原来的方式已经无法满足团队的发展;于是决定引入了[CNPM](https://github.com/cnpm/cnpmjs.org)-企业私有化NPM仓库  

![](http://www.16boke.com/imagepro/upload/image/20160602/1464845577436079472.png)  

解决了少数资源报错,依赖包下载慢,组件私有化等问题,并且为Bomb模块化管理提供了基础资源;  

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/test/QQ%E6%88%AA%E5%9B%BE20190213160822_1550045304059.png)  

### Gitlab和CNPM  
-----------
我们使用`GitLab`进行代码管理,这就导致每一次组件的上传都要两份,一份给到gitlab,一份给到cnpm;当然,如果你对gitlab使用比较熟练的话,你会第一时间想到部署CI;  

当日考虑项目比较分散,组件的规范和标准还没有健全.如果采用持续集成,来回变换路径会带来很多麻烦.于是开发了一个自动化接口,将组件代码自动部署到CNPM和Gitlab指定仓库;(这个也会在后期考虑使用持续集成);  
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/test/QQ%E6%88%AA%E5%9B%BE20190213162252_1550046162220.png)  

### 项目背景 
?> 项目最早在2017年初开始着手研发,正好当时在研究[Electron](https://electronjs.org/)和Node. 之后看到了[iView](https://www.iviewui.com/)的可视化工具. 便决定要做一个自己的团队工具,就发动队员利用工作闲余时间一起搞了.也正好学习了Node的一些功能(文件写入/读取/存储/下载/热更新/数据爬取等);  

### 技术栈  
- Electron,跨平台的桌面应用,基于JS,HTML,CSS
- iView,PC端UI
- Node+应用
- Vue+套件
- Vue-Electron打包
- 热更新-包站点发布系统
- 更多内容涉及商业隐私已隐藏菜单  
### 项目截图  
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/test/%E4%BB%8B%E7%BB%8D_1550047775696.gif)  

挑了几个常用的功能展示一下  
  
!> 服务模板  
主要方便团队学习全栈技术,降低技术门槛;整理了比较流行的Node+Express+MySQL,Node+KOA2+MySQL,ThinkPHP等.附带从初级到中级的教程文档.  

!> 前端模板  
目前分类:Vue,React,无线端.由于模板数量较少暂时没有区分中后台和前台.增加了基于小程序模板,基于Taro的,mpvue的,WePY等;  

!> 组件  
这个不需要多累述了,cnpm仓库规范参考的`ice`.我们整理了日常项目中常用的组件,将基础组件和业务组件进行了拆分.能够帮助新人更快的介入研发;  

!> 插件  
插件模块,主要负责处理一些复杂需求的功能性组件.并通过vue插件的形式封装,方便调用.  

!> 包管理  
上面已经提及过,不再累述  

!> 上传  
这个是团队内部方便上传组件的预览图,调用了公有的oss云存储接口;我们基于阿里云oss,开发了一套静态文件管理api集成到了ATS里面;  

!> API  
这个功能着实节省了我们大量的研发工作,它是将服务端生成的接口文档(api.json)自动生成前端调用的接口文件(webapi),并按照模块分类.  举个例子,如果服务端写了100多个接口,它能在短短1分钟内生成一个webapi的文档,里面存放一个http.js和按照模块名分类的js(user.js,auth.js...),前端在调用的时候只需要引入webapi/user文件,直接user.login即可访问接口;


