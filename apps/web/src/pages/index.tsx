import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5rem)', 
          marginBottom: '1rem',
          fontWeight: '800',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          ⚡ CometSwap
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', 
          marginBottom: '3rem', 
          maxWidth: '700px',
          lineHeight: '1.4',
          opacity: '0.95'
        }}>
          The Future of DeFi Trading<br/>
          <span style={{ fontSize: '0.9em', opacity: '0.8' }}>
            Advanced decentralized exchange with intelligent routing & cross-chain capabilities
          </span>
        </p>
        
        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <Link href="/swap" style={{
            backgroundColor: '#4F46E5',
            color: 'white',
            padding: '1.2rem 2.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            🚀 Start Trading
          </Link>
          
          <a href="https://docs.cometswap.com" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '1.2rem 2.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)'
          }}>
            📚 Learn More
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            $2.5B+
          </div>
          <div style={{ opacity: 0.85, fontSize: '0.95rem' }}>Total Value Locked</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            150K+
          </div>
          <div style={{ opacity: 0.85, fontSize: '0.95rem' }}>Active Traders</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            99.9%
          </div>
          <div style={{ opacity: 0.85, fontSize: '0.95rem' }}>Uptime</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            &lt;40%
          </div>
          <div style={{ opacity: 0.85, fontSize: '0.95rem' }}>Gas Savings</div>
        </div>
      </div>

      {/* Features */}
      <div style={{
        marginTop: '5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Smart Routing</h3>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', margin: 0 }}>
            Best prices across multiple DEXs
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌉</div>
          <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Cross-Chain</h3>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', margin: 0 }}>
            Trade across multiple blockchains
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Secure</h3>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', margin: 0 }}>
            Audited smart contracts
          </p>
        </div>
      </div>
    </div>
  )
}