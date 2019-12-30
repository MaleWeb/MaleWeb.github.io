### ServiceWorker
PWA(Progressive Web Apps)是一种Web App新模型，并不是具体指某一种前沿的技术或者某一个单一的知识，是一个渐进式的Web App，
通过一系列新的Web特性，配合优秀的UI交互设计，逐渐的增强Web App的用户体验。
#### 特点
- Https环境部署
- 响应式设计，一次部署，可以在移动设备和 PC 设备上运行 在不同浏览器下可正常访问。
- 浏览器离线和弱网环境可极速访问。
- 可以把 App Icon 入口添加到桌面。
- 点击 Icon 入口有类似 Native App 的动画效果。
- 灵活的热更新  
在PWA要求的各种能力上，关于离线环境的支持我们就需要仰赖ServiceWorker。Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。由于PWA是谷歌提出，那么对ServiceWorker，同样也提出一些能力要求：
- 后台消息传递
- 网络代理，转发请求，伪造响应
- 离线缓存
- 消息推送
在目前阶段，ServiceWorker的主要能力集中在网络代理和离线缓存上。具体的实现上，可以理解为ServiceWorker是一个能在网页关闭时仍然运行的WebWorker。  
### ServiceWorker的生命周期
![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/test/412020-20171216185832389-867345604_1548231400446.png)
```js
if (navigator.serviceWorker != null) {
      // 使用浏览器特定方法注册一个新的service worker
      navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        window.registration = registration;
        console.log('Registered events at scope: ', registration.scope);
      });
    }
```

这个时候ServiceWorker处于Parsed解析阶段。当解析完成后ServiceWorker处于Installing安装阶段，主线程的registration的installing属性代表正在安装的ServiceWorker实例，同时子线程中会触发install事件，并在install事件中指定缓存资源

```js
var cacheStorageKey = 'minimal-pwa-3';

var cacheList = [
  '/',
  "index.html",
  "main.css",
  "e.png",
  "pwa-fonts.png"
]

// 当浏览器解析完sw文件时，serviceworker内部触发install事件
self.addEventListener('install', function(e) {
  console.log('Cache event!')
  // 打开一个缓存空间，将相关需要缓存的资源添加到缓存里面
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    })
  )
})
```
这里使用了Cache API来将资源缓存起来，同时使用e.waitUntil接手一个Promise来等待资源缓存成功，等到这个Promise状态成功后，ServiceWorker进入installed状态，意味着安装完毕。这时候主线程中返回的registration.waiting属性代表进入installed状态的ServiceWorker。
```js
/* In main.js */
navigator.serviceWorker.register('./sw.js').then(function(registration) {  
    if (registration.waiting) {
        // Service Worker is Waiting
    }
})
```

然而这个时候并不意味着这个ServiceWorker会立马进入下一个阶段，除非之前没有新的ServiceWorker实例，如果之前已有ServiceWorker，这个版本只是对ServiceWorker进行了更新，那么需要满足如下任意一个条件，新的ServiceWorker才会进入下一个阶段：
- 在新的ServiceWorker线程代码里，使用了self.skipWaiting() 
- 或者当用户导航到别的网页，因此释放了旧的ServiceWorker时候
- 或者指定的时间过去后，释放了之前的ServiceWorker  
这个时候ServiceWorker的生命周期进入Activating阶段，ServiceWorker子线程接收到activate事件：

```js
// 如果当前浏览器没有激活的service worker或者已经激活的worker被解雇，
// 新的service worker进入active事件
self.addEventListener('activate', function(e) {
  console.log('Activate event');
  console.log('Promise all', Promise, Promise.all);
  // active事件中通常做一些过期资源释放的工作
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    console.log('cacheNames', cacheNames, cacheNames.map);
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) { // 如果资源的key与当前需要缓存的key不同则释放资源
        console.log('caches.delete', caches.delete);
        var deletePromise = caches.delete(name);
        console.log('cache delete result: ', deletePromise);
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  console.log('cacheDeletePromises: ', cacheDeletePromises);
  e.waitUntil(
    Promise.all([cacheDeletePromises]
    )
  )
})
```
这个时候通常做一些缓存清理工作，当e.waitUntil接收的Promise进入成功状态后，ServiceWorker的生命周期则进入activated状态。这个时候主线程中的registration的active属性代表进入activated状态的ServiceWorker实例
```js
/* In main.js */
navigator.serviceWorker.register('./sw.js').then(function(registration) {  
    if (registration.active) {
        // Service Worker is Active
    }
})
```
到此一个ServiceWorker正式进入激活状态，可以拦截网络请求了。如果主线程有fetch方式请求资源，那么就可以在ServiceWorker代码中触发fetch事件：
```js
fetch('./data.json')
```
这时在子线程就会触发fetch事件：
```js
self.addEventListener('fetch', function(e) {
  console.log('Fetch event ' + cacheStorageKey + ' :', e.request.url);
  e.respondWith( // 首先判断缓存当中是否已有相同资源
    caches.match(e.request).then(function(response) {
      if (response != null) { // 如果缓存中已有资源则直接使用
        // 否则使用fetch API请求新的资源
        console.log('Using cache for:', e.request.url)
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      return fetch(e.request.url);
    })
  )
})

```
那么如果在install或者active事件中失败，ServiceWorker则会直接进入Redundant状态，浏览器会释放资源销毁ServiceWorker。

现在如果没有网络进入离线状态，或者资源命中缓存那么就会优先读取缓存的资源：

### 缓存资源更新
那么如果我们在新版本中更新了ServiceWorker子线程代码，当访问网站页面时浏览器获取了新的文件，逐字节比对 /sw.js 文件发现不同时它会认为有更新启动 更新算法open_in_new，于是会安装新的文件并触发 install 事件。但是此时已经处于激活状态的旧的 Service Worker 还在运行，新的 Service Worker 完成安装后会进入 waiting 状态。直到所有已打开的页面都关闭，旧的 Service Worker 自动停止，新的 Service Worker 才会在接下来重新打开的页面里生效。如果想要立即更新需要在新的代码中做一些处理。首先在install事件中调用self.skipWaiting()方法，然后在active事件中调用self.clients.claim()方法通知各个客户端。

```js
// 当浏览器解析完sw文件时，serviceworker内部触发install事件
self.addEventListener('install', function(e) {
  debugger;
  console.log('Cache event!')
  // 打开一个缓存空间，将相关需要缓存的资源添加到缓存里面
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('install event open cache ' + cacheStorageKey);
      console.log('Skip waiting!')
      return self.skipWaiting();
    })
  )
})

// 如果当前浏览器没有激活的service worker或者已经激活的worker被解雇，
// 新的service worker进入active事件
self.addEventListener('activate', function(e) {
  debugger;
  console.log('Activate event');
  console.log('Promise all', Promise, Promise.all);
  // active事件中通常做一些过期资源释放的工作
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    console.log('cacheNames', cacheNames, cacheNames.map);
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) { // 如果资源的key与当前需要缓存的key不同则释放资源
        console.log('caches.delete', caches.delete);
        var deletePromise = caches.delete(name);
        console.log('cache delete result: ', deletePromise);
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  console.log('cacheDeletePromises: ', cacheDeletePromises);
  e.waitUntil(
    Promise.all([cacheDeletePromises]
    ).then(() => {
      console.log('activate event ' + cacheStorageKey);
      console.log('Clients claims.')
      return self.clients.claim();
    })
  )
})
```
注意这里说的是浏览器获取了新版本的ServiceWorker代码，如果浏览器本身对sw.js进行缓存的话，也不会得到最新代码，所以对sw文件最好配置成cache-control: no-cache或者添加md5。

实际过程中像我们刚才把index.html也放到了缓存中，而在我们的fetch事件中，如果缓存命中那么直接从缓存中取，这就会导致即使我们的index页面有更新，浏览器获取到的永远也是都是之前的ServiceWorker缓存的index页面，所以有些ServiceWorker框架支持我们配置资源更新策略，比如我们可以对主页这种做策略，首先使用网络请求获取资源，如果获取到资源就使用新资源，同时更新缓存，如果没有获取到则使用缓存中的资源。代码如下：

```js
self.addEventListener('fetch', function(e) {
  console.log('Fetch event ' + cacheStorageKey + ' :', e.request.url);
  e.respondWith( // 该策略先从网络中获取资源，如果获取失败则再从缓存中读取资源
    fetch(e.request.url)
    .then(function (httpRes) {

      // 请求失败了，直接返回失败的结果
      if (!httpRes || httpRes.status !== 200) {
          // return httpRes;
          return caches.match(e.request)
      }

      // 请求成功的话，将请求缓存起来。
      var responseClone = httpRes.clone();
      caches.open(cacheStorageKey).then(function (cache) {
          return cache.delete(e.request)
          .then(function() {
              cache.put(e.request, responseClone);
          });
      });

      return httpRes;
    })
    .catch(function(err) { // 无网络情况下从缓存中读取
      console.error(err);
      return caches.match(e.request);
    })
  )
})
```
 

### 注意事项
ServiceWorker是一项新能力，目前IOS平台对他的支持性并不友好，但是在安卓侧已经没有大问题。而微信平台对它的支持也不错。
依赖项：
- 依赖Cache API
- 依赖Fetch API Promise API
- Https环境
错误排查：
- install或active事件失败
- 非Https环境
- sw.js安装路径问题
- scope设置  

[文章来源](https://www.cnblogs.com/dojo-lzz/p/8047336.html)  

[视频教程](https://v.qq.com/x/page/b05172okw7e.html)