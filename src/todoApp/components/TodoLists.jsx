function TodoLists({onDisplay,onDelete,onUpdate}){

    function onUpdateList(itemId,status){
           const newLIst = onDisplay.filter((elem)=>{
            return elem.id === itemId;
        });
        onUpdate(newLIst,status);
    }

    return (
        <>
        <section className="jumbotron">
            <div className="container">
                <h2>Data Lists({onDisplay.length})</h2>
                <hr />
              <table className="table table-hover table-sm table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    { (onDisplay.length!==0) ? onDisplay.map((item,idx)=>{
                        return (
                        <tr key={item.id}>
                        <td key={item.idx}>{idx+1}</td>
                        <td key={item.id}>{item.inpItem}</td>
                        <td key={item.date}>{item.date}</td>
                        <td className="btn-wrapper">
                            <button className="btn btn-danger btn-add" onClick={(e)=>onDelete(item.inpItem)}>delete</button>
                            <button className="btn btn-success mx-2 btn-update" onClick={(e)=>onUpdateList(item.id,true,idx)}>update</button>
                        </td>

                    </tr>
                    )}) : <td>Have a nice day.Mark your task here.</td> }
                    
                </tbody>
              </table>
            </div>
        </section>
        </>
    )
}


export default TodoLists
