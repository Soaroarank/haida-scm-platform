"use client"

import React, { useState } from "react";
import { MOCK_RISK_EXPOSURES, MOCK_TREASURY } from "@/lib/mock-data";
import { 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator,
  PieChart as PieIcon,
  RefreshCcw,
  DollarSign,
  Activity,
  ArrowRight,
  Target,
  FileText,
  Plus,
  Download,
  Search,
  Filter
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function HedgingObjectPage() {
  const [selectedExposure, setSelectedExposure] = useState(MOCK_RISK_EXPOSURES[0]);

  // 期现敞口分布图 - SAP 风格
  const exposureOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 }
    },
    legend: { 
      bottom: '0%', 
      left: 'center', 
      textStyle: { color: '#666', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: '物理敞口分布',
        type: 'pie',
        radius: ['40%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: { 
          borderRadius: 4, 
          borderColor: '#fff', 
          borderWidth: 2 
        },
        label: { show: false },
        data: MOCK_RISK_EXPOSURES.map(e => ({ value: e.physicalPosition, name: e.commodity }))
      }
    ]
  };

  // 盈亏对冲净值走势 - SAP 风格
  const pnlOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 }
    },
    legend: {
      data: ['现货盈亏', '期货盈亏', '对冲净值'],
      textStyle: { color: '#666', fontSize: 11 },
      bottom: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: ['周一', '周二', '周三', '周四', '周五'], 
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    yAxis: { 
      type: 'value', 
      axisLine: { show: false }, 
      splitLine: { lineStyle: { color: '#eee' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    series: [
      { name: '现货盈亏', type: 'line', smooth: true, data: [-120, -150, -80, -200, -250], itemStyle: { color: '#ef4444' } },
      { name: '期货盈亏', type: 'line', smooth: true, data: [110, 145, 85, 190, 245], itemStyle: { color: '#22c55e' } },
      { name: '对冲净值', type: 'bar', data: [-10, -5, 5, -10, -5], itemStyle: { color: 'rgba(0, 100, 210, 0.4)' }, barWidth: '30%' }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] dark:bg-[#12171c]">
      {/* SAP Object Header */}
      <div className="sap-object-header">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">风险对冲与敞口管理</h1>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">合规达标</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">实时敞口匹配、对冲有效性测试及内部管理利润 (MTP) 结算。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="sap-button-primary flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>有效性测试</span>
            </button>
            <button className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2">
              <RefreshCcw className="w-4 h-4" />
              <span>内部利润结算</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">总物理敞口</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">125,000.00 <span className="text-sm font-normal text-gray-400">吨</span></div>
            <div className="flex items-center text-xs text-emerald-500 font-bold">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 套保率: 91.2%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">累计对冲损益</div>
            <div className="text-2xl font-light text-blue-600">¥852,400.00</div>
            <div className="text-xs text-gray-400 font-bold tracking-tighter uppercase">VaR (95%): ¥125万</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">战区 MTP 利润</div>
            <div className="text-2xl font-light text-orange-600">¥3,450,000.00</div>
            <div className="flex items-center text-xs text-red-500 font-bold">
              <ArrowDownRight className="w-3 h-3 mr-1" /> 成本波动 +2.4%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">准则合规状态</div>
            <div className="text-2xl font-light text-emerald-600 uppercase">CAS 24 / IFRS 9</div>
            <div className="text-xs text-gray-400 font-bold tracking-tighter">全额套保认定</div>
          </div>
        </div>
      </div>

      {/* SAP Page Sections */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="flex space-x-4 h-full min-h-0">
          {/* Main Exposure Matrix */}
          <div className="flex-[2] flex flex-col space-y-4 min-w-0">
            <div className="sap-section-card flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-emerald-600" />
                  敞口匹配矩阵
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="搜索品种..." className="sap-input pl-9 w-48" />
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="sap-table">
                  <thead>
                    <tr>
                      <th>品种分类</th>
                      <th>现货头寸 (吨)</th>
                      <th>期货头寸 (吨)</th>
                      <th>套保比例</th>
                      <th>浮动盈亏 (万元)</th>
                      <th className="text-right">风险状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_RISK_EXPOSURES.map((risk) => (
                      <tr key={risk.commodity} className="hover:bg-blue-50/30">
                        <td className="font-bold text-[#0064d2] uppercase">{risk.commodity}</td>
                        <td className="font-bold">{risk.physicalPosition.toLocaleString()}</td>
                        <td className="text-gray-500">{Math.abs(risk.futuresPosition).toLocaleString()}</td>
                        <td>
                          <div className="flex items-center space-x-3 w-32">
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-1000",
                                  risk.hedgeRatio > 0.9 ? "bg-emerald-500" : "bg-orange-500"
                                )} 
                                style={{ width: `${risk.hedgeRatio * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-bold">{(risk.hedgeRatio * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className={cn(
                          "font-bold",
                          risk.unrealizedPnl > 0 ? "text-emerald-600" : "text-red-600"
                        )}>
                          {risk.unrealizedPnl > 0 ? "+" : ""}{(risk.unrealizedPnl / 10000).toFixed(1)}
                        </td>
                        <td className="text-right">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            risk.hedgeRatio > 0.8 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          )}>
                            {risk.hedgeRatio > 0.8 ? "正常" : "风险暴露"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sap-section-card h-80 flex flex-col">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">对冲净值绩效表现 (周)</h3>
              <div className="flex-1 min-h-0">
                <ReactECharts option={pnlOption} style={{ height: '100%' }} />
              </div>
            </div>
          </div>

          {/* Side Control Panel */}
          <div className="w-[400px] flex flex-col space-y-4">
            <div className="sap-section-card bg-[#354a5f] text-white">
              <h3 className="text-sm font-bold mb-6 uppercase tracking-wider text-emerald-400 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                管理转移定价 (MTP)
              </h3>
              <div className="space-y-4">
                {MOCK_TREASURY.map(item => (
                  <div key={item.regionId} className="p-4 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          item.pnlStatus === '盈利' ? "bg-emerald-500" : "bg-red-500"
                        )} />
                        <span className="text-xs font-bold uppercase">{item.regionName}</span>
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase",
                        item.pnlStatus === '盈利' ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      )}>
                        {item.pnlStatus}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[9px] text-gray-400 uppercase font-bold">内部结算价</div>
                        <div className="text-sm font-bold mt-0.5">¥{item.internalTransferPrice.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-gray-400 uppercase font-bold">结算损益</div>
                        <div className={cn(
                          "text-sm font-bold mt-0.5",
                          item.settlementProfit > 0 ? "text-emerald-400" : "text-red-400"
                        )}>
                          ¥{item.settlementProfit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-3 bg-white/5 rounded text-[10px] text-gray-400 leading-relaxed italic border border-dashed border-white/10 mt-4">
                  * 内部对冲凭证已自动生成并与 SAP FICO (CO-PA) 模块完成实时对账。
                </div>
              </div>
            </div>

            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center">
                <PieIcon className="w-4 h-4 mr-2 text-[#0064d2]" />
                敞口结构分布
              </h3>
              <div className="h-[250px]">
                <ReactECharts option={exposureOption} style={{ height: '100%' }} />
              </div>
              <div className="mt-4 space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-bold uppercase">集中度最高</span>
                  <span className="font-bold text-gray-700">豆粕 (45%)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-bold uppercase">敞口波动率</span>
                  <span className="text-red-600 font-bold">+2.8% ↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
