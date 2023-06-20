import { useLayoutEffect, useRef, useState } from 'react';
import CSS from '../styles/Right.module.css'
import CalculatorResult from './CalculatorResult';

const activityMultiplier = [1.2, 1.375, 1.55, 1.725]
const goalMultiplier = [1, 1.2, 0.8]

export default function Calculator() {
  const [gender, setGender] = useState(2)
  const [values, setValues]:any = useState({
    age: '',
    height: '',
    weight: '',
    activity: '0',
    goal: '0',
  })
  const [formVisible, setFormVisible] = useState(true)
  const [result, setResult] = useState<Number[]>([])
  const firstUpdate = useRef(true);
  
  function handleSubmit(e:any){
    e.preventDefault()
    const age = Number(values.age)
    const height = Number(values.height)
    const weight = Number(values.weight)
    const activity = Number(values.activity)
    const goal = Number(values.goal)
    if(age > 0 && height > 0 && weight > 0 && gender !== 2){
      if(gender === 0){
        const PPM = Math.ceil(((66.5 + (13.75 * weight) + (5 * height) - (6.75) * age) * activityMultiplier[activity]) * goalMultiplier[goal])
        const lowCarbohydrates = Math.ceil((PPM/4)*(45/100))
        const highCarbohydrates = Math.ceil((PPM/4)*(65/100))
        const lowFats = Math.ceil((PPM/9)*(25/100))
        const highFats = Math.ceil((PPM/9)*(30/100))
        const lowProteins = Math.ceil((PPM/4)*(12/100))
        const highProteins = Math.ceil((PPM/4)*(2/10))
        setResult([PPM, lowCarbohydrates, highCarbohydrates, lowFats, highFats, lowProteins, highProteins])
      }else if(gender === 1){
        const PPM = Math.ceil(((655.1 + (9.56 * weight) + (1.85 * height) - (4.68) * age) * activityMultiplier[activity]) * goalMultiplier[goal])
        const lowCarbohydrates = Math.ceil((PPM/4)*(45/100))
        const highCarbohydrates = Math.ceil((PPM/4)*(65/100))
        const lowFats = Math.ceil((PPM/9)*(25/100))
        const highFats = Math.ceil((PPM/9)*(30/100))
        const lowProteins = Math.ceil((PPM/4)*(12/100))
        const highProteins = Math.ceil((PPM/4)*(2/10))
        setResult([PPM, lowCarbohydrates, highCarbohydrates, lowFats, highFats, lowProteins, highProteins])
      }
    }
  }

  useLayoutEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current = false
      return
    }
    setFormVisible(false)
  },[result])

  return (
      <div className={CSS.needsCalculator}>
        <span className={CSS.header}>CALORIE CALCULATOR</span><br></br>
        {formVisible &&
        <form className={CSS.form} onSubmit={handleSubmit}>
          <div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Age</b>:</div>
              <input type='number' name='age' required className={CSS.input} pattern={'^[0-9]{1,3}$'} maxLength={3} value={values['age']} onChange={(e) => setValues({...values, ['age']: e.target.value})} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Height</b> (cm):</div>
              <input type='number' name='height' required className={CSS.input} pattern={'^[0-9]{1,3}$'} maxLength={3} value={values['height']} onChange={(e) => setValues({...values, ['height']: e.target.value})} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Weight</b> (kg):</div>
              <input type='number' name='weight' required className={CSS.input} pattern={'^[0-9]{1,3}$'} maxLength={3} value={values['weight']} onChange={(e) => setValues({...values, ['weight']: e.target.value})} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div>
              <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Activity</b>:</div>
                <select name="activity" id="activity" className={CSS.input} style={{
                  width: '200px',
                  height: '34px',
                }} onChange={(e) => setValues({...values, ['activity']: e.target.value})}>
                  <option value="0">No activity</option>
                  <option value="1">1-3 exercises a week</option>
                  <option value="2">4-5 exercises a week</option>
                  <option value="3">6-7 exercises a week</option>
                </select>
              </div>
              <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Your goal</b>:</div>
                <select name="goal" id="goal" className={CSS.input} style={{
                  width: '140px',
                  height: '34px',
                }} onChange={(e) => setValues({...values, ['goal']: e.target.value})}>
                  <option value="0">Keep weight</option>
                  <option value="1">Gain weight</option>
                  <option value="2">Lose weight</option>
                </select>
              </div>
            </div>
          </div>
          <div className={CSS.genderBox}>
              <b>Pick gender:</b>
              <div className={`${gender === 0 ? CSS.genderPicked : CSS.genderPick}`} onClick={() => setGender(0)}>MAN</div>
              <div className={`${gender === 1 ? CSS.genderPicked : CSS.genderPick}`} onClick={() => setGender(1)}>WOMAN</div>
          </div>
          <div className={CSS.buttonBox}>
            <button className={CSS.button}>CALCULATE</button>
          </div>
        </form> || <CalculatorResult results={result}/>}
      </div>
  )
}
