# Family Health · AI for Bio

家家健康 AI for Bio 筹备网站。

网站：https://familyhealthc.github.io/ai-for-bio/

研究与合作图谱：https://familyhealthc.github.io/ai-for-bio/atlas.html

## 内容结构 v0.2

- 五个使命主题（不作为完整或互斥的学科分类）。
- 六条分类轴：生命机制、疾病情境、健康目标、方法能力、拟涉及阶段、协作角色。
- 37个候选研究问题及各自的拟议首轮任务；35条由主题与横向问题展开，另补表观遗传与制备工艺议题。
- 31个公开能力候选节点，附官方来源、边界与拟议合作方式。
- 9条外部研究观察，区分计算、临床前、人体及研究资源发布。
- 37份可独立访问的研究简案、9篇研究观察；图谱支持筛选、关系图及JSON导出。
- 三类首期拟议合作工作包、家家健康起步说明与常见问题。

`atlas-core.js` 的分类与能力匹配是编辑导航，不是唯一学术分类、科研质量评级或合作确认。未补原始证据的议题会明确显示缺口。

## 修改研究内容

编辑 `atlas-questions.js`、`atlas-institutions.js`、`content.js` 或 `extended-content.js` 后，重新生成独立阅读页：

```sh
node scripts/build-content.mjs
```

生成的 `research/` 与 `insights/` 页面也需一并提交。分类与图谱交互分别位于 `atlas-core.js`、`atlas.js`。

## 本地预览

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

## 更新

修改静态文件并推送 `main` 分支，GitHub Pages 从仓库根目录发布。

- `index.html`：页面结构。
- `styles.css`：响应式样式。
- `content.js`：研究议题、外部研究观察及能力地图。
- `app.js`：筛选、详情及合作意向工具。

## 当前状态

网站为筹备版。机构地图为公开能力参考，尚未确认合作或入驻；研究观察介绍外部成果。合作意向仅在访问者浏览器保存、复制或下载，不会发送给家家健康，尚未接入团队收件后台。

## 图像署名

HeLa cells，Kevin Mackenzie / University of Aberdeen，Wellcome Collection，CC BY 4.0。页面使用裁切与色调处理，非家家健康研究成果。

完整来源与许可见 [asset-credit.txt](assets/asset-credit.txt) 及网站“资料来源”。
