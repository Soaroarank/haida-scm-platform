"use client"

import React, { useState } from "react";
import { MOCK_FORMULATIONS, MOCK_PLANT_STOCKS } from "@/lib/mock-data";
import { 
  FlaskConical, 
  Factory, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Layers,
  Dna,
  Activity,
  History,
  Target,
  ChevronRight,
  ShieldAlert,
  Cpu,
  Plus,
  Download,
  Search,
  Filter,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function FormulationObjectPage() {
  const [selectedFormula, setSelectedFormula] = useState(MOCK_FORMULATIONS[0]);
  const [stocks, setStocks] = useState(MOCK_PLANT_STOCKS);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [productionLoad, setProductionLoad] = useState(88);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setShowNotification("正在运行全局 LP 线性规划优化引擎...");
    
    setTimeout(() => {
      setIsOptimizing(false);
      // 模拟优化结果：替代率提高，成本降低，库存状态变化
      setSelectedFormula({
        ...selectedFormula,
        substitutionRate: 0.22,
        costImpact: -155,
      });
      
      // 模拟库存联动：替代原料消耗增加，豆粕消耗减少
      setStocks(prev => prev.map(p => {
        if (p.commodity === '豆粕') {
          return { ...p, daysRemaining: p.daysRemaining + 0.5, status: '正常' };
        }
        return p;
      }));
      
      setProductionLoad(92);
      setShowNotification("优化完成：豆粕替代率提升至 22%，预计额外节省成本 ¥35/吨。已自动同步至生产系统。");
      setTimeout(() => setShowNotification(null), 5000);
    }, 2000);
  };

  const handleSyncOrders = () => {
    setShowNotification("正在同步 ERP 生产订单与配方执行状态...");
    setTimeout(() => {
      setShowNotification("同步成功：已将配方 V2.1 部署至 36 家工厂。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleOEMScheduling = () => {
    setShowNotification("正在启动 OEM 代加工调度协议...");
    setTimeout(() => {
      setShowNotification("调度成功：已指派湖北二厂承接 1,200吨/日 产能缺口。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  // 成本变动对比图 - SAP 风格
  const costOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: ['基础配方', '优化配方'], 
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    yAxis: { 
      type: 'value', 
      name: '元/吨', 
      axisLine: { show: false }, 
      splitLine: { lineStyle: { color: '#eee' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    series: [
      {
        data: [
          { value: 3850, itemStyle: { color: '#888' } },
          { value: 3730, itemStyle: { color: '#0064d2' } }
        ],
        type: 'bar',
        barWidth: '40%',
        label: { show: true, position: 'top', color: '#333', fontSize: 11 }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] dark:bg-[#12171c] relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-purple-500">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Object Header */}
      <div className="sap-object-header">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center text-purple-600 dark:text-purple-400">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">智能配方优化与 MRP 生产平衡</h1>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">自动优化开启</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">生化配方替代模拟、原料缺口预警及全区域产销平衡管理。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="sap-button-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Zap className={cn("w-4 h-4", isOptimizing && "animate-pulse")} />
              <span>{isOptimizing ? "正在计算优化方案..." : "运行全局优化"}</span>
            </button>
            <button 
              onClick={handleSyncOrders}
              className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>同步生产订单</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center">
              <Target className="w-3 h-3 mr-1.5 text-primary" /> 全区域原料缺口
            </div>
            <div className="text-2xl font-light text-red-600">24,500.00 <span className="text-sm font-normal text-gray-400">吨</span></div>
            <div className="text-[10px] font-bold text-red-500 flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1" /> 4 家工厂库存告急
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">豆粕替代率</div>
            <div className="text-2xl font-light text-emerald-600">{(selectedFormula.substitutionRate * 100).toFixed(1)}%</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">已应用非常规原料</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">优化后成本降幅</div>
            <div className="text-2xl font-light text-purple-600">¥{selectedFormula.costImpact}.00 <span className="text-sm font-normal text-gray-400">/吨</span></div>
            <div className="text-[10px] text-gray-400 font-bold tracking-tighter">预计月节省: ¥294万</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">生产线运行率</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">{productionLoad}%</div>
            <div className="text-[10px] text-gray-400 font-bold tracking-tighter">32/36 家工厂在线</div>
          </div>
        </div>
      </div>

      {/* SAP Page Sections */}
      <div className="p-4 space-y-4">
        <div className="flex space-x-4">
          {/* Main Formulation Engine */}
          <div className="flex-[2] flex flex-col space-y-4 min-w-0">
            <div className="sap-section-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <Dna className="w-5 h-5 mr-2 text-purple-500" />
                  动态生化替代决策矩阵
                </h3>
                <span className="text-xs text-gray-400 font-medium italic">基于线性规划 (LP) 算法引擎</span>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">目标产品</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white uppercase">{selectedFormula.targetProduct}</div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider mb-1">替代策略</div>
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{(selectedFormula.substitutionRate * 100).toFixed(0)}% 豆粕 → 杂粕/DDGS</div>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-800">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider mb-1">单位成本降低</div>
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">¥{Math.abs(selectedFormula.costImpact).toLocaleString()} / 吨</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">营养完整性验证 (Nutrient Integrity)</h4>
                  <div className="space-y-5">
                    {selectedFormula.nutrientGaps.map(n => (
                      <div key={n.nutrient} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-500">{n.nutrient}</span>
                          <span className="text-gray-900 dark:text-white">{n.actual}% <span className="text-gray-400 font-normal">/ 目标 {n.target}%</span></span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              Math.abs(n.actual - n.target) < 0.5 ? "bg-emerald-500" : "bg-orange-500"
                            )} 
                            style={{ width: `${(n.actual / n.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">成本变动仿真对比</h4>
                  <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
                    <ReactECharts option={costOption} style={{ height: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="sap-section-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">全区域 MRP 平衡矩阵</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="搜索工厂..." className="sap-input pl-9 w-48" />
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="sap-table">
                  <thead>
                    <tr>
                      <th>工厂名称</th>
                      <th>原料品种</th>
                      <th>当前库存 (吨)</th>
                      <th>在途数量 (吨)</th>
                      <th>消耗速率 (吨/日)</th>
                      <th className="text-right">安全天数 (DOH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map(p => (
                      <tr key={p.plantId} className="hover:bg-blue-50/30">
                        <td className="font-bold text-[#0064d2]">{p.plantName}</td>
                        <td className="text-gray-600">{p.commodity}</td>
                        <td className="font-bold">{p.currentStock.toLocaleString()}</td>
                        <td className="text-blue-500 font-medium">1,200</td>
                        <td className="text-gray-500">{p.dailyConsumption} T/日</td>
                        <td className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <span className={cn(
                              "text-[10px] font-bold uppercase",
                              p.status === '库存告急' ? "text-red-600 animate-pulse" : 
                              p.status === '库存偏低' ? "text-orange-600" : "text-emerald-600"
                            )}>
                              {p.daysRemaining.toFixed(2)} 天
                            </span>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              p.status === '库存告急' ? "bg-red-500" : 
                              p.status === '库存偏低' ? "bg-orange-500" : "bg-emerald-500"
                            )} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Control Panel */}
          <div className="w-[400px] flex flex-col space-y-4">
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center">
                <Factory className="w-4 h-4 mr-2 text-primary" />
                产能协调中心
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">全区域吞吐量</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">4,500.00 <span className="text-xs font-normal text-gray-400">吨/日</span></div>
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-gray-500">产能负荷</span>
                    <span className="text-emerald-600 font-bold">{productionLoad}%</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">供应链联动状态</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-blue-700">外部供应充足</span>
                  </div>
                  <div className="text-[10px] text-gray-500 italic">
                    {selectedFormula.substitutionRate > 0.2 
                      ? "替代原料 (DDGS/杂粕) 需求增加，已触发中粮/嘉吉自动补货指令。" 
                      : "豆粕需求稳定，合约执行进度正常。"}
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg space-y-3">
                  <div className="flex items-center text-red-600 space-x-2">
                    <ShieldAlert className="w-4 h-4 animate-bounce" />
                    <span className="text-xs font-bold uppercase">重大产能受损警报</span>
                  </div>
                  <p className="text-[11px] text-red-700 dark:text-red-400 leading-relaxed italic">
                    湖北一厂: 膨化线发生故障。预计损失: 1,200吨/日。影响高端水产料订单交付。
                  </p>
                  <button 
                    onClick={handleOEMScheduling}
                    className="w-full sap-button-primary bg-red-600 hover:bg-red-700 flex items-center justify-center space-x-2"
                  >
                    <span>执行 OEM 代加工调度</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="sap-section-card flex-1">
              <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider flex items-center text-orange-600">
                <History className="w-4 h-4 mr-2" />
                自动化指令流水
              </h3>
              <div className="relative pl-6 space-y-8 border-l border-dashed border-gray-200 dark:border-gray-800 py-2">
                {[
                  { time: '09:00', title: 'MRP 引擎同步', desc: '核心系统确认全区域 2.45万吨 原料缺口。' },
                  { time: '10:30', title: '配方 V2 部署', desc: '36 家工厂已完成“低豆粕替代包”下发。' },
                  { time: '14:00', title: '运力重新路由', desc: '45 辆重卡已导向荆州/洪湖转运中心。' }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-primary" />
                    <div className="text-[9px] font-bold text-primary uppercase mb-1">{step.time} AM</div>
                    <div className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{step.title}</div>
                    <div className="text-[10px] text-gray-500 italic mt-0.5">{step.desc}</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowNotification("正在加载完整自动化指令审计日志...")}
                className="w-full mt-6 py-2 border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 rounded text-[10px] font-bold uppercase hover:bg-gray-50 transition-all"
              >
                查看完整指令审计日志
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
