import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  address: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
}));

function Footer({
  contract,
  ownerAddress,
  withdraw,
  draw,
  currentAccount,
  revealBalance,
  resetLottery,
}) {
  //A function to select winners
  async function amIWinner(currentAddress) {
    console.log(currentAddress)
    let winners = await contract.methods.getWinners().call({ from: ownerAddress });
    await console.log("Winners inside",winners);
    if (winners.length == 0) {
      alert("No winners yet");
      return false;
    }
    for (var i = 0; i < winners.length; i++) {
      currentAddress = window.web3.utils.toChecksumAddress(currentAddress);
      if (winners[i] == currentAddress) {
        alert("Congrats you are a winner of draw number " + (i + 1));
        console.log(currentAddress);
        return true;
      }
    }
    alert("Sorry you are not a winner");
    console.log(currentAddress);
    return false;
  }

  const classes = useStyles();

  return (
    <>
      <div style={{ marginTop: 4 }}>
        <span className={classes.address}>Owner Address:{ownerAddress}</span>
      </div>

      <div className={classes.root}>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              revealBalance(contract);
            }}
          >
            Reveal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              amIWinner(currentAccount);
            }}
          >
            Am i winner
          </Button>
        </div>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              withdraw(contract);
            }}
          >
            withdraw
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              draw(contract);
            }}
          >
            Select winner
          </Button>
        </div>
      </div>

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            resetLottery(contract);
          }}
        >
          Reset lottery
        </Button>
      </div>
    </>
  );
}

export default Footer;