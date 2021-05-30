import React, {useState, useEffect} from "react";
import {ProgressBarLine} from 'react-progressbar-line';
import './WeaponDps.css'

function WeaponDps({weaponID, weapon, dps, maxDps}) {
    //Weapon fields are: Name, Category, CritX, Damage, DmgType, EChance, Magazine, PicLink, Reload, Rof
    //(weapon.Damage/maxDps)*100
    let barValue = (dps/maxDps)*100
    const img = new URL(weapon.PicLink)
    console.log(maxDps)

    const colorSelect = () => {
        switch (weapon.DmgType) {
            case "C":  
                return('#22631a');
            case "F":
                return('#bf2615')
            case "L":
                return('#156dbf')
            default:
                return('#616275');
        }
    }
    
    return (
        <div className='WeaponDpsOuter'>
            <img src={weapon.PicLink} alt="logo" height={100} width={100}></img>
            <div className='WeaponDpsInner'>
                <h1 className='Name'>{weaponID}</h1>  
                <ProgressBarLine
                        value={barValue}
                        min={0}
                        max={100}
                        strokeWidth={5}
                        trailWidth={5}
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
            <h2 className='dpsNumber'>{dps} dps</h2>
        </div>
    )
}

export default WeaponDps
