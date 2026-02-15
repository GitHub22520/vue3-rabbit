#!/bin/bash

echo "🚀 开始打包..."
pnpm build

if [ $? -eq 0 ]; then
  echo "✅ 打包成功，开始上传..."
  scp -r dist/* ubuntu@134.175.232.176:/home/ubuntu/projects/vue3-rabbit/
  
  if [ $? -eq 0 ]; then
    echo "🎉 部署完成！访问 http://134.175.232.176"
  else
    echo "❌ 上传失败，请检查网络或服务器连接"
  fi
else
  echo "❌ 打包失败，请检查代码错误"
fi
