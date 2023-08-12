import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './SideBar.css'; 

const SideBar = () => {
    return (
        <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link"  to="/">Platform Launch</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/marketing-plan">Marketing plan</NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link">Roadmap</Link>
        </li>
      </ul>
    </div>
    )
}

export default SideBar
