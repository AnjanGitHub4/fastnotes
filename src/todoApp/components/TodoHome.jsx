import { useEffect, useState } from "react";
import TodoLists from './TodoLists';
import ActionButton from "./TodoBtn";

function TodoHome(){
    const [getval,setval] = useState({
        id:"",
        inpItem:"",
        date:""
    });
    const [getElem,setElem] = useState(getLocalData());
    const [getUpdateStatus,setStatus] = useState(false);
    
    function getLocalData(){
        let localData = localStorage.getItem("list");
        if(localData){
            return JSON.parse(localData);
        }
        else {
            return [];
        }
    }

    const inputHandler = (e)=>{
        const val = e.target.value;
        if(!getUpdateStatus){
            setval({...getval,[e.target.name]:val,id:Math.floor(Math.random()*100000)});
        }else {
             setval({...getval,[e.target.name]:val});
        }
    };

    const addToList=(e)=>{
        if(getval.inpItem!=="" && getval.date!==""){
            setElem([...getElem,getval]);
        }
        setval({...getval,inpItem:"",date:"",id:""});
    };

    const addToLocal=(getElem)=>{
         if(getElem.length>0){
        }
        localStorage.setItem("list",JSON.stringify(getElem));
    }

    useEffect(()=>{
       addToLocal(getElem);
    },[getElem]);

    const handleDelete=(itemName)=>{
        const newList = getElem.filter((elem)=>{
            return elem.inpItem != itemName;
        });
        setElem(newList);
    }

    const handleUpdate = (itemList,status,loc) => {
        const [{id,inpItem,date}] = itemList;
        setval({...getval,inpItem:inpItem,date:date,id:id});
        setStatus(status);
    }

    const updateList =()=>{
        const [pos] = getElem.map((elem,idx)=>{
            return elem.id == getval.id ? idx : null;
        }).filter((elem,idx)=>{
            return idx==elem;
        });
        getElem[pos] = getval;
        addToLocal(getElem);
        setval({...getval,inpItem:"",date:"",id:""});
        setStatus(false);
    }

    return (
        <>
         <main className="main">
            <div className="conatiner">
                <h1 className="text-center">Fastnotes</h1>
                <div className="row m-0 mt-3 justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-4">
                        <div className="form-control ">
                            <input
                             type="text" 
                             className="form-control"
                             name="inpItem"
                             placeholder="add your data here..."
                             value={getval.inpItem}
                             onChange={inputHandler}
                             />
                        </div>
                    </div>
                     <div className="col-lg-4 col-md-4 py-2">
                        <div className="form-control">
                        <input 
                            type="date" 
                            name="date" 
                            id="date" 
                            className="form-control"
                             value={getval.date}
                             onChange={inputHandler}
                        />
                        </div>
                    </div>
                   
                </div>
                  <div className="py-1 d-flex justify-content-center align-items-center">
                    {
                    getUpdateStatus===true ? 
                    <ActionButton btnText='Update Me' onBind={updateList}/>
                    :<ActionButton  btnText="Add Me" onBind={addToList}/>
                    }
                        
                    </div>
            </div>
        </main>
        {<TodoLists 
            onDisplay={getElem} 
            onDelete= {handleDelete} 
            onUpdate={handleUpdate} 
        />}
        </>
    )
}

export default TodoHome;