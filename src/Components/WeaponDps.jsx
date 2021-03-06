import React, { useState } from 'react'
import { ProgressBarLine } from 'react-progressbar-line'
import PropTypes from 'prop-types'
import WeaponModal from './WeaponModal'
import './WeaponDps.css'

function WeaponDps({ weaponID, weapon, dps, maxDps }) {
	// Weapon fields are: Name, Category, CritX, Damage, DmgType, EChance, Magazine, PicLink, Reload, Rof
	// (weapon.Damage/maxDps)*100
	const barValue = (dps / maxDps) * 100
	const [hovered, setHovered] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const colorSelect = () => {
		switch (weapon.DmgType) {
		case 'C':
			return ('#22631a')
		case 'F':
			return ('#bf2615')
		case 'L':
			return ('#156dbf')
		default:
			return ('#616275')
		}
	}

	return (

		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div className="WeaponDpsOuter" style={hovered ? { borderColor: 'yellow' } : { borderColor: 'white' }} onMouseOver={() => setHovered(true)} onFocus={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<img src={weapon.PicLink} alt="logo" height={100} width={100} />
			<div className="WeaponDpsInner" onKeyPress={() => hovered ? setOpenModal(true) : null} onClick={() => setOpenModal(true)} role="button" tabIndex="0">
				<h1 className="Name">{weaponID}</h1>
				<ProgressBarLine
					value={barValue}
					min={0}
					max={100}
					strokeWidth={3}
					trailWidth={3}
					styles={{
						path: {
							stroke: colorSelect
						},
						trail: {
							stroke: '#ffffff'
						},
						text: {
							fill: '#404040',
							textAlign: 'center',
							fontSize: '0px'
						}
					}}
				/>
			</div>
			<h2 className="dpsText">
				{dps}
				{' '}
dps
			</h2>
			<WeaponModal open={openModal} onClose={() => setOpenModal(false)} weapon={weapon}>
				{weaponID}
			</WeaponModal>
		</div>
	)
}

export default WeaponDps

WeaponDps.propTypes = {
	weaponID: PropTypes.string.isRequired,
	weapon: PropTypes.object.isRequired,
	dps: PropTypes.any.isRequired,
	maxDps: PropTypes.any.isRequired
}

// { fontSize: '2vw', margin: '5px', position: 'absolute', marginLeft: '80%', color: 'black' }
