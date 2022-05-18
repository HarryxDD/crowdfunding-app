import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css';

import crowdfundArtifact from './artifacts/contracts/CrowdFund.sol/CrowdFund.json';

function App() {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [crowdfundContract, setCrowdFundContract] = useState(undefined);

  const [goal, setGoal] = useState(0);
  const [start,setStart] = useState(0);
  const [end,setEnd] = useState(0);
  
  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const crowdfundContract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", crowdfundArtifact.abi, provider);
      setCrowdFundContract(crowdfundContract);

    }

    init();
  }, [])

  const isConnected = () => (signer !== undefined)

  const getSigners = async provider => { 
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigners();

    signer.getAddress()
      .then(address => {
        setSignerAddress(address)
      })

    return signer
  }

  const connect = () => {
    getSigners(provider)
      .then(signer => {
        setSigner(signer)
      })

  }


  const handleSubmit = async (e) => {

    e.preventDefault();
    //const data = new FormData(e.target);
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const crowdfundContract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", crowdfundArtifact.abi, signer);
    await crowdfundContract.launch(goal, start, end);

    console.log(goal)
    console.log(start)
    console.log(end)

    crowdfundContract.on("Launch", (count, provider, _goal, _startAt, _endAt) => {
      console.log({ count, provider, _goal, _startAt, _endAt })
    })
  }
  
  const getCamp = async (e) => {

    e.preventDefault();

    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const crowdfundContract = await new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", crowdfundArtifact.abi, signer);

    const result = await crowdfundContract.getCampaign(2);
    
    console.log(result)
    
  }

  return (
    <div className="App">
      <h1 className='app__funding'>Crowd Funding</h1>
      <h2 className='app__funding-title'>Launching</h2>
      <form className='app__funding-form' onSubmit={handleSubmit}>
        <label>
          Goal:       
          <input type="text" name="goal" onChange={e => setGoal(e.target.value)}/>
        </label>
        <label>
          Start:      
          <input type="text" name="start" onChange={e => setStart(e.target.value)}/>
        </label>
        <label>
          End:     
          <input type="text" name="end" onChange={e => setEnd(e.target.value)}/>
        </label>

        <input className='button__submit' type="submit" value="Submit"/>
      </form>

      <button className='button__submit' onClick={getCamp}>
        get campaign
      </button>
    </div>
  );
}

export default App;
