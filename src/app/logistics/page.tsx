"use client"

import React, { useState } from "react";
import { MOCK_SHIPMENTS, MOCK_WAR_ROOM } from "@/lib/mock-data";
import { 
  Ship, 
  Truck, 
  Map as MapIcon, 
  Navigation, 
  AlertTriangle, 
  Anchor,
  Clock,
  ExternalLink,
  RefreshCcw,
  Search,
  Activity,
  Layers,
  ArrowRight,
  Zap,
  Waves,
  ChevronRight,
  Plus,
  Download,
  Filter,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function LogisticsObjectPage() {
  const [selectedShipment, setSelectedShipment] = useState(MOCK_SHIPMENTS[0]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handlePathOptimization = () => {
    setShowNotification("正在基于长江水位与实时路况优化多式联运路径...");
    setTimeout(() => {
      setShowNotification("优化完成：已为 12 艘在途船舶推荐了避让枯水期的转运方案。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const handlePortScheduling = () => {
    setShowNotification("正在执行一键转港调度，协调码头泊位与卸货资源...");
    setTimeout(() => {
      setShowNotification("调度成功：江海远航 008 已重新分配至阳逻港 03 号泊位。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleEmergencyOffload = () => {
    setShowNotification("已触发紧急减载/驳船调度指令，正在通知周边协作船队...");
    setTimeout(() => {
      setShowNotification("指令下发成功：3 艘驳船已响应并前往支援。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleScanReturnLogistics = () => {
    setShowNotification("正在扫描周边可用返程货源，撮合空驶车辆...");
    setTimeout(() => {
      setShowNotification("扫描完成：发现 5 处匹配货源，预计可降低空驶率 15%。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const handleRunAudit = () => {
    setShowNotification("正在运行实时运距与运效核算审计...");
    setTimeout(() => {
      setShowNotification("审计完成：识别出 2 处路径效能异常，已生成改进建议。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-[#f0f2f5] dark:bg-[#12171c] relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <Ship className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Object Header */}
      <div className="sap-object-header">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-[#0064d2] dark:text-blue-400">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">多式联运调度塔</h1>
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">实时追踪中</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">船运、陆运全链路可视化监控及滞期费动态预警。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handlePathOptimization}
              className="sap-button-primary flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>智能路径优化</span>
            </button>
            <button 
              onClick={handlePortScheduling}
              className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2"
            >
              <Anchor className="w-4 h-4" />
              <span>一键转港调度</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">在途海轮</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">18 <span className="text-sm font-normal text-gray-400">艘</span></div>
            <div className="flex items-center text-xs text-red-500">
              <AlertTriangle className="w-3 h-3 mr-1" /> 2 艘由于枯水延迟
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">陆运车队活跃度</div>
            <div className="text-2xl font-light text-emerald-600">1,250 <span className="text-sm font-normal text-gray-400">辆</span></div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">运力利用率: 88.5%</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">当日预计滞期费</div>
            <div className="text-2xl font-light text-red-600">¥128,500.00</div>
            <div className="text-[10px] text-gray-400 font-bold tracking-tighter">较昨日上涨 +18.5%</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">长江水位监控 (汉口)</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">13.5 <span className="text-sm font-normal text-gray-400">m</span></div>
            <div className="text-[10px] text-orange-600 font-bold uppercase animate-pulse">预警: 接近吃水极限</div>
          </div>
        </div>
      </div>

      {/* SAP Page Sections */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="flex space-x-4 h-full min-h-0">
          {/* Shipment Queue Section */}
          <div className="flex-[2] flex flex-col space-y-4 min-w-0">
            <div className="sap-section-card flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-blue-500" />
                  在途运单监控队列
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="搜索船名/车牌..." className="sap-input pl-9 w-64" />
                  </div>
                  <button className="sap-button-ghost p-2"><Filter className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="sap-table">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th>任务编号</th>
                      <th>模式</th>
                      <th>运力标识</th>
                      <th>承运商</th>
                      <th>路线 (起 {'->'} 终)</th>
                      <th>载重 (吨)</th>
                      <th>状态</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_SHIPMENTS.map((ship) => (
                      <tr 
                        key={ship.id} 
                        onClick={() => setSelectedShipment(ship)}
                        className={cn(
                          selectedShipment.id === ship.id ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                        )}
                      >
                        <td className="font-bold text-[#0064d2]">{ship.shipmentNo}</td>
                        <td className="text-gray-500">
                          {ship.mode === '水运' ? <Ship className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                        </td>
                        <td className="font-bold text-gray-900 dark:text-white">{ship.vesselName || ship.licensePlate}</td>
                        <td className="text-gray-600">{ship.carrierName}</td>
                        <td className="text-gray-500 italic">
                          {ship.origin} <ArrowRight className="w-3 h-3 inline mx-1" /> {ship.destination}
                        </td>
                        <td className="font-bold">{ship.loadWeight}</td>
                        <td>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            ship.status === '运输中' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                          )}>
                            {ship.status}
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

            <div className="sap-section-card h-64">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">水文预警与吃水限制监控</h3>
              <div className="grid grid-cols-3 gap-6">
                {MOCK_WAR_ROOM.riverWaterLevels.map(level => (
                  <div key={level.location} className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-600">{level.location} 段水位</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded",
                        level.trend === '下降' ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      )}>{level.trend}</span>
                    </div>
                    <div className="text-2xl font-light text-gray-900 dark:text-white">
                      {level.level} <span className="text-sm font-normal text-gray-400">m</span>
                    </div>
                    <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full",
                        level.level < level.threshold ? "bg-orange-500" : "bg-blue-500"
                      )} style={{ width: `${(level.level / level.threshold) * 80}%` }} />
                    </div>
                    <div className="mt-1 text-[10px] text-gray-400 uppercase">阈值: {level.threshold}m</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="w-[400px] flex flex-col space-y-4">
            {/* Demurrage Monitor */}
            <div className="sap-section-card bg-[#354a5f] text-white">
              <h3 className="text-sm font-bold mb-6 uppercase tracking-wider text-red-400 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                滞期费天眼监控 (关键风险)
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">当日累计损失</div>
                    <div className="text-3xl font-light text-red-400 mt-1">¥128,500.00</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-red-400 flex items-center justify-end">
                      <TrendingUp className="w-3 h-3 mr-1" /> +18.5%
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: '江海远航 008', location: '阳逻港', cost: '¥15,000/日' },
                    { name: '长航 701', location: '南通枢纽', cost: '¥12,000/日' }
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold text-gray-300">{item.name}</div>
                        <div className="text-[9px] text-gray-500 italic">{item.location}</div>
                      </div>
                      <div className="text-xs font-bold text-red-400">{item.cost}</div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleEmergencyOffload}
                  className="w-full sap-button-primary bg-red-600 hover:bg-red-700 flex items-center justify-center space-x-2 shadow-lg shadow-red-900/20"
                >
                  <Zap className="w-4 h-4" />
                  <span>触发紧急减载/驳船调度</span>
                </button>
              </div>
            </div>

            {/* Reverse Logistics */}
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center text-emerald-600">
                <RefreshCcw className="w-4 h-4 mr-2" />
                返程物流撮合中心
              </h3>
              <p className="text-[10px] text-gray-400 leading-relaxed italic mb-6">
                整合出厂成品料及周边返程货源，压降车辆空驶率，提升供应链综合效率。
              </p>
              
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">荆州 → 南通</div>
                    <span className="text-[9px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">匹配成功</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-3">物料品种: 鱼粉 / 核心预混料</div>
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-600">
                    <span>预计节省成本</span>
                    <span>¥2,400.00</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleScanReturnLogistics}
                  className="w-full py-2 border border-dashed border-emerald-300 text-emerald-600 rounded text-[10px] font-bold uppercase hover:bg-emerald-50 transition-all"
                >
                  扫描周边可用货源
                </button>
              </div>
            </div>

            {/* Efficiency Audit */}
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center">
                <MapIcon className="w-4 h-4 mr-2 text-[#0064d2]" />
                运输路径效能审计
              </h3>
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-dashed border-gray-200 dark:border-gray-800 py-2 space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                    <div className="text-[10px] font-bold text-[#0064d2] mb-1 uppercase">路径 A: 江海联运</div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                      <span>4.5 天</span>
                      <span>¥85.00/吨</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 opacity-60">
                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">路径 B: 铁水联运</div>
                    <div className="flex justify-between text-xs font-bold text-gray-400">
                      <span>2.0 天</span>
                      <span>¥145.00/吨</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleRunAudit}
                  className="w-full py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-[10px] font-bold uppercase hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  运行实时运距核算 <ArrowRight className="w-3 h-3 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
