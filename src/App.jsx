import { useState,useEffect } from 'react'
import  Web3  from 'web3'
import {contractAddress,contractABI} from './constant.jsx'
import Header from './components/Header'
import CardItem from './components/CardItem'
import CardItems from './components/CardItems'
import Footer from './components/Footer'
import './App.css';
//Almost finished need to test winner selection first deploy the smart contract again
//and then we will test the winner selection

function App() {
  const [ownerAddress,setOwnerAddress] =useState("");
  const [account,setAccount]=useState("");
  const [contract,SetContract]=useState("")
  const [isConnected,setIsConnected]=useState(false)
  useEffect(() => {
  async function fetchContract() {
    if (isConnected) {
      web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      setOwnerAddress(await contract.methods.owner().call());
      SetContract(contract);
    }
  }
  fetchContract();
}, [isConnected]);


async function Draw(contract){
  try{
    await contract.methods.conductDraw().send({from: account});
    console.log("Draw function called")
    alert("Draw function called")
  }catch(e){
    alert("Draw Error: ");
    console.log(e);
  }
}

async function Withdraw(contract){
  try{
    await contract.methods.WithdrawEther().send({ from: account });
  }catch(e){
    alert("Withdraw Error");
  }
}
async function revealBalance(contract){
  try{
    const balance = await web3.eth.getBalance(contractAddress);
    alert("Contract balance: " + web3.utils.fromWei(balance, 'ether'));
    console.log('Contract balance:', web3.utils.fromWei(balance, 'ether'));
  }catch(e){
    alert("Reveal Error");
  }
}
async function reset(contract){
  try{
    await contract.methods.resetLottery().send({ from: account });
  }catch(e){
    alert("Reset Error");
  }
}
  return (
    <>
      <Header setIsConnected={setIsConnected} setAccount={setAccount} address={account} />
      <CardItems contract={contract} account={account} />
      <Footer ownerAddress={ownerAddress} revealBalance={revealBalance} withdraw={Withdraw} contract={contract} draw={Draw} currentAccount={account} resetLottery={reset} />
    </>
  )
}

export default App;
