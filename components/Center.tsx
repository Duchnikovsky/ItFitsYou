import { useEffect, useState } from 'react'
import CSS from '../styles/Center.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'

interface PropsType {
  meal: number,
  day: Date,
  refreshMeals: () => void,
  closePanel: () => void,
}

interface DetailsType {
  id: string,
  name: string,
  kcal: number,
  carbohydrate: string,
  fat: string,
  protein: string,
}

export default function Center(props: PropsType) {
  const [value, setValue] = useState('')
  const [data, setData]: any = useState([])
  const [details, setDetails] = useState<DetailsType>({
    id: '',
    name: '',
    kcal: 0,
    carbohydrate: '',
    fat: '',
    protein: '',
  })
  const [serving, setServing] = useState(0)
  const [meal, setMeal] = useState(10)
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    setMeal(props.meal)
    setValue('')
    setData([])
    setSearching(true)
    setServing(0)
  }, [props.meal, props.day])

  async function fetchList() {
    const res = await fetch('api/search', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        searchValue: value,
      })
    })
    const result = await res.json()
    setData(result)
    if (res) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (value.length > 2) {
      setLoading(true)
      fetchList()
    }
  }, [value])

  function showDetails(e: DetailsType) {
    setSearching(false)
    setDetails(e)
  }

  async function addHandler() {
    if (serving > 0) {
      setLoading(true)
      if (session && session.user) {
        const res = await fetch('/api/food', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email!,
            category: meal,
            foodId: details.id,
            serving: serving,
            day: props.day,
          })
        })
        const result = await res.json()
        console.log(result)
        if (result.type === 1) {
          setLoading(false)
          setMeal(props.meal)
          setValue('')
          setData([])
          setSearching(true)
          setServing(0)
          props.refreshMeals()
        }
      }
    }
  }

  return (
    <>
      <div className={CSS.centerPanel}>
        {searching ? <>
          <div className={CSS.barDiv}>
            <input type='text' className={CSS.searchBar} autoComplete='no' spellCheck="false" placeholder='Search for products' maxLength={30} value={value} onChange={(e) => setValue(e.target.value)}></input>
            <button className={CSS.clearButton} onClick={() => props.closePanel()}>CLOSE</button>
          </div>
          <div className={CSS.productsDiv}>
            {(loading || data.length < 1 || value.length < 3) ? <div className={CSS.spinDiv}><FontAwesomeIcon icon={faRotate} spin /></div> :
              <>
                {
                  data.food.map((e: any, index: any) => (
                    <div className={CSS.productRow} key={index} onClick={() => showDetails(e)}>
                      <div className={CSS.productName}>{e.name}</div>
                      <div className={CSS.kcalin100}>{e.kcal} kcal in 100g</div>
                    </div>
                  ))
                }
              </>}
          </div>
        </> : <>
          {(details.kcal !== 0) ? <div className={CSS.productDetailsDiv}>
            <div className={CSS.productDetailsName}>{details.name}</div>
            <div className={CSS.lowerTextName}>Nutritional values for <b>100g</b> of the product:</div>
            <div className={CSS.kcalBox}>
              <div><b>{details.kcal}</b></div>
              <div className={CSS.lowerText}>CALORIES</div>
            </div>
            <div className={CSS.nutritionalBox}>
              <div className={CSS.carbohydratesBox}>
                <div className={CSS.nutrionalText}><b>{details.carbohydrate}</b></div>
                <div className={CSS.lowerText}>CARBOHYDRATES</div>
              </div>
              <div className={CSS.fatsBox}>
                <div className={CSS.nutrionalText}><b>{details.fat}</b></div>
                <div className={CSS.lowerText}>FATS</div>
              </div>
              <div className={CSS.proteinsBox}>
                <div className={CSS.nutrionalText}><b>{details.protein}</b></div>
                <div className={CSS.lowerText}>PROTEINS</div>
              </div>
            </div>
            <div>
              <div className={CSS.lowerTextName}>Enter serving size(in grams):</div>
              <input type='number' name='quantity' className={CSS.input} pattern={'^[0-9]{1,4}$'} maxLength={4} value={serving} onChange={(e) => setServing(parseInt(e.target.value))}></input>
              <div className={CSS.kcalBox}>
                <div><b>{serving > 0 ? Math.ceil(serving * (details.kcal / 100)) : 0}</b></div>
                <div className={CSS.lowerText}>CALORIES IN SERVING</div>
              </div>
              {loading ? <button className={CSS.addButton} disabled><FontAwesomeIcon icon={faRotate} spin width={'15px'} /></button> : <button className={CSS.addButton} onClick={addHandler}>+</button>}
            </div>
          </div> : <></>}
        </>}
      </div>
    </>
  )
}
