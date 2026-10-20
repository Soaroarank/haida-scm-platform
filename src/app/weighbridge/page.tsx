"use client"

import React from "react";
import { MOCK_WEIGHBRIDGE } from "@/lib/mock-data";
import { detectVoltageAnomaly, calculateWaterTankFraud } from "@/lib/algorithms/anti-fraud";
import { 
  Scale, 
  ShieldAlert, 
  Activity, 
  Lock,
  History,
  AlertTriangle,
  Zap,
  ChevronRight,
  ExternalLink,
  Cpu,
  Calculator,
  Scan,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";

export default function WeighbridgeObjectPage() {
  const currentRecord = MOCK_WEIGHBRIDGE[0];
  const [showNotification, setShowNotification] = React.useState<string | null>(null);
  const [isLocking, setIsLocking] = React.useState(false);

  const handleLockScale = () => {
    setIsLocking(true);
    setShowNotification("正在执行紧急锁秤指令，断开传感器数据链...");
    setTimeout(() => {
      setShowNotification("地磅已锁定：严禁任何车辆过磅，安全审计日志已生成。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleBlindSample = () => {
    setShowNotification("正在启动盲样入库流程，生成唯一采样标识...");
    setTimeout(() => {
      setShowNotification("流程已启动：请引导车辆至采样区进行自动扦样。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1000);
  };

  const handleRunDiagnosis = () => {
    setShowNotification("正在运行 IoT 地磅系统自诊断，校验传感器零点偏差...");
    setTimeout(() => {
      setShowNotification("诊断完成：所有节点运行正常，未检测到解码器干扰。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 2000);
  };
  
  // Anti-fraud algorithm logic
  const voltageData = [4.2, 4.2, 5.8, 4.2, 4.1, 4.2];
  const hasVoltageAnomaly = detectVoltageAnomaly(voltageData);
  
  const fraudAnalysis = calculateWaterTankFraud(
    currentRecord.tareWeight,
    currentRecord.tareWeight + 0.8, 
    10, 
    2.5 
  );

  // SAP Horizon Voltage Waveform Configuration
  const waveformOption = {
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
      data: ['1ms', '2ms', '3ms', '4ms', '5ms', '6ms'], 
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    yAxis: { 
      type: 'value', 
      name: '电压 (V)',
      axisLine: { show: false }, 
      splitLine: { lineStyle: { color: '#eee' } },
      axisLabel: { color: '#666', fontSize: 11 }
    },
    series: [
      {
        name: '传感器电压',
        type: 'line',
        smooth: true,
        data: [4.2, 4.2, 5.8, 4.2, 4.1, 4.2],
        markPoint: {
          data: [{ type: 'max', name: '异常脉冲', itemStyle: { color: '#ef4444' } }]
        },
        lineStyle: { width: 3, color: '#0064d2' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(0, 100, 210, 0.2)' }, { offset: 1, color: 'rgba(0, 100, 210, 0)' }]
          }
        }
      }
    ]
  };

  return (
    <div className="flex flex-col bg-[#f0f2f5] dark:bg-[#12171c] relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-red-500">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Object Header */}
      <div className="sap-object-header border-b-red-500/20 border-b-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center text-red-600 dark:text-red-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">IoT 地磅防舞弊与品控中心</h1>
                <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">高风险预警</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">实时视频监控、防作弊算法审计及质量化验终端。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleLockScale}
              disabled={isLocking}
              className={cn(
                "sap-button-primary flex items-center space-x-2 transition-all",
                isLocking ? "bg-gray-800" : "bg-red-600 hover:bg-red-700"
              )}
            >
              <Lock className="w-4 h-4" />
              <span>{isLocking ? "秤已锁定" : "紧急锁秤"}</span>
            </button>
            <button 
              onClick={handleBlindSample}
              className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2"
            >
              <Scan className="w-4 h-4" />
              <span>盲样入库</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1 text-red-500" /> 活跃舞弊预警
            </div>
            <div className="text-2xl font-light text-red-600">02 <span className="text-sm font-normal text-gray-400 uppercase tracking-tighter">严重</span></div>
            <div className="text-xs text-gray-400">年度拦截: 128 次</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">当日吞吐量</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">1,245.00 <span className="text-sm font-normal text-gray-400">吨</span></div>
            <div className="flex items-center text-xs text-emerald-500 font-bold">
              效率提升 +4.2%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">采样队列</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">12 <span className="text-sm font-normal text-gray-400">批次</span></div>
            <div className="text-xs text-gray-400">平均 NIR耗时: 4.5m</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">传感器健康度</div>
            <div className="text-2xl font-light text-emerald-600 uppercase">稳定</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">36 节点在线</div>
          </div>
        </div>
      </div>

      {/* SAP Page Sections */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="flex space-x-4 h-full min-h-0">
          {/* Real-time Monitor Section */}
          <div className="flex-[2] flex flex-col space-y-4 min-w-0">
            <div className="sap-section-card flex-1 flex flex-col min-h-0 bg-red-50/10 border-red-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
                  实时地磅监控卫士
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Smartphone className="w-3 h-3 mr-1" /> CCTV 01 已连接
                  </div>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">监控运行中</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: '车牌号', value: currentRecord.vehicleNo, highlight: false },
                  { label: '毛重 (吨)', value: currentRecord.grossWeight, highlight: false },
                  { label: '皮重 (吨)', value: currentRecord.tareWeight, highlight: false },
                  { label: '检测到异常 (吨)', value: `+${currentRecord.waterTankDiff}`, highlight: true },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "p-4 rounded border",
                    item.highlight ? "bg-red-50 border-red-200" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  )}>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{item.label}</div>
                    <div className={cn(
                      "text-xl font-bold",
                      item.highlight ? "text-red-600" : "text-gray-900 dark:text-white"
                    )}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-widest flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-blue-500" /> 传感器电压波形 (ms)
                  </h4>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
                    <ReactECharts option={waveformOption} style={{ height: '100%' }} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-widest flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" /> 防舞弊审计引擎
                  </h4>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4 space-y-3 overflow-auto">
                    {[
                      { label: '红外对射传感器', val: '对准 (安全)', status: 'ok' },
                      { label: '皮重-毛重 偏差', val: '185m (预警)', status: 'warn' },
                      { label: '历史波动率分析', val: '0.12% (正常)', status: 'ok' },
                      { label: '预估舞弊重量', val: `+${fraudAnalysis.fraudWeight.toFixed(2)} 吨`, status: 'warn' }
                    ].map((log, i) => (
                      <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors border-b border-gray-100 last:border-0">
                        <span className="text-xs text-gray-500">{log.label}</span>
                        <span className={cn(
                          "text-xs font-bold",
                          log.status === 'warn' ? "text-red-600" : "text-emerald-600"
                        )}>{log.val}</span>
                      </div>
                    ))}
                    <div className={cn(
                      "mt-4 p-3 rounded text-[11px] font-bold leading-relaxed",
                      hasVoltageAnomaly ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    )}>
                      {hasVoltageAnomaly 
                        ? "⚠ 严重: 检测到异常脉冲。传感器 04 号节点疑似遭受解码器干扰。"
                        : "✓ 系统自检: 传感器电压稳定。当前会话未检测到外部干扰。"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sap-section-card h-64 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">过磅历史记录与风险矩阵</h3>
                <button className="sap-button-ghost p-1"><History className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="sap-table">
                  <thead>
                    <tr>
                      <th>流水号</th>
                      <th>车牌号码</th>
                      <th>净重 (吨)</th>
                      <th>时间戳</th>
                      <th>风险状态</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-blue-50/30">
                      <td className="font-bold text-[#0064d2]">WB-20261019-001</td>
                      <td className="font-bold">苏F-A8888</td>
                      <td className="font-medium">35.20</td>
                      <td className="text-gray-500">10:15:00 AM</td>
                      <td>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">严重风险</span>
                      </td>
                      <td>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-[#0064d2] cursor-pointer" />
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30">
                      <td className="font-bold text-[#0064d2]">WB-20261019-002</td>
                      <td className="font-bold">粤A-K9999</td>
                      <td className="font-medium">28.45</td>
                      <td className="text-gray-500">09:45:12 AM</td>
                      <td>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">安全</span>
                      </td>
                      <td>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-[#0064d2] cursor-pointer" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="w-[400px] flex flex-col space-y-4">
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">质量检测 (QC) 摘要</h3>
              <div className="space-y-4">
                {[
                  { label: '平均水分', value: '12.4%', target: '12.5%', status: 'ok' },
                  { label: '蛋白含量', value: '42.8%', target: '43.0%', status: 'warn' },
                  { label: '杂质水平', value: '0.8%', target: '1.0%', status: 'ok' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{item.label}</span>
                      <span className={cn(
                        "text-xs font-bold",
                        item.status === 'warn' ? "text-orange-600" : "text-emerald-600"
                      )}>{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full transition-all duration-1000",
                        item.status === 'warn' ? "bg-orange-500" : "bg-emerald-500"
                      )} style={{ width: '85%' }} />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">指标值: {item.target}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sap-section-card flex-1">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">核心算法引擎</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded">
                    <Calculator className="w-5 h-5 text-[#0064d2]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">水箱放水扣重模型</div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      利用流量建模反推在场期间的重量变化，防止水箱作弊。
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 rounded">
                    <Cpu className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">脉冲模式特征识别</div>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={cn(
                          "w-6 h-1 rounded-full",
                          i === 3 ? "bg-red-500 animate-pulse" : "bg-blue-200"
                        )} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleRunDiagnosis}
                className="w-full mt-6 py-2 border border-[#0064d2] text-[#0064d2] rounded text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-all"
              >
                运行系统诊断
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
