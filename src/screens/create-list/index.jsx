import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { addItems } from '../../api/items';
import './style.css'

const CreateList = () => {

    const history = useHistory();

    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [details, setDetails] = useState('');

    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(true);


    const addItem = async () => {


        if(item === '' || price === '' || vendor === '' || details === '') {
            setnoItems(true);
        }
        else {
            // await setInitialscreen(false)
            await setnoItems(false)
            const totalItems = {
                itemName: item,
                itemPrice: price,
                itemVendor: vendor,
                itemDetails: details
            }
            await addItems(totalItems)
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
                            <h2>Create a new list</h2>
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
                                    <label>What we purchase</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setItem(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>How much we paid for  it</label>
                                    <input type="number" className="form-control login-input" placeholder="Amount" onChange={(t)=>setPrice(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>From whom we borught</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setVendor(t.target.value)}/>
                                </div>
                                <div className="col-lg-10 col-sm-12 input-container">
                                    <label>Details</label>
                                    <input type="text" className="form-control login-input" placeholder="Enter details"onChange={(t)=>setDetails(t.target.value)} />
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

export default CreateList;