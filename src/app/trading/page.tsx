"use client"

import React, { useState } from "react";
import { MOCK_CONTRACTS } from "@/lib/mock-data";
import { 
  Plus, 
  Filter, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ChevronRight,
  Search,
  Activity,
  ShieldCheck,
  Calculator,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function TradingObjectPage() {
  const [selectedContract, setSelectedContract] = useState(MOCK_CONTRACTS[0]);
  const [pricingQty, setPricingQty] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleExecute = () => {
    if (!pricingQty) return;
    setIsExecuting(true);
    setShowNotification(`正在执行点价指令：${pricingQty} 吨，合同 ${selectedContract.contractNo}...`);
    setTimeout(() => {
      setShowNotification(`点价执行成功：已在成交均价锁定 ${pricingQty} 吨头寸。`);
      setIsExecuting(false);
      setPricingQty("");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleNewContract = () => {
    setShowNotification("正在进入新建采购合同流程...");
    setTimeout(() => {
      setShowNotification("流程已启动：请在弹出窗口中完善供应商与基差条款。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1000);
  };

  const handleExportData = () => {
    setShowNotification("正在导出当前台账与头寸数据...");
    setTimeout(() => {
      setShowNotification("导出完成：文件已保存至本地下载目录。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  // SAP Fiori Horizon Chart Configuration
  const basisTrendOption = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#d9d9d9',
      textStyle: { color: '#333', fontSize: 12 }
    },
    legend: { 
      data: ['现货价', '期货价', '基差'], 
      textStyle: { color: '#666', fontSize: 12 },
      bottom: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['10-12', '10-13', '10-14', '10-15', '10-16', '10-17', '10-18', '10-19'],
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    yAxis: [
      { 
        type: 'value', 
        name: '价格 (元/吨)', 
        axisLine: { show: false }, 
        splitLine: { lineStyle: { color: '#eee' } },
        axisLabel: { color: '#666', fontSize: 11 }
      },
      { 
        type: 'value', 
        name: '基差', 
        axisLine: { show: false }, 
        splitLine: { show: false },
        axisLabel: { color: '#eab308', fontSize: 11 }
      }
    ],
    series: [
      { 
        name: '现货价', 
        type: 'line', 
        smooth: true,
        data: [3650, 3620, 3680, 3700, 3680, 3650, 3630, 3640], 
        itemStyle: { color: '#0064d2' },
        lineStyle: { width: 3 }
      },
      { 
        name: '期货价', 
        type: 'line', 
        smooth: true,
        data: [3450, 3440, 3480, 3500, 3490, 3470, 3450, 3460], 
        itemStyle: { color: '#888' },
        lineStyle: { width: 2, type: 'dashed' }
      },
      { 
        name: '基差', 
        type: 'bar', 
        yAxisIndex: 1, 
        data: [200, 180, 200, 200, 190, 180, 180, 180], 
        itemStyle: { color: 'rgba(234, 179, 8, 0.4)' },
        barWidth: '30%'
      }
    ]
  };

  return (
    <div className="flex flex-col bg-[#f0f2f5] dark:bg-[#12171c] relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Object Header */}
      <div className="sap-object-header">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-[#0064d2] dark:text-blue-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">大宗商品交易与基差管理</h1>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">运行中</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">原材料采购合同及价格风险套保全生命周期管理。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleNewContract}
              className="sap-button-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新建合同</span>
            </button>
            <button 
              onClick={handleExportData}
              className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>导出数据</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">待点价基差头寸</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">45,600.00 <span className="text-sm font-normal text-gray-400">吨</span></div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 比上期 +12.5%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">加权平均基差</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">+185.00 <span className="text-sm font-normal text-gray-400">元/吨</span></div>
            <div className="text-xs text-gray-400">市场区间: 150 - 220</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">主力合约 (M2609)</div>
            <div className="text-2xl font-light text-[#0064d2] dark:text-blue-400">3,425.00</div>
            <div className="flex items-center text-xs text-emerald-500">
              <ArrowDownRight className="w-3 h-3 mr-1" /> 日内跌幅 -0.8%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">套保有效性 (HE)</div>
            <div className="text-2xl font-light text-emerald-600 dark:text-emerald-400">91.2%</div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">符合合规要求</div>
          </div>
        </div>
      </div>

      {/* SAP Page Sections */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="flex space-x-4 h-full min-h-0">
          {/* Main List Section */}
          <div className="flex-[2] flex flex-col min-w-0">
            <div className="sap-section-card flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">合同台账</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="搜索合同编号..." 
                      className="sap-input pl-9 w-64"
                    />
                  </div>
                  <button className="sap-button-ghost p-2"><Filter className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="sap-table">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th>合同编号</th>
                      <th>供应商名称</th>
                      <th>品种</th>
                      <th>总数量 (吨)</th>
                      <th>基差值</th>
                      <th>状态</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_CONTRACTS.map((contract) => (
                      <tr 
                        key={contract.id} 
                        onClick={() => setSelectedContract(contract)}
                        className={cn(
                          selectedContract.id === contract.id ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                        )}
                      >
                        <td className="font-bold text-[#0064d2] dark:text-blue-400">{contract.contractNo}</td>
                        <td className="text-gray-700 dark:text-gray-300">{contract.vendorName}</td>
                        <td className="text-gray-600 dark:text-gray-400">{contract.commodity}</td>
                        <td className="font-medium text-gray-900 dark:text-white">{contract.totalQuantity.toLocaleString()}</td>
                        <td className="text-orange-600 dark:text-orange-400 font-bold">+{contract.basisValue}</td>
                        <td>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            contract.status === '执行中' || contract.status === '部分点价' 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          )}>
                            {contract.status === '执行中' || contract.status === '部分点价' ? '执行中' : '已结案'}
                          </span>
                        </td>
                        <td>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Details & Insights Sidebar */}
          <div className="flex-1 flex flex-col space-y-4 min-w-[400px]">
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider">基差趋势分析</h3>
              <div className="h-[200px]">
                <ReactECharts option={basisTrendOption} style={{ height: '100%' }} />
              </div>
            </div>

            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider">智能点价工作台</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">目标合同</span>
                    <span className="text-sm font-bold text-[#0064d2]">{selectedContract.contractNo}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">点价数量 (吨)</label>
                      <input 
                        type="number" 
                        value={pricingQty}
                        onChange={(e) => setPricingQty(e.target.value)}
                        placeholder="输入点价吨数..."
                        className="sap-input"
                      />
                    </div>
                    <button 
                      onClick={handleExecute}
                      disabled={isExecuting || !pricingQty}
                      className={cn(
                        "w-full py-2 rounded text-sm font-bold transition-all",
                        isExecuting || !pricingQty
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#0064d2] text-white hover:bg-[#005bb8]"
                      )}
                    >
                      {isExecuting ? "处理中..." : "执行点价"}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center">
                    <History className="w-3 h-3 mr-2" /> 最近点价记录
                  </h4>
                  <div className="space-y-2">
                    {[
                      { date: '10:45', qty: '2,000 吨', price: '3,428', status: '成功' },
                      { date: '09:12', qty: '1,500 吨', price: '3,415', status: '成功' }
                    ].map((exec, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors">
                        <span className="text-gray-500">{exec.date}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{exec.qty} @ {exec.price}</span>
                        <span className="text-emerald-600 font-bold">{exec.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider">风险监控指标</h3>
              <div className="space-y-4">
                {[
                  { label: 'Delta 敞口', value: '45.2%', status: '正常', icon: Activity },
                  { label: '套保比率', value: '91.2%', status: '最佳', icon: ShieldCheck },
                  { label: 'VAR 风险值 (95%)', value: '¥1.2M', status: '警告', icon: Calculator },
                ].map((risk, i) => (
                  <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <risk.icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{risk.label}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{risk.status}</div>
                      </div>
                    </div>
                    <div className="text-base font-bold text-gray-900 dark:text-white">{risk.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
