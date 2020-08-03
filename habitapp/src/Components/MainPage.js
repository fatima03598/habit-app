import React from 'react'
import NavBar from './NavBar'
import '../css/mainPage.css'

function MainPage() {
    return (
        <div className="mainPage">
            <NavBar/>
            <section className="mainImage">
                <h1>HabitTracker</h1>

            </section>
            <section className='mainDescription'>
                <h4>Track your Habits, Start a change</h4>
            </section>

        </div>
    )
}

export default MainPage
