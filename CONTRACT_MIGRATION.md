# 🔄 合约地址迁移对比 - X Layer Testnet

## ✅ 已更新的合约地址

从老前端 (`CometSwap_Old`) 迁移到新架构 (`comet-swap-nx/packages/core-config`)

### 📍 X Layer Testnet 合约地址对比

| 合约名称 | 老前端地址 | 新架构地址 | 状态 |
|---------|-----------|-----------|------|
| **V2 Factory** | `0x10F49e14f4f974221f39f0118D4f77b040112289` | `0x10F49e14f4f974221f39f0118D4f77b040112289` | ✅ **已同步** |
| **V2 Router** | `0xC9553bccDBA8eA2d2b77782CBA20898e63855bed` | `0xC9553bccDBA8eA2d2b77782CBA20898e63855bed` | ✅ **已同步** |
| **Smart Router** | `0x2d132dcAF7990B56F4F252E14a58FeA1aA162fB2` | `0x2d132dcAF7990B56F4F252E14a58FeA1aA162fB2` | ✅ **已同步** |
| **V3 Factory** | `0xb612B7b2D6aB7AdE6ebEbb422B75C05fE6268ebE` | `0xb612B7b2D6aB7AdE6ebEbb422B75C05fE6268ebE` | ✅ **已同步** |
| **Mixed Route Quoter** | `0x3eC5A8b15f543B642b1853792eAA917cc42004F1` | `0x3eC5A8b15f543B642b1853792eAA917cc42004F1` | ✅ **已同步** |
| **NFT Position Manager** | `0xF9df8Fce74325c5A546d45f0C646E02830582d31` | `0xF9df8Fce74325c5A546d45f0C646E02830582d31` | ✅ **已同步** |
| **Multicall3** | `0xcA11bde05977b3631167028862bE2a173976CA11` | `0xcA11bde05977b3631167028862bE2a173976CA11` | ✅ **已同步** |

---

## 🎯 核心合约说明

### 1. **Smart Router** (最重要！)
```
地址: 0x2d132dcAF7990B56F4F252E14a58FeA1aA162fB2
功能: 支持 V2/V3 混合路由，自动寻找最优路径
状态: ✅ 已部署和验证
```

### 2. **V2 Core**
```
Factory: 0x10F49e14f4f974221f39f0118D4f77b040112289
Router:  0xC9553bccDBA8eA2d2b77782CBA20898e63855bed
功能: V2 AMM 核心合约
状态: ✅ 已部署和验证
```

### 3. **V3 Core**
```
Factory: 0xb612B7b2D6aB7AdE6ebEbb422B75C05fE6268ebE
Quoter:  0x3eC5A8b15f543B642b1853792eAA917cc42004F1
功能: V3 集中流动性 AMM
状态: ✅ 已部署
```

---

## 📦 文件位置

### 新架构
```
packages/core-config/src/contracts/
├── addresses.ts    ✅ 合约地址配置
├── types.ts        ✅ 类型定义
└── index.ts        ✅ 导出
```

### 老前端（参考）
```
CometSwap_Old/src/config/chains/
└── contracts.ts    📖 原始配置（已迁移）
```

---

## 🔧 使用方式

### 在新架构中获取合约地址

```typescript
import { getContractAddress, ContractType, ChainId } from '@comet-swap/core-config'

// 获取 Smart Router 地址
const smartRouterAddress = getContractAddress(
  ChainId.XLAYER_TESTNET,
  ContractType.SMART_ROUTER
)
// => '0x2d132dcAF7990B56F4F252E14a58FeA1aA162fB2'

// 获取整条链的合约
const contracts = getChainContracts(ChainId.XLAYER_TESTNET)
```

---

## 🚀 下一步：集成 Smart Router

### 待完成任务

1. ✅ **合约地址已同步**
2. ⏳ **集成 Smart Router Hooks**
   - 使用 `packages/smart-router/src/hooks/useSmartRouterCallback.tsx`
   - 替换 SwapContainer 中的模拟路由数据
3. ⏳ **集成 Token Approval**
   - 使用 `packages/smart-router/src/hooks/useTokenApprovalCheck.ts`
4. ⏳ **集成 Swap Execution**
   - 使用 `packages/smart-router/src/hooks/useSwapCallback.ts`

---

## ✅ 验证清单

- [x] 合约地址从老前端迁移
- [x] 地址对比验证通过
- [x] core-config 包构建成功
- [ ] Smart Router 集成测试
- [ ] 真实 Swap 交易测试
- [ ] Gas 估算测试

---

**更新时间**: 2025-11-10  
**更新人**: AI Assistant  
**版本**: v1.0
