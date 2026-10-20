"use client"

import React, { useState } from "react";
import { MOCK_PLANT_STOCKS } from "@/lib/mock-data";
import { allocateShortfall } from "@/lib/algorithms/allocation";
import { 
  Layers, 
  Zap, 
  AlertTriangle, 
  Activity, 
  Clock,
  Split,
  Target,
  ShieldAlert,
  ClipboardList,
  Cpu,
  History as HistoryIcon,
  Search,
  Filter,
  Settings2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MrpPlanningPage() {
  const [activeSection, setActiveSection] = useState('inventory');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleRunMRP = () => {
    setIsSimulating(true);
    setShowNotification("正在执行全局物料平衡模拟 (MRP Simulation)...");
    setTimeout(() => {
      setIsSimulating(false);
      setShowNotification("模拟完成：基于当前库存与消耗速率，已生成最佳调运与分配建议。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  const handlePublishOrders = () => {
    setShowNotification("正在向 36 家工厂下发生产任务与物料调拨指令...");
    setTimeout(() => {
      setShowNotification("发布成功：生产订单已同步至各工厂 ERP 系统。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleOEMRedistribution = () => {
    setShowNotification("正在根据当前产能受损情况，启动全局 OEM 产能重分配...");
    setTimeout(() => {
      setShowNotification("重分配完成：已将 1,200吨 缺口成功转移至荆州/潜江 OEM 厂。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };

  // 使用 MCDA 分配算法
  const requirements = MOCK_PLANT_STOCKS.map(p => ({
    plantId: p.plantId,
    plantName: p.plantName,
    margin: 0.15,
    penalty: p.status === '库存告急' ? 500 : 100,
    criticality: p.status === '库存告急' ? 0.9 : 0.5,
    shortfall: Math.max(0, p.safetyStock - p.currentStock)
  }));

  const allocationResults = allocateShortfall(requirements, 5000);

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">生产计划与物料需求计划 (MRP)</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full border border-green-200">系统就绪</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              多工厂生产计划与资源分配
              <Layers className="w-6 h-6 text-[#0064d9]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRunMRP}
              disabled={isSimulating}
              className="px-4 py-1.5 bg-[#0064d9] text-white rounded text-sm font-semibold hover:bg-[#0054b4] shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className={cn("w-4 h-4", isSimulating && "animate-spin")} />
              {isSimulating ? "模拟中..." : "执行 MRP 模拟"}
            </button>
            <button 
              onClick={handlePublishOrders}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#0064d9] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all"
            >
              发布生产订单
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">总日产能力</div>
            <div className="text-xl font-light text-[#1d2d3e]">4,500.00 吨 <span className="text-xs font-bold text-green-600 ml-1">负载 88%</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">缺料工厂数</div>
            <div className="text-xl font-light text-[#bb0000]">04 <span className="text-xs font-bold ml-1">需关注</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">代工(OEM)活跃产能</div>
            <div className="text-xl font-light text-[#1d2d3e]">1,800.00 吨</div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">计划达成率</div>
            <div className="text-xl font-light text-[#107e3e]">99.2%</div>
          </div>
        </div>
      </div>

      {/* Anchor Navigation */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 sticky top-0 z-10 flex gap-8">
        {[
          { id: 'inventory', label: '库存与平衡矩阵' },
          { id: 'oem', label: 'OEM 分配控制' },
          { id: 'mitigation', label: '应急响应中心' }
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
        <section id="inventory" className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9]">
          <div className="px-6 py-4 border-b border-[#f2f2f2] flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#1d2d3e]">跨区域物料平衡矩阵</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#89919a]" />
                <input 
                  type="text" 
                  placeholder="搜索工厂..." 
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
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">工厂名称</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">物料</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">现有库存 (T)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">安全库存 (T)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">日消耗 (T/D)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">分配数量 (T)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-right">预警状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {MOCK_PLANT_STOCKS.map(p => {
                  const allocation = allocationResults.find(a => a.plantId === p.plantId);
                  return (
                    <tr key={p.plantId} className="hover:bg-[#f5f6f7]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-[#1d2d3e]">{p.plantName}</div>
                        <div className="text-[11px] text-[#6a6d70]">ID: {p.plantId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#1d2d3e]">{p.commodity}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {p.currentStock.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-[#6a6d70]">
                        {p.safetyStock.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-[#6a6d70]">
                        {p.dailyConsumption}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm font-bold text-[#0064d9]">
                          {allocation ? allocation.allocatedQuantity.toLocaleString() : '0'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 bg-[#f2f2f2] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full transition-all duration-1000",
                                p.status === '库存告急' ? "bg-[#bb0000]" : 
                                p.status === '库存偏低' ? "bg-[#e9730c]" : "bg-[#107e3e]"
                              )} 
                              style={{ width: `${Math.min(100, (p.currentStock / p.safetyStock) * 100)}%` }}
                            />
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold min-w-[50px]",
                            p.status === '库存告急' ? "text-[#bb0000]" : 
                            p.status === '库存偏低' ? "text-[#e9730c]" : "text-[#107e3e]"
                          )}>
                            {p.daysRemaining} 天
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Analysis & Mitigation */}
        <div className="grid grid-cols-2 gap-8">
          <section className="sap-section-card bg-[#1d2d3e] rounded shadow-sm border border-[#1d2d3e] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldAlert className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                应急减灾与资源重分配
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <div className="text-xs text-red-400 font-bold mb-2">湖北海大一厂 - 产能受限预警</div>
                  <div className="text-xs text-slate-400 leading-relaxed mb-4">
                    状态: <span className="text-white">部分停机</span> | 预计影响时长: <span className="text-white">72 小时</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">受影响产量</div>
                      <div className="text-xl font-light text-red-500">1,200 T/D</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase">车队已分流</div>
                      <div className="text-xl font-light text-blue-400">45 辆</div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleOEMRedistribution}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-all flex items-center justify-center gap-2"
                >
                  <Split className="w-4 h-4" />
                  启动全局 OEM 产能重分配
                </button>
              </div>
            </div>
          </section>

          <section className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9] p-6">
            <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0064d9]" />
              OEM 协同控制台
            </h3>
            <div className="space-y-4">
              {[
                { name: '荆州海大 (OEM)', split: '800 T', match: '98%', status: 'active' },
                { name: '潜江海大 (OEM)', split: '400 T', match: '95%', status: 'standby' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[#f5f6f7] border border-[#d9d9d9] rounded group hover:border-[#0064d9] transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-semibold text-[#1d2d3e]">{item.name}</div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      item.status === 'active' ? "bg-green-100 text-[#107e3e]" : "bg-slate-200 text-[#6a6d70]"
                    )}>
                      {item.status === 'active' ? '运行中' : '待命'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#6a6d70]">
                    <span>分配额度: <span className="text-[#1d2d3e] font-bold">{item.split}</span></span>
                    <span>配方匹配度: <span className="text-[#107e3e] font-bold">{item.match}</span></span>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#6a6d70]">物料覆盖率 (Safety Buffer)</span>
                  <span className="text-[#0064d9] font-bold">92.5%</span>
                </div>
                <div className="w-full bg-[#f2f2f2] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0064d9] h-full w-[92.5%] shadow-sm" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
