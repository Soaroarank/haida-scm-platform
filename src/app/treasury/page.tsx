"use client"

import React, { useState } from "react";
import { MOCK_TREASURY, MOCK_RISK_EXPOSURES } from "@/lib/mock-data";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldAlert, 
  BarChart3, 
  PieChart, 
  Zap, 
  Activity, 
  Lock, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Wallet,
  Scale,
  RefreshCcw,
  AlertCircle,
  Search,
  Filter,
  Settings2,
  MoreHorizontal
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function TreasuryPositionPage() {
  const [activeSection, setActiveSection] = useState('exposure');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setShowNotification("头寸数据已完成对账与重算");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleGenerateReport = () => {
    setShowNotification("正在生成财务月报，请稍候...");
    setTimeout(() => {
      setShowNotification("财务月报已成功导出至下载目录");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  // 综合头寸盈亏趋势图 - SAP Fiori Horizon Palette
  const positionTrendOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 },
      extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.15);'
    },
    grid: { top: 40, right: 20, bottom: 40, left: 60 },
    xAxis: { 
      type: 'category', 
      data: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      axisLine: { lineStyle: { color: '#89919a' } },
      axisLabel: { fontSize: 11, color: '#6a6d70' }
    },
    yAxis: { 
      type: 'value',
      name: '盈亏 (¥)',
      nameTextStyle: { fontSize: 11, color: '#6a6d70', padding: [0, 0, 0, 40] },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f2f2f2' } },
      axisLabel: { fontSize: 11, color: '#6a6d70' }
    },
    series: [
      {
        name: '豆粕 PnL',
        data: [120, 150, 180, 140, 210, 195],
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: '#0064d9' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(0,100,217,0.1)' }, { offset: 1, color: 'transparent' }]
          }
        }
      }
    ]
  };

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">头寸财务与管理会计</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">核算中心活跃</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              头寸财务与风险控制中枢
              <Scale className="w-6 h-6 text-[#0064d9]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-1.5 bg-[#0064d9] text-white rounded text-sm font-semibold hover:bg-[#0054b4] shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
              {isRefreshing ? "正在重算..." : "立即对账重算"}
            </button>
            <button 
              onClick={handleGenerateReport}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#0064d9] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all"
            >
              生成财务月报
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">现货总头寸</div>
            <div className="text-xl font-light text-[#1d2d3e]">125,400 吨 <span className="text-xs font-bold text-blue-600 ml-1">多头</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">今日浮动盈亏</div>
            <div className="text-xl font-light text-[#107e3e]">¥4,562,000 <span className="text-xs font-bold ml-1">↑ 1.2%</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">套保覆盖率</div>
            <div className="text-xl font-light text-[#1d2d3e]">93.5%</div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">风险价值 (VaR)</div>
            <div className="text-xl font-light text-[#bb0000]">¥8,240,000</div>
          </div>
        </div>
      </div>

      {/* Anchor Navigation */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 sticky top-0 z-10 flex gap-8">
        {[
          { id: 'exposure', label: '全口径头寸' },
          { id: 'mtp', label: '战区利润转移 (MTP)' },
          { id: 'audit', label: '审计与合规' }
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
        <section id="exposure" className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9]">
          <div className="px-6 py-4 border-b border-[#f2f2f2] flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#1d2d3e]">全口径头寸盈亏矩阵</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#89919a]" />
                <input 
                  type="text" 
                  placeholder="搜索品种..." 
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
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">品种名称</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">现货净头寸</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">期货保值量</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">敞口率</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-right">浮动盈亏 (PnL)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {MOCK_RISK_EXPOSURES.map((risk) => (
                  <tr key={risk.commodity} className="hover:bg-[#f5f6f7]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#0064d9] rounded-full" />
                        <div>
                          <div className="text-sm font-semibold text-[#1d2d3e]">{risk.commodity}</div>
                          <div className="text-[11px] text-[#6a6d70]">主力合约: DCE.{risk.commodity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#1d2d3e]">{risk.physicalPosition.toLocaleString()} MT</div>
                      <div className="w-24 bg-[#f2f2f2] h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-[#0064d9] h-full w-[70%]" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm font-bold text-[#0064d9]">{Math.abs(risk.futuresPosition).toLocaleString()} MT</div>
                      <div className="text-[10px] text-[#6a6d70]">保值率: {(risk.hedgeRatio * 100).toFixed(1)}%</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold border",
                        (1 - risk.hedgeRatio) > 0.1 ? "bg-red-50 text-[#bb0000] border-red-100" : "bg-green-50 text-[#107e3e] border-green-100"
                      )}>
                        {((1 - risk.hedgeRatio) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={cn(
                        "text-sm font-bold flex items-center justify-end gap-1",
                        risk.unrealizedPnl >= 0 ? "text-[#107e3e]" : "text-[#bb0000]"
                      )}>
                        {risk.unrealizedPnl >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {formatCurrency(risk.unrealizedPnl)}
                      </div>
                      <div className="text-[10px] text-[#6a6d70] italic">VaR: {formatCurrency(risk.varValue)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: MTP & Dynamics */}
        <div className="grid grid-cols-2 gap-8">
          <section className="sap-section-card bg-[#1d2d3e] rounded shadow-sm border border-[#1d2d3e] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Globe className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                战区管理利润转移 (MTP)
              </h3>
              <div className="space-y-6">
                {MOCK_TREASURY.map((region) => (
                  <div key={region.regionId} className="p-4 bg-white/5 border border-white/10 rounded flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{region.regionName}</div>
                      <div className="text-xl font-light">{formatCurrency(region.settlementProfit)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-500 uppercase">内部转移价</div>
                      <div className="text-sm font-bold text-blue-400">¥{region.internalTransferPrice}</div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowNotification("正在加载审计底稿与合规证据链...")}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-all flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  调阅内部审计底稿
                </button>
              </div>
            </div>
          </section>

          <section className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9] p-6">
            <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0064d9]" />
              全战区头寸动态
            </h3>
            <div className="h-[280px]">
              <ReactECharts option={positionTrendOption} style={{ height: '100%' }} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
