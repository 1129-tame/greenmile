# ベースイメージの作成
FROM google/cloud-sdk:latest
# FROM node:lts-alpine3.15

# コンテナ内で作業するディレクトリを指定
WORKDIR /workspaces/greenmile

# Node.js 設定
ARG node_ver=16.13.1
ARG node_path=/usr/local/lib/nodejs
ARG node_file_name=node-v${node_ver}-linux-x64

# Node.js のパスを通す
# (/usr/local/lib/nodejs/node-v14.15.1-linux-x64/)
ENV PATH ${node_path}/${node_file_name}/bin:$PATH

RUN apt-get update \
  # 必要なパッケージをインストール
  && apt-get install -y ca-certificates curl xz-utils \
  # Node.js をダウンロード
  && curl https://nodejs.org/dist/v${node_ver}/${node_file_name}.tar.xz > ${node_file_name}.tar.xz \
  # Node.js の各ファイルを /usr/local/lib/nodejs/node-v14.15.1-linux-x64/ に解凍
  && mkdir -p $node_path \
  && tar xJvf ${node_file_name}.tar.xz -C $node_path

# yarn を install
RUN npm install -g yarn
# [Optional] Comment/Uncomment this section to avoid/install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends graphviz


RUN mkdir -p /workspaces/react-typescript/node_modules
# package.jsonとyarn.lockを/usr/src/appにコピー
COPY ["hello-world/package.json", "hello-world/yarn.lock", "./"]
# パッケージをインストール
RUN yarn install
# ファイルを全部作業用ディレクトリにコピー
COPY . .


