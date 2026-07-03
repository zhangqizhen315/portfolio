---
title: 通用积分卡券兑换平台
slug: 03-points-coupon-exchange
order: 3
summary: 绑定商户账户、消费获取积分、积分购买卡券、卡券核销，含消费行为分析驱动的推荐引擎
role: 产品与原型设计
period: "2017"
industry: [积分运营, 卡券, 消费推荐]
techStack: [Axure RP]
highlights:
  - 三边平台盈利模式：积分发放商（商家）、卡券发行商、用户三方各取所需，平台赚取积分与卡券的结算差价
  - 消费行为分析驱动的推荐引擎：数据模型提前预留了推荐规则、触发条件、用户画像等类别，为后续迭代打基础
  - 一期功能范围的克制取舍：后台只做增删改查、不做审批流和多角色权限，把复杂度留给确有需要时再加
---

一个通用型的积分与卡券兑换系统：用户绑定商户账户后，消费即可获得积分，积分可以在商城购买卡券，卡券再回到商户处兑换实际的服务或商品。

## 业务模式：三边平台，赚差价

系统的参与者分四类：

- **用户**——消费获得积分，积分能兑换成实际优惠
- **积分发放商**（即用户消费的商户）——获得一套现成的用户忠诚度激励能力
- **卡券发行商**——通过平台获得引流
- **平台运营方**——利润来自积分结算价与卡券结算价之间的差价

这是一个典型的三边平台设计：商户、卡券方、用户三方各取所需，平台居中撮合并从价差中盈利，而不是靠会员费或广告变现。

## 核心闭环：获取积分 → 购买卡券 → 使用卡券

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/积分_首页.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="积分首页"
/>

三大核心用例构成一个完整闭环：

1. **获取积分**：用户在商户处消费，系统据此发放积分。第一期先做"商户同步订单后发积分"这个相对简单的路径，"支付时实时发积分"作为后续迭代项——积分获取的实时性是刻意分期实现的能力，不是遗漏。
2. **购买卡券**：用户在商城用积分兑换卡券，界面上有一条"根据推荐购买"的分支路径，呼应下面的推荐引擎设计。

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券详情_购买.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="卡券详情与购买"
/>

3. **使用卡券**：用户在商户处核销已购卡券完成闭环。

设计文档里有一句话概括了这套闭环背后的思路："用户可见的部分只是冰山一角，支撑它的是海面下的分析模型"——三大用例本身并不复杂，真正的设计重点在于背后的推荐与提醒机制：**系统靠对用户消费行为的分析来做推荐和提醒，这就要求商户必须向平台提供用户的订单数据**，这是整个商业模式能够成立的前提条件。

## 数据模型：为长期推荐能力预先铺路

系统底层定义了约 30 个业务实体，覆盖用户、商户、积分账户、积分与卡券的发放/结算/核销订单等基本对象，也包括推荐消息、推荐规则、触发条件、用户画像这些看起来"超前"于一期功能范围的类别。也就是说，虽然第一期只落地了最核心的三个闭环用例，但数据结构从一开始就是按"未来要做消费行为驱动的智能推荐"这个目标设计的，不是走一步搭一步。

## 后台：先克制，再迭代

后台管理这一期刻意做得很轻：只支持一个超级管理员，不做多角色分权，也不做审批流——但所有操作都记录日志，为以后补审批流留了空间。这是很典型的"先用最小可行后台支撑上线，把权限体系和审批流后置"的节奏：不是做不到，而是判断一期不需要。

## 从登录到门店：走一遍用户侧动线

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/立即使用.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="立即使用"
/>

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券_登录.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="登录"
/>

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券_绑定手机号.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="绑定手机号"
/>

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券_动态.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="动态"
/>

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券_商家详情.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="商家详情"
/>

<PrototypeViewer
  image="/screenshots/03-points-coupon-exchange/卡券_我.png"
  href="/prototypes/03-points-coupon-exchange/start.html"
  title="我的"
/>

## 业务架构与闭环流程图

![整体业务架构](/diagrams/03-points-coupon-exchange/00-整体业务架构.png)

![闭环流程](/diagrams/03-points-coupon-exchange/01-闭环流程.svg)

![用户消费](/diagrams/03-points-coupon-exchange/02-用户消费.svg)
