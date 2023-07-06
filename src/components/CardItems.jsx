import React from 'react'
import CardItem from './CardItem'
function CardItems({contract,account}) {
	 const cardsData = [
    {
      image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06251847.png', // Replace with the URL of the first image
      description: 'Laptop',
    },
    {
      image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg', // Replace with the URL of the second image
      description: 'Car',
    },
    // Add more card data objects as needed
    {
      image: 'https://images.pexels.com/photos/10141956/pexels-photo-10141956.jpeg', // Replace with the URL of the first image
      description: 'Phone',
    },
    
  ];

  return (
    <div style={{display:'flex',justifyContent:"space-around"}}>
      {cardsData.map((card, index) => (
        <CardItem
          key={index}
          id={index+1}
          image={card.image}
          description={card.description}
          contract={contract}
          account={account}
        />
      ))}
    </div>
  );
}

export default CardItems
