import {candyData} from "./candyData"
import blank from '../assets/CandyCrush.png'

export const moveBelow = (columnCount,candies) => {
    const lastMove=candies.length-columnCount-1
    for (let i = 0; i <= lastMove; i++) {
        const firstRow = []
        for(let j=1;j<=columnCount;j++)
        {
            firstRow.push(j-1)
        }
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && candies[i] === blank) {
            let randomNumber = Math.floor(Math.random() * candyData.length)
            candies[i] = candyData[randomNumber]
        }
        if ((candies[i + columnCount]) === blank) {
            candies[i + columnCount] = candies[i]
            candies[i] = blank
        }
    }
}
