import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  #__next {
    position: relative;
    z-index: 1;
  }

  #portal-root {
    position: relative;
    z-index: 2;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3); 
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1); 
    border-radius: 10px;
  }
`

export default GlobalStyle
