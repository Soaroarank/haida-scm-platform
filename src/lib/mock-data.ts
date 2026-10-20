import { 
  BasisContract, 
  WarRoomMetrics, 
  LogisticsShipment, 
  PlantInventory, 
  WeighbridgeRecord,
  RiskExposure,
  FormulationDecision,
  VendorGovernance,
  SalesOrder,
  TreasuryPosition,
  WarehouseInventory,
  PlantStockDetail
} from "@/types";

export const MOCK_RISK_EXPOSURES: RiskExposure[] = [
  { commodity: '豆粕', physicalPosition: 45000, futuresPosition: -42000, hedgeRatio: 0.93, unrealizedPnl: 1250000, varValue: 850000 },
  { commodity: '玉米', physicalPosition: 68000, futuresPosition: -60000, hedgeRatio: 0.88, unrealizedPnl: -450000, varValue: 1200000 },
  { commodity: '鱼粉', physicalPosition: 12000, futuresPosition: 0, hedgeRatio: 0, unrealizedPnl: 0, varValue: 2500000 },
];

export const MOCK_FORMULATIONS: FormulationDecision[] = [
  {
    id: "FORM-001",
    targetProduct: "膨化大口鲶预混料 501",
    originalFormulaId: "标准配方-V1",
    adjustedFormulaId: "替代配方-V2-低豆粕",
    substitutionRate: 0.15,
    costImpact: -120,
    nutrientGaps: [
      { nutrient: "粗蛋白", target: 43.0, actual: 42.8 },
      { nutrient: "赖氨酸", target: 2.5, actual: 2.52 }
    ],
    status: '执行中'
  }
];

export const MOCK_VENDORS: VendorGovernance[] = [
  { id: "V-001", vendorName: "中粮油脂", category: '原材料', starRating: 5, lossRate: 0.002, fulfillmentRate: 0.98, isBlacklisted: false, collusionRiskScore: 0.05 },
  { id: "V-002", vendorName: "嘉吉投资", category: '原材料', starRating: 4, lossRate: 0.005, fulfillmentRate: 0.95, isBlacklisted: false, collusionRiskScore: 0.12 },
  { id: "V-003", vendorName: "某地方小油厂", category: '原材料', starRating: 2, lossRate: 0.015, fulfillmentRate: 0.75, isBlacklisted: true, collusionRiskScore: 0.85 },
];

export const MOCK_SALES: SalesOrder[] = [
  {
    id: "SO-2026-1019-01",
    orderNo: "SALE-SH-0098",
    customerName: "荆州大型水产养殖户-张三",
    productName: "大口鲶膨化料",
    quantity: 50,
    amount: 285000,
    paymentType: '货到付款',
    guaranteeStatus: '未签署',
    deliveryStatus: '运输中',
    location: { lat: 30.33, lng: 112.23, roadCondition: '较差' }
  },
  {
    id: "SO-2026-1020-02",
    orderNo: "SALE-HB-0105",
    customerName: "洪湖水产合作社",
    productName: "草鱼配合饲料",
    quantity: 120,
    amount: 456000,
    paymentType: '信用',
    guaranteeStatus: '已签署',
    deliveryStatus: '已送达',
    location: { lat: 29.82, lng: 113.45, roadCondition: '良好' }
  },
  {
    id: "SO-2026-1020-03",
    orderNo: "SALE-JZ-0211",
    customerName: "潜江小龙虾基地",
    productName: "虾蟹专用料",
    quantity: 80,
    amount: 384000,
    paymentType: '预付',
    guaranteeStatus: '已签署',
    deliveryStatus: '待处理',
    location: { lat: 30.42, lng: 112.89, roadCondition: '良好' }
  }
];

export const MOCK_WAREHOUSES: WarehouseInventory[] = [
  {
    id: "WH-001",
    name: "南通港1号筒仓",
    type: "实物仓",
    category: "原料",
    commodity: "豆粕",
    capacity: 5000,
    currentStock: 3200,
    virtualStock: 1200,
    utilization: 0.64,
    location: "江苏省南通市",
    status: "正常",
    receiptsToday: 1200,
    issuesToday: 800,
    openingBalance: 31600,
    physicalStorage: { type: "筒仓", code: "SILO-NT-01", temperature: 24, humidity: 45 }
  },
  {
    id: "WH-002",
    name: "阳逻2号料仓",
    type: "实物仓",
    category: "原料",
    commodity: "玉米",
    capacity: 2000,
    currentStock: 1850,
    virtualStock: -500,
    utilization: 0.92,
    location: "湖北省武汉市",
    status: "高库容",
    receiptsToday: 500,
    issuesToday: 1200,
    openingBalance: 19200,
    physicalStorage: { type: "料仓", code: "BIN-YL-02", temperature: 26, humidity: 50 }
  },
  {
    id: "WH-004",
    name: "荆州成品3号库",
    type: "实物仓",
    category: "成品",
    commodity: "大口鲶膨化料",
    capacity: 1000,
    currentStock: 450,
    virtualStock: 0,
    utilization: 0.45,
    location: "湖北省荆州市",
    status: "正常",
    receiptsToday: 200,
    issuesToday: 150,
    openingBalance: 400,
    physicalStorage: { type: "平房仓", code: "WH-JZ-FG03" }
  },
  {
    id: "WH-005",
    name: "添加剂恒温架",
    type: "实物仓",
    category: "添加剂",
    commodity: "赖氨酸",
    capacity: 500,
    currentStock: 120,
    virtualStock: 0,
    utilization: 0.24,
    location: "江苏省南通市",
    status: "正常",
    receiptsToday: 20,
    issuesToday: 10,
    openingBalance: 110,
    physicalStorage: { type: "货架", code: "SHELF-ADD-09", temperature: 18, humidity: 30 }
  },
  {
    id: "WH-003",
    name: "大连期货虚拟仓",
    type: "虚拟仓",
    category: "原料",
    commodity: "豆粕",
    capacity: 100000,
    currentStock: 0,
    virtualStock: 45000,
    utilization: 0.45,
    location: "大连商品交易所",
    status: "活跃",
    receiptsToday: 5000,
    issuesToday: 0,
    openingBalance: 40000,
    physicalStorage: { type: "平房仓", code: "VIRTUAL-DCE" }
  }
];

export const MOCK_PLANT_STOCK_DETAILS: PlantStockDetail[] = [
  {
    plantId: "P-001",
    plantName: "湖北一厂",
    region: "华中大区",
    stock: 2400,
    doh: 4.5,
    status: '正常',
    matchingStatus: { poMatched: true, grMatched: true, invoiceMatched: true }
  },
  {
    plantId: "P-002",
    plantName: "荆州海大",
    region: "华中大区",
    stock: 850,
    doh: 1.2,
    status: '预警',
    matchingStatus: { poMatched: true, grMatched: true, invoiceMatched: false }
  },
  {
    plantId: "P-003",
    plantName: "南通二厂",
    region: "华东大区",
    stock: 5600,
    doh: 12.0,
    status: '正常',
    matchingStatus: { poMatched: true, grMatched: true, invoiceMatched: true }
  },
  {
    plantId: "P-004",
    plantName: "洪湖工厂",
    region: "华中大区",
    stock: 1200,
    doh: 2.8,
    status: '正常',
    matchingStatus: { poMatched: true, grMatched: false, invoiceMatched: false }
  }
];

export const MOCK_TREASURY: TreasuryPosition[] = [
  { regionId: "REG-Hubei", regionName: "湖北战区", internalTransferPrice: 3450, settlementProfit: 1250000, pnlStatus: '盈利' },
  { regionId: "REG-Hunan", regionName: "湖南战区", internalTransferPrice: 3480, settlementProfit: -350000, pnlStatus: '亏损' },
];

export const MOCK_CONTRACTS: BasisContract[] = [
  {
    id: "BC-2026-001",
    contractNo: "COFCO-2026-SOY-09",
    vendorName: "中粮油脂 (南京)",
    commodity: "豆粕",
    totalQuantity: 5000,
    unpricedQuantity: 1200,
    basisValue: 180,
    exchangeCode: "大商所",
    mainContract: "M2609",
    pricingDeadline: "2026-08-20",
    status: "部分点价",
    deliveryPeriod: "2026-09",
    location: "南通港"
  },
  {
    id: "BC-2026-002",
    contractNo: "ADM-2026-CORN-10",
    vendorName: "艾地盟 (ADM)",
    commodity: "玉米",
    totalQuantity: 8000,
    unpricedQuantity: 8000,
    basisValue: -50,
    exchangeCode: "大商所",
    mainContract: "C2611",
    pricingDeadline: "2026-10-15",
    status: "执行中",
    deliveryPeriod: "2026-11",
    location: "大连港"
  }
];

export const MOCK_SHIPMENTS: LogisticsShipment[] = [
  {
    id: "SHIP-001",
    shipmentNo: "VES-2026-0042",
    mode: "水运",
    carrierName: "长航凤凰",
    origin: "南通港",
    destination: "阳逻港",
    vesselName: "江海远航 008",
    currentLocation: "九江水域",
    eta: "2026-10-21",
    loadWeight: 3200,
    status: "运输中",
    demurrageRate: 15000,
    waterLevelWarning: true
  },
  {
    id: "SHIP-002",
    shipmentNo: "TRK-2026-9912",
    mode: "陆运",
    carrierName: "顺丰大宗",
    origin: "阳逻仓",
    destination: "湖北海大二厂",
    licensePlate: "鄂A-B1234",
    currentLocation: "武汉绕城高速",
    eta: "2026-10-19 16:30",
    loadWeight: 35,
    status: "运输中",
    demurrageRate: 500
  }
];

export const MOCK_PLANT_STOCKS: PlantInventory[] = [
  {
    plantId: "PLANT-01",
    plantName: "湖北海大一厂",
    commodity: "豆粕",
    currentStock: 450,
    safetyStock: 800,
    dailyConsumption: 220,
    daysRemaining: 2.04,
    status: "库存偏低"
  },
  {
    plantId: "PLANT-02",
    plantName: "荆州海大",
    commodity: "玉米",
    currentStock: 120,
    safetyStock: 500,
    dailyConsumption: 180,
    daysRemaining: 0.67,
    status: "库存告急"
  }
];

export const MOCK_WAR_ROOM: WarRoomMetrics = {
  totalDemurrageToday: 128500,
  totalUnpricedPosition: 45600,
  averageHedgeRatio: 0.92,
  criticalPlantCount: 4,
  activeShipments: 128,
  riverWaterLevels: [
    { location: "汉口", level: 13.5, trend: "下降", threshold: 14.0 },
    { location: "九江", level: 9.8, trend: "持平", threshold: 10.5 },
    { location: "宜昌", level: 42.2, trend: "上升", threshold: 40.0 }
  ]
};

export const MOCK_WEIGHBRIDGE: WeighbridgeRecord[] = [
  {
    id: "WB-20261019-001",
    vehicleNo: "苏F-A8888",
    grossWeight: 52.4,
    tareWeight: 17.2,
    netWeight: 35.2,
    timestamp: "2026-10-19 10:15:00",
    fraudAlertLevel: "高",
    voltageWaveform: [4.2, 4.2, 5.8, 4.2, 4.1],
    infraredStatus: "正常",
    waterTankDiff: 0.85
  }
];
