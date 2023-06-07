"use client";
import { useState } from 'react';
import CSS from '../styles/RightPanel.module.css'

export default function RightPanel() {
  const [gender, setGender] = useState(2)
  const [genderBMI, setGenderBMI] = useState(2)
  const [values, setValues]:any = useState({
    age: '',
    height: '',
    weight: '',
    activity: '',
  })


  return (
    <div className={CSS.rightPanel}>
      <div className={CSS.needsCalculator}>
        <span className={CSS.header}>CALORIE CALCULATOR</span><br></br>
        <form className={CSS.form}>
          <div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Age</b>:</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Height</b> (cm):</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Weight</b> (kg):</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
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
                <select name="activity" id="activity" className={CSS.input} style={{
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
            <button className={CSS.button}>CALCULATE</button>
          </div>
        </form>
      </div>
      <div className={CSS.bmiCalculator}>
      <span className={CSS.header}>BMI CALCULATOR</span><br></br>
        <form className={CSS.form}>
          <div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Age</b>:</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Height</b> (cm):</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
            <div className={CSS.inputBox}>
              <div className={CSS.labelBox}><b>Weight</b> (kg):</div>
              <input type='text' name='wiek' required className={CSS.input} style={{
                width: '50px',
                height: '34px',
              }}></input>
            </div>
          </div>
          <div className={CSS.genderBox}>
              <b>Pick gender:</b>
              <div className={`${genderBMI === 0 ? CSS.genderPicked : CSS.genderPick}`} onClick={() => setGenderBMI(0)}>MAN</div>
              <div className={`${genderBMI === 1 ? CSS.genderPicked : CSS.genderPick}`} onClick={() => setGenderBMI(1)}>WOMAN</div>
          </div>
          <div className={CSS.buttonBoxBMI}>
            <button className={CSS.button}>CALCULATE</button>
          </div>
        </form>
      </div>
    </div>
  )
}
