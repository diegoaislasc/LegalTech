'use client';

import React from 'react';
import GradientText from './gradient-text';

export function NovalexLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <GradientText
        colors={['#A88B5A', '#D4AF37', '#8E764B', '#A88B5A']}
        animationSpeed={4}
        showBorder={false}
        className="h-full flex items-center"
      >
        <span 
          style={{ 
            fontFamily: 'Michroma, sans-serif', 
            fontWeight: 'bold', 
            fontSize: '28px', 
            letterSpacing: '2px',
            lineHeight: '1'
          }}
          className="select-none"
        >
          NOVALEX
        </span>
      </GradientText>
    </div>
  );
}
