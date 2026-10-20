"use client"

import React from "react";
import { 
  TrendingUp, 
  ShieldCheck, 
  FlaskConical, 
  Ship, 
  Scale, 
  ClipboardCheck, 
  Factory, 
  Truck, 
  Users,
  LayoutGrid,
  BarChart3,
  CalendarDays,
  Zap,
  Activity,
  Anchor,
  Clock,
  Waves,
  ShieldAlert,
  Search,
  Navigation,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";
import { MOCK_SHIPMENTS, MOCK_WAREHOUSES, MOCK_SALES } from "@/lib/mock-data";

export default function FioriLaunchpad() {
  // Radar chart for Supply Chain Health
  const radarOption = {
    radar: {
      indicator: [
        { name: '库存健康度', max: 100 },
        { name: '交付及时率', max: 100 },
        { name: '套保匹配率', max: 100 },
        { name: '成本优化度', max: 100 },
        { name: '合规性评分', max: 100 }
      ],
      shape: 'circle',
      splitNumber: 4,
      axisName: { color: '#6a6d70', fontSize: 10, fontWeight: 'bold' },
      splitLine: { lineStyle: { color: 'rgba(0,100,210,0.1)' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(0,100,210,0.2)' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [85, 92, 95, 78, 88],
        name: '供应链状态',
        symbol: 'none',
        itemStyle: { color: '#0064d2' },
        areaStyle: { color: 'rgba(0,100,210,0.2)' },
        lineStyle: { width: 2 }
      }]
    }]
  };

  // Mini chart option for tiles
  const miniChartOption = {
    backgroundColor: 'transparent',
    grid: { left: '0%', right: '0%', bottom: '0%', top: '0%' },
    xAxis: { type: 'category', show: false, data: [1, 2, 3, 4, 5, 6, 7] },
    yAxis: { type: 'value', show: false },
    series: [{
      data: [30, 40, 35, 50, 45, 60, 55],
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 2, color: '#0064d2' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(0,100,210,0.2)' }, { offset: 1, color: 'rgba(0,100,210,0)' }]
        }
      }
    }]
  };

  const groups = [
    {
      title: "大宗交易与风险管理",
      tiles: [
        { title: "大宗商品交易", subtitle: "现货与基差合同管理", icon: TrendingUp, info: "45,600 吨", subInfo: "待点价", color: "text-blue-600", chart: true },
        { title: "风险与套期保值", subtitle: "盈亏分析与敞口监控", icon: ShieldCheck, info: "93.2%", subInfo: "套保率", color: "text-emerald-600" },
        { title: "资金与 MTP", subtitle: "市场价差结算管理", icon: BarChart3, info: "日结单", subInfo: "已生成", color: "text-purple-600" },
      ]
    },
    {
      title: "供应链运营中心",
      tiles: [
        { title: "物流调度塔", subtitle: "船运与陆运实时追踪", icon: Ship, info: "18 艘", subInfo: "在途海轮", color: "text-blue-500", chart: true },
        { title: "IoT 地磅监控", subtitle: "实时防舞弊与自动预警", icon: Scale, info: "2 条", subInfo: "高风险预警", color: "text-red-500" },
        { title: "智能配方优化", subtitle: "原料替代与成本最小化", icon: FlaskConical, info: "1.2%", subInfo: "成本优化", color: "text-amber-600" },
        { title: "MRP 生产计划", subtitle: "产销平衡与库存安全", icon: Factory, info: "4 家", subInfo: "工厂低库存", color: "text-orange-600" },
      ]
    },
    {
      title: "执行与业务网络",
      tiles: [
        { title: "塘口直供物流", subtitle: "末端配送与签收管理", icon: Truck, info: "85 趟", subInfo: "今日配送", color: "text-indigo-600" },
        { title: "供应商协同", subtitle: "准入评估与全生命周期", icon: Users, info: "420 家", subInfo: "合作厂商", color: "text-teal-600" },
        { title: "质量与品控", subtitle: "化验分析与 NIR 快速检测", icon: ClipboardCheck, info: "12 批", subInfo: "待化验", color: "text-cyan-600" },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / System Status */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#1d232a] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">欢迎回来，系统管理员</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AgriCTS 农牧大宗集成终端 • 系统运行正常</p>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
            <div className="flex space-x-8">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">市场状态</div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">CBOT 交易中</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">活跃风险</div>
                <div className="flex items-center space-x-2 mt-1 text-red-600 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-sm">02 条严重预警</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
             <div className="text-right">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">今日吞吐量</div>
               <div className="text-lg font-bold text-[#0064d2]">1,245.00 吨</div>
             </div>
             <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
               <Activity className="w-6 h-6 text-[#0064d2]" />
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#1d232a] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex items-center gap-4">
          <div className="flex-1 h-32">
            <ReactECharts option={radarOption} style={{ height: '100%' }} />
          </div>
          <div className="space-y-2 pr-4">
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">综合健康得分</div>
            <div className="text-3xl font-light text-[#0064d2] text-right">88.5</div>
            <div className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-right">良好</div>
          </div>
        </div>
      </div>

      {/* Fiori Groups & Tiles */}
      {groups.map((group, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider pl-1">{group.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {group.tiles.map((tile, tIdx) => (
              <div key={tIdx} className="sap-tile group cursor-pointer relative overflow-hidden">
                <div className="sap-tile-header flex justify-between items-start">
                  <span>{tile.title}</span>
                  <tile.icon className={cn("w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity", tile.color)} />
                </div>
                <div className="mt-1 text-[10px] text-gray-400 leading-tight">{tile.subtitle}</div>
                
                <div className="sap-tile-content">
                  {tile.chart ? (
                    <div className="h-16 w-full mt-2">
                      <ReactECharts option={miniChartOption} style={{ height: '100%' }} />
                    </div>
                  ) : (
                    <div className="sap-tile-number mt-4">
                      {(tile as any).info} <span className="text-sm font-normal text-gray-400 uppercase tracking-tighter">{(tile as any).subInfo}</span>
                    </div>
                  )}
                </div>
                
                <div className="sap-tile-footer flex items-center justify-between">
                  <span>标准应用</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            ))}
            
            {/* Add Tile Placeholder */}
            <div className="sap-tile border-dashed border-2 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex flex-col items-center space-y-2 text-gray-400">
                <LayoutGrid className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-widest">自定义工作台</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Quick Links / Analytics Overview */}
      <div className="grid grid-cols-12 gap-6 mt-12">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#1d232a] rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">系统动态流水</h3>
            <button className="text-xs text-[#0064d2] font-bold flex items-center hover:underline">
              查看完整活动报告 <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:45 AM', user: '系统 AI', action: '大连商品交易所玉米基差达到临界点', detail: '已触发 5,000 吨自动化对冲操作建议。' },
              { time: '09:12 AM', user: 'IoT 卫士', action: '拦截到严重异常数据', detail: '车辆 苏F-A8888 在 2 号秤检测到重量偏差异常。' },
              { time: '08:30 AM', user: '物流中心', action: '船舶到港: MV Oceanic', detail: '南通港泊位已确认。预计 14:00 开始卸货。' },
            ].map((activity, i) => (
              <div key={i} className="flex space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors border-l-2 border-[#0064d2]">
                <div className="text-[10px] font-bold text-gray-400 w-20 pt-1">{activity.time}</div>
                <div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-100">{activity.action}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{activity.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#1d232a] rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-6">市场行情速览</h3>
          <div className="space-y-6">
            {[
              { label: '豆粕 M2609', value: '3,425.00', change: '+1.2%', up: true },
              { label: '玉米 C2611', value: '2,380.00', change: '-0.4%', up: false },
              { label: '小麦 W2605', value: '2,542.00', change: '+0.8%', up: true },
            ].map((market, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">{market.label}</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white mt-1">{market.value}</div>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded text-xs font-bold",
                  market.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                  {market.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
