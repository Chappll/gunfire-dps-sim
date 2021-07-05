import './App.css'
import React, { useState, useEffect } from 'react'
// import { Button } from 'react-bootstrap'
import firebase from './firebase'
import DpsChart from './Components/DpsChart'
import OptionsForm from './Components/OptionsForm'
import logo from './Images/GunfireLogo.PNG'

function App() {
	const [loading, setLoading] = useState(false)
	const [weaponStats, setWeaponStats] = useState([{}])
	const [weaponNames, setWeaponNames] = useState([])
	const [options, setOptions] = useState({ Crit: false, Reloads: true, WpnLevel: 0, Category: 'All', Health: 'Health', MinROF: false, MinDamage: false })
	const ref = firebase.firestore().collection('Weapons')

	// const addWeapon = () => {
	// 	console.log(ref)
	// 	ref
	// 		.doc('Fire Tower')
	// 		.set(
	// 			({ Category: 'Melee',
	// 				Damage: 750,
	// 				CritX: 2,
	// 				Rof: 1.5,
	// 				Magazine: 1,
	// 				Reload: 0,
	// 				DmgType: 'F',
	// 				EChance: 0.5,
	// 				AOE: 5,
	// 				PicLink: 'https://static.wikia.nocookie.net/gunfire_reborn/images/c/c4/Fire_Tower.png' })
	// 		)
	// 		.catch((err) => {
	// 			console.error(err)
	// 		})
	// }

	const getWeapons = () => {
		setLoading(true)
		ref.onSnapshot((querySnapshot) => {
			const ids = []
			const items = []
			querySnapshot.forEach((doc) => {
				items.push(doc.data())
				ids.push(doc.id)
			})
			setWeaponStats(items)
			setWeaponNames(ids)
			setLoading(false)
		})
	}

	const optionsUpdate = (newOptions) => {
		setOptions(newOptions)
	}

	useEffect(() => {
		getWeapons()
		// eslint-disable-next-line
}, []);

	return (
		<div className="App">
			<img className="logo" src={logo} alt="logo" height={300} width={600} />
			<OptionsForm optionsUpdate={optionsUpdate} />
			<header className="App-header">
				{// <Button onClick={addWeapon}>Add</Button>
				}
				{!loading && <DpsChart weaponNames={weaponNames} weaponStats={weaponStats} options={options} />}
			</header>
		</div>
	)
}

export default App
