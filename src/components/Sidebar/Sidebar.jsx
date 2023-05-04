import "./Sidebar.css"
import React from 'react'
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img className="logo" src="./logo.png" alt="logo" />
            <div>
                <h2> Arun Shaw </h2>
                <p>ID: 9d66ad </p>
            </div>

            <div className="bar_list">
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/calls"> Call </NavLink>
                <NavLink to="/about"> About </NavLink>
                <NavLink to="/contact"> Contact </NavLink>
            </div>


        </div>
    )
}

export { Sidebar }
