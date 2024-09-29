# About

This is a backend sample project written by NestJS and TypeScript. It uses MongoDB, but you can also replace it with other databases. You can quickly develop your backend project based on it without building and configuring the project from scratch. Added JWT authentication and nodemailer email module.

这是一个用 NestJS 和 TypeScript 编写的后端示例项目。它使用了 MongoDB，但您也可以将其替换为其它数据库。您可以基于它快速开发您的后端项目，而无需从头构建和配置项目。增加了 JWT 认证和 nodemailer 邮件模块。

# Usage

> The recommended Node version is 20.17.0, but it is not required.

> 建议的Node版本为 20.17.0，但不是必须。

1. clone the project
```sh
git clone https://github.com/karberlee/nestjs-typescript-mongo-demo.git
```

2. npm install
```sh
cd nestjs-typescript-mongo-demo
npm install
```

3. create the .env file in the project root directory
```sh
# .env
PORT=3000 # the port

########## MONGO ##########
MONGO_URI="mongodb://<username>:<password>@<ip>:<port>/<database>?<options>" # the mongodb conntect uri

########## JWT ##########
JWT_SECRET_KEY="your-secret-key" # your jwt secret
JWT_EXPIRES="1h" # token expires in

########## SMTP ########## if you need send email
# SMTP_HOST="<smtp-host>" # the smtp host
# SMTP_PORT=<smtp-port> # the smtp port
# SMTP_SECURE="FALSE" # use SSL? TRUE/FALSE
# SMTP_USER="<your-email-address@example.com>" # auth/sender email address
# SMTP_PASS="<password-or-auth-code>" # email password or auth code
```

4. start
```sh
npm run dev
```

5. build
```sh
npm run build
node dist/app.js
```

6. check running status
```sh
http://127.0.0.1:3000/
```

7. api docs
```sh
http://127.0.0.1:3000/apidocs
```

# Docker

> This project supports running as a Docker service, the base image is node:20.17.0.

> 此项目支持以 Docker 方式运行，基础镜像为 node:20.17.0。

1. npm build
```sh
npm run build
```

2. docker image build
    > *If you are in mainland of China and cannot access foreign networks, replace Dockerfile with Dockerfile.cn*
```sh
docker build -t your-image-name:0.0.1 -f ./Dockerfile .
```

3. run your docker container
```sh
docker run -d -it --name your-container-name \
  -p 3000:3000 --restart=always \
  -e PORT=3000 \
  -e MONGO_URI=mongodb://<username>:<password>@<ip>:<port>/<database>?<options> \
  -e JWT_SECRET_KEY=your-secret-key \
  -e JWT_EXPIRES=1h \
  -v /volume/path/to/your/logs:/usr/src/dist/logs \
  your-image-name:0.0.1
```

4. check running status
```sh
http://127.0.0.1:3000/
```

5. api docs
```sh
http://127.0.0.1:3000/apidocs
```

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.