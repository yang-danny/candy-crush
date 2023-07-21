import blank from '../assets/CandyCrush.png'
export const checkColumnFour = (columnCount, candies) => {
    const lastCheck=candies.length-columnCount*3-1
     for (let i = 0; i <= lastCheck; i++) {
        const columnOfFour = [i, i + columnCount, i + columnCount * 2, i + columnCount * 3]
        const decidedCandy = candies[i]
        const isBlank = candies[i] === blank
        if (columnOfFour.every(square => candies[square] === decidedCandy && !isBlank)) {
            columnOfFour.forEach(square => candies[square] = blank)
            return true
        }
    }
}
export const checkRowFour = (columnCount, candies) => {
    const lastCheck=candies.length-3
    for (let i = 0; i <= lastCheck; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3]
        const decidedCandy = candies[i]
        const notValid = []
        for (let j=1; j<=columnCount; j++){
            notValid.push(j*columnCount-3)
            notValid.push(j*columnCount-2)
            notValid.push(j*columnCount-1)
        }
        const isBlank = candies[i] === blank
        if (notValid.includes(i)) continue
        if (rowOfFour.every(square => candies[square] === decidedCandy && !isBlank)) {
            rowOfFour.forEach(square => candies[square] = blank)
            return true
        }
    }
}
export const checkRowThree = (columnCount, candies) => {
    const lastCheck=candies.length-2
    for (let i = 0; i <= lastCheck; i++) {
        const rowOfFour = [i, i + 1, i + 2]
        const decidedCandy = candies[i]
        const notValid = []
        for (let j=1; j<=columnCount; j++){
            notValid.push(j*columnCount-2)
            notValid.push(j*columnCount-1)
        }
        const isBlank = candies[i] === blank
        if (notValid.includes(i)) continue
        if (rowOfFour.every(square => candies[square] === decidedCandy && !isBlank)) {
            rowOfFour.forEach(square => candies[square] = blank)
            return true
        }
    }
}
export const checkColumnThree = (columnCount, candies) => {
    const lastCheck=candies.length-columnCount*2-1  
      for (let i = 0; i <= lastCheck; i++) {
          const columnOfFour = [i, i + columnCount, i + columnCount * 2]
          const decidedCandy = candies[i]
          const isBlank = candies[i] === blank
          if (columnOfFour.every(square => candies[square] === decidedCandy && !isBlank)) {
              columnOfFour.forEach(square => candies[square] = blank)
              return true
          }    
      }
    }