import React from "react"
import "../style.css"

function MainContent() {
    return (
        <div>
            <h1 className="title">Exam App</h1>
            <h2>Tämä on esimerkki komponentti. Huomioikaa kuinka style.css on liitetty komponenttiin ja kuinka style.css tiedostossa voidaan muuttaa komponenttien tyyliä. Kun lisäätte omia komponentteja, tehkää omalle sivullenne oma alikansio components kansioon ja lisätkää sivun käyttämät komponentit sen sisään, jolloin jokainen sivu pysyy omana kansionaan. -KaSi</h2>
        </div>
    )
}

export default MainContent