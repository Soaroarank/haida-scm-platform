"use client";

import React, { useState } from "react";
import { 
  Warehouse, 
  Database, 
  BarChart3, 
  ArrowRightLeft, 
  ShieldAlert, 
  Settings2,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Box,
  Layers,
  ArrowRight,
  RotateCcw,
  FileCheck,
  ClipboardList,
  Factory,
  ArrowLeftRight,
  Calculator,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_WAREHOUSES, MOCK_PLANT_STOCK_DETAILS } from "@/lib/mock-data";
import ReactECharts from "echarts-for-react";

export default function InventoryManagementPage() {
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(MOCK_WAREHOUSES[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'regional'>('overview');
  const [categoryFilter, setCategoryFilter] = useState<'all' | '原料' | '成品' | '添加剂'>('all');

  const filteredWarehouses = MOCK_WAREHOUSES.filter(w => 
    categoryFilter === 'all' || w.category === categoryFilter
  );

  const handleSyncVirtual = () => {
    setShowNotification("正在同步虚拟仓位与期货账户头寸...");
    setTimeout(() => {
      setShowNotification("同步完成：虚拟仓数据已更新，套保匹配率 95%。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleRunReconciliation = () => {
    setShowNotification("正在启动期现对账引擎，校验实物库存与点价合同...");
    setTimeout(() => {
      setShowNotification("对账完成：未发现账实偏差。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const handleTransfer = () => {
    setShowNotification("正在启动区域内厂区调拨指令，计算最佳运距与配额...");
    setTimeout(() => {
      setShowNotification("调拨建议已生成：建议从南通港调运 500吨 豆粕至荆州海大。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleStocktake = () => {
    setShowNotification("正在下发仓库数字化盘点指令，触发无人机/视觉对碰...");
    setTimeout(() => {
      setShowNotification("盘点已启动：南通港核心仓正在执行实时库容校验。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleThreeWayMatch = () => {
    setShowNotification("正在执行财务三单匹配 (PO/GR/IR) 深度对碰审计...");
    setTimeout(() => {
      setShowNotification("匹配完成：本周已完成 128 笔入库匹配，3 笔存在偏差已标记。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const inventoryOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['实物库存', '虚拟头寸'], textStyle: { color: '#666' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', axisLine: { show: false } },
    yAxis: { type: 'category', data: MOCK_WAREHOUSES.map(w => w.name), axisLine: { show: false } },
    series: [
      {
        name: '实物库存',
        type: 'bar',
        stack: 'total',
        data: MOCK_WAREHOUSES.map(w => w.currentStock),
        itemStyle: { color: '#0064d2' }
      },
      {
        name: '虚拟头寸',
        type: 'bar',
        stack: 'total',
        data: MOCK_WAREHOUSES.map(w => w.virtualStock),
        itemStyle: { color: '#8ecae6' }
      }
    ]
  };

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <Box className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">库存管理与期现匹配</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">全库联网</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              实物仓与虚拟仓可视化看板
              <Warehouse className="w-6 h-6 text-[#0064d2]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleTransfer}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              厂区间调拨
            </button>
            <button 
              onClick={handleStocktake}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#1d2d3e] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              数字化盘点
            </button>
            <button 
              onClick={handleSyncVirtual}
              className="sap-button-primary flex items-center gap-2"
            >
              <ArrowRightLeft className="w-4 h-4" />
              同步虚拟仓位
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
          <div className="space-y-1">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">全系统实物总库存</div>
            <div className="text-2xl font-light text-[#1d2d3e]">
              {MOCK_WAREHOUSES.reduce((acc, w) => acc + w.currentStock, 0).toLocaleString()} <span className="text-sm font-normal text-[#6a6d70]">吨</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              环比上周 +5.2%
            </div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">今日累计收货 (Receipts)</div>
            <div className="text-2xl font-light text-blue-600">
              {MOCK_WAREHOUSES.reduce((acc, w) => acc + w.receiptsToday, 0).toLocaleString()} <span className="text-sm font-normal text-[#6a6d70]">吨</span>
            </div>
            <div className="text-[10px] text-blue-500 font-bold">涉及 12 笔入库单</div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">今日累计发货 (Issues)</div>
            <div className="text-2xl font-light text-orange-600">
              {MOCK_WAREHOUSES.reduce((acc, w) => acc + w.issuesToday, 0).toLocaleString()} <span className="text-sm font-normal text-[#6a6d70]">吨</span>
            </div>
            <div className="text-[10px] text-orange-500 font-bold">涉及 45 笔出库单</div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">虚拟仓套保头寸</div>
            <div className="text-2xl font-light text-purple-600">
              {MOCK_WAREHOUSES.reduce((acc, w) => acc + w.virtualStock, 0).toLocaleString()} <span className="text-sm font-normal text-[#6a6d70]">吨</span>
            </div>
            <div className="text-[10px] text-purple-500 font-bold">覆盖率: 92.5%</div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">期现账实偏差</div>
            <div className="text-2xl font-light text-emerald-600">0.00 <span className="text-sm font-normal text-[#6a6d70]">吨</span></div>
            <div className="text-[10px] text-emerald-500 font-bold uppercase">对账已完成</div>
          </div>
        </div>
      </div>

      {/* Anchor Navigation */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 sticky top-0 z-10 flex gap-8">
        {[
          { id: 'overview', label: '总库资产看板 (收发存)' },
          { id: 'regional', label: '区域/厂区库存状态' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "py-3 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id 
                ? "border-[#0064d2] text-[#0064d2]" 
                : "border-transparent text-[#6a6d70] hover:text-[#1d2d3e]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="p-6 space-y-6">
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-3 gap-6">
            {/* Warehouse List */}
            <section className="col-span-2 sap-section-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-[#1d2d3e] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#0064d2]" />
                  收发存实时明细 (Daily Movements)
                </h3>
                <div className="flex gap-2">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as any)}
                    className="sap-input text-xs font-bold py-1 h-8"
                  >
                    <option value="all">所有分类</option>
                    <option value="原料">原料库存</option>
                    <option value="成品">成品库存</option>
                    <option value="添加剂">添加剂库存</option>
                  </select>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6d70]" />
                    <input type="text" placeholder="搜索仓库..." className="sap-input pl-9 w-48 h-8 text-xs" />
                  </div>
                  <button 
                    onClick={handleRunReconciliation}
                    className="px-3 py-1 bg-white border border-[#d9d9d9] text-[#0064d2] rounded text-xs font-bold hover:bg-[#f5f6f7] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    期现对账
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="sap-table">
                  <thead>
                    <tr>
                      <th>仓库名称</th>
                      <th>物理仓位</th>
                      <th>期初库存</th>
                      <th className="text-blue-600">今日收货 (+)</th>
                      <th className="text-orange-600">今日发货 (-)</th>
                      <th>当前结存</th>
                      <th>虚拟头寸</th>
                      <th className="text-right">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWarehouses.map(w => (
                      <tr 
                        key={w.id} 
                        className={cn("hover:bg-blue-50/30", selectedWarehouse.id === w.id && "bg-blue-50/50 border-l-2 border-l-[#0064d2]")}
                        onClick={() => setSelectedWarehouse(w)}
                      >
                        <td className="font-bold text-[#0064d2]">
                          <div className="flex flex-col">
                            <span>{w.name}</span>
                            <span className="text-[9px] text-gray-400 font-normal uppercase tracking-tighter">{w.commodity}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-[9px] font-bold border",
                              w.physicalStorage.type === '筒仓' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                              w.physicalStorage.type === '料仓' ? "bg-amber-50 text-amber-700 border-amber-100" :
                              w.physicalStorage.type === '平房仓' ? "bg-slate-50 text-slate-700 border-slate-100" :
                              "bg-rose-50 text-rose-700 border-rose-100"
                            )}>
                              {w.physicalStorage.type}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">{w.physicalStorage.code}</span>
                          </div>
                        </td>
                        <td className="text-gray-500">{w.openingBalance.toLocaleString()}</td>
                        <td className="font-bold text-blue-600">+{w.receiptsToday.toLocaleString()}</td>
                        <td className="font-bold text-orange-600">-{w.issuesToday.toLocaleString()}</td>
                        <td className="font-bold">{w.currentStock.toLocaleString()}</td>
                        <td className={cn("font-bold", w.virtualStock > 0 ? "text-blue-500" : w.virtualStock < 0 ? "text-red-500" : "text-gray-400")}>
                          {w.virtualStock.toLocaleString()}
                        </td>
                        <td className="text-right">
                          <span className={cn(
                            "text-[10px] font-bold uppercase",
                            w.status === '正常' || w.status === '活跃' ? "text-emerald-600" : "text-orange-600"
                          )}>
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Physical Visualization Panel */}
            <section className="sap-section-card flex flex-col">
              <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0064d2]" />
                物理仓位实时可视化 (Silos & Bins)
              </h3>
              
              <div className="flex-1 space-y-8">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-32 h-48 bg-gray-100 border-2 border-gray-300 rounded-t-lg rounded-b-3xl overflow-hidden shadow-inner">
                    <div 
                      className={cn(
                        "absolute bottom-0 w-full transition-all duration-1000 ease-in-out",
                        selectedWarehouse.utilization > 0.9 ? "bg-red-400" : 
                        selectedWarehouse.utilization > 0.7 ? "bg-orange-400" : "bg-blue-400"
                      )}
                      style={{ height: `${selectedWarehouse.utilization * 100}%` }}
                    >
                      <div className="absolute top-0 w-full h-2 bg-white/20 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white mix-blend-difference font-bold">
                      <div className="text-2xl">{(selectedWarehouse.utilization * 100).toFixed(0)}%</div>
                      <div className="text-[10px] uppercase">{selectedWarehouse.physicalStorage.type}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-sm font-bold text-gray-900">{selectedWarehouse.physicalStorage.code}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{selectedWarehouse.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-[9px] text-gray-500 font-bold uppercase mb-1">仓内温度</div>
                    <div className="text-lg font-light text-gray-900">{selectedWarehouse.physicalStorage.temperature || '--'} <span className="text-xs">°C</span></div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-[9px] text-gray-500 font-bold uppercase mb-1">仓内湿度</div>
                    <div className="text-lg font-light text-gray-900">{selectedWarehouse.physicalStorage.humidity || '--'} <span className="text-xs">%</span></div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="text-[10px] text-blue-600 font-bold uppercase mb-2">传感器诊断</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-blue-800 font-medium">IoT 物位计在线，数据刷新于 2分钟前</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {/* Regional Plant List */}
            <section className="col-span-2 sap-section-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-[#1d2d3e] flex items-center gap-2">
                  <Factory className="w-5 h-5 text-[#0064d2]" />
                  区域及厂区库存状态明细
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleThreeWayMatch}
                    className="px-3 py-1 bg-blue-50 text-[#0064d2] border border-blue-200 rounded text-xs font-bold hover:bg-blue-100 flex items-center gap-1"
                  >
                    <FileCheck className="w-3 h-3" />
                    三单匹配对碰
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="sap-table">
                  <thead>
                    <tr>
                      <th>大区</th>
                      <th>厂区名称</th>
                      <th>实物库存 (吨)</th>
                      <th>安全天数 (DOH)</th>
                      <th>库存状态</th>
                      <th className="text-center">三单匹配 (PO/GR/IR)</th>
                      <th className="text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PLANT_STOCK_DETAILS.map(p => (
                      <tr key={p.plantId} className="hover:bg-blue-50/30">
                        <td className="text-xs text-gray-500 font-medium">{p.region}</td>
                        <td className="font-bold text-[#1d2d3e]">{p.plantName}</td>
                        <td className="font-bold">{p.stock.toLocaleString()}</td>
                        <td>
                          <span className={cn(
                            "text-xs font-bold",
                            p.doh < 3 ? "text-red-600" : "text-emerald-600"
                          )}>
                            {p.doh} 天
                          </span>
                        </td>
                        <td>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold",
                            p.status === '正常' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          )}>
                            {p.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div title="PO: 采购订单" className={cn("w-2 h-2 rounded-full", p.matchingStatus.poMatched ? "bg-emerald-500" : "bg-gray-300")} />
                            <div title="GR: 入库单" className={cn("w-2 h-2 rounded-full", p.matchingStatus.grMatched ? "bg-emerald-500" : "bg-gray-300")} />
                            <div title="IR: 发票匹配" className={cn("w-2 h-2 rounded-full", p.matchingStatus.invoiceMatched ? "bg-emerald-500" : "bg-red-500")} />
                          </div>
                        </td>
                        <td className="text-right">
                          <button className="p-1 hover:bg-blue-50 rounded text-[#0064d2]">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Financial Match Summary */}
            <section className="sap-section-card">
              <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#0064d2]" />
                财务三单匹配看板
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-[#d9d9d9]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-500 uppercase">匹配健康度</span>
                    <span className="text-emerald-600 font-bold">98.5%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[98.5%]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-red-700">异常单据预警</div>
                      <p className="text-[10px] text-red-600 mt-1 leading-relaxed">
                        荆州海大 3 笔入库单 (GR) 与 供应商发票 (IR) 金额偏差超过 0.5%，已自动挂起付款申请。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-blue-700">自动对碰建议</div>
                      <p className="text-[10px] text-blue-600 mt-1 leading-relaxed">
                        系统识别到 15 笔未到票入库单已满足暂估入账条件，建议执行批量暂估操作。
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleThreeWayMatch}
                  className="w-full sap-button-primary flex items-center justify-center gap-2 mt-4"
                >
                  <Calculator className="w-4 h-4" />
                  执行深度对碰审计
                </button>
              </div>
            </section>
          </div>
        )}

        <div className="grid grid-cols-4 gap-6">
          <div className="sap-section-card bg-[#1d2d3e] text-white border-none">
            <div className="flex justify-between items-start mb-4">
              <Layers className="w-5 h-5 text-blue-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-xs text-slate-400 uppercase font-bold mb-1">点价合同匹配实物</div>
            <div className="text-xl font-light">12,450.00 <span className="text-xs text-slate-500">吨</span></div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px]">
              <span className="text-slate-500 italic">待分配实物仓: 2,100吨</span>
              <span className="text-blue-400 font-bold underline cursor-pointer">立即分配</span>
            </div>
          </div>

          <div className="sap-section-card border-l-4 border-l-orange-500">
            <div className="flex justify-between items-start mb-4">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">预警</span>
            </div>
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">库容溢出风险点</div>
            <div className="text-xl font-light text-gray-900">1 <span className="text-xs text-gray-400">处</span></div>
            <div className="mt-4 text-[10px] text-gray-500">
              武汉阳逻中转仓 (玉米)
            </div>
          </div>

          <div className="sap-section-card">
            <div className="text-xs text-gray-500 uppercase font-bold mb-2">在途库存 (水运/陆运)</div>
            <div className="text-xl font-light text-[#1d2d3e]">8,200.00 <span className="text-xs text-gray-400">吨</span></div>
            <div className="mt-6 flex gap-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[70%] bg-blue-500" />
              <div className="w-[30%] bg-blue-300" />
            </div>
            <div className="mt-2 flex justify-between text-[9px] font-bold uppercase">
              <span className="text-blue-600">水运 (70%)</span>
              <span className="text-blue-400">陆运 (30%)</span>
            </div>
          </div>

          <div className="sap-section-card flex flex-col justify-center items-center gap-3 border-dashed border-2 hover:bg-gray-50 transition-all cursor-pointer">
            <div className="p-3 bg-blue-50 rounded-full">
              <Plus className="w-6 h-6 text-[#0064d2]" />
            </div>
            <span className="text-xs font-bold text-[#0064d2] uppercase tracking-widest">新增仓库/虚拟库</span>
          </div>
        </div>
      </div>
    </div>
  );
}
