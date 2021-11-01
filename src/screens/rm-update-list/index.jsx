import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { addItems, getItem, updateItem } from '../../api/rn-items';
import DatePicker from 'react-date-picker';
import moment from 'moment';
// import './style.css'

const RMUpdateList = () => {

    const history = useHistory();
    const params = useParams()

    const [rmParticular, setRMParticular] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [commission, setCommission] = useState('');
    const [note, setNote] = useState('')
    const [date, setDate] = useState(new Date());

    const [currentItem, setCurrentItem] = useState('')

    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(true);


    useEffect( async () => {
       await getItem(params.id)
       .then((res) => {
           setCurrentItem(res)
           setRMParticular(res.rmParticular)
           setPrice(res.rmPrice)
           setQuantity(res.rmQuantity)
           setCommission(res.rmCommission)
           setNote(res.rmNote)
           setDate(new Date(res.date))
           console.log(date);
       })
    }, [])

    const updateSingleItem = async () => {

        console.log(params)

        if(rmParticular === currentItem.rmParticular && price === currentItem.rmPrice && quantity === currentItem.rmQuantity && commission === currentItem.rmCommission && date === currentItem.date && note === currentItem.rmNote) {
            setnoItems(true);
        }
        else {
            // await setInitialscreen(false)
            await setnoItems(false)
            const totalItems = {
                rmParticular: rmParticular,
                rmPrice: price,
                rmQuantity: quantity,
                rmCommission: commission,
                rmNote: note,
                date: date
            }
            console.log('Total Items::', totalItems);
            await updateItem(totalItems, params.id)
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
                            <h2>Update the list</h2>
                            {noItems &&
                            <div className="alert-box">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Warning!</strong> No updates has been made.
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
                                    <input type="text" className="form-control login-input" placeholder={currentItem.rmParticular ? currentItem.rmParticular : 'null'} onChange={(t)=>setRMParticular(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Quantity</label>
                                    <input type="number" className="form-control login-input" placeholder={currentItem.rmPrice ? currentItem.rmPrice : 'null'} onChange={(t)=>setPrice(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Price</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.rmQuantity ? currentItem.rmQuantity : 'null'} onChange={(t)=>setQuantity(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Commission</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.rmCommission ? currentItem.rmCommission : 'null'} onChange={(t)=>setCommission(t.target.value)} />
                                </div>      
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Enter Note</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.rmNote ? currentItem.rmNote : 'null'} onChange={(t)=>setNote(t.target.value)} />
                                </div> 
                                <div className="col-lg-2 col-sm-12 input-container">
                                    <button className="btn btn-primary item-add-btn" onClick={updateSingleItem}>Update</button>                            
                                </div>                         
                            </div>
                        </div>  
                    </div>
            </div>
        </div>
    )
}

export default RMUpdateList;