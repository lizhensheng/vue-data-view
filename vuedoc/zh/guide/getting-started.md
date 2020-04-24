# 起步

## 安装依赖
``` bash
# 通过npm安装
npm install

# 通过yarn安装
yarn install

```

## 运行客户端
``` bash
# 【推荐】通过vscode对package.json的解析的图形界面启动
#  点击对应的dev-client名称右方的左三角图标启动

# npm启动
npm run dev-client

# yarn启动
yarn dev-client
```

## 运行服务端
``` bash
# 【推荐】通过vscode对package.json的解析的图形界面启动
# 点击对应的dev-server名称右方的左三角图标启动

# npm启动
npm run dev-server

# yarn启动
yarn dev-server
```
## 导入mongodb
``` bash
# 请把项目的db-file文件夹复制到E:\

# 导入命令
mongorestore -h 127.0.0.1:27017 -d admin E:\db-file\admin
```

## 附言
``` bash
# mongodb数据库导入/导出命令

# 导入命令
mongorestore -h <hostname><:port> -d dbname <path>

# 导出命令
mongodump -h dbhost -d dbname -o dbdirectory
```
