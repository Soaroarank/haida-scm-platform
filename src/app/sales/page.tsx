"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  ShieldAlert,
  Settings2,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_SALES } from "@/lib/mock-data";

export default function SalesManagementPage() {
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(MOCK_SALES[0]);

  const handlePushCOD = () => {
    setShowNotification("正在向大区经理推送 COD (货到付款) 信用强控审批...");
    setTimeout(() => {
      setShowNotification("推送成功：等待审批解锁地磅二维码。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  const handleSyncLogistics = () => {
    setShowNotification("正在同步最后一公里直供物流状态...");
    setTimeout(() => {
      setShowNotification("同步完成：更新了 8 笔订单的实时位置。");
      setTimeout(() => setShowNotification(null), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#f5f6f7] font-sans relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#1d2d3e] text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 border-l-4 border-orange-500">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">{showNotification}</span>
          </div>
        </div>
      )}

      {/* SAP Fiori Object Header */}
      <div className="bg-white border-b border-[#d9d9d9] px-8 py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6a6d70] uppercase tracking-wider">销售管理与 COD 风控</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full border border-orange-200">业财强控中</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d2d3e] flex items-center gap-3">
              销售订单流转与塘口直供监控
              <ShoppingBag className="w-6 h-6 text-[#0064d2]" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSyncLogistics}
              className="sap-button-primary flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              同步物流状态
            </button>
            <button 
              onClick={() => setShowNotification("正在导出今日销售日报与回款统计...")}
              className="px-4 py-1.5 bg-white border border-[#d9d9d9] text-[#0064d2] rounded text-sm font-semibold hover:bg-[#f5f6f7] transition-all"
            >
              生成销售日报
            </button>
            <button className="p-1.5 hover:bg-[#f5f6f7] rounded border border-transparent hover:border-[#d9d9d9] transition-all">
              <Settings2 className="w-5 h-5 text-[#6a6d70]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-1">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">今日销售总额</div>
            <div className="text-2xl font-light text-[#1d2d3e]">
              ¥1,285,400.00 <span className="text-sm font-normal text-[#6a6d70]">CNY</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              环比上周 +12.5%
            </div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">待回款金额 (COD)</div>
            <div className="text-2xl font-light text-orange-600">¥456,000.00</div>
            <div className="text-[10px] text-orange-500 font-bold">风险敞口: 35.4%</div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">在途订单数</div>
            <div className="text-2xl font-light text-blue-600">12 <span className="text-sm font-normal text-[#6a6d70]">笔</span></div>
            <div className="text-[10px] text-blue-500 font-bold">平均交付时间: 4.2小时</div>
          </div>
          <div className="space-y-1 border-l border-[#d9d9d9] pl-8">
            <div className="text-xs text-[#6a6d70] font-bold uppercase">担保协议签署率</div>
            <div className="text-2xl font-light text-emerald-600">88.2%</div>
            <div className="text-[10px] text-emerald-500 font-bold uppercase">合规性良好</div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Order List */}
          <section className="col-span-2 sap-section-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-[#1d2d3e] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0064d2]" />
                销售订单与风控矩阵
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6d70]" />
                  <input type="text" placeholder="搜索客户/订单..." className="sap-input pl-9 w-48" />
                </div>
                <button className="p-1.5 border border-[#d9d9d9] rounded hover:bg-[#f5f6f7]">
                  <Filter className="w-4 h-4 text-[#6a6d70]" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="sap-table">
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>客户名称</th>
                    <th>产品</th>
                    <th>数量 (吨)</th>
                    <th>金额</th>
                    <th>支付方式</th>
                    <th className="text-right">交付状态</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_SALES.map(order => (
                    <tr 
                      key={order.id} 
                      className={cn("hover:bg-blue-50/30", selectedOrder.id === order.id && "bg-blue-50/50 border-l-2 border-l-[#0064d2]")}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="font-bold text-[#0064d2]">{order.orderNo}</td>
                      <td className="text-gray-900 font-medium">{order.customerName}</td>
                      <td className="text-gray-600">{order.productName}</td>
                      <td className="font-bold">{order.quantity}</td>
                      <td className="font-bold">¥{order.amount.toLocaleString()}</td>
                      <td>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold",
                          order.paymentType === '货到付款' ? "bg-orange-100 text-orange-700" : 
                          order.paymentType === '信用' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                        )}>
                          {order.paymentType}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn(
                            "text-[10px] font-bold uppercase",
                            order.deliveryStatus === '已送达' ? "text-emerald-600" : 
                            order.deliveryStatus === '运输中' ? "text-blue-600" : "text-gray-500"
                          )}>
                            {order.deliveryStatus}
                          </span>
                          {order.deliveryStatus === '已送达' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          ) : order.deliveryStatus === '运输中' ? (
                            <Truck className="w-3 h-3 text-blue-500 animate-pulse" />
                          ) : (
                            <Clock className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Order Details & Control */}
          <section className="sap-section-card flex flex-col">
            <h3 className="text-base font-semibold text-[#1d2d3e] mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0064d2]" />
              订单详情与业财强控
            </h3>
            
            <div className="flex-1 space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-[#d9d9d9]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">当前选定订单</div>
                    <div className="text-sm font-bold text-gray-900">{selectedOrder.orderNo}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6a6d70]" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">担保协议</span>
                    <span className={cn("font-bold", selectedOrder.guaranteeStatus === '已签署' ? "text-emerald-600" : "text-red-600")}>
                      {selectedOrder.guaranteeStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">塘口路况</span>
                    <span className={cn("font-bold", selectedOrder.location.roadCondition === '良好' ? "text-emerald-600" : "text-orange-600")}>
                      {selectedOrder.location.roadCondition}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.paymentType === '货到付款' && (
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">COD 风险控制</span>
                  </div>
                  <p className="text-[11px] text-orange-800 leading-relaxed italic">
                    该订单为货到付款，系统已自动锁定目的地的地磅二维码。需大区经理审批确认客户资金到位后方可解锁卸货。
                  </p>
                  <button 
                    onClick={handlePushCOD}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-xs font-bold transition-all shadow-md"
                  >
                    推送经理 APP 审批
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">塘口直供轨迹</h4>
                <div className="relative pl-6 space-y-6 border-l border-dashed border-[#d9d9d9] py-2">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#0064d2] border-2 border-white shadow-sm" />
                    <div className="text-[10px] font-bold text-[#1d2d3e]">出厂装货</div>
                    <div className="text-[9px] text-gray-500">2026-10-19 09:30</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-white shadow-sm" />
                    <div className="text-[10px] font-bold text-[#1d2d3e]">机耕道入口</div>
                    <div className="text-[9px] text-gray-500">2026-10-19 14:15</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white shadow-sm" />
                    <div className="text-[10px] font-bold text-gray-400">电子围栏签收</div>
                    <div className="text-[9px] text-gray-500 italic">等待中...</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
