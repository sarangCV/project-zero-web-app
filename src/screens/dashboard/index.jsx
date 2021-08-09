import React, {useEffect} from 'react'
import { useState } from 'react';
import { addItems } from '../../api/items';
import './style.css'

function Dashboard() {

    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [details, setDetails] = useState('');

    const [totalItems, setTotalItems] = useState([]);
    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(true);

    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(null)


    useEffect(() => {
        const token = window.sessionStorage.getItem('sarangcv');
        setToken(token)

    }, [])

    const addItem = async () => {

        if(item === '' || price === '' || vendor === '' || details === '') {
            setnoItems(true)
        }
        else {
            await setInitialscreen(false)
            await setnoItems(false)
            await setTotalItems([...totalItems,
                {
                    itemName: item,
                    itemPrice: price,
                    itemVendor: vendor,
                    itemDetails: details
                }
            ])
        }
        // await console.log(totalItems)
    }

    const onSubmit = async () => {
        console.log(totalItems.length)
        await setLoading(true)
        if(totalItems.length === 0 ) {
            setnoItems(true)
        } else{
            await addItems(totalItems, token)
            .then((res) => {
               if (res.success) setifSuccess(true);
            console.log(res)
            })
            // console.log(totalItems)
        }       
    }

    // console.log(totalItems)
    return (
        <div className="dashboard-container">
            <div className="container">
                <div className="add-list-sec">
                    <div className="dashboard-input-sec">
                        <div className="row justify-content-center">
                            <div className="col-lg-2 col-sm-12 input-container">
                                <label>What we purchase</label>
                                <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setItem(t.target.value)}/>
                            </div>
                            <div className="col-lg-2 col-sm-12 input-container">
                                <label>How much we paid for  it</label>
                                <input type="number" className="form-control login-input" placeholder="Amount" onChange={(t)=>setPrice(t.target.value)}/>
                             </div>
                             <div className="col-lg-2 col-sm-12 input-container">
                                <label>From whom we borught</label>
                                <input type="text" className="form-control login-input" placeholder="Enter item" onChange={(t)=>setVendor(t.target.value)}/>
                             </div>
                             <div className="col-lg-2 col-sm-12 input-container">
                                <label>Details</label>
                                <input type="text" className="form-control login-input" placeholder="Enter details"onChange={(t)=>setDetails(t.target.value)} />
                             </div>      
                             <div className="col-lg-2 col-sm-12 input-container">
                                <button className="btn btn-primary item-add-btn" onClick={addItem}>Add</button>                            
                             </div>                         
                        </div>
                    </div>  
                </div>
                <div className="view-list-sec">   
                    <div className="view-list-title">
                        <h1>Added list</h1>  
                        {noItems &&
                        <div className="alert-box">
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Warning!</strong> Items or fields can't be empty.
                                <button type="button" onClick={()=>setnoItems(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div> }   
                        {ifSuccess && 
                        <div class="alert alert-success alert-dismissible" role="alert" id="liveAlert">
                        <strong>Items submitted!</strong> Items added to the database.
                        <button type="button" onClick={()=>setifSuccess(false)} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>}                                
                    </div>
                    <div className="item-container">
                        {initialscreen ? <h2>No items</h2> 
                        : 
                            totalItems.map((val)=>{
                                return(                            
                                    <div className="item-single">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <h3>Name of the item</h3>
                                                <p>{val.itemName}</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h3>Price</h3>
                                                <p>{val.itemPrice}</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h3>Vendor</h3>
                                                <p>{val.itemVendor}</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <h3>Details</h3>
                                                <p>{val.itemDetails}</p>
                                            </div>
                                        </div>                                        
                                    </div>
                                )
                        }) }                                                                                    
                    </div>
                    
                </div>
                <div className="submit-btn-container d-flex justify-content-center">
                    <button className="btn btn-primary dashboard-submit-btn" onClick={onSubmit}>Submit</button>                            
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
