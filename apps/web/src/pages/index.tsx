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
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        🚀 CometSwap
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', maxWidth: '600px' }}>
        The Future of DeFi Trading - Advanced decentralized exchange with intelligent routing
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/swap" style={{
          backgroundColor: '#4F46E5',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Start Trading
        </Link>
        
        <button style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: '2px solid white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Learn More
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginTop: '4rem',
        width: '100%',
        maxWidth: '800px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$2.5B+</div>
          <div style={{ opacity: 0.8 }}>Total Value Locked</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>150K+</div>
          <div style={{ opacity: 0.8 }}>Active Users</div>
        </div>
      </div>
    </div>
  )
}