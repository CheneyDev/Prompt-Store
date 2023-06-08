# TJISE Spring term 2023 Homework #1

## 参考资源

| 名称                                                         | 备注                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Google Search: next js spring boot](https://www.google.com/search?q=next+js+springboot&newwindow=1&ei=Pf52ZLyWJeSK0PEPt_6wgAY&ved=0ahUKEwj8qJ6Hi5__AhVkBTQIHTc_DGAQ4dUDCBA&uact=5&oq=next+js+springboot&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIHCAAQDRCABDIHCAAQDRCABDIGCAAQHhANMggIABAIEB4QDTIICAAQigUQhgMyCAgAEIoFEIYDMggIABCKBRCGAzIICAAQigUQhgM6CggAEEcQ1gQQsAM6EAguEIoFEMcBENEDELADEEM6CggAEIoFELADEEM6DQgAEIoFELEDEIMBEEM6BwgAEIoFEEM6CAgAEIoFEJECOgUIABCABDoGCAAQFhAeSgQIQRgAUOgEWIwkYKIpaAFwAXgAgAHbBYgBhSOSAQsyLTMuNy4wLjEuMZgBAKABAcABAcgBCg&sclient=gws-wiz-serp) |                                                              |
| [Youtube: Full Stack Spring Boot + Next.js Tutorial](https://www.youtube.com/watch?v=Z_4Tqmv8Oa4) | 这里作者有一个文档网站似乎很有帮助<br />[Full Stack Book - backend](https://www.fullstackbook.com/backend/tutorials/springboot-todo/)<br />[Full Stack Book - frontend](https://www.fullstackbook.com/frontend/tutorials/nextjs-todo/) |
| [Youtube: Part 1 : FullStack Application Spring Boot NextJs](https://www.youtube.com/watch?v=_aHGjkOyVso) | Book Store                                                   |
|                                                              |                                                              |
|                                                              |                                                              |

## Prompt Collection

| name                                                         | desc            |
| ------------------------------------------------------------ | --------------- |
| [Stable Diffusion Prompt Book](https://cdn.openart.ai/assets/Stable Diffusion Prompt Book From OpenArt 10-28.pdf) | OpenArt PDF     |
| [StableDiffusion Prompt Wiki](https://www.reddit.com/r/StableDiffusion/wiki/tutorials) | Reddit article  |
| [/r/PromptSharing on Reddit](https://www.reddit.com/r/PromptSharing/) | Reddit topic    |
| [Leaning Prompting](https://learnprompting.org/zh-Hans/docs/Images/resources) |                 |
| [Prompt Builder](https://promptomania.com/stable-diffusion-prompt-builder/) | 风格化提示 分类 |
| https://publicprompts.art/                                   | Prompt 来源     |
| https://playgroundai.com/                                    | Prompt 来源     |
| https://lexica.art/                                          | Prompt 来源     |
| https://promptbase.com/                                      | 参考售卖内容    |
| Danbooru 标签超市https://tags.novelai.dev/                   | 风格化提示 分类 |

## Prompts

| Model                                                        | Prompt                                                       | Negative Prompt | pixel | steps | Scale | Sampler           | Seed |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------- | ----- | ----- | ----- | ----------------- | ---- |
| [cjwbw/analog-diffusion](https://replicate.com/cjwbw/analog-diffusion) | peasant and dragon combat, wood cutting style , viking era, bevel with rune | blur haze       | 512   | 20    | 7     | K_EULER_ANCESTRAL | -1   |



## Model

| Name                               | Image                                                        | Desc    | Link                                                         |
| ---------------------------------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| Chinese traditional pattern        | ![00002-302871561.png](./assets/README/00002-302871561.jpeg)![00001-3421169598.png](./assets/README/00001-3421169598.jpeg) | LYCORIS | https://civitai.com/models/29858/chinese-traditional-pattern |
| Ukiyo-e FuYue Style Background-Mix | ![img](./assets/README/342492.jpeg)                          | LORA    | https://civitai.com/models/25222/ukiyo-e-fuyue-style-background-mix |





## 设计资源

| 名称                                                         | 介绍           |
| ------------------------------------------------------------ | -------------- |
| [Open peeps](https://www.openpeeps.com/)                     | 默认头像库     |
| [shadcn/ui - Login Page](https://ui.shadcn.com/examples/authentication)<br />[shadcn/ui - Music](https://ui.shadcn.com/examples/music)<br />[shadcn/iu - Cards](https://ui.shadcn.com/examples/cards) | 页面模板       |
| [Art History Muse](https://www.planktonacademy.com/courses/history-muse-art-history-course-online) | 油画/美术馆    |
| [rijksmuseum](https://www.rijksmuseum.nl/nl)                 | 荷兰国立博物馆 |



## 角色

买家、管理员

## 基本功能

### 用户

| 功能           | 描述                                                         | 状态 |
| -------------- | ------------------------------------------------------------ | ---- |
| 用户注册和登录 | 允许买家创建账户并进行登录                                   |      |
| 商品浏览和搜索 | 显示商品目录和分类，提供搜索功能                             |      |
| 商品详情       | 展示商品详细信息，包括名称、价格、描述、图片等               |      |
| 购物车功能     | 允许买家添加、修改和移除购物车中的商品                       |      |
| 下单和支付     | 提供下单功能，选择商品和数量，并完成支付流程                 |      |
| 订单管理       | 显示买家的订单列表和订单详情，包括状态、商品清单、配送信息等 |      |
| 用户评价和评论 | 允许买家对购买过的商品进行评价和评论                         |      |
| 个人信息管理   | 允许买家修改个人资料、管理订单历史记录和收货地址             |      |
| 优惠和促销     | 展示促销活动和优惠券信息，支持使用优惠券或促销代码           |      |
| 售后服务       | 提供售后支持渠道，处理退款、退货和售后投诉等请求             |      |

### 管理员

| 功能           | 描述                                             | 状态 |
| -------------- | ------------------------------------------------ | ---- |
| 商品管理       | 添加、编辑和删除商品，管理分类、标签和库存       |      |
| 订单管理       | 查看和更新订单状态，处理退款、退货和售后投诉     |      |
| 用户管理       | 查看用户列表和详细信息，管理用户权限             |      |
| 库存管理       | 实时跟踪库存情况，设置库存警报                   |      |
| 数据分析和报告 | 生成销售报告和统计数据，分析用户行为和购买模式   |      |
| 售后管理       | 处理退款、退货和售后投诉请求                     |      |
| 广告和促销管理 | 管理广告位和促销活动，设置促销代码和优惠券       |      |
| 审核和权限管理 | 审核评价和评论，管理管理员权限                   |      |
| 系统设置       | 配置网站基本信息，管理系统全局设置               |      |
| 安全和日志管理 | 管理员身份验证和权限控制，记录关键操作和异常日志 |      |

## 主要模块

| 模块  | 参考资料                                                     |
| ----- | ------------------------------------------------------------ |
| 后端  |                                                              |
| 前端  |                                                              |
| CI/CD | [1] [Google Search: SpringBoot project ci/cd](https://www.google.com/search?q=springboot+project+ci%2Fcd&sourceid=chrome&ie=UTF-8)<br />[2] [Applying CI/CD With Spring Boot](https://www.baeldung.com/spring-boot-ci-cd)<br />[3] [Step by step guide to build CI/CD Pipeline for Spring Boot Microservices](https://medium.com/@contactkumaramit9139/step-by-step-guide-to-build-ci-cd-pipeline-for-spring-boot-microservices-33ddb545f95c) |

## 数据模型

用户、商品、订单

| id   | SKU   | name           | Cover  image                                                 | desc                | prompt                                                       | negative prompt | pixel dimensions | num outputs | step | guidance scale | seed | model                                                        | Scheduler |
| ---- | ----- | -------------- | ------------------------------------------------------------ | ------------------- | ------------------------------------------------------------ | --------------- | ---------------- | ----------- | ---- | -------------- | ---- | ------------------------------------------------------------ | --------- |
|      | #0001 | 迷幻的波普艺术 | ![img](./assets/README/hypnotic_illustration_of_a_all_knowing_turtle_hy_96381729_2x-768x768.jpg) | Psychedelic Pop art | Hypnotic illustration of a Halloween pumpkin, hypnotic psychedelic art by Dan Mumford, pop surrealism, dark glow neon paint, mystical, Behance |                 | 512X512          | 1           | 25   | 13             |      | [stability-ai](https://replicate.com/stability-ai)/stable-diffusion | DDIM      |



## 技术架构

| 模块  | 名称           | 简介 |
| ----- | -------------- | ---- |
| 后端  | SpringBoot     |      |
|       | SpringSecurity |      |
| 前端  |                |      |
| CI/CD |                |      |

## API 设计

RESTful API

## 日志与错误处理

- 实现日志记录机制，记录关键操作和异常情况，以便进行故障排查和监控。
- 定义适当的错误处理和异常处理机制，提供友好的错误信息给用户，并记录异常以进行分析和修复。

## 监控和分析

- 实现日志记录机制，记录关键操作和异常情况，以便进行故障排查和监控。
- 定义适当的错误处理和异常处理机制，提供友好的错误信息给用户，并记录异常以进行分析和修复。

