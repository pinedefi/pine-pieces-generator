import logo from './logo.svg';
import './App.css';
import overlay from './overlay.png'
import React from 'react'
import html2canvas from 'html2canvas';
const electron = window.require('electron');
function App() {
  const [imgid, dispatch] = React.useReducer(x => x+1, 0)
  React.useEffect(() => {
    setInterval(async () => {
      dispatch()
      const canvas = await html2canvas(document.querySelector("#xxx"),{useCORS: true,allowTaint: true,})
      var img = canvas.toDataURL("image/png");
      electron.ipcRenderer.send('img', [imgid, img]); 
      //console.log(img)
      // document.body.appendChild(canvas)
      
    },3000)
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div id="xxx">
          <img style={{position: 'absolute', zIndex: '100',
        marginLeft: 241,
        marginTop: 350,
        filter: 'brightness(20%)'}}  src={overlay}></img>
          <img src={`https://tempus.mypinata.cloud/ipfs/QmYtefAiSVP7Hq6JWhBuoe4Jpho75wawMweyuZHVEKsknF/${imgid}.png`}></img>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
