---
title: 供应链金融交易平台
slug: 05-supply-chain-finance-platform
order: 5
summary: 通用 B2B 供应链交易与融资平台原型：企业/需方/金融机构三种角色，商品发布下单、应收账款融资、会员中心
role: 产品与原型设计
period: "2019"
industry: [供应链金融, B2B交易, 融资]
techStack: [Axure RP]
highlights:
  - 角色壳复用设计：企业与金融机构共享同一套会员中心结构，通过配置切换菜单文案，不必各自维护一套界面
  - 支付尾款按资金来源细分至少四条路径（信用融资、应收账款融资已/未设置、现金支付），覆盖真实业务里资金来源的复杂度
  - 融资与投资双向撮合的完整闭环：企业"我要融资"与金融机构"我要投资"两端各自独立又互相呼应
---

一个通用型的 B2B 供应链交易与融资平台原型，覆盖企业、需方、金融机构三种角色，从商品发布下单到应收账款融资的完整链路。

## 三种角色，一套骨架

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_首页_未登录.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="首页（未登录）"
/>

平台的角色分三层：**企业**（发布供求信息、管理订单）、**金融机构**（审核企业信息、管理历史融资和放款）、**平台后台**（少量的手续费设置和商品/订单管理）。企业和金融机构的会员中心是同一套界面骨架换了一份菜单配置——"我的账户""充值提现""资产明细""账户安全"这些模块两种角色都有，区别只在于菜单文案和具体业务数据，不是各自维护一套独立界面。

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_登录.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="登录"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_首页_已登录.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="首页（已登录）"
/>

## 供货专区与融资详情

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_供货专区_列表.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="供货专区列表"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/融资项目详情.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="融资项目详情"
/>

## 会员中心：一套骨架，两种身份

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_会员中心_我的账户_企业.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="会员中心-我的账户"
/>

## 订单与支付：按资金来源细分路径

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_会员中心_订单_订单列表.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="订单列表"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_会员中心_订单_订单详情.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="订单详情"
/>

支付尾款这一步不是单一路径：资金来源分"信用融资""应收账款融资"（又按"是否已设置应收账款"分成两种状态）"现金支付"，至少四条分支。这种细分程度说明设计时对接的是真实融资场景里资金来源的复杂度，而不是为了原型好看简化成一种支付方式。

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_会员中心_订单_支付尾款_现金支付.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="支付尾款-现金支付"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/前台_确认下单.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="确认下单"
/>

## 后台管理

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/back_home.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="后台首页"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/back_shop_order.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="后台订单列表"
/>

<PrototypeViewer
  image="/screenshots/05-supply-chain-finance/back_shop_commodity_create.png"
  href="/prototypes/05-supply-chain-finance/index.html"
  title="后台商品创建"
/>
