"use client"

import React, { useState } from "react";
import { MOCK_VENDORS } from "@/lib/mock-data";
import { 
  Users, 
  ShieldCheck, 
  UserX, 
  MapPin, 
  CreditCard, 
  Truck, 
  FileSignature,
  Star,
  Search,
  Filter,
  BarChart2,
  AlertTriangle,
  Zap,
  Activity,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Lock,
  Unlock,
  Eye,
  Settings2
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function VendorGovernancePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleAntiCollusion = () => {
    setShowNotification("正在生成防围标深度分析报告，基于图数据库挖掘关联关系...");
    setTimeout(() => {
      setShowNotification("分析完成：已识别 3 组潜在关联供应商，报告已生成。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2500);
  };

  const handleSyncCredit = () => {
    setShowNotification("正在从外部征信系统同步供应商信用数据...");
    setTimeout(() => {
      setShowNotification("信用评级同步完成：更新了 12 家供应商的信用评分。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleDeepScan = () => {
    setIsScanning(true);
    setShowNotification("正在启动防围标引擎深度穿透扫描...");
    setTimeout(() => {
      setIsScanning(false);
      setShowNotification("穿透扫描完成：全量供应商合规性校验已通过。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 3000);
  };

  // 供应商损耗率分析 - SAP Fiori Horizon Palette
  const vendorLossOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 },
      extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.15);'
    },
    grid: { top: 40, right: 20, bottom: 40, left: 50 },
    xAxis: { 
      type: 'category', 
      data: MOCK_VENDORS.map(v => v.vendorName), 
      axisLine: { lineStyle: { color: '#89919a' } },
      axisLabel: { fontSize: 11, color: '#6a6d70' }
    },
    yAxis: { 
      type: 'value', 
      name: '损耗率 (%)', 
      nameTextStyle: { fontSize: 11, color: '#6a6d70', padding: [0, 0, 0, 20] },
      axisLine: { show: false }, 
      splitLine: { lineStyle: { color: '#f2f2f2' } },
      axisLabel: { fontSize: 11, color: '#6a6d70' }
    },
    series: [
      {
        name: '实测损耗率',
        data: MOCK_VENDORS.map(v => ({ 
          value: (v.lossRate * 100).toFixed(2), 
          itemStyle: { 
            color: v.lossRate > 0.01 ? '#bb0000' : '#0064d9',
            borderRadius: [2, 2, 0, 0]
          } 
        })),
        type: 'bar',
        barWidth: '30%'
      }
    ]
  };

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-green-500">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">供应商生命周期管理</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200">运行中</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              供应商治理与信用风控中心
              <ShieldCheck className="w-6 h-6 text-[#0064d9]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAntiCollusion}
              className="px-4 py-1.5 bg-[#0064d9] text-white rounded text-sm font-semibold hover:bg-[#0054b4] shadow-sm transition-all"
            >
              防围标分析报告
            </button>
            <button 
              onClick={handleSyncCredit}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#0064d9] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all"
            >
              同步信用评级
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">活跃供应商总数</div>
            <div className="text-xl font-light text-[#1d2d3e]">1,284 <span className="text-xs font-bold text-green-600 ml-1">↑ 2.4%</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">平均信用分</div>
            <div className="text-xl font-light text-[#1d2d3e]">88.5 <span className="text-xs font-bold text-blue-600 ml-1">良好</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">围标风险预警</div>
            <div className="text-xl font-light text-[#bb0000]">12 <span className="text-xs font-bold ml-1">需关注</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">准入通过率</div>
            <div className="text-xl font-light text-[#1d2d3e]">76.2%</div>
          </div>
        </div>
      </div>

      {/* Anchor Navigation */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 sticky top-0 z-10 flex gap-8">
        {[
          { id: 'overview', label: '概览分析' },
          { id: 'matrix', label: '供应商矩阵' },
          { id: 'risk', label: '合规与风险' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={cn(
              "py-3 text-sm font-medium border-b-2 transition-all",
              activeSection === tab.id 
                ? "border-[#0064d9] text-[#0064d9]" 
                : "border-transparent text-[#6a6d70] hover:text-[#1d2d3e]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8 space-y-8">
        {/* Section: Matrix */}
        <section id="matrix" className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9]">
          <div className="px-6 py-4 border-b border-[#f2f2f2] flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#1d2d3e]">供应商分级评价矩阵</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#89919a]" />
                <input 
                  type="text" 
                  placeholder="搜索供应商..." 
                  className="pl-9 pr-4 py-1.5 bg-[#f5f6f7] border border-[#d9d9d9] rounded text-xs focus:ring-1 focus:ring-[#0064d9] outline-none w-64"
                />
              </div>
              <button className="p-2 hover:bg-[#f5f6f7] rounded">
                <Filter className="w-4 h-4 text-[#6a6d70]" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f6f7]">
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">供应商基本信息</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">信用评级</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">实测损耗率</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">围标风险</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">履约率</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-right">交易状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {MOCK_VENDORS.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-[#f5f6f7]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded flex items-center justify-center font-bold text-xs",
                          vendor.isBlacklisted ? "bg-red-50 text-red-700 border border-red-100" : "bg-blue-50 text-[#0064d9] border border-blue-100"
                        )}>
                          {vendor.vendorName.substring(0, 1)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1d2d3e] flex items-center gap-1">
                            {vendor.vendorName}
                            {vendor.collusionRiskScore > 0.5 && <AlertTriangle className="w-3.5 h-3.5 text-[#bb0000]" />}
                          </div>
                          <div className="text-[11px] text-[#6a6d70]">ID: {vendor.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < vendor.starRating ? "text-[#e9730c] fill-[#e9730c]" : "text-[#d9d9d9]")} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "text-sm font-medium",
                        vendor.lossRate > 0.01 ? "text-[#bb0000]" : "text-[#107e3e]"
                      )}>
                        {(vendor.lossRate * 100).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#6a6d70]">风险概率</span>
                          <span className={cn(
                            "font-bold",
                            vendor.collusionRiskScore > 0.5 ? "text-[#bb0000]" : "text-[#107e3e]"
                          )}>{(vendor.collusionRiskScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-[#f2f2f2] h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              vendor.collusionRiskScore > 0.5 ? "bg-[#bb0000]" : "bg-[#107e3e]"
                            )} 
                            style={{ width: `${vendor.collusionRiskScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#1d2d3e]">{(vendor.fulfillmentRate * 100).toFixed(1)}%</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {vendor.isBlacklisted ? (
                          <span className="px-2 py-0.5 rounded bg-red-50 text-[#bb0000] text-[10px] font-bold border border-red-100">
                            已封杀
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-green-50 text-[#107e3e] text-[10px] font-bold border border-green-100">
                            活跃
                          </span>
                        )}
                        <button className="p-1 hover:bg-[#f5f6f7] rounded text-[#6a6d70]">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Analysis */}
        <div className="grid grid-cols-2 gap-8">
          <section className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9] p-6">
            <h3 className="text-base font-semibold text-[#1d2d3e] mb-6">供应商损耗率回归分析</h3>
            <div className="h-[300px]">
              <ReactECharts option={vendorLossOption} style={{ height: '100%' }} />
            </div>
          </section>

          <section className="sap-section-card bg-[#1d2d3e] rounded shadow-sm border border-[#1d2d3e] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                防围标引擎 (Anti-Collusion Engine)
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <div className="text-xs text-slate-400 mb-2 uppercase tracking-widest">实时监测状态</div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>网络关系挖掘</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full">
                        <div className="bg-blue-400 h-full w-[98%]"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>标书指纹重合度</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full">
                        <div className="bg-green-400 h-full w-[12%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded">
                    <div className="text-2xl font-light">3.2%</div>
                    <div className="text-[10px] text-slate-400 uppercase">历史异常命中率</div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded">
                    <div className="text-2xl font-light text-yellow-400">12</div>
                    <div className="text-[10px] text-slate-400 uppercase">高风险实体库</div>
                  </div>
                </div>
                <button 
                  onClick={handleDeepScan}
                  disabled={isScanning}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-all disabled:opacity-50"
                >
                  {isScanning ? "正在扫描..." : "启动深度穿透扫描"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
