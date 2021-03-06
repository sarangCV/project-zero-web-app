import React, {useEffect} from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { addItems, deleteItem, getAllItems } from '../../api/rn-items';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
// import './style.css'

moment.locale('en-IN');

const RMPurchase = () => {

    const history = useHistory();

    const [items, setItems] = useState(null);
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [details, setDetails] = useState('');

    const [totalItems, setTotalItems] = useState([]);
    const [noItems, setnoItems] = useState(false);
    const [ifSuccess, setifSuccess] = useState(false)
    const [initialscreen, setInitialscreen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(null)


    useEffect(async () => {
        const token = await window.sessionStorage.getItem('sarangcv');
        await setToken(token);
        await getAllItems()
        .then((res) => {
            console.log(res)
            if(res.length == 0) {
                setItems(null)
            }
            else {
                setItems(res)
            }
        })


    })

    const onSubmit = async () => {
        history.push('/rm-create-list')
    }

    const onDelete = async (id) => {
        await deleteItem(id)
        console.log(id)
    }

    const onEdit = async (id) => {
        history.push(`/rm/update/${id}`)
    }

    return (
        
        <div className="dashboard-container">
            <div className="container">               
                <div className="view-list-sec">   
                    <div className="view-list-title">
                        <h1>RM Purchased list</h1>  
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
                        {console.log(items)}
                        {!items ? <h2>No items</h2> 
                        : 
                        items.map((val)=>{
                                return(                            
                                    <div className="item-single">
                                        <div className="row">
                                             <div className="col-lg-2">
                                                <h3>Date</h3>
                                                <p>{moment(val.date).format('Y-M-D')}</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <h3>Particular</h3>
                                                <p>{val.rmParticular}</p>
                                            </div>
                                            <div className="col-lg-1">
                                                <h3>Quantiy</h3>
                                                <p>{val.rmQuantity}</p>
                                            </div>
                                            <div className="col-lg-1">
                                                <h3>Price</h3>
                                                <p>{val.rmPrice}</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <h3>Commision</h3>
                                                <p>{val.rmCommission}</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <h3>Note</h3>
                                                <p>{val.rmNote}</p>
                                            </div>
                                            <div className="col-lg-2 dashboard-action-btn-sec">
                                                    <div className="col-lg-6 d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faEdit} style={{ marginLeft: 10 }} size="lg" onClick={()=> onEdit(val._id)}/>
                                                    </div>
                                                    <div className="col-lg-6 d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faTrash} style={{ marginLeft: 10 }} size="lg" onClick={() => onDelete(val._id)}/>
                                                    </div>
                                            </div>
                                        </div>                                        
                                    </div>
                                )
                        }) }                                                                                    
                    </div>
                </div>
                <div className="submit-btn-container d-flex justify-content-center">
                    <button className="btn btn-primary dashboard-submit-btn" onClick={onSubmit}>Create a list</button>                            
                </div>
            </div>
        </div>
    )
}

export default RMPurchase;
