# 🚀 CometSwap Swap功能开发TODO List

## 📋 开发原则
- ✅ 遵循UIKit+Web双层架构
- ✅ 使用core-config管理配置
- ✅ 使用smart-router package的算法
- ✅ 完全主题化，无硬编码
- ✅ 先完成UI，后接入真实合约

---

## 🎨 阶段一：UI组件完成 (当前阶段)

### ✅ 已完成
- [x] SwapContainer基础组件
- [x] CurrencyInputPanel输入面板
- [x] SwapSettings设置面板
- [x] SwapButton执行按钮
- [x] RouteVisualization路由可视化
- [x] SwapLayout左右布局
- [x] TokenSelectModal (UIKit基础 + Web业务)
- [x] 完整主题化系统
- [x] Core-config代币列表配置

### 🔥 待完成 - 关键Modal组件

#### 1. SwapConfirmModal - 交易确认模态框
**位置**: `apps/web/src/components/Swap/SwapConfirmModal.tsx`
**参考**: `CometSwap_Old/src/components/swap/SwapConfirmModal.tsx`

**功能**:
- [ ] 显示交易详情
  - Input/Output token和数量
  - 汇率显示
  - 价格影响
  - 最小接收量
  - 路由路径
  - Gas估算
  - 滑点设置
- [ ] 确认/取消按钮
- [ ] Loading状态
- [ ] 成功/失败状态
- [ ] 完全主题化

#### 2. ApprovalCheckModal - 授权检查模态框
**位置**: `apps/web/src/components/Swap/ApprovalCheckModal.tsx`
**参考**: `CometSwap_Old/src/components/swap/ApprovalCheckModal.tsx`

**功能**:
- [ ] 检查token授权状态
- [ ] 显示授权进度
- [ ] Approve按钮
- [ ] 授权交易状态
- [ ] 错误处理
- [ ] 完全主题化

#### 3. 余额显示增强
**位置**: 增强现有`CurrencyInputPanel`

**功能**:
- [ ] 显示token余额
- [ ] Max按钮功能
- [ ] 余额不足提示
- [ ] 格式化显示

#### 4. 完善CurrencyInputPanel点击选择token
**位置**: `apps/web/src/components/Swap/CurrencyInputPanel.tsx`

**功能**:
- [ ] 点击token按钮打开TokenSelectModal
- [ ] 传递正确的选择回调
- [ ] 显示已选token信息

---

## 🔌 阶段二：真实合约集成

### 1. Wagmi钱包集成
**位置**: 全局配置

**任务**:
- [ ] 配置wagmi providers
- [ ] 集成ConnectButton
- [ ] useAccount hook集成
- [ ] useBalance hook集成
- [ ] 多链支持 (X Layer Testnet)

### 2. Smart Router集成
**位置**: `SwapContainer.tsx`
**Package**: `@cometswap/smart-router`

**任务**:
- [ ] 导入useSmartRouterCallback
  ```tsx
  import { useSmartRouterCallback } from '@cometswap/smart-router'
  ```
- [ ] 替换模拟router数据
- [ ] 集成真实路由计算
- [ ] 处理loading和error状态
- [ ] 自动刷新路由逻辑

### 3. Token Approval集成
**位置**: `ApprovalCheckModal.tsx`
**Package**: `@cometswap/smart-router`

**任务**:
- [ ] 导入useTokenApprovalCheck
  ```tsx
  import { useTokenApprovalCheck } from '@cometswap/smart-router'
  ```
- [ ] 检查token授权状态
- [ ] 执行approve交易
- [ ] 监听授权结果

### 4. Swap执行集成
**位置**: `SwapConfirmModal.tsx` / `SwapContainer.tsx`
**Package**: `@cometswap/smart-router`

**任务**:
- [ ] 导入useSwapCallback
  ```tsx
  import { useSwapCallback } from '@cometswap/smart-router'
  ```
- [ ] 执行swap交易
- [ ] 监听交易状态
- [ ] 成功/失败处理
- [ ] 交易哈希显示

### 5. 输入验证集成
**位置**: `SwapContainer.tsx`
**Package**: `@cometswap/smart-router`

**任务**:
- [ ] 导入useSwapInputError
  ```tsx
  import { useSwapInputError } from '@cometswap/smart-router'
  ```
- [ ] 验证token选择
- [ ] 验证输入金额
- [ ] 验证余额充足
- [ ] 验证路由可用
- [ ] 显示错误信息

### 6. 余额查询集成
**位置**: `CurrencyInputPanel.tsx`
**Package**: `wagmi`

**任务**:
- [ ] useBalance hook查询余额
- [ ] 实时更新余额
- [ ] Max按钮设置最大值
- [ ] 格式化显示

---

## 📊 阶段三：功能增强

### 1. 交易历史
- [ ] 显示最近交易
- [ ] 交易状态跟踪
- [ ] 区块浏览器链接

### 2. 价格图表
- [ ] Token价格趋势
- [ ] 24小时变化
- [ ] 历史价格数据

### 3. 高级功能
- [ ] 多跳路由显示
- [ ] 路由比较
- [ ] Gas优化选项
- [ ] MEV保护

---

## 🧪 阶段四：测试

### 1. 单元测试
- [ ] 组件测试
- [ ] Hook测试
- [ ] 工具函数测试

### 2. 集成测试
- [ ] 完整swap流程测试
- [ ] 错误场景测试
- [ ] 边界条件测试

### 3. E2E测试
- [ ] 钱包连接流程
- [ ] Token选择流程
- [ ] 授权流程
- [ ] Swap执行流程

---

## 🎯 当前优先级

### 立即开始 (P0)
1. ✅ SwapConfirmModal UI
2. ✅ ApprovalCheckModal UI
3. ✅ CurrencyInputPanel添加token选择
4. ✅ 余额显示UI

### 接下来 (P1)
5. 🔌 Wagmi配置和钱包连接
6. 🔌 Smart Router集成
7. 🔌 Token Approval集成
8. 🔌 Swap执行集成

### 后续 (P2)
9. 📊 输入验证集成
10. 📊 余额查询集成
11. 📊 错误处理完善

---

## 📝 参考文件路径

### 老前端参考
- `d:\PlanetSwap\CometSwap_Old\src\components\swap\SwapFormEnhanced.tsx`
- `d:\PlanetSwap\CometSwap_Old\src\components\swap\SwapConfirmModal.tsx`
- `d:\PlanetSwap\CometSwap_Old\src\components\swap\ApprovalCheckModal.tsx`
- `d:\PlanetSwap\CometSwap_Old\src\hooks\swap\useSmartRouterCallback.ts`

### Smart Router Package
- `packages/smart-router/src/hooks/useSmartRouterCallback.tsx`
- `packages/smart-router/src/hooks/useTokenApprovalCheck.ts`
- `packages/smart-router/src/hooks/useSwapCallback.ts`
- `packages/smart-router/src/hooks/useSwapInputError.ts`

### 当前新架构
- UIKit: `packages/uikit/src/components/`
- Web业务: `apps/web/src/components/Swap/`
- 配置: `packages/core-config/src/`

---

## ✨ 成功标准

- ✅ UI完全符合老前端设计
- ✅ 完全主题化，支持亮/暗模式
- ✅ 遵循UIKit+Web架构
- ✅ 可以完整执行一次swap交易
- ✅ 所有错误场景有适当处理
- ✅ 用户体验流畅

---

**最后更新**: 2025-11-10
**当前阶段**: 阶段一 - UI组件完成
**下一步**: 完成SwapConfirmModal和ApprovalCheckModal UI
