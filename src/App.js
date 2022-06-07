

import {React,useState} from 'react'
import { ethers,utils } from 'ethers'
import './App.css';
import abi from "./utils/Token.json";

function App() {
  const [userAccount, setUserAccount] = useState()
  const [valuee, setvalue] = useState()
  const  contractAddress = '0x7C8655edc8Af8FdC71eFa9F592E25001485aA30c';
  const contractABI = abi.abi;
  const  connectwallet= async() =>{
    if(window.ethereum== undefined){
      console.log("Install metamask");
    }else{
     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
     console.log(accounts[0]);
     document.getElementById('address').innerText = accounts[0];
    }

  }
  const tokenContract = async() =>{
    try {
  
  
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const token_Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

       let chkBalance = await token_Contract.balanceOf(
  userAccount
       );
       /* global BigInt */
       console.log("Retrieved total coffee count...",chkBalance/1000000000000000000);
       document.getElementById('bal').innerText = chkBalance/1000000000000000000+ " BFI";
        }
      }
        catch (error) {
          console.log(error);
        }
        };   


        const buy = async() =>{
          try {
        
        
            if (window.ethereum) {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const token_Contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
              );
      
             let _buy = await token_Contract.transfer(
        userAccount , ethers.utils.parseUnits(valuee)
             );
       _buy.wait();
             /* global BigInt */
             console.log("Retrieved total coffee count...", _buy.hash);
              }
            }
              catch (error) {
                console.log(error);
              }
              }; 

  return (
    <div className="App">
       <br />   <br />   <br />
      <h1 className="Baby">Baby Frog Inu</h1>
      <br />   <br />   <br />

     <h1><button className="button-35" onClick={connectwallet}>Connect Wallet</button></h1>

     <h3 id="address"></h3>
     <br />   <br />   <br />   <br />   <br />   <br />   <br />   <br />   <br />   <br />
     <input className="form__input"  onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
  
     <h1><button className="button-35" onClick={tokenContract}>Balance</button></h1>
     <h3 id="bal"></h3>
     <input className="form__input" onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
     <input className="form__input" onChange={e => setvalue(e.target.value)} placeholder="value" />
  
  <h1><button className="button-35" onClick={buy}>transfer</button></h1>
    </div>

  );
}

export default App;
