import React from 'react'
import HomeTile from '../../components/home-tile'
import './style.css'

const Home = () => {
    return (
            <div className="dashboard-container">
                <div className="container center">
                    <div className="home-buttons-sec">
                        <div className="home-tile-sec">
                            <HomeTile title='CASH BOOK' navigate='/dashboard'/>
                            <HomeTile title='RM PURCHASE' navigate='/rm-purchase-list'/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home
