// 简化的主题值获取函数，替代lodash.get和styled-components依赖

type Theme = Record<string, any>

const getThemeValue = (theme: Theme, path: string, fallback?: string | number): string => {
  if (!theme || !path) return String(fallback || '')
  
  // 简单的路径解析，支持 "colors.primary" 这样的路径
  const keys = path.split('.')
  let result: any = theme
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      return String(fallback || '')
    }
  }
  
  return String(result || fallback || '')
}

export default getThemeValue