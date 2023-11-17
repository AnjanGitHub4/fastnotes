function ActionButton({btnText,onBind}){
    return (
        <>
         <button 
         className="btn btn-md btn-success todo-btn"
         onClick={onBind}
         >{btnText}</button>
        </>
    )
}

export default ActionButton;