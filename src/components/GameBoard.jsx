import { useEffect, useState } from 'react';
import {candyData} from "../utils/candyData"
import {checkColumnFour,checkColumnThree,checkRowFour,checkRowThree} from "../utils/checkMatch"
import {moveBelow} from "../utils/moveCandy"
import Score from './Score';
import three from '../assets/three.wav'
import four from '../assets/four.wav'
import drag from '../assets/drag.wav'
import SoundBar from './SoundBar';
const GameBoard = () => {
    const [candies, setCandies] = useState([])
    const [columnCount, setColumnCount] = useState(0); 
    const [draggedCandy, setDraggedCandy] = useState(null)
    const [replacedCandy, setReplacedCandy] = useState(null)
    const [userName, setUserName] = useState('');
    const [score, setScore] = useState(0)
    const music=localStorage.getItem("music");
    const handleInputChange = (event) => {
    const { value } = event.target;
    setColumnCount(Number(value)); 
    setCandies([])
    }
    const createBoard = () => {
        const createdCandies = []
        for (let i = 0; i < columnCount * columnCount; i++) {
            const randomCandy = candyData[Math.floor(Math.random() * candyData.length)]
            createdCandies.push(randomCandy)
        }
        setCandies(createdCandies)
    }
    useEffect(() => { 
        setScore(score)
    }, [columnCount])

    useEffect(() => {
      const timer = setInterval(() => {
        checkColumnFour(columnCount, candies)
        checkRowFour(columnCount, candies)
        checkColumnThree(columnCount, candies)      
        checkRowThree(columnCount, candies)
        moveBelow(columnCount, candies)
        setCandies([...candies])
      }, 100)
      return () => clearInterval(timer)
  }, [columnCount,candies])
  const dragStart = (e) => {
    setDraggedCandy(e.target)
    const audio = new Audio(drag);
    music==='true'?audio.play():audio.pause()
}
const dragDrop = (e) => {
  setReplacedCandy(e.target)
}
const dragEnd = () => {
  const draggedCandyId = parseInt(draggedCandy.getAttribute('data-id'))
  const replacedCandyId = parseInt(replacedCandy.getAttribute('data-id'))
  candies[replacedCandyId] = draggedCandy.getAttribute('src')
  candies[draggedCandyId] = replacedCandy.getAttribute('src')
  const validMoves = [
    draggedCandyId - 1,
    draggedCandyId - columnCount,
    draggedCandyId + 1,
    draggedCandyId + columnCount
  ]
  const validMove = validMoves.includes(replacedCandyId)
 if(replacedCandyId &&
  validMove===true){
   const isAColumnOfFour = checkColumnFour(columnCount, candies)
  const isARowOfFour =  checkRowFour(columnCount, candies)
  const isAColumnOfThree = checkColumnThree(columnCount, candies) 
  const isARowOfThree = checkRowThree(columnCount, candies)
 if(isARowOfFour || isAColumnOfFour){
  setScore((score)=>score+4)
  localStorage.setItem(userName, score.toString());
  const audio = new Audio(four);
  music==='true'?audio.play():audio.pause()
  setDraggedCandy(null)
  setReplacedCandy(null)
 } else if(isARowOfThree || isAColumnOfThree){
  setScore((score)=>score+3)
  localStorage.setItem(userName, score.toString());
  const audio = new Audio(three);
  music==='true'?audio.play():audio.pause()
  setDraggedCandy(null)
  setReplacedCandy(null)
 }else {
  candies[replacedCandyId] = replacedCandy.getAttribute('src')
  candies[draggedCandyId] = draggedCandy.getAttribute('src')
  setCandies([...candies])
 }
} else {
  candies[replacedCandyId] = replacedCandy.getAttribute('src')
  candies[draggedCandyId] = draggedCandy.getAttribute('src')
  setCandies([...candies])
}
}
const handleChange = (event) => {
  setUserName(event.target.value);
};
const handlePlayClick = () => {
  if(userName===''){
  alert("Please Enter Player Name.")
}else{
 const savedScore = localStorage.getItem(userName);
  setScore(Number(savedScore));
 createBoard()
}
};
 const newGame=()=>{
  setCandies([])
  setScore(0)
  setColumnCount(0)
  setUserName('')
 }
  return (
    <>
    <div className='gameHeader'>
      <div className='gameSetting'>
      <input 
      type="text" 
      placeholder='Enter Player Name'
      value={userName} 
      onChange={handleChange}
      required
       />
      <select 
      id="columnCount" 
      name="myDropdown" 
      defaultValue={"placeholder"}
      onChange={handleInputChange}>
      <option value={"placeholder"} >--Select Board Size--</option>
      <option value="8">8 x 8</option>
      <option value="10">10 x 10</option>
      <option value="12">12 x 12</option>
      <option value="14">14 x 14</option>
      </select>
      <div className='buttons'>
   <button onClick={handlePlayClick}>Play</button>
   <SoundBar/>
      <button onClick={newGame}>New Game</button>
    </div>
    </div>
    <Score score={score} />
    </div>
    <div className='gameBoard'
    style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
         {candies.map((candy, index) => (
                    <img
                        key={index}
                        src={candy}
                        alt={candy}
                        className="candy"
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}         
    </div>
    </>
  )
}

export default GameBoard