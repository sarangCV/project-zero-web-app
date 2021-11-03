import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { addItems, getItem, updateItem } from '../../api/items';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import './style.css'

const UpdateList = () => {

    const history = useHistory();
    const params = useParams()

    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date());

    const [currentItem, setCurrentItem] = useState('')

    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(true);


    useEffect( async () => {
       await getItem(params.id)
       .then((res) => {
           setCurrentItem(res)
           setItem(res.itemName)
           setPrice(res.itemPrice)
           setVendor(res.itemVendor)
           setDetails(res.itemDetails)
           setDate(new Date(res.date))
           console.log(date);
       })
    }, [])

    const updateSingleItem = async () => {

        console.log(params)

        if(item === currentItem.itemName && price === currentItem.itemPrice && vendor === currentItem.itemVendor && details === currentItem.itemDetails && date === currentItem.date) {
            setnoItems(true);
        }
        else {
            // await setInitialscreen(false)
            await setnoItems(false)
            const totalItems = {
                itemName: item,
                itemPrice: price,
                itemVendor: vendor,
                itemDetails: details,
                date: date
            }
            console.log('Total Items::', totalItems);
            await updateItem(totalItems, params.id)
            .then((res) => {
                console.log("Client side",res)
                setifSuccess(true);
            })
            .then(() => {
                history.push('/dashboard')
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
                            <div className="column d-flex flex-column align-items-left">
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
                                    <label>What we purchase</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.itemName ? currentItem.itemName : 'null'} onChange={(t)=>setItem(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>How much we paid for  it</label>
                                    <input type="number" className="form-control login-input" placeholder={currentItem.itemPrice ? currentItem.itemPrice : 'null'} onChange={(t)=>setPrice(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>From whom we borught</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.itemVendor ? currentItem.itemVendor : 'null'} onChange={(t)=>setVendor(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Details</label>
                                    <input type="text" className="form-control login-input" placeholder={currentItem.itemDetails ? currentItem.itemDetails : 'null'} onChange={(t)=>setDetails(t.target.value)} />
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

export default UpdateList;