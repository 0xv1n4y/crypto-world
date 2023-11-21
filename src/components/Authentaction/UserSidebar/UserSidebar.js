import React from "react";
import { AiFillDelete } from "react-icons/ai";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { CryptoState } from "../../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

const UserSidebar = () => {
  const { user, setAlert, watchlist, coins, symbol, numberWithCommas } =
    CryptoState();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "error",
      message: "Logout Successfully !",
    });
  };


    // Remove Coin From WatchList

    const removefromWatchlist = async(coin) => {

      const coinref = doc(db, "watchlist", user.uid);
  
      try {
  
         await setDoc(coinref,{
          coins : watchlist.filter((watch)=> watch !== coin?.id)
        },{
          merge : "true"
        });
  
        setAlert({
          open: true,
          message: `${coin.id} Can Be Removed From WatchList`,
          type: "error",
        });
  
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        
      }
  
    }
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "orange",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className="container"
              style={{
                width: "450px",
                padding: "25px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
                backgroundColor: "black",
              }}
            >
              <div
                className="profile"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "50%",
                }}
              >
                <Avatar
                  className="picture"
                  style={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                    color: "whitesmoke",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div
                  
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    borderRadius: "10px",
                    padding: "15px",
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    WatchList
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div
                          style={{
                            padding: 10,
                            borderRadius: 5,
                            color: "black",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "blue",
                            boxShadow: "0 0 3px black",
                            
                            
                          }}
                        >
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer",color:"red" }}
                              fontSize="16"
                              onClick={()=>removefromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className="log"
                style={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "red",
                  fontSize: "20px",
                  fontweight: "9000",
                  marginTop: "10px",
                }}
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
