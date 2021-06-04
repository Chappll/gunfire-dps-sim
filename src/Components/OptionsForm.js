import React, {useState, useEffect} from "react";
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Button } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import './OptionsForm.css'

function OptionsForm() {
    //To do list: min/max damage?,min/max Rof?, health type, weapon category, weapon level, reloads?, crits?  
    const [crit, setCrit] = useState(false)
    const [reloads, setReloads] = useState(true)
    const [wpnLevel, setWpnLevel] = useState(1)
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [healthType, setHealthType] = useState("Health")
    const [minRof, setMinRof] = useState(false)
    const [minDamage, setMinDamage] = useState(false)


    const handleSliderChange = (event, newValue) => {
        setWpnLevel(newValue)
    }


    return (
        <div>
            <div className="Options">
                <div className="item">
                    <Button variant={minDamage?"secondary":"primary"} onClick={() => setMinDamage(false)}>Max Damage</Button>
                    <Button variant={minDamage?"primary":"secondary"} onClick={() => setMinDamage(true)}>Minimum Damage</Button>
                </div>
                <div className="item">
                <Button variant={minRof?"secondary":"primary"} onClick={() => setMinRof(false)}>Max Rate of Fire</Button>
                <Button variant={minRof?"primary":"secondary"} onClick={() => setMinRof(true)}>Minimum Rate of Fire</Button>
                </div>
                <div className="item">
                <Button disabled={healthType==="Health"} variant="danger" onClick={() => setHealthType("Health")}>Health</Button>
                <Button disabled={healthType==="Armor"} variant="success" onClick={() => setHealthType("Armor")}>Armor</Button>
                <Button disabled={healthType==="Shield"} variant="info" onClick={() => setHealthType("Shield")}>Shield</Button>
                </div>
                <div className="item">
                <Button variant={crit?"primary":"secondary"} onClick={() => setCrit(true)}>Crit</Button>
                <Button variant={crit?"secondary":"primary"} onClick={() => setCrit(false)}>No Crit</Button>
                </div>
                <div className="item">
                <Button variant={reloads?"primary":"secondary"} onClick={() => setReloads(true)}>Reloads On</Button>
                <Button variant={reloads?"secondary":"primary"} onClick={() => setReloads(false)}>No Reloads</Button>
                </div>
                <div className="spinner">
                <Button variant="dark" onClick={() => wpnLevel<40?setWpnLevel(wpnLevel+1):null}>+</Button>
                <h2 className="space" >Weapon Level: +{wpnLevel}</h2>
                <Button variant="dark" onClick={() => wpnLevel>0?setWpnLevel(wpnLevel-1):null}>-</Button>
                </div>
            </div>
            <div className="filter">
                <DropdownButton id="categoryDropDown" title="Weapon Filter">
                <Dropdown.Item eventKey="1" onSelect={() => setCategoryFilter("All")}>All</Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={() => setCategoryFilter("Rifle")}>Rifles</Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={() => setCategoryFilter("SMG")}>Submachine Guns</Dropdown.Item>
                <Dropdown.Item eventKey="4" onSelect={() => setCategoryFilter("Pistol")}>Pistols</Dropdown.Item>
                <Dropdown.Item eventKey="5" onSelect={() => setCategoryFilter("Shotgun")}>Shotguns</Dropdown.Item>
                <Dropdown.Item eventKey="6" onSelect={() => setCategoryFilter("Sniper")}>Snipers</Dropdown.Item>
                <Dropdown.Item eventKey="7" onSelect={() => setCategoryFilter("Launcher")}>Launchers</Dropdown.Item>
                <Dropdown.Item eventKey="8" onSelect={() => setCategoryFilter("Injector")}>Injectors</Dropdown.Item>
                <Dropdown.Item eventKey="9" onSelect={() => setCategoryFilter("Melee")}>Melee</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>        
    )
}

export default OptionsForm
