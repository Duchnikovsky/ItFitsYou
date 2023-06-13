"use client";
import { useState } from 'react';
import CSS from '../styles/RightPanel.module.css'
import Calculator from './Calculator';

export default function RightPanel() {
  return (
    <div className={CSS.rightPanel}>
      <Calculator />
    </div>
  )
}
