import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import Button from '@material-ui/core/Button'
import { Button } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './OptionsForm.css'

function OptionsForm({ optionsUpdate }) {
	// To do list: min/max damage?,min/max Rof?, health type, weapon category, weapon level, reloads?, crits?
	// Options are Crit, Reloads, WpnLevel, Category, Health, MinROF, MinDamage
	// const [crit, setCrit] = useState(false)
	// const [reloads, setReloads] = useState(true)
	// const [wpnLevel, setWpnLevel] = useState(0)
	// const [categoryFilter, setCategoryFilter] = useState('All')
	// const [healthType, setHealthType] = useState('Health')
	// const [minRof, setMinRof] = useState(false)
	// const [minDamage, setMinDamage] = useState(false)

	const [options, setOptions] = useState({ Crit: false, Reloads: true, WpnLevel: 0, Category: 'All', Health: 'Health', MinROF: false, MinDamage: false })

	const setOptionsValues = (updatedValues) => {
		setOptions((prevOptions) => ({ ...prevOptions, ...updatedValues }))
		optionsUpdate({ ...options, ...updatedValues })
	}

	return (
		<div>
			<div className="Options">
				<div className="item">
					<Button style={{ marginRight: '5px' }} variant={options.MinDamage ? 'secondary' : 'primary'} onClick={() => setOptionsValues({ MinDamage: false, MinROF: false })}>Maximum Dps</Button>
					<Button variant={options.MinDamage ? 'primary' : 'secondary'} onClick={() => setOptionsValues({ MinDamage: true, MinROF: true })}>Minimum Dps</Button>
				</div>
				{/* <div className="item">
					<Button style={{ marginRight: '5px' }} variant={options.MinROF ? 'secondary' : 'primary'} onClick={() => setOptionsValues({ MinROF: false })}>Max Rate of Fire</Button>
					<Button variant={options.MinROF ? 'primary' : 'secondary'} onClick={() => setOptionsValues({ MinROF: true })}>Minimum Rate of Fire</Button>
				</div> */}
				<div className="item">
					<Button style={{ marginRight: '5px' }} disabled={options.Health === 'Health'} variant="danger" onClick={() => setOptionsValues({ Health: 'Health' })}>Health</Button>
					<Button style={{ marginRight: '5px' }} disabled={options.Health === 'Armor'} variant="success" onClick={() => setOptionsValues({ Health: 'Armor' })}>Armor</Button>
					<Button disabled={options.Health === 'Shield'} variant="info" onClick={() => setOptionsValues({ Health: 'Shield' })}>Shield</Button>
				</div>
				<div className="item">
					<Button style={{ marginRight: '5px' }} variant={options.Crit ? 'primary' : 'secondary'} onClick={() => setOptionsValues({ Crit: true })}>Crit</Button>
					<Button variant={options.Crit ? 'secondary' : 'primary'} onClick={() => setOptionsValues({ Crit: false })}>No Crit</Button>
				</div>
				<div className="item">
					<Button style={{ marginRight: '5px' }} variant={options.Reloads ? 'primary' : 'secondary'} onClick={() => setOptionsValues({ Reloads: true })}>Reloads On</Button>
					<Button variant={options.Reloads ? 'secondary' : 'primary'} onClick={() => setOptionsValues({ Reloads: false })}>No Reloads</Button>
				</div>
				<div className="spinner">
					<Button variant="dark" onClick={() => (options.WpnLevel > 0 ? setOptionsValues({ WpnLevel: (options.WpnLevel - 1) }) : null)}>-</Button>
					<h2 className="space">
            Weapon Level: +
						{options.WpnLevel}
					</h2>
					<Button variant="dark" onClick={() => (options.WpnLevel < 40 ? setOptionsValues({ WpnLevel: (options.WpnLevel + 1) }) : null)}>+</Button>
				</div>
			</div>
			<div className="filter">
				<DropdownButton id="categoryDropDown" title="Weapon Filter">
					<Dropdown.Item eventKey="1" onSelect={() => setOptionsValues({ Category: 'All' })}>All</Dropdown.Item>
					<Dropdown.Item eventKey="2" onSelect={() => setOptionsValues({ Category: 'Rifle' })}>Rifles</Dropdown.Item>
					<Dropdown.Item eventKey="3" onSelect={() => setOptionsValues({ Category: 'SMG' })}>Submachine Guns</Dropdown.Item>
					<Dropdown.Item eventKey="4" onSelect={() => setOptionsValues({ Category: 'Pistol' })}>Pistols</Dropdown.Item>
					<Dropdown.Item eventKey="5" onSelect={() => setOptionsValues({ Category: 'Shotgun' })}>Shotguns</Dropdown.Item>
					<Dropdown.Item eventKey="6" onSelect={() => setOptionsValues({ Category: 'Sniper' })}>Snipers</Dropdown.Item>
					<Dropdown.Item eventKey="7" onSelect={() => setOptionsValues({ Category: 'Launcher' })}>Launchers</Dropdown.Item>
					<Dropdown.Item eventKey="8" onSelect={() => setOptionsValues({ Category: 'Injector' })}>Injectors</Dropdown.Item>
					<Dropdown.Item eventKey="9" onSelect={() => setOptionsValues({ Category: 'Melee' })}>Melee</Dropdown.Item>
				</DropdownButton>
			</div>
		</div>
	)
}

export default OptionsForm

OptionsForm.propTypes = {
	optionsUpdate: PropTypes.func.isRequired
}

// OptionsForm.defaultProps = {
// 	optionsUpdate: {}
// }
