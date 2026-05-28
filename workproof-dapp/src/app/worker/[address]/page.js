"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useReadContract, useWatchContractEvent } from "wagmi";
import Link from "next/link";
import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";
import styles from "./page.module.css";

export default function WorkerProfile() {
  const { address } = useParams();
  const [newCredsAlert, setNewCredsAlert] = useState(null);
  const [copied, setCopied] = useState(false);

  const { data: credIds, isLoading, refetch } = useReadContract({
    address: WORKPROOF_ADDRESS,
    abi: WORKPROOF_ABI,
    functionName: "getCredentials",
    args: [address],
  });

  useWatchContractEvent({
    address: WORKPROOF_ADDRESS,
    abi: WORKPROOF_ABI,
    eventName: "CredentialsIssued",
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.worker?.toLowerCase() === address?.toLowerCase()) {
          setNewCredsAlert(`new credential issued — token #${log.args.tokenId}`);
          refetch();
        }
      });
    },
  });

  function truncate(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function handleCopy() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.page}>

      {/* top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span className={styles.pageLabel}>worker profile</span>
          <Link href="/" className={styles.backLink}>← home</Link>
        </div>
      </div>

      <div className={styles.body}>

        {/* profile header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileLeft}>
            <div className={styles.profileEyebrow}>verified identity</div>
            <div className={styles.profileAddressRow}>
              <h1 className={styles.profileAddress}>
                {truncate(address)}
              </h1>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? "✓" : "⎘"}
              </button>
            </div>
          </div>
          <div className={styles.profileRight}>
            <div className={styles.profileStat}>
              <span className={styles.profileStatValue}>
                {credIds ? credIds.length : "—"}
              </span>
              <span className={styles.profileStatLabel}>credentials</span>
            </div>
          </div>
        </div>

        {/* live alert */}
        {newCredsAlert && (
          <div className={styles.liveAlert}>
            <span className={styles.liveDot} />
            <span className={styles.liveText}>{newCredsAlert}</span>
            <button
              className={styles.liveClose}
              onClick={() => setNewCredsAlert(null)}
            >
              ×
            </button>
          </div>
        )}

        {/* credentials section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>work credentials</span>
            <span className={styles.sectionCount}>
              {credIds ? credIds.length : 0} total
            </span>
          </div>

          {isLoading && (
            <div className={styles.loadingRow}>
              <span className={styles.spinner} />
              loading credentials...
            </div>
          )}

          {credIds && credIds.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>◻</div>
              <p className={styles.emptyTitle}>no credentials yet</p>
              <p className={styles.emptySub}>
                no credentials have been issued to this address
              </p>
            </div>
          )}

          {credIds && credIds.length > 0 && (
            <div className={styles.grid}>
              {credIds.map((id) => (
                <CredentialCard key={id.toString()} tokenId={id} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function CredentialCard({ tokenId }) {
  const { data: cred, isLoading } = useReadContract({
    address: WORKPROOF_ADDRESS,
    abi: WORKPROOF_ABI,
    functionName: "getCredentialsDetail",
    args: [tokenId],
  });

  function truncate(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  if (isLoading) return (
    <div className={styles.cardSkeleton}>
      <span className={styles.spinner} />
    </div>
  );
  if (!cred) return null;

  const stars = Number(cred.rating);

  return (
    <div className={styles.card}>

      {/* card top */}
      <div className={styles.cardTop}>
        <span className={styles.platformTag}>{cred.platform}</span>
        <span className={styles.verifiedMark}>✓</span>
      </div>

      {/* job title */}
      <div className={styles.cardTitle}>{cred.jobTitle}</div>

      {/* stars */}
      <div className={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= stars ? styles.starOn : styles.starOff}
          >
            ★
          </span>
        ))}
        <span className={styles.ratingNum}>{stars}.0 rating</span>
      </div>

      {/* meta rows */}
      <div className={styles.cardMeta}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>platform</span>
          <span className={styles.metaValue}>{cred.platform}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>issuer</span>
          <span className={styles.metaValue}>{truncate(cred.issuer)}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>date</span>
          <span className={styles.metaValue}>
            {new Date(Number(cred.issuedAt) * 1000).toLocaleDateString(
              "en-US", { month: "short", day: "2-digit", year: "numeric" }
            )}
          </span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>token id</span>
          <span className={styles.metaValue}>#{tokenId.toString()}</span>
        </div>
      </div>

    </div>
  );
}
// "use client"

// import { useState } from "react";
// import {useParams} from "next/navigation";
// import { useReadContract, useWatchContractEvent } from "wagmi";
// import Link from "next/link";
// import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";

// export default function WorkerProfile() {
//     const {address} = useParams();
//     const [newCredsAlert, setNewCredsAlert] = useState(null);

//     const {data: credId, isLoading, refetch} = useReadContract({
//         address: WORKPROOF_ADDRESS,
//         abi: WORKPROOF_ABI,
//         functionName: "getCredentials", 
//         args: [address],
//     });

//     useWatchContractEvent({
//         address: WORKPROOF_ADDRESS,
//         abi: WORKPROOF_ABI,
//         eventName: "CredentialsIssued",
//         onLogs(logs){
//             logs.forEach((log) => {
//                 if(log.args.worker?.toLowerCase() == address?.toLowerCase()){
//                     setNewCredsAlert(`new creds issued; creds id: ${log.args.tokenId}`);
//                     refetch();
//                 }
//             })
//         }
//     })

//     return(
//         <div>
//             <Link href = "/">Back to home</Link>
//             <h1>Worker's profile</h1>
//             <p>Address: {address}</p>

//             {newCredsAlert && (
//                 <div style={{background: "lightpink", padding:"10px", margin:"10px 0"}}>
//                 {newCredsAlert}
//                 </div>
//             )}

//             {isLoading && <p>Loading creds...</p>}

//             {credId && credId.length === 0 && <p>No creds issued to this address yet.</p>}

//             {credId && credId.map((id) => (<CredentialCard key={id.toString()} creds={id}/>))}
//         </div>
//     );
// }

// function CredentialCard({creds}){
//     const {data: cred, isLoading} = useReadContract({
//         address: WORKPROOF_ADDRESS,
//         abi: WORKPROOF_ABI,
//         functionName: "getCredentialsDetail",
//         args: [creds],
//     });

//     if (isLoading) return <p>Loading credentials #{creds.toString()}</p>;
//     if(!cred) return null;

//     return(
//         <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
//             <p>Creds ID: {creds.toString()}</p>
//             <p>Worker: {cred.worker}</p>
//             <p>Job Title: {cred.jobTitle}</p>
//             <p>Platform: {cred.platform}</p>
//             <p>Rating: {cred.rating.toString()}/5</p>
//             <p>Issuer: {cred.issuer}</p>
//             <p>Issued At: {new Date(Number(cred.issuedAt) * 1000).toLocaleDateString()}</p>
//         </div>
//     )
// }