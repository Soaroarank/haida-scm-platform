"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home,
  TrendingUp, 
  ShieldCheck, 
  FlaskConical, 
  Ship, 
  Scale, 
  ClipboardCheck, 
  Factory, 
  Truck, 
  Users,
  Wallet,
  LayoutGrid,
  ChevronRight,
  Warehouse,
  ShoppingBag
} from "lucide-react";

const navigation = [
  { name: "工作台首页", href: "/", icon: Home },
  { name: "大宗商品交易", href: "/trading", icon: TrendingUp },
  { name: "风险与套期保值", href: "/hedging", icon: ShieldCheck },
  { name: "库存管理", href: "/inventory", icon: Warehouse },
  { name: "资金与 MTP 管理", href: "/treasury", icon: Wallet },
  { name: "智能配方优化", href: "/formulation", icon: FlaskConical },
  { name: "MRP 生产计划", href: "/mrp-planning", icon: Factory },
  { name: "销售管理", href: "/sales", icon: ShoppingBag },
  { name: "物流调度塔", href: "/logistics", icon: Ship },
  { name: "IoT 地磅防舞弊", href: "/weighbridge", icon: Scale },
  { name: "质量与品控", href: "/quality", icon: ClipboardCheck },
  { name: "塘口直供物流", href: "/direct-delivery", icon: Truck },
  { name: "供应商协同网络", href: "/vendors", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sap-sidebar group/sidebar">
      <div className="flex-1 mt-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center h-10 mx-2 rounded transition-all duration-200 relative group/item",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-[#0064d2] dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#0064d2] dark:hover:text-blue-400"
              )}
            >
              <div className={cn(
                "w-10 h-10 flex items-center justify-center shrink-0",
                isActive ? "text-[#0064d2] dark:text-blue-400" : ""
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              
              <div className="ml-1 flex-1 flex items-center justify-between opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </div>

              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#0064d2] dark:bg-blue-400 rounded-r shadow-[0_0_8px_rgba(0,100,210,0.4)]" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center h-10 w-full rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#0064d2] transition-all group/footer">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span className="ml-1 text-sm font-medium opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            系统配置
          </span>
        </button>
      </div>
    </div>
  );
}
