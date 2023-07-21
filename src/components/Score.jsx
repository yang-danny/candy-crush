
const Score = (props) => {
    const{score}=props
  return (
    <div className='gameScore'>
        <h1>Your Score:{score} </h1>
    </div>
  )
}

export default Score