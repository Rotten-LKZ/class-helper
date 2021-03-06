import './style.css'
import { useState, useEffect } from 'react'

let _isRandoming = false
export function Random() {
  const [nowName, setNowName] = useState("敬请期待")
  const [nameList, setNameList] = useState(window.Main.getConfigData().names)
  const [needRepeat, setNeedRepeat] = useState(false)
  const [isRandoming, setIsRandoming] = useState(false)
  const [nowOrder, setNowOrder] = useState(0)
  const [trigger, setTrigger] = useState(false)

  function toggleTrigger() {
    setTrigger(!trigger)
  }

  function start() {
    setIsRandoming(true)
    _isRandoming = true
    toggleTrigger()
  }

  function stop() {
    setIsRandoming(false)
    _isRandoming = false
    removeName(nowOrder)
  }

  function getRandomName() {
    const ranNum = randomNum(0, nameList.length - 1)
    setNowName(nameList[ranNum])
    removeName(ranNum)
  }

  function removeName(where: number) {
    if (!needRepeat) {
      let newNameList: string[] = JSON.parse(JSON.stringify(nameList))
      newNameList.splice(where, 1)
      if (newNameList.length === 0) {
        setNameList(window.Main.getConfigData().names)
      } else {
        setNameList(newNameList)
      }
    }
  }

  function refreshPage() {
    window.location.reload()
  }

  function randomNum(min: number,max: number) { 
    let n = max - min
    if (n == 0) {
        return max
    } else if (n < 0) {
        [max, min] = [min, max]
        n = Math.abs(n)
    }

    return ((Math.random() * ++n) >> 0) + min;
  }

  function changeRemoveName() {
    setNeedRepeat(!needRepeat)
  }

  function needRestPeople() {
    return needRepeat ? {display: 'none'} : {}
  }

  function isRandomingStyle(type: boolean) {
    if (type === isRandoming) {
      return {}
    } else {
      return {display: 'none'}
    }
  }

  useEffect(() => {
    if (!needRepeat) {
      setNameList(window.Main.getConfigData().names)
    }
  }, [needRepeat])

  useEffect(() => {
    if (window.Main.getConfigData().randomType === 0) {
      setNowName(nameList[nowOrder])
    }
  }, [nowOrder])

  useEffect(() => {
    if (_isRandoming) {
      if (nowOrder >= (nameList.length - 1)) {
        setNowOrder(0)
      } else {
        setNowOrder(nowOrder + 1)
      }
      setTimeout(toggleTrigger, 80)
    }
  }, [trigger])

  return (
    <div className="random">
      <h2>幸运大抽奖</h2>
      <p>幸运儿<span style={needRestPeople()}>（本轮还剩 {nameList.length} 人没抽）</span>：</p>
      <h1 className="goal">{nowName}</h1>
      {
        window.Main.getConfigData().randomType === 0 ? (
          <>
            <button className="main" onClick={start} style={isRandomingStyle(false)}>谁是幸运儿呢？</button>
            <button className="main" onClick={stop} style={isRandomingStyle(true)}>就你啦</button>
          </>
        ) : (
          <button className="main" onClick={getRandomName}>随机</button>
        )
      }
      <button className="refresh" onClick={refreshPage}>刷新</button><br />
      <label htmlFor="needRepeat">是否重复抽取（点击即生效）：</label>
      <input type="checkbox" name="needRepeat" onChange={changeRemoveName} checked={needRepeat} />
    </div>
  )
}