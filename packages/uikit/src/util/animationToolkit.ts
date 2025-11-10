// 简化的动画工具，移除framer-motion和styled-components依赖

// CSS动画名称 - 需要在CSS中定义
export const appearAnimation = 'appear'
export const disappearAnimation = 'disappear'

// 渐变动画 - 返回CSS动画名称
export const promotedGradient = 'promotedGradient'

// 动画处理函数 - 简化版本
export const animationHandler = (element: HTMLElement | null, shouldDisappear?: boolean) => {
  if (!element) return;
  
  if (element.classList.contains("appear")) {
    element.classList.remove("appear");
    element.classList.add("disappear");
  } else {
    element.classList.remove("disappear");
    element.classList.add("appear");
  }
  
  if (shouldDisappear) {
    element.classList.remove("appear");
    element.classList.add("disappear");
  }
};

// 简化的动画变体 - 返回普通对象而不是framer-motion Variants
export const animationVariants = {
  initial: { transform: "translateX(0px)" },
  animate: { transform: "translateX(0px)" },
  exit: { transform: "translateX(0px)" },
};

export const animationMap = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

// 注入必要的CSS动画
export const injectAnimationStyles = () => {
  if (typeof document === 'undefined') return
  
  const styleId = 'animation-toolkit-styles'
  if (document.getElementById(styleId)) return
  
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    @keyframes appear {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes disappear {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes promotedGradient {
      0% { background-position: 50% 0%; }
      50% { background-position: 50% 100%; }
      100% { background-position: 50% 0%; }
    }
    
    .appear {
      animation: appear 0.3s ease-in-out forwards;
    }
    
    .disappear {
      animation: disappear 0.3s ease-in-out forwards;
    }
  `
  document.head.appendChild(style)
}