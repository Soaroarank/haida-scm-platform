/**
 * 地磅防作弊与差额还原算法
 */

/**
 * 逆向加水还原计算器
 * 当怀疑车辆在过毛重后、皮重前放水作弊时，根据视频记录的滴漏时长或水箱容积差额进行还原
 */
export function calculateWaterTankFraud(
  observedTare: number,
  standardTare: number,
  leakDurationMinutes: number,
  leakRateLPM: number = 2.5 // 假设平均滴漏速度 2.5L/min
): { estimatedRealTare: number; fraudWeight: number } {
  const estimatedLeakWeight = leakDurationMinutes * leakRateLPM;
  const fraudWeight = Math.max(0, standardTare - observedTare);
  
  return {
    estimatedRealTare: observedTare + estimatedLeakWeight,
    fraudWeight: Math.max(fraudWeight, estimatedLeakWeight)
  };
}

/**
 * 地磅电压波形异常检测 (模拟)
 * 检测是否有遥控解码器干扰 (通常表现为瞬时电压尖峰或台阶式跳变)
 */
export function detectVoltageAnomaly(waveform: number[]): boolean {
  if (waveform.length < 2) return false;
  
  const threshold = 0.5; // 电压跳变阈值
  for (let i = 1; i < waveform.length; i++) {
    if (Math.abs(waveform[i] - waveform[i-1]) > threshold) {
      return true; // 存在异常跳变
    }
  }
  return false;
}

/**
 * 净重差异稽查
 * 到厂净重 vs 发货净重，触发 0.5% 阈值拦截
 */
export function validateNetWeightGap(
  departureNet: number,
  arrivalNet: number,
  tolerance: number = 0.005
): { isAnomaly: boolean; gap: number; gapPercentage: number } {
  const gap = arrivalNet - departureNet;
  const gapPercentage = gap / departureNet;
  
  return {
    isAnomaly: Math.abs(gapPercentage) > tolerance,
    gap,
    gapPercentage
  };
}
