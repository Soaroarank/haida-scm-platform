/**
 * MCDA (Multi-Criteria Decision Analysis) 需求分配决策引擎
 */

export interface AllocationRequirement {
  plantId: string;
  plantName: string;
  margin: number;         // 毛利率
  penalty: number;        // 违约金 (元/吨)
  criticality: number;    // 核心保供度 (0-1)
  shortfall: number;      // 缺口量 (吨)
}

export interface AllocatedResult extends AllocationRequirement {
  priorityScore: number;
  allocatedQuantity: number;
}

/**
 * 根据全区缺口和权重公式计算优先级并分配物料
 * Priority = 毛利率*0.5 + 违约金权重*0.3 + 核心保供度*0.2
 */
export function allocateShortfall(
  requirements: AllocationRequirement[],
  availableSupply: number
): AllocatedResult[] {
  // 1. 归一化处理与评分
  const maxMargin = Math.max(...requirements.map(r => r.margin));
  const maxPenalty = Math.max(...requirements.map(r => r.penalty));

  const scoredRequirements = requirements.map(req => {
    const marginScore = req.margin / (maxMargin || 1);
    const penaltyScore = req.penalty / (maxPenalty || 1);
    
    const priorityScore = (marginScore * 0.5) + (penaltyScore * 0.3) + (req.criticality * 0.2);
    
    return {
      ...req,
      priorityScore
    };
  });

  // 2. 按优先级排序
  const sorted = scoredRequirements.sort((a, b) => b.priorityScore - a.priorityScore);

  // 3. 按比例或优先级依次分配
  let remainingSupply = availableSupply;
  const results: AllocatedResult[] = sorted.map(req => {
    const allocated = Math.min(req.shortfall, remainingSupply);
    remainingSupply -= allocated;
    
    return {
      ...req,
      allocatedQuantity: allocated
    };
  });

  return results;
}
