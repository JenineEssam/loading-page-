import React, { useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const femaleParticlesRef = useRef(null);
  const maleParticlesRef = useRef(null);

  useEffect(() => {
    class MetabolismViz {
      constructor() {
        this.init();
      }

      init() {
        this.setupParticles();
        this.startAnimation();
      }

      setupParticles() {
        // Create female particles
        this.createParticles('femaleParticles', '#ec4899', {
          count: 18,
          speed: 0.6,
          size: { min: 3, max: 7 }
        });

        // Create male particles  
        this.createParticles('maleParticles', '#3b82f6', {
          count: 20,
          speed: 0.8,
          size: { min: 3, max: 8 }
        });
      }

      createParticles(containerId, color, config) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        for (let i = 0; i < config.count; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          
          const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const delay = Math.random() * 6;
          
          Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${startX}%`,
            top: `${startY}%`,
            background: color,
            animationDelay: `${delay}s`,
            animationDuration: `${8 + Math.random() * 6}s`
          });
          
          container.appendChild(particle);
        }
      }

      startAnimation() {
        // Female animation (slower, sustained)
        setTimeout(() => {
          const femalePill = document.getElementById('femalePill');
          if (femalePill) {
            femalePill.style.setProperty('--fall-duration', '4s');
            femalePill.style.setProperty('--dissolve-duration', '6s');
            femalePill.classList.add('falling');
            
            setTimeout(() => {
              femalePill.classList.remove('falling');
              femalePill.classList.add('dissolving');
              this.createBubbles('female', 15, 5000);
            }, 4000);
          }
        }, 1000);

        // Male animation (faster, rapid)
        setTimeout(() => {
          const malePill = document.getElementById('malePill');
          if (malePill) {
            malePill.style.setProperty('--fall-duration', '2.5s');
            malePill.style.setProperty('--dissolve-duration', '3.5s');
            malePill.classList.add('falling');
            
            setTimeout(() => {
              malePill.classList.remove('falling');
              malePill.classList.add('dissolving');
              this.createBubbles('male', 18, 3000);
            }, 2500);
          }
        }, 1200);
      }

      createBubbles(type, count, duration) {
        const container = document.getElementById(type === 'female' ? 'femaleParticles' : 'maleParticles');
        if (!container) return;
        
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 8 + 4;
            const startX = 45 + Math.random() * 10;
            const bubbleDuration = 2000 + Math.random() * 1500;
            
            Object.assign(bubble.style, {
              width: `${size}px`,
              height: `${size}px`,
              left: `${startX}%`,
              bottom: '40%',
              '--bubble-duration': `${bubbleDuration}ms`
            });
            
            container.appendChild(bubble);
            
            setTimeout(() => {
              if (bubble.parentNode) bubble.remove();
            }, bubbleDuration);
          }, i * (duration / count));
        }
      }

      resetAnimation() {
        const femalePill = document.getElementById('femalePill');
        const malePill = document.getElementById('malePill');
        
        if (femalePill) femalePill.className = 'pill';
        if (malePill) malePill.className = 'pill';
        
        setTimeout(() => this.startAnimation(), 200);
      }
    }

    // Initialize visualization
    const viz = new MetabolismViz();
    
    // Restart animation every 10 seconds
    const intervalId = setInterval(() => viz.resetAnimation(), 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container">
      <div className="panel female" id="female">
        <div className="header">
          <div className="icon">♀</div>
          <h1 className="title">Female Metabolism</h1>
          <p className="subtitle">Sustained Processing</p>
        </div>
        
        <div className="viz-area">
          <div className="sea">
            <div className="wave-layer"></div>
            <div className="wave-layer-2"></div>
            <div className="wave-layer-3"></div>
            <svg className="wave-svg" viewBox="0 0 800 150" preserveAspectRatio="none">
              <path d="M0,40 C100,10 250,80 400,40 C550,10 700,60 800,40 L800,150 L0,150 Z" 
                    fill="#fce7f3" opacity="0.7">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-120,0;0,0" dur="14s" repeatCount="indefinite"/>
              </path>
              <path d="M0,60 C120,20 280,100 400,60 C520,20 680,80 800,60 L800,150 L0,150 Z" 
                    fill="#fce7f3" opacity="0.5">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-100,0;0,0" dur="12s" repeatCount="indefinite"/>
              </path>
              <path d="M0,80 C180,40 320,120 480,80 C620,40 720,100 800,80 L800,150 L0,150 Z" 
                    fill="#fce7f3" opacity="0.3">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;80,0;0,0" dur="8s" repeatCount="indefinite"/>
              </path>
              <path d="M0,100 C80,80 240,120 400,100 C560,80 720,110 800,100 L800,150 L0,150 Z" 
                    fill="#fce7f3" opacity="0.2">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-60,0;0,0" dur="15s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          <div className="pill" id="femalePill"></div>
          <div className="particles" id="femaleParticles" ref={femaleParticlesRef}></div>
          <div className="chart-dots">
            <div className="chart-dot"></div>
            <div className="chart-dot"></div>
            <div className="chart-dot active"></div>
            <div className="chart-dot"></div>
          </div>
          <div className="ingestion">INGESTION</div>
        </div>
      </div>

      <div className="panel male" id="male">
        <div className="header">
          <div className="icon">♂</div>
          <h1 className="title">Male Metabolism</h1>
          <p className="subtitle">Rapid Processing</p>
        </div>
        
        <div className="viz-area">
          <div className="sea">
            <div className="wave-layer"></div>
            <div className="wave-layer-2"></div>
            <div className="wave-layer-3"></div>
            <svg className="wave-svg" viewBox="0 0 800 150" preserveAspectRatio="none">
              <path d="M0,45 C110,10 270,85 400,45 C530,10 690,65 800,45 L800,150 L0,150 Z" 
                    fill="#dbeafe" opacity="0.6">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-110,0;0,0" dur="11s" repeatCount="indefinite"/>
              </path>
              <path d="M0,70 C150,30 350,110 500,70 C650,30 700,50 800,70 L800,150 L0,150 Z" 
                    fill="#dbeafe" opacity="0.4">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-100,0;0,0" dur="8s" repeatCount="indefinite"/>
              </path>
              <path d="M0,90 C200,50 400,130 600,90 C700,70 750,80 800,90 L800,150 L0,150 Z" 
                    fill="#dbeafe" opacity="0.3">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;120,0;0,0" dur="5s" repeatCount="indefinite"/>
              </path>
              <path d="M0,110 C100,90 300,130 500,110 C650,90 750,100 800,110 L800,150 L0,150 Z" 
                    fill="#dbeafe" opacity="0.2">
                <animateTransform attributeName="transform" type="translate"
                  values="0,0;-90,0;0,0" dur="9s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          <div className="pill" id="malePill"></div>
          <div className="particles" id="maleParticles" ref={maleParticlesRef}></div>
          <div className="chart-dots">
            <div className="chart-dot"></div>
            <div className="chart-dot"></div>
            <div className="chart-dot active"></div>
            <div className="chart-dot"></div>
          </div>
          <div className="ingestion">INGESTION</div>
        </div>
      </div>
    </div>
  );
}
