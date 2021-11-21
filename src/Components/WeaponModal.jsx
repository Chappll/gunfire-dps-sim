import React from 'react'
import ReactDom from 'react-dom'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './WeaponModal.css'

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: '#FFF',
	padding: '50px',
	zIndex: 1000
}

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, .7)',
	zIndex: 1000
}

export default function WeaponModal({ open, children, onClose, weapon }) {
	// Weapon fields are: Name, Category, CritX, Damage, DmgType, EChance, Magazine, PicLink, Reload, Rof
	if (!open) return null

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES} />
			<div style={MODAL_STYLES}>
				<div className="modalFlex">
					<img src={weapon.PicLink} alt="logo" height={100} width={100} />
					{children}
					<br />
					{`Weapon category: ${weapon.Category}`}
					<br />
					{`CritX: ${weapon.CritX}`}
					<br />
					{`Damage: ${weapon.Damage}`}
					<br />
					{`Damage Type: ${weapon.DmgType}`}
					<br />
					{`Element Chance: ${weapon.EChance}`}
					<br />
					{`Magazine Size: ${weapon.Magazine}`}
					<br />
					{`Reload Speed: ${weapon.Reload}`}
					<br />
					{`Rate of Fire: ${weapon.Rof}`}
					<br />
					<Button style={{ marginTop: '10px' }} onClick={onClose}>Close Modal</Button>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}

WeaponModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}
