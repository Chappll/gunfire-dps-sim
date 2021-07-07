import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WeaponDps from './WeaponDps'

function DpsChart({ weaponNames, weaponStats, options }) {
	// Weapon fields are: Name, Category, CritX, Damage, DmgType, EChance, Magazine, PicLink, Reload, Rof, DamageMin, RofMin, AOE
	// Options are Crit, Reloads, WpnLevel, Category, Health, MinROF, MinDamage
	const [loading, setLoading] = useState(false)
	const [maxDps, setMaxDps] = useState(0)
	const [weaponData, setWeaponData] = useState([])

	const compareDps = (a, b) => {
		if (a.Dps > b.Dps) {
			return -1
		}
		if (a.Dps < b.Dps) {
			return 1
		}
		return 0
	}

	const healthCheck = (damage, type) => {
		if (options.Health === 'Health') {
			switch (type) {
			case 'F':
				return (damage * 1.5)
			case 'N':
				return (damage)
			case 'C':
				return (damage * 0.75)
			case 'L':
				return (damage * 0.75)
			default: return (damage)
			}
		} else if (options.Health === 'Armor') {
			switch (type) {
			case 'F':
				return (damage * 0.75)
			case 'N':
				return (damage * 0.75)
			case 'C':
				return (damage * 1.5)
			case 'L':
				return (damage * 0.75)
			default: return (damage)
			}
		} else if (options.Health === 'Shield') {
			switch (type) {
			case 'F':
				return (damage * 0.75)
			case 'N':
				return (damage)
			case 'C':
				return (damage * 0.75)
			case 'L':
				return (damage * 1.5)
			default: return (damage)
			}
		}
	}

	const dpsCalc = (i) => {
		let damage = weaponStats[i].Damage
		let baseDamage = weaponStats[i].Damage
		let rof = weaponStats[i].Rof
		let reload = weaponStats[i].Reload
		const magazine = weaponStats[i].Magazine
		if (options.MinDamage) {
			damage = weaponStats[i].DamageMin > 0 ? weaponStats[i].DamageMin : weaponStats[i].Damage
			baseDamage = weaponStats[i].DamageMin > 0 ? weaponStats[i].DamageMin : weaponStats[i].Damage
		}
		if (options.MinROF) {
			rof = weaponStats[i].RofMin > 0 ? weaponStats[i].RofMin : weaponStats[i].Rof
		}
		if (options.Crit) {
			damage *= weaponStats[i].CritX
		}
		if (!options.Reloads) {
			reload = 0
		}
		for (let index = 0; index < options.WpnLevel; index++) {
			damage += (0.15 * baseDamage)
		}
		if (options.AOE > 1) {
			if (weaponStats[i].AOE >= options.AOE) {
				damage *= options.AOE
			} else {
				damage = weaponStats[i].AOE > 0 ? damage * weaponStats[i].AOE : damage
			}
		}
		damage = healthCheck(damage, weaponStats[i].DmgType)
		const dps = (damage) / ((1 / rof) + (reload / magazine))
		return Math.round(dps)
	}

	const newWeaponArray = () => {
		setLoading(true)
		const items = []
		let dps = 0
		let currentMaxDps = 0
		for (let i = 0; i < weaponNames.length; i++) {
			if (options.Category === 'All' || options.Category === weaponStats[i].Category) {
				dps = dpsCalc(i)
				if (dps > currentMaxDps) {
					currentMaxDps = dps
				}
				items.push({ Name: weaponNames[i], Stats: weaponStats[i], Dps: dps })
			}
		}

		items.sort(compareDps)
		setWeaponData(items)
		setMaxDps(currentMaxDps)
	}

	useEffect(() => {
		newWeaponArray()
		return (setLoading(false))
		// eslint-disable-next-line
      }, [options]);

	return (
		<div>
			{!loading && weaponData.map((item) => (<WeaponDps key={item.Name} weaponID={item.Name} weapon={item.Stats} dps={item.Dps} maxDps={maxDps} />))}
		</div>
	)
}

export default DpsChart

DpsChart.propTypes = {
	weaponNames: PropTypes.any.isRequired,
	weaponStats: PropTypes.any.isRequired,
	options: PropTypes.any.isRequired
}
