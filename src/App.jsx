import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const treemapData = [
  {
    name: '欧洲',
    children: [
      {
        name: '德国',
        value: 128,
        children: [
          { name: '柏林', value: 42 },
          { name: '慕尼黑', value: 38 },
          { name: '汉堡', value: 48 },
        ],
      },
      { name: '法国', value: 96, children: [{ name: '巴黎', value: 96 }] },
      {
        name: '西班牙',
        value: 72,
        children: [
          { name: '马德里', value: 32 },
          { name: '巴塞罗那', value: 40 },
        ],
      },
    ],
  },
  {
    name: '美洲',
    children: [
      {
        name: '美国',
        value: 180,
        children: [
          { name: '加州', value: 80 },
          { name: '德州', value: 52 },
          { name: '纽约州', value: 48 },
        ],
      },
      { name: '巴西', value: 110, children: [{ name: '圣保罗', value: 50 }, { name: '里约', value: 60 }] },
      { name: '加拿大', value: 65, children: [{ name: '安大略', value: 34 }, { name: '魁北克', value: 31 }] },
    ],
  },
  {
    name: '亚洲',
    children: [
      {
        name: '中国',
        value: 220,
        children: [
          { name: '广东', value: 90 },
          { name: '浙江', value: 70 },
          { name: '北京', value: 60 },
        ],
      },
      { name: '日本', value: 140, children: [{ name: '东京', value: 70 }, { name: '大阪', value: 70 }] },
      {
        name: '印度',
        value: 160,
        children: [
          { name: '德里', value: 60 },
          { name: '马哈拉施特拉邦', value: 54 },
          { name: '卡纳塔克邦', value: 46 },
        ],
      },
    ],
  },
];

const formatPath = (pathInfo) =>
  pathInfo
    .map((node) => node.name)
    .filter(Boolean)
    .join(' / ');

export default function App() {
  const option = useMemo(
    () => ({
      title: {
        text: 'React + ECharts Treemap 示例',
        left: 'center',
      },
      tooltip: {
        formatter: ({ treePathInfo = [], value }) => `${formatPath(treePathInfo)}: ${value}`,
      },
      series: [
        {
          type: 'treemap',
          data: treemapData,
          roam: true,
          nodeClick: 'zoomToNode',
          leafDepth: 2,
          breadcrumb: {
            show: true,
            top: 25,
            itemStyle: { color: '#e2e8f0', textStyle: { color: '#0f172a' } },
            emphasis: { itemStyle: { color: '#cbd5e1' } },
          },
          label: {
            show: true,
            formatter: '{b}\n{c}',
          },
          upperLabel: {
            show: true,
            height: 30,
            color: '#0b1221',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            borderRadius: 4,
            padding: [6, 10],
          },
          levels: [
            {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
                gapWidth: 2,
              },
              color: ['#6c9ef8', '#5fc9a7', '#f5b971'],
            },
            {
              itemStyle: {
                borderColor: '#e2e8f0',
                borderWidth: 1,
                gapWidth: 1,
              },
            },
          ],
          upperLabelHeight: 36,
          visualMin: 30,
          visualMax: 240,
          colorSaturation: [0.5, 1],
        },
      ],
    }),
    [],
  );

  return (
    <div className="page">
      <header className="header">
        <p>用 React 和 ECharts 渲染的 treemap，可通过修改数据快速更新视图。</p>
        <p>数据包含多级层级（洲 → 国家 → 省/州），鼠标悬浮可查看完整路径。</p>
      </header>
      <main className="chart-wrapper">
        <ReactECharts option={option} style={{ height: 520 }} notMerge lazyUpdate />
      </main>
    </div>
  );
}
