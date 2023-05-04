import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home/Home'
import { CallWindow } from '../components/CallWindow/CallWindow'

const RouteProvider = () => {
    return (
        <div className="content">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/calls' element={<CallWindow />} />
            </Routes>
        </div>

    )
}

export { RouteProvider }
