"use client";
import { useEffect, useRef, useState } from 'react'
import CSS from '../styles/LeftPanel.module.css'
import CenterPanel from './CenterPanel';
import Days from './Days';
import { getSession, useSession } from 'next-auth/react';
import Summary from './Summary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

interface FoodTypes {
  mealId: string,
  id: string,
  name: string,
  kcal: number,
  carbohydrate: number,
  fat: number,
  protein: number,
}

interface MealTypes {
  id: string,
  userEmail: string,
  category: number,
  food: FoodTypes,
  foodId: string,
  serving: number,
  day: Date,
}

interface Meal {
  id: number,
  name: string,
  food: FoodTypes[],
  kcalCount: number,
}


export default function LeftPanel() {
  const [centerVisible, setCenterVisible] = useState(false)
  const { data: session } = useSession()

  const [meals, setMeals]: any = useState<Meal[]>([
    { id: 0, name: 'BREAKFAST', food: [], kcalCount: 0 },
    { id: 1, name: 'II BREAKFAST', food: [], kcalCount: 0 },
    { id: 2, name: 'LUNCH', food: [], kcalCount: 0 },
    { id: 3, name: 'DINNER', food: [], kcalCount: 0 },
    { id: 4, name: 'SNACKS', food: [], kcalCount: 0 },
  ])
  const [values, setValues] = useState<number[]>([0, 0, 0, 0])

  const [selectedMeal, setSelectedMeal] = useState(10)
  const [selectedDay, setSelectedDay] = useState(new Date())
  const firstLoad = useRef(true)
  const [loading, setLoading] = useState(true)
  const [removeBlocked, setRemoveBlocked] = useState(false)

  async function addFood(index: number) {
    if (session && session.user) {
      setCenterVisible(true)
      setSelectedMeal(index)
    }
  }

  function changeDay(e: any) {
    setSelectedDay(e.date)
  }

  async function fetchMeals() {
    const checkSession = await getSession()
    if (checkSession && checkSession.user) {
      const initialMeals: Meal[] = [
        { id: 0, name: 'BREAKFAST', food: [], kcalCount: 0 },
        { id: 1, name: 'II BREAKFAST', food: [], kcalCount: 0 },
        { id: 2, name: 'LUNCH', food: [], kcalCount: 0 },
        { id: 3, name: 'DINNER', food: [], kcalCount: 0 },
        { id: 4, name: 'SNACKS', food: [], kcalCount: 0 },
      ]
      const initValues = [0, 0, 0, 0]
      setMeals(initialMeals)
      setValues(initValues)
      const newValues = [...initValues]
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meal`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: checkSession.user.email!,
          day: selectedDay,
        })
      })
      const result = await res.json()
      if (result.type === 1) {
        if (result.meals.length > 0) {
          const newMeals: Meal[] = [...initialMeals]
          result.meals.forEach((element: MealTypes) => {
            const category = element.category
            const mealIndex = newMeals.findIndex((meal: Meal) => meal.id === category)

            if (mealIndex !== -1) {
              const kcal = Math.ceil((element.food.kcal / 100) * element.serving)
              const carbohydrate = Math.ceil((element.food.carbohydrate / 100) * element.serving)
              const fat = Math.ceil((element.food.fat / 100) * element.serving)
              const protein = Math.ceil((element.food.protein / 100) * element.serving)
              newMeals[mealIndex].kcalCount = newMeals[mealIndex].kcalCount + kcal
              newValues[0] = newValues[0] + kcal
              newValues[1] = newValues[1] + carbohydrate
              newValues[2] = newValues[2] + fat
              newValues[3] = newValues[3] + protein
              newMeals[mealIndex].food.push({mealId: element.id,id : element.food.id, name: element.food.name, kcal: kcal, carbohydrate: carbohydrate, fat: fat, protein: protein})
            }
          })
          setMeals(newMeals)
          setValues(newValues)
        }
      }
    }
    setLoading(false)
  }

  function refreshMeals() {
    setLoading(true)
    fetchMeals()
    setCenterVisible(false)
    setRemoveBlocked(false)
  }

  function closePanel() {
    setCenterVisible(false)
  }


  useEffect(() => {
    if (firstLoad.current === true) {
      firstLoad.current = false
      return
    }
    setLoading(true)
    fetchMeals()
  }, [selectedDay])

  async function removeMeal(e:FoodTypes){
    setRemoveBlocked(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/remove`,{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body:JSON.stringify({
        mealId: e.mealId,
      })
    })
    const result = await res.json()
    if(result.type === 1){
      refreshMeals()
    }
  }

  return (
    <>
      <div className={CSS.leftPanel}>
        <Days changeDay={changeDay} />
        <div className={CSS.mealsDiv}>
          {meals.map((e: Meal, index: number) => (
            <div className={CSS.mealBox} key={index}>
              <div className={CSS.mealHeader}>
                {e.name}
                <span className={CSS.kcal}>{e.kcalCount} kcal</span>
              </div>
              {
                meals[index].food.map((el: FoodTypes, i: number) => (
                  <div className={CSS.mealContent}>
                    <div className={CSS.mealContentHeader}>
                      <div>{el.name} <span className={CSS.mealKcal}>{el.kcal} kcal</span></div>
                      {removeBlocked ? <div className={CSS.remove}>X</div> : <div className={CSS.remove} onClick={() => removeMeal(el)}>X</div>}
                    </div>
                    <div className={CSS.nutritionalBox}>
                      <div className={CSS.nutrional}>
                        <div>{el.carbohydrate}</div>
                        <div className={CSS.lowerText}>Carbohydrates</div>
                      </div>
                      <div className={CSS.nutrional}>
                        <div>{el.fat}</div>
                        <div className={CSS.lowerText}>Fats</div>
                      </div>
                      <div className={CSS.nutrional}>
                        <div>{el.protein}</div>
                        <div className={CSS.lowerText}>Proteins</div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className={CSS.buttonBox}>
                {loading ? <div><FontAwesomeIcon icon={faRotate} spin className={CSS.spinWM} width={'30px'} /></div> : <>
                  {session ? <button className={CSS.addButton} onClick={() => addFood(index)}>+</button> : <button className={CSS.addButton} disabled>+</button>}</>}
              </div>
            </div>
          ))}
        </div>

        <div className={CSS.summaryBox}>
          <Summary values={values} />
        </div>
      </div>
      <div className={CSS.centerPanel}>
        {centerVisible && <CenterPanel meal={selectedMeal} day={selectedDay} refreshMeals={refreshMeals} closePanel={closePanel} />}
      </div>
    </>
  )
}
