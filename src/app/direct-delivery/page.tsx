"use client"

import React, { useState } from "react";
import { MOCK_SALES } from "@/lib/mock-data";
import { 
  Truck, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  AlertTriangle,
  FileSignature,
  Navigation,
  Smartphone,
  Search,
  Filter,
  ChevronRight,
  Activity,
  Layers,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
  Plus,
  Download
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

export default function DirectDeliveryPage() {
  const [selectedOrder, setSelectedOrder] = useState(MOCK_SALES[0]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handlePushInstructions = () => {
    setShowNotification("正在向司机端 APP 推送最新塘口交付指令与机耕道导航路径...");
    setTimeout(() => {
      setShowNotification("指令已成功推送：预计 35 辆卡车已接收更新。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleExportWaybills = () => {
    setShowNotification("正在生成今日活跃运单报表...");
    setTimeout(() => {
      setShowNotification("报表已成功导出：共计 85 笔运单数据。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handlePushApproval = () => {
    setShowNotification("正在向大区经理 APP 推送 COD 业财强控审批请求...");
    setTimeout(() => {
      setShowNotification("推送成功：等待审批完成以解锁地磅二维码。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-[#f0f2f5] dark:bg-[#12171c] relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-blue-500">
            <Navigation className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Object Header */}
      <div className="sap-object-header">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-[#0064d2] dark:text-blue-400">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">塘口直通车与最后一公里直供</h1>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">运行中</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">机耕道准入评估、电子围栏签收与 COD 业财强控体系。</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handlePushInstructions}
              className="sap-button-primary flex items-center space-x-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>司机指令推送</span>
            </button>
            <button 
              onClick={handleExportWaybills}
              className="sap-button-ghost border border-gray-300 dark:border-gray-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>导出运单</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mt-8">
          <div className="space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">今日活跃运单</div>
            <div className="text-2xl font-light text-gray-900 dark:text-white">85 <span className="text-sm font-normal text-gray-400">单</span></div>
            <div className="flex items-center text-xs text-emerald-500">
              <Activity className="w-3 h-3 mr-1" /> 交付率 98.5%
            </div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">待签章货款 (COD)</div>
            <div className="text-2xl font-light text-red-600">¥28.5 <span className="text-sm font-normal text-gray-400">万</span></div>
            <div className="text-xs text-gray-400">涉及 4 笔关键订单</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">在途运力</div>
            <div className="text-2xl font-light text-[#0064d2] dark:text-blue-400">42 <span className="text-sm font-normal text-gray-400">辆</span></div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">车队状态稳定</div>
          </div>
          <div className="space-y-1 border-l border-gray-200 dark:border-gray-800 pl-12">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">机耕道风险</div>
            <div className="text-2xl font-light text-orange-600">02 <span className="text-sm font-normal text-gray-400 uppercase tracking-tighter">处预警</span></div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">已推送替代路线</div>
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
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">实时交付矩阵</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="搜索运单或客户..." 
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
                      <th>运单编号</th>
                      <th>客户/塘口</th>
                      <th>结算金额 (COD)</th>
                      <th>路况准入</th>
                      <th>电子围栏</th>
                      <th>担保状态</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_SALES.map((sale) => (
                      <tr 
                        key={sale.id} 
                        onClick={() => setSelectedOrder(sale)}
                        className={cn(
                          selectedOrder.id === sale.id ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                        )}
                      >
                        <td className="font-bold text-[#0064d2] dark:text-blue-400">{sale.orderNo}</td>
                        <td className="text-gray-700 dark:text-gray-300">
                          <div className="font-medium">{sale.customerName}</div>
                          <div className="text-[10px] text-gray-400 flex items-center mt-0.5">
                            <MapPin className="w-3 h-3 mr-1" /> 荆州区弥市镇
                          </div>
                        </td>
                        <td className="font-bold text-gray-900 dark:text-white">
                          {formatCurrency(sale.amount)}
                          <div className="text-[10px] text-gray-400 font-normal italic">{sale.paymentType}</div>
                        </td>
                        <td>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            sale.location.roadCondition === '较差' 
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          )}>
                            {sale.location.roadCondition === '较差' ? '大车禁行' : '准入通畅'}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1">
                              <div className="w-1.5 h-3 bg-blue-500 rounded-full border border-white" />
                              <div className="w-1.5 h-3 bg-blue-500 rounded-full border border-white" />
                              <div className="w-1.5 h-3 bg-gray-200 rounded-full border border-white" />
                            </div>
                            <span className="text-[10px] text-blue-600 font-bold italic">已入圈 (2.4km)</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center space-x-2">
                            <FileSignature className={cn(
                              "w-4 h-4",
                              sale.guaranteeStatus === '已签署' ? "text-emerald-500" : "text-red-500"
                            )} />
                            <span className={cn(
                              "text-[10px] font-bold",
                              sale.guaranteeStatus === '已签署' ? "text-emerald-600" : "text-red-600 underline decoration-dotted underline-offset-4"
                            )}>
                              {sale.guaranteeStatus}
                            </span>
                          </div>
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

          {/* Right Sidebar Section */}
          <div className="flex-1 flex flex-col space-y-4 min-w-[400px]">
            {/* COD Control Panel */}
            <div className="sap-section-card bg-[#354a5f] text-white">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-blue-400" />
                业财强控审批
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-300">待签章订单数</span>
                    <span className="text-2xl font-light">04</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[65%]" />
                  </div>
                </div>
                <button 
                  onClick={handlePushApproval}
                  className="w-full sap-button-primary bg-blue-500 hover:bg-blue-600"
                >
                  一键推送经理 APP
                </button>
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  * 依据集团《最后一公里结算管理规定》，COD 订单未完成电子担保前，地磅房严禁生成放货二维码。
                </p>
              </div>
            </div>

            {/* Road & Water Alerts */}
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider flex items-center">
                <Globe className="w-5 h-5 mr-2 text-[#0064d2]" />
                路况与水文预警
              </h3>
              <div className="space-y-3">
                {[
                  { label: '弥市镇塘口 A 区', status: '正常', time: '2 分钟前', type: 'road' },
                  { label: '观音垱镇 04 号机耕道', status: '积水', time: '15 分钟前', type: 'alert' },
                  { label: '李埠港转运场', status: '拥堵', time: '刚刚', type: 'traffic' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded",
                        item.type === 'alert' ? "bg-red-100 text-red-600" : "bg-blue-100 text-[#0064d2]"
                      )}>
                        {item.type === 'alert' ? <AlertTriangle className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.label}</div>
                        <div className="text-[10px] text-gray-400 italic">{item.time}</div>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      item.status === '正常' ? "text-emerald-600" : "text-red-600"
                    )}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance & Logistics Fund */}
            <div className="sap-section-card">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                客情基金与补贴
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">当日已发放补贴</span>
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">¥12,450.00</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">装卸补贴</div>
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">-¥500/单</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">司机奖金</div>
                    <div className="text-sm font-bold text-blue-600">+¥150/单</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
