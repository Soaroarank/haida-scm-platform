/**
 * AgriCTS Platform - Core Type Definitions
 * Industrial-grade models for Commodity Trading & Supply Chain
 */

// --- 基础枚举 ---
export type CommodityType = '玉米' | '大豆' | '豆粕' | '菜粕' | '鱼粉' | '氨基酸';
export type ContractStatus = '草稿' | '执行中' | '部分点价' | '已点价' | '已结案' | '已取消';
export type LogisticsMode = '水运' | '驳船' | '陆运' | '铁路';
export type QualityStatus = '待检' | '合格' | '预警' | '拒收' | '让步接收';

// --- 1. 大宗交易与基差模型 ---
export interface BasisContract {
  id: string;
  contractNo: string;
  vendorName: string;
  commodity: CommodityType;
  totalQuantity: number;
  unpricedQuantity: number;
  basisValue: number; // 基差值
  exchangeCode: '大商所' | 'CBOT' | '郑商所';
  mainContract: string; // 如 M2405
  pricingDeadline: string;
  status: ContractStatus;
  deliveryPeriod: string;
  location: string; // 交割库
}

export interface PricingOrder {
  id: string;
  contractId: string;
  price: number;
  quantity: number;
  timestamp: string;
  executedBy: string;
  type: '自动' | '手动';
}

// --- 2. 套期保值与风险敞口 ---
export interface RiskExposure {
  commodity: CommodityType;
  physicalPosition: number; // 现货头寸 (在途 + 在库 + 未交割)
  futuresPosition: number;  // 期货头寸 (空头/多头)
  hedgeRatio: number;      // 套保比例
  unrealizedPnl: number;   // 浮动盈亏
  varValue: number;        // Value at Risk
}

// --- 3. 多式联运调度模型 ---
export interface LogisticsShipment {
  id: string;
  shipmentNo: string;
  mode: LogisticsMode;
  carrierName: string;
  origin: string;
  destination: string;
  vesselName?: string;
  licensePlate?: string;
  currentLocation: string;
  eta: string;
  loadWeight: number;
  status: '运输中' | '已到达' | '卸货中' | '已延迟';
  demurrageRate: number; // 滞期费率 (元/天)
  waterLevelWarning?: boolean; // 枯水预警
}

// --- 4. 地磅物联网与防作弊 ---
export interface WeighbridgeRecord {
  id: string;
  vehicleNo: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  timestamp: string;
  fraudAlertLevel: '无' | '低' | '高';
  voltageWaveform: number[]; // 毫秒级电压波形采样
  infraredStatus: '正常' | '遮挡'; // 红外对射状态
  waterTankDiff?: number; // 水箱放水差额还原值
}

// --- 5. 质检与化验 ---
export interface QualityInspection {
  id: string;
  shipmentId: string;
  sampleNo: string; // 盲样编号
  nirResults: {
    protein: number;
    moisture: number;
    fat: number;
    tvn?: number; // 挥发性盐基氮
  };
  moldRate: number; // 霉变率
  decision: QualityStatus;
  priceAdjustment: number; // 让步接收扣价
}

// --- 6. 工厂生产与MRP ---
export interface PlantInventory {
  plantId: string;
  plantName: string;
  commodity: CommodityType;
  currentStock: number;
  safetyStock: number;
  dailyConsumption: number;
  daysRemaining: number;
  status: '正常' | '库存偏低' | '库存告急';
}

// --- 7. 战区大屏综合指标 ---
export interface WarRoomMetrics {
  totalDemurrageToday: number;
  totalUnpricedPosition: number;
  averageHedgeRatio: number;
  criticalPlantCount: number;
  activeShipments: number;
  riverWaterLevels: {
    location: string;
    level: number;
    trend: '上升' | '下降' | '持平';
    threshold: number;
  }[];
}

// --- 8. 配方与替代决策 ---
export interface FormulationDecision {
  id: string;
  targetProduct: string; // 目标成品名 (如：膨化大口鲶)
  originalFormulaId: string;
  adjustedFormulaId: string;
  substitutionRate: number; // 替代率
  costImpact: number; // 成本变动 (元/吨)
  nutrientGaps: {
    nutrient: string;
    target: number;
    actual: number;
  }[];
  status: '建议中' | '已审批' | '执行中';
}

// --- 9. 供应商与承运商治理 ---
export interface VendorGovernance {
  id: string;
  vendorName: string;
  category: '原材料' | '物流';
  starRating: number;
  lossRate: number; // 损耗率
  fulfillmentRate: number; // 保供率
  isBlacklisted: boolean;
  collusionRiskScore: number; // 围标风险分
}

// --- 10. 销售与 COD 风控 ---
export interface SalesOrder {
  id: string;
  orderNo: string;
  customerName: string;
  productName: string;
  quantity: number;
  amount: number;
  paymentType: '货到付款' | '信用' | '预付';
  guaranteeStatus: '未签署' | '已签署';
  deliveryStatus: '待处理' | '运输中' | '已送达';
  location: {
    lat: number;
    lng: number;
    roadCondition: '良好' | '一般' | '较差';
  };
}

// --- 财务头寸与利润转移 ---
export interface TreasuryPosition {
  regionId: string;
  regionName: string;
  internalTransferPrice: number;
  settlementProfit: number;
  pnlStatus: '盈利' | '亏损';
}

// --- 库存管理（实物与虚拟） ---
export type MaterialCategory = '原料' | '成品' | '添加剂';
export type PhysicalStorageType = '筒仓' | '料仓' | '平房仓' | '货架';

export interface WarehouseInventory {
  id: string;
  name: string;
  type: '实物仓' | '虚拟仓';
  category: MaterialCategory;
  commodity: string;
  capacity: number;
  currentStock: number;
  virtualStock: number; // 期货/点价头寸
  utilization: number;
  location: string;
  status: '正常' | '高库容' | '低库容' | '活跃';
  receiptsToday: number;
  issuesToday: number;
  openingBalance: number;
  // 新增物理仓位属性
  physicalStorage: {
    type: PhysicalStorageType;
    code: string; // 如 SILO-01, BIN-05
    temperature?: number;
    humidity?: number;
  };
}

export interface PlantStockDetail {
  plantId: string;
  plantName: string;
  region: string;
  stock: number;
  doh: number; // 安全天数
  status: '正常' | '预警';
  matchingStatus: {
    poMatched: boolean;
    grMatched: boolean;
    invoiceMatched: boolean;
  };
}
