import { useEffect, useState } from "react"
import CSS from '../styles/ProgressBar.module.css'

type PropsTypes = {
  value: number,
  maxValue: number,
}

export default function ProgressBar({value, maxValue}:PropsTypes) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress((value/maxValue) * 100)
  },[value])

  return (
    <div className={CSS.progressBar}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#2d2d2d',
        borderRadius: '5px',
      }}>
        
      </div>
    </div>
  )
}
