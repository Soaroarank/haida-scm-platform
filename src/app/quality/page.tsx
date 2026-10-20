"use client"

import React, { useState } from "react";
import { MOCK_SHIPMENTS } from "@/lib/mock-data";
import { 
  ClipboardCheck, 
  FlaskConical, 
  AlertTriangle,
  FileText,
  Scan,
  CheckCircle2,
  XCircle,
  Activity,
  Zap,
  Microscope,
  Thermometer,
  Droplets,
  ArrowRight,
  MoreHorizontal,
  Search,
  Filter,
  BarChart3,
  Dna,
  Settings2,
  FileSignature
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QualityControlPage() {
  const [activeSection, setActiveSection] = useState('tasks');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleSampleInspection = () => {
    setShowNotification("正在下发盲样送检指令至采样终端，已生成随机盲样编号...");
    setTimeout(() => {
      setShowNotification("指令下发成功：请前往采样点执行物理扦样。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleBenchmarkReport = () => {
    setShowNotification("正在生成化验对标分析报告，对比 NIR 与湿法化验结果...");
    setTimeout(() => {
      setShowNotification("报告已生成：本周设备偏差率维持在 0.2% 以内。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handlePriceModel = () => {
    setShowNotification("正在调阅霉变扣价算法模型 (CAS 24)...");
    setTimeout(() => {
      setShowNotification("模型已加载：当前基于库容压力执行 1.2x 惩罚系数。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleFullSpectrumScan = () => {
    setShowNotification("正在启动 NIR 全谱扫描分析，正在进行设备自校准...");
    setTimeout(() => {
      setShowNotification("分析完成：样品成分已实时同步至 MRP 决策引擎。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2500);
  };

  const qualityTasks = [
    { id: 'QX-99012', material: '豆粕 (43%)', status: 'WARNING', protein: 42.8, moisture: 13.5, mold: 1.8, priceAdj: -200, time: '12 分钟前' },
    { id: 'QX-99015', material: '东北二等玉米', status: 'PASS', protein: 8.5, moisture: 12.1, mold: 0.2, priceAdj: 0, time: '刚刚' },
    { id: 'QX-99018', material: '进口大麦', status: 'DANGER', protein: 11.2, moisture: 14.8, mold: 3.5, priceAdj: -450, time: '2小时前' }
  ];

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <Microscope className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">质量管理与实验室控制</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">化验室运行中</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              到货质检、扦样与让步入库协同
              <Microscope className="w-6 h-6 text-[#0064d9]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSampleInspection}
              className="px-4 py-1.5 bg-[#0064d9] text-white rounded text-sm font-semibold hover:bg-[#0054b4] shadow-sm transition-all flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              盲样送检指令
            </button>
            <button 
              onClick={handleBenchmarkReport}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#0064d9] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all"
            >
              化验对标报告
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">待质检车次</div>
            <div className="text-xl font-light text-[#1d2d3e]">24 <span className="text-xs font-bold text-orange-600 ml-1">忙碌</span></div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">今日合格率</div>
            <div className="text-xl font-light text-[#107e3e]">94.2%</div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">让步接收总额</div>
            <div className="text-xl font-light text-[#bb0000]">¥12,850</div>
          </div>
          <div>
            <div className="text-xs text-[#6a6d70] mb-1">平均检测耗时</div>
            <div className="text-xl font-light text-[#1d2d3e]">18.5 min</div>
          </div>
        </div>
      </div>

      {/* Anchor Navigation */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 sticky top-0 z-10 flex gap-8">
        {[
          { id: 'tasks', label: '质检任务' },
          { id: 'analysis', label: '化验分析' },
          { id: 'equipment', label: '设备状态' }
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
        <section id="tasks" className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9]">
          <div className="px-6 py-4 border-b border-[#f2f2f2] flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#1d2d3e]">实时化验矩阵</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#89919a]" />
                <input 
                  type="text" 
                  placeholder="搜索盲样编号/原料..." 
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
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9]">盲样 ID / 原料</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">粗蛋白 (CP)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">水分 (H2O)</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">霉变率</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-center">让步扣价</th>
                  <th className="px-6 py-3 text-xs font-bold text-[#6a6d70] uppercase border-b border-[#d9d9d9] text-right">结论状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {qualityTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-[#f5f6f7]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded flex items-center justify-center",
                          task.status === 'PASS' ? "bg-green-50 text-[#107e3e] border border-green-100" : 
                          task.status === 'WARNING' ? "bg-orange-50 text-[#e9730c] border border-orange-100" : "bg-red-50 text-[#bb0000] border border-red-100"
                        )}>
                          <Dna className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1d2d3e]">{task.id}</div>
                          <div className="text-[11px] text-[#6a6d70]">{task.material}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "text-sm font-medium",
                        task.protein < 43 && task.material.includes('豆粕') ? "text-[#bb0000]" : "#1d2d3e"
                      )}>{task.protein}%</div>
                      <div className="text-[10px] text-[#6a6d70]">标准: 43.0%</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "text-sm font-medium",
                        task.moisture > 13 ? "text-[#bb0000]" : "#1d2d3e"
                      )}>{task.moisture}%</div>
                      <div className="text-[10px] text-[#6a6d70]">标准: 13.0%</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "text-sm font-medium",
                        task.mold > 1 ? "text-[#bb0000]" : "#1d2d3e"
                      )}>{task.mold}%</div>
                      <div className="text-[10px] text-[#6a6d70]">Max: 1.0%</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm font-bold text-[#bb0000]">
                        {task.priceAdj === 0 ? '--' : `¥${task.priceAdj}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold border",
                          task.status === 'PASS' ? "bg-green-50 text-[#107e3e] border-green-100" : 
                          task.status === 'WARNING' ? "bg-orange-50 text-[#e9730c] border-orange-100" : "bg-red-50 text-[#bb0000] border-red-100"
                        )}>
                          {task.status === 'PASS' ? "合格入库" : task.status === 'WARNING' ? "让步接收" : "严禁入库"}
                        </span>
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

        {/* Section: Tools */}
        <div className="grid grid-cols-2 gap-8">
          <section className="sap-section-card bg-[#1d2d3e] rounded shadow-sm border border-[#1d2d3e] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                霉变扣价算法逻辑 (CAS 24)
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-400">当前霉变加权系数</span>
                    <span className="text-2xl font-light text-white">1.2x</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    * 根据本周库容及雨季湿度预报，霉变率超过 1.5% 的批次将自动触发烘干工艺成本核算，扣价幅度由算法动态生成。
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handlePriceModel}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-all shadow-lg"
                  >
                    调阅扣价模型
                  </button>
                  <button 
                    onClick={() => setShowNotification("正在对比历史同品质批次扣价记录...")}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-all border border-white/10"
                  >
                    历史对标
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="sap-section-card bg-white rounded shadow-sm border border-[#d9d9d9] p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#107e3e]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#107e3e] uppercase">在线</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#0064d9]" />
              NIR 快速化验设备状态
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#f5f6f7] border border-[#d9d9d9] rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#0064d9] rounded">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1d2d3e]">设备 01 (弥市库)</div>
                    <div className="text-[10px] text-[#6a6d70]">最后校准: 2026-10-19 08:00</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#107e3e]">就绪</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f5f6f7] border border-[#d9d9d9] rounded opacity-60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 text-[#6a6d70] rounded">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1d2d3e]">设备 02 (观音垱库)</div>
                    <div className="text-[10px] text-[#6a6d70]">维护周期中</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#6a6d70]">离线</span>
              </div>
              <button 
                onClick={handleFullSpectrumScan}
                className="w-full py-2 bg-[#1d2d3e] text-white hover:bg-[#2a3d52] text-xs font-bold rounded transition-all"
              >
                启动全谱扫描分析
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
