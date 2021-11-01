import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { addItems } from '../../api/rn-items';
import DatePicker from 'react-date-picker';
// import './style.css'

const RMCreateList = () => {

    const history = useHistory();

    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [commission, setCommission] = useState('');
    const [note, setNote] = useState('')
    const [date, setDate] = useState(new Date());

    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(true);


    const addItem = async () => {
        console.log(date);

        if(item === '' || price === '' || quantity === '' || commission === '' || note === '') {
            setnoItems(true);
        }
        else {
            // await setInitialscreen(false)
            await setnoItems(false)
            const totalItems = {
                rmParticular: item,
                rmPrice: price,
                rmQuantity: quantity,
                rmCommission: commission,
                rmNote: note,
                date: date
            }
            await addItems(totalItems)
            .then((res) => {
                console.log("Client side",res)
                setifSuccess(true);
            })
            .then(() => {
                history.push('/rm-purchase-list')
            })  
        }
    }

    return(
        <div className="create-list-container">
            <div className="container">
                <div className="add-list-sec">
                        <div className="add-list-title">
                            <h2>Create a new RM Purchase list</h2>
                            {noItems &&
                            <div className="alert-box">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Warning!</strong> Items or fields can't be empty.
                                    <button type="button" onClick={()=>setnoItems(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div> }
                            {ifSuccess && 
                            <div className="alert alert-success alert-dismissible" role="alert" id="liveAlert">
                                <strong>Items submitted!</strong> Items added to the database.
                                <button type="button" onClick={()=>setifSuccess(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}
                        </div>
                        <div className="dashboard-input-sec">
                            <div className="column d-flex flex-column align-items-center">
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Choose a date</label>
                                    <div className="date-picker-sec">
                                        <DatePicker
                                            onChange={(date)=> {setDate(date)}}
                                            value={date}
                                            className="date-picker"  
                                        />   
                                    </div>
                                    
                                </div>  
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Particular</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setItem(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Quantity</label>
                                    <input type="number" className="form-control login-input" placeholder="Amount" onChange={(t)=>setPrice(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Price</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setQuantity(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Commission</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter commission"onChange={(t)=>setCommission(t.target.value)} />
                                </div>   
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Note</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter commission"onChange={(t)=>setNote(t.target.value)} />
                                </div>   
                                <div className="col-lg-2 col-sm-12 input-container">
                                    <button className="btn btn-primary item-add-btn" onClick={addItem}>Add</button>                            
                                </div>                         
                            </div>
                        </div>  
                    </div>
            </div>
        </div>
    )
}

export default RMCreateList;