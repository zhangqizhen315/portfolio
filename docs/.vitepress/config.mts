import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '作品集',
  description: '个人作品集网站 —— 历史项目案例与交互原型',

  // base 取值取决于实施阶段确定的仓库名：
  // - 若部署到 <user>.github.io 根仓库或绑定自定义域名，填 '/'
  // - 若部署到普通仓库（如 <user>.github.io/portfolio），填 '/portfolio/'
  // 环节⑨（GitHub Pages 部署配置）确定仓库名后再改，暂用 '/' 便于本地开发。
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '案例', link: '/projects/01-procurement-wallet' },
      { text: '关于', link: '/about' },
    ],
    sidebar: {
      '/projects/': [{
        text: '项目案例',
        items: [
          { text: '01 · 采购钱包系统', link: '/projects/01-procurement-wallet' },
          { text: '02 · 弹性福利平台', link: '/projects/02-flex-benefits' },
          { text: '03 · 积分卡券兑换平台', link: '/projects/03-points-coupon-exchange' },
          { text: '04 · 供应链金融（企业集团）', link: '/projects/04-supply-chain-finance-airline' },
          { text: '05 · 供应链金融平台', link: '/projects/05-supply-chain-finance-platform' },
          { text: '06 · IC 设计服务平台', link: '/projects/06-ic-design-platform' },
          { text: '07 · 供求撮合平台', link: '/projects/07-supply-demand-matching' },
        ],
      }],
    },
    search: { provider: 'local' },
  },
})
