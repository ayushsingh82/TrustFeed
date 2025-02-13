import React from 'react'
const { Agent } = require('@fileverse/agents');

const Fileverse = () => {

    const agent = new Agent({ 
        chain: process.env.VITE_CHAIN, 
        privateKey: process.env.VITE_PRIVATE_KEY, 
        pinataJWT: process.env.VITE_PINATA_JWT, 
        pinataGateway: process.env.VITE_PINATA_GATEWAY, 
        pimlicoAPIKey: process.env.VITE_PIMLICO_API_KEY, 
        });


        // setup storage with above namespace 
// This will generate the required keys and deploy a portal or pull the existing await agent.setupStorage('my-namespace'); // file is generated as the creds/${namespace}.json in the main directory

const latestBlockNumber = await agent.getBlockNumber(); 
console.log(Latest block number: ${latestBlockNumber});

// create a new file 
const file = await agent.create('Hello World'); c
onsole.log(File created: ${file});

// get the file 
const file = await agent.getFile(file.fileId); 
console.log(File: ${file});

// update the file 
const updatedFile = await agent.update(file.fileId, 'Hello World 2'); console.log(File updated: ${updatedFile});

// delete the file 
const deletedFile = await agent.delete(file.fileId); 
console.log(File deleted: ${deletedFile}); 

  return (
    <div>Fileverse</div>
  )
}

export default Fileverse