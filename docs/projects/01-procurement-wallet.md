---
title: 企业采购钱包系统
slug: 01-procurement-wallet
order: 1
summary: 面向企业内部及供应商的电子钱包与资金结算平台：供应商货款支付、投标/履约保证金、钱包充值提现，并与企业内部公文审批流程集成
role: 二次开发整体设计 / 原型设计
period: "2015"
industry: [企业采购, 供应链, 电子钱包]
techStack: [AmazeUI, jQuery, Handlebars]
highlights:
  - 保证金全生命周期管理：投标保证金冻结、履约保证金转化、退回与扣缴的完整状态流转
  - 供应商资质审批与钱包权限联动：资质变更需上级审批，审批通过前维持原状态可用，不因资料变更中断业务
  - 合并付款、无权限降级页面等边界场景覆盖，不是只做"理想路径"
  - 支付密码体系的浏览器端安全限制设计（设置、修改、找回三个环节均有对应限制）
---

面向企业采购业务的电子钱包与资金结算平台二次开发设计：在已有的采购寻源、拟标、合同管理流程基础上，补充投标保证金、履约保证金、货款支付、钱包充值提现等资金结算能力。系统对接了企业内部的账户体系技术子公司，作为底层账户和资金操作的能力提供方。

## 角色体系

- **内部员工**：HR 维护供应商角色权限，采购业务人员负责发布项目、审批
- **供应商**：注册、资质认证（营业执照/税务登记号/组织机构代码三证匹配）、绑定银行卡、操作钱包
- **业务实体**（企业内的采购主体）：拥有自己的钱包，参与保证金收付与货款支付
- **总账钱包管理员**：超级管理员，统筹管理各业务实体钱包

## 钱包首页与钱包管理

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/钱包首页.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="钱包首页"
/>

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/钱包管理.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="钱包管理"
/>

## 保证金：从投标到履约的完整状态流转

供应商在"拟标"环节缴纳投标保证金，资金从供应商钱包冻结；未中标即退回，中标则转入履约保证金环节。履约保证金在合同创建时触发，供应商钱包扣款冻结，业务实体钱包对应显示，通过审批流程控制解冻与扣缴。

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/履约保证金.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="履约保证金"
/>

## 发布项目与供应商货款支付

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/发布项目.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="发布项目"
/>

供应商货款支付是这个系统的核心功能：在标准采购订单基础上做了支付流程优化，支持"无权限"降级页面（供应商没有支付权限时看到的受限界面）、"合并付款"（多笔订单合并成一次支付）等边界场景，不是只覆盖理想路径的简化设计。

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/供应商货款支付.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="供应商货款支付"
/>

## 充值提现

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/充值提现-在线充值-线下充值.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="充值提现"
/>

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/提现.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="提现"
/>

## 供应商资质与权限：变更不中断业务

供应商注册时，人员类型分"联系人（个体户）""财务人员""销售人员"，同一供应商下财务人员是唯一有效状态、销售人员不限数量。资质或银行卡信息变更时需要上级审批，但审批通过前会维持原状态可用——不会因为一次资料变更就让供应商暂时无法操作钱包。

## 支付密码：三个环节都有边界限制

支付密码的设置、修改、找回三个环节，每个都单独设计了"浏览器端限制"（如密码输入框限制只能用数字键盘输入），把安全考虑落到具体交互细节上，而不是只在后端做校验。

<PrototypeViewer
  image="/screenshots/01-procurement-wallet/供应商帮助中心.png"
  href="/prototypes/01-procurement-wallet/钱包首页.html"
  title="供应商帮助中心"
/>
