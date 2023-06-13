"use client";
import { FormEvent, useState } from 'react';
import CSS from '../styles/RightPanel.module.css'
import CalculatorResult from './CalculatorResult';

export default function Calculator() {
  const [gender, setGender] = useState(2)
  const [values, setValues]:any = useState({
    age: '',
    height: '',
    weight: '',
    activity: '',
  })
  const [formVisible, setFormVisible] = useState(true)

  function handleSubmit(e:FormEvent){
    e.preventDefault()
    
  }

  return (
      <div className={CSS.needsCalculator}>
        <span className={CSS.header}>CALORIE CALCULATOR</span><br></br>
        {formVisible &&
        <form className={CSS.form}>
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
                }}>
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
                }}>
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
            <button className={CSS.button} onClick={handleSubmit}>CALCULATE</button>
          </div>
        </form> || <CalculatorResult />}
      </div>
  )
}
