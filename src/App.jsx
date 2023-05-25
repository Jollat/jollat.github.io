import { useState } from 'react'
import { TbDroplet, TbSearch } from 'react-icons/tb'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const dataArr = Object.entries(data)
  console.log(dataArr)

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=ru&appid=82e43bfde1f68ae9d5ebe65ce5486863&units=metric`
  const urlIcon = data.city
    ? `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    : null

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const searchLocationHandler = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }

  let date = new Date()
  let dateMonth = new Date().toLocaleString('ru', { month: 'long' })
  let month = dateMonth[0].toUpperCase() + dateMonth.slice(1)

  return (
    <>
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Введите город"
        ></input>
        <button onClick={searchLocationHandler}>
          <TbSearch />
        </button>
      </div>
      <div className="app">
        <div className="location">
          <p>{data.city ? data.city.name : null}</p>
        </div>
        <div className="main_container">
          <div className="container">
            <>
              {data.city ? (
                <div className="temp">
                  <div className="main">
                    <p>
                      {month}, {date.getDate()}
                    </p>
                    <img src={urlIcon} />
                    <div className="description">
                      {data.city ? (
                        <p>
                          {data.list[0].weather[0].description[0].toUpperCase() +
                            data.list[0].weather[0].description.slice(1)}{' '}
                        </p>
                      ) : null}
                    </div>
                    <div className="main_temp">
                      <p>{data.list[0].main.temp.toFixed()} °С</p>
                    </div>
                    {data.city ? (
                      <div className="feels">
                        <p>
                          Ощущается: {data.list[0].main.feels_like.toFixed()} °С
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
            <>
              {data.city ? (
                <div className="info_container">
                  <div className="humidity">
                    {data.city ? (
                      <>
                        <img src="./public/raindrop.svg" />
                        <p>{data.list[0].main.humidity} %</p>
                      </>
                    ) : null}
                  </div>
                  <div className="pressure">
                    {data.city ? (
                      <>
                        <img src="./public/pressure.svg" />
                        <p>{data.list[0].main.pressure} мм рт. ст.</p>
                      </>
                    ) : null}
                  </div>
                  <div className="pressure">
                    {data.city ? (
                      <>
                        <img src="./public/wind.svg" />
                        <p>{data.list[0].wind.speed} м/с</p>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          </div>
          <div className="weather_time">
            {data.city
              ? dataArr.map((index, item) => {
                  return data.city ? (
                    <div className="container_time" key={index}>
                      <div className="date_time">
                        <p>
                          {month}, {data.list[item].dt_txt.slice(8, 10)}
                        </p>
                        <p>{data.list[item].dt_txt.slice(10, 16)}</p>
                      </div>
                      <div className="pict_time">
                        <img
                          src={
                            data.city
                              ? `https://openweathermap.org/img/wn/${data.list[item].weather[0].icon}@2x.png`
                              : null
                          }
                        />
                        <p>{data.list[0].main.temp.toFixed()} °С</p>
                      </div>
                      <div>
                        <div className="pressure_time">
                          <img src="./public/raindrop.svg" />
                          <p>{data.list[item].main.humidity} %</p>
                        </div>
                        <div className="pressure_time">
                          <img src="./public/wind.svg" />
                          <p>{data.list[item].wind.speed} м/с</p>
                        </div>
                      </div>
                    </div>
                  ) : null
                })
              : null}
          </div>
        </div>
        <div className="second_container">
          {data.city
            ? dataArr[3][1].map((index, item) => {
                if (dataArr[3][1][item].dt_txt.slice(8, 10) != date.getDate()) {
                  if (dataArr[3][1][item].dt_txt.slice(11, 16) == '12:00') {
                    return (
                      <div className="second_weather">
                        <div className="second_date">
                          <p>
                            {month}, {data.list[item].dt_txt.slice(8, 10)}
                          </p>
                        </div>
                        <div className="second_pct">
                          <img
                            src={
                              data.city
                                ? `https://openweathermap.org/img/wn/${data.list[item].weather[0].icon}@2x.png`
                                : null
                            }
                          />
                        </div>
                        <div className="second_status">
                          <p>
                            {data.list[
                              item
                            ].weather[0].description[0].toUpperCase() +
                              data.list[item].weather[0].description.slice(
                                1
                              )}{' '}
                          </p>
                        </div>
                        <div className="second_temp">
                          <p>{data.list[item].main.temp.toFixed()} °С</p>
                        </div>
                        <div className="second_time_box">
                          <div className="second_time">
                            <img src="./public/raindrop.svg" />
                            <p>{data.list[item].main.humidity} %</p>
                          </div>
                          <div className="second_time">
                            <img src="../public/pressure.svg" />
                            <p>{data.list[item].main.pressure} мм</p>
                          </div>
                          <div className="second_time">
                            <img src="./public/wind.svg" />
                            <p>{data.list[item].wind.speed} м/с</p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
              })
            : null}
        </div>
      </div>
    </>
  )
}

export default App
