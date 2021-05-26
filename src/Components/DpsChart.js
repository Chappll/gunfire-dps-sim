import WeaponDps from "./WeaponDps";
import React, {useState, useEffect} from "react";

function DpsChart({weaponNames, weaponStats}) {
    const [maxDps, setMaxDps] = useState(0)
    const [weaponData, setWeaponData] = useState([])

    const dpsCalc = () => {
        setMaxDps(Math.max.apply(Math, weaponStats.map(function(o) { return o.Damage; })))  
      }

    const newWeaponArray = () => {
        let items = [];
        for (let i = 0; i < weaponNames.length; i++) {
            items.push({Name: weaponNames[i] , Stats: weaponStats[i]})
        }
        
        items.sort(compareDps)
        setWeaponData(items)
        console.log(weaponData)
    } 

    const compareDps = (a,b) => {
        if ( a.Stats.Damage > b.Stats.Damage ){
            return -1;
          }
          if ( a.Stats.Damage < b.Stats.Damage ){
            return 1;
          }
          return 0;
    }

      useEffect(() => {
        newWeaponArray()
        dpsCalc()
        // eslint-disable-next-line 
      }, []);

    return (
        <div>

            {weaponData.map((item) => (
                <WeaponDps weaponID={item.Name} weapon={item.Stats} maxDps={maxDps}/>
            ))}
            
            
            
        </div>
    )
}

export default DpsChart
