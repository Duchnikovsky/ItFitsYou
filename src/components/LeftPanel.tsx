"use client";
import { useEffect, useState } from 'react'
import CSS from '../styles/LeftPanel.module.css'
import ProgressBar from './ProgressBar';

export default function LeftPanel() {
  const [activeDay, setActiveDay] = useState(10)

  function changeDayHandler(day:number){
    setActiveDay(day)
  }

  useEffect(() => {
    const date = new Date()
    setActiveDay(date.getDay())
  },[])

  const needs={
    kcal: 2700,
    carbohydrates: 479,
    fat: 91,
    protein: 137,
  }

  return (
    <div className={CSS.leftPanel}>
      <div className={CSS.days}>
        <div className={`${activeDay === 1 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(1)}>MON</div>
        <div className={`${activeDay === 2 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(2)}>TUE</div>
        <div className={`${activeDay === 3 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(3)}>WED</div>
        <div className={`${activeDay === 4 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(4)}>THU</div>
        <div className={`${activeDay === 5 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(5)}>FRI</div>
        <div className={`${activeDay === 6 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(6)}>SAT</div>
        <div className={`${activeDay === 0 ? CSS.dayActive : CSS.day}`} onClick={() => changeDayHandler(0)}>SUN</div>
      </div>
      

      <div className={CSS.mealBox}>
        <div className={CSS.mealHeader}>
          BREAKFAST
          <span className={CSS.kcal}>0 kcal</span>
        </div>
        <div className={CSS.buttonBox}>
          <button className={CSS.addButton}>+</button>
        </div>
      </div>
      <div className={CSS.mealBox}>
        <div className={CSS.mealHeader}>
          II BREAKFAST
          <span className={CSS.kcal}>0 kcal</span>
        </div>
        <div className={CSS.buttonBox}>
          <button className={CSS.addButton}>+</button>
        </div>
      </div>
      <div className={CSS.mealBox}>
        <div className={CSS.mealHeader}>
          LUNCH
          <span className={CSS.kcal}>0 kcal</span>
        </div>
        <div className={CSS.buttonBox}>
          <button className={CSS.addButton}>+</button>
        </div>
      </div>
      <div className={CSS.mealBox}>
        <div className={CSS.mealHeader}>
          DINNER
          <span className={CSS.kcal}>0 kcal</span>
        </div>
        <div className={CSS.buttonBox}>
          <button className={CSS.addButton}>+</button>
        </div>
      </div>
      <div className={CSS.mealBox}>
        <div className={CSS.mealHeader}>
          SNACKS
          <span className={CSS.kcal}>0 kcal</span>
        </div>
        <div className={CSS.buttonBox}>
          <button className={CSS.addButton}>+</button>
        </div>
      </div>
      <div className={CSS.summaryBox}>
        <b>SUMMARY</b>
        <div className={CSS.kcalBox}>
          <span className={CSS.needHeader}><b>KCAL</b></span><br></br>
          <span className={CSS.needComp}>1350<b>/</b>2700</span>
          <div className={CSS.progressBar}>
            <ProgressBar value={1350} maxValue={2700}/>
          </div>
        </div>
        <div className={CSS.needsBox}>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>CARBOHYDRATES</b></span><br></br>
            <span className={CSS.needComp}>1350<b>/</b>2700</span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={1350} maxValue={2700}/>
            </div>
          </div>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>FATS</b></span><br></br>
            <span className={CSS.needComp}>1350<b>/</b>2700</span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={1350} maxValue={2700}/>
            </div>
          </div>
          <div className={CSS.needs}>
            <span className={CSS.needHeader}><b>PROTEINS</b></span><br></br>
            <span className={CSS.needComp}>1350<b>/</b>2700</span>
            <div className={CSS.needProgressBar}>
              <ProgressBar value={1350} maxValue={2700}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
