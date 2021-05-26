import './App.css';
import firebase from "./firebase";
import React, {useState, useEffect} from "react";
import DpsChart from "./Components/DpsChart";
import logo from "./Images/GunfireLogo.PNG";

function App() {
const [loading,setLoading] = useState(false)
const [weaponStats,setWeaponStats] = useState([{}])
const [weaponNames,setWeaponNames] = useState([])
const ref = firebase.firestore().collection("Weapons")

// const addWeapon = (event) => {
//   console.log(ref)
//       ref
//       .doc("Flowing Light")
//       .set(
//         ({Category: "Melee", Damage: 490, CritX: 2, Rof: 1.88, Magazine: 10, Reload: 1.45, DmgType: "L", EChance: 0.5, 
//         PicLink: "https://static.wikia.nocookie.net/gunfire_reborn/images/6/64/FlowingLight.png/revision/latest?cb=20210221023313"})
//       )
//       .catch((err) => {
//         console.error(err);
//       });
// }

const getWeapons = () => {
  setLoading(true)
  ref.onSnapshot((querySnapshot) => {
    const ids = [];
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data())
      ids.push(doc.id)
    });
    setWeaponStats(items)
    setWeaponNames(ids)
    setLoading(false)
  });
}

useEffect(() => {
  getWeapons()
  // eslint-disable-next-line 
}, []);

  return (
    <div className="App">
      <img src={logo} alt="logo" height={300} width={600}></img>
      <header className="App-header">
        {//<button onClick={addWeapon}>Add</button>
        }
        {!loading && <DpsChart weaponNames={weaponNames} weaponStats={weaponStats}></DpsChart>}
      </header>
    </div>
  );
}

export default App;
