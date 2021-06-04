import WeaponDps from "./WeaponDps";
import React, {useState, useEffect} from "react";

function DpsChart({weaponNames, weaponStats}) {
  //Weapon fields are: Name, Category, CritX, Damage, DmgType, EChance, Magazine, PicLink, Reload, Rof
    const [loading,setLoading] = useState(false)
    const [maxDps, setMaxDps] = useState(0)
    const [weaponData, setWeaponData] = useState([])

    const newWeaponArray = () => {
        setLoading(true)
        let items = [];
        let dps = 0;
        let maxDps = 0;
        for (let i = 0; i < weaponNames.length; i++) {
            dps = dpsCalc(i)
            if (dps > maxDps) {
              maxDps = dps
            }
            items.push({Name: weaponNames[i] , Stats: weaponStats[i], Dps: dps})
        }
        
        items.sort(compareDps)
        setWeaponData(items)
        setMaxDps(maxDps)
    } 

    const damageMult = () => {
      
    }

    const dpsCalc = (i) => {
        const dps = (weaponStats[i].Damage)/((1/weaponStats[i].Rof)+(weaponStats[i].Reload/weaponStats[i].Magazine))
        return Math.round(dps)
    }


    const compareDps = (a,b) => {
        if ( a.Dps > b.Dps ){
            return -1;
          }
          if ( a.Dps < b.Dps ){
            return 1;
          }
          return 0;
    }

      useEffect(() => {
        newWeaponArray()
        setLoading(false) 
        // eslint-disable-next-line 
      }, []);

    return (
        <div>
            {!loading && weaponData.map((item) => (<WeaponDps weaponID={item.Name} weapon={item.Stats} dps={item.Dps} maxDps={maxDps}/>))}                   
        </div>
    )
}

export default DpsChart
