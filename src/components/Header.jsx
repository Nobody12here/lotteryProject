import React from 'react'
import { useState,useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Web3 from 'web3'

async function connectWallet(setAccount,setIsConnected) {
  if(window.ethereum) {
      const addresses = await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum)
      setAccount(addresses[0])
      setIsConnected(true)
      return web3;
    }
  else {
    alert("Please install Metamask")
  }
}

function Header({setIsConnected,setAccount,address}){

	return (
		<div>
			<AppBar position="static" style={{backgroundColor:'#57548B',color:'white'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lottery Project
        </Typography>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {address}
        </Typography>
        <Button  variant='contained' onClick={()=>{connectWallet(setAccount,setIsConnected)}}>
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>

		</div>
	)
}
export default Header;