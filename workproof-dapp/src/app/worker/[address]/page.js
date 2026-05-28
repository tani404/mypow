"use client"

import { useState } from "react";
import {useParams} from "next/navigation";
import { useReadContract, useWatchContractEvent } from "wagmi";
import Link from "next/link";
import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";

export default function WorkerProfile() {
    const {address} = useParams();
    const [newCredsAlert, setNewCredsAlert] = useState(null);

    const {data: credId, isLoading, refetch} = useReadContract({
        address: WORKPROOF_ADDRESS,
        abi: WORKPROOF_ABI,
        functionName: "getCredentials", 
        args: [address],
    });

    useWatchContractEvent({
        address: WORKPROOF_ADDRESS,
        abi: WORKPROOF_ABI,
        eventName: "CredentialsIssued",
        onLogs(logs){
            logs.forEach((log) => {
                if(log.args.worker?.toLowerCase() == address?.toLowerCase()){
                    setNewCredsAlert(`new creds issued; creds id: ${log.args.tokenId}`);
                    refetch();
                }
            })
        }
    })

    return(
        <div>
            <Link href = "/">Back to home</Link>
            <h1>Worker's profile</h1>
            <p>Address: {address}</p>

            {newCredsAlert && (
                <div style={{background: "lightpink", padding:"10px", margin:"10px 0"}}>
                {newCredsAlert}
                </div>
            )}

            {isLoading && <p>Loading creds...</p>}

            {credId && credId.length === 0 && <p>No creds issued to this address yet.</p>}

            {credId && credId.map((id) => (<CredentialCard key={id.toString()} creds={id}/>))}
        </div>
    );
}

function CredentialCard({creds}){
    const {data: cred, isLoading} = useReadContract({
        address: WORKPROOF_ADDRESS,
        abi: WORKPROOF_ABI,
        functionName: "getCredentialsDetail",
        args: [creds],
    });

    if (isLoading) return <p>Loading credentials #{creds.toString()}</p>;
    if(!cred) return null;

    return(
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p>Creds ID: {creds.toString()}</p>
            <p>Worker: {cred.worker}</p>
            <p>Job Title: {cred.jobTitle}</p>
            <p>Platform: {cred.platform}</p>
            <p>Rating: {cred.rating.toString()}/5</p>
            <p>Issuer: {cred.issuer}</p>
            <p>Issued At: {new Date(Number(cred.issuedAt) * 1000).toLocaleDateString()}</p>
        </div>
    )
}