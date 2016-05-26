# 基于webpack+react多页面探索

## 目录结构说明

```

│ web 
        ├─mock<—————测试数据
        ├─dist<—————编译后的文件
        ├─view<—————生成的html文件
        └─src 业务源文件,一个业务模块一个文件夹,都有独立的图片,css,js
           ├─app.js<—————用于引入全局样式,全局方法
           ├─template.html<—————html模板文件
           ├─about<—————业务资源
           └─common<—————公共资源

```

## 开发环境

安装Node和NPM，新版本Node已经继承NPM   
安装Webpack ``npm install webpack -g``  [http://webpack.github.io/](http://webpack.github.io/)  

    以下操作都需要进入web目录

## 安装npm插件

``npm install``

## 相关命令

- ``npm run dev`` 开发模式,访问``127.0.0.1:3000/dist/index``
- ``npm run build`` 将文件编译,压缩,打包
