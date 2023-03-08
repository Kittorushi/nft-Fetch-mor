import axios from "axios";
import "./App.css";
import { useState } from "react";
import logo from "./logo.svg";
import bg_for_site from "./bg_for_site.jpg"

function App() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("0x1");
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const [html, setHtml] = useState(null);

 let state = {
    showModal: false
    }


  function getImgUrl(metadata) {
    if (!metadata) return logo;

    let meta = JSON.parse(metadata);

    if (!meta.image) return logo;

    if (!meta.image.includes("ipfs://")) {
      return meta.image;
    } else {
      return "https://ipfs.io/ipfs/" + meta.image.substring(7);
    }
  }

  async function fetchNFTs() {
    let res;
    if (cursor) {
      res = await axios.get(`http://localhost:3000/allNft`, {
        params: { address: address, chain: chain, cursor: cursor },
      });
    } else {
      res = await axios.get(`http://localhost:3000/allNft`, {
        params: { address: address, chain: chain },
      });
    }

    console.log(res);

    let n = NFTs;
    setNFTs(n.concat(res.data.result.result));
    setCursor(res.data.result.cursor);
    console.log(res);
  }

  function addressChange(e) {
    setAddress(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  function chainChange(e) {
    setChain(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  function getOpenSeaUrl(token_id){
    console.log(token_id);
    window.open("https://opensea.io/assets/ethereum/"+address+"/"+token_id, "_blank");
  }

  function openPreview(e){

    document.getElementById("previewModel"+e.token_id).style.display = "block";

  }

  function showModal(e){
      document.getElementById("previewModel"+e.token_id).style.display = "block";
  }

  function enableModal(e){
    // const modal = document.querySelector(".modal");
    // // modal.style.display = "block"
    // modal.classList.remove("hidden");
  
  // document.getElementById("previewModel").style.display = "block";
  }

  function getDescription(metadata){
    // var modal = ;
    // document.getElementById("previewModel").style.display = "block";
    // return (e.metadata.description);
    let meta = JSON.parse(metadata);
    return meta.description
  }

 
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    var modal = document.getElementsByClassName("modal");
    
    for(let i=0;i<modal.length;i++){
      if (event.target == modal[i]) {
      modal[i].style.display = "none";
    }
    }
  }

  return (
    <>
      <img src={bg_for_site} alt="moralis" className="moralis" />
      <div style={{position:"absolute",height:50,zIndex:2}}>
        <p style={{color:"#ffffff"}}>
          {/* {address} */}
          Testing Address : 0x1a92f7381b9f03921564a437210bb9396471050c
        </p>
      </div>
      <div className="App">
        <div style={{ fontSize: "23px", fontWeight: "700" }}>
          Get NFTs by contract
        </div>
        <button className="bu" onClick={fetchNFTs}>
          Get NFT's
        </button>
        <div className="inputs">
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Contract:</div>
            <input
              className="input"
              value={address}
              onChange={(e) => addressChange(e)}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Chain:</div>
            <select className="input" onChange={(e) => chainChange(e)}>
              <option value="0x1">Ethereum</option>
              <option value="0x38">Bsc</option>
              <option value="0x89">Polygon</option>
              <option value="0xa86a">Avalanche</option>
            </select>
          </div>
        </div>
        {NFTs.length > 0 && (
          <>
            <div className="results">
              {NFTs?.map((e, i) => {
                return (
                  <>
                  <div id={"previewModel"+e.token_id} className="modal">
                    <div className="modal-content">
                      <img src={getImgUrl(e.metadata)} alt={i+"image"}/>
                      <h3 style={{color:"#5f5f5f"}}>{`${e.name}\n${e.token_id}`}</h3>
                      <p style={{color:"#9f9f9f"}}>{"Description : " + getDescription(e.metadata)}</p>
                      <p style={{color:"#9f9f9f"}}>Owner: {address}</p>
                      <button className="button_des"  onClick= {() => getOpenSeaUrl(e.token_id) } type="button" >Purchase on OpenSea</button>
                    </div>
                  </div>  
                    <div style={{ width: "70px" }} >
                    {html}
                      <img
                        loading="lazy"
                        width={70}
                        src={getImgUrl(e.metadata)}
                        alt={`${i}image`}
                        style={{ borderRadius: "78px", marginTop: "10px" }}
                        onClick= {() =>openPreview(e) }
                      >
                        
                      </img>

                      
                      <div key={i} style={{ fontSize: "10px" }}>
                        {`${e.name}\n${e.token_id}`}
                      </div>
                      <button className="button_des" onClick= {() => getOpenSeaUrl(e.token_id) } >Buy</button>

                      <div>

                      </div>
                    </div>

            
                  </>
                );
       

              })}
            </div>
            {cursor && (
              <>
                <button className="bu" onClick={fetchNFTs}>
                  Load More
                </button>
              </>
            )}



          </>
        )}

                     


            
              

      </div>



      
    </>
  );
}

export default App;
