import React,{useState,useEffect} from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';


function CardItem({image,description,contract,id,account}){
  const [ticketsPurchase,setTicketsPurchase] = useState(0);

  async function fetchTickets(id){
  const Item = await contract.methods.items(id).call();
  setTicketsPurchase(Item[2]);
  }

async function Participate(contract,id,numberofTickets){
    const TicketPrice = web3.utils.toWei("0.01", "ether");
    const weiAmount = (numberofTickets * TicketPrice).toString()
    console.log(weiAmount)
    console.log("ID = ",id)
    try{
    await contract.methods.purchaseTickets(id, numberofTickets).send({ from: account, value: weiAmount });
    fetchTickets(id)
  }catch(e){
    alert("Participate Error");
    console.log(e)
  }
}
  return (
    <Card style={{width:400,marginTop:'10px',marginLeft:'10px',backgroundColor:"#57548B",color:"white"}}>
      <CardMedia
        component="img"
        height="200"
        image={image} // Replace with your image URL
        alt="Image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="body2">
          Ticket Purchased: {ticketsPurchase}
        </Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Button variant="contained" color="primary" sx={{ width: '80%',marginBottom:2 }}
          onClick={()=>{Participate(contract,id,1)}}
      >
        Participate
          </Button>
        </div>
    </Card>
  );
};

export default CardItem;
