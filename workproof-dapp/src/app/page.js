"use client";

import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WORKPROOF_ABI, WORKPROOF_ADDRESS, VERIFIED_ISSUER_ABI, VERIFIED_ISSUER_ADDRESS } from "@/lib/contracts";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [liveAlert, setLiveAlert] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const { data } = useReadContracts({
    contracts: [
      {
        address: WORKPROOF_ADDRESS,
        abi: WORKPROOF_ABI,
        functionName: "totalSupply",
      },
      {
        address: VERIFIED_ISSUER_ADDRESS,
        abi: VERIFIED_ISSUER_ABI,
        functionName: "getIssuers",
      },
      {
        address: WORKPROOF_ADDRESS,
        abi: WORKPROOF_ABI,
        functionName: "getCredentials",
        args: [address],
      },
      {
        address: VERIFIED_ISSUER_ADDRESS,
        abi: VERIFIED_ISSUER_ABI,
        functionName: "isVerifiedIssuer",
        args: [address],
      },
    ],
    query: { enabled: true },
  });

  const totalSupply = data?.[0]?.result;
  const allIssuers  = data?.[1]?.result;
  const myTokenIds  = data?.[2]?.result;
  const isVerified  = data?.[3]?.result;

  useWatchContractEvent({
    address: WORKPROOF_ADDRESS,
    abi: WORKPROOF_ABI,
    eventName: "CredentialsIssued",
    onLogs(logs) {
      logs.forEach((log) => {
        setLiveAlert({ message: "new credential issued!", worker: log.args.worker });
      });
    },
  });

  function truncate(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* hero */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.dot} />
          decentralized work credentials
        </div>
        <h1 className={styles.heroTitle}>
          Proof of work,<br />on-chain.
        </h1>
        <p className={styles.heroSub}>
          Immutable credentials issued by verified employers.<br />
          Own your work history. No middlemen.
        </p>

        <div className={styles.searchRow}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            placeholder="search worker by address (0x...)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue)
                window.location.href = `/worker/${searchValue}`;
            }}
          />
          <Link
            href={searchValue ? `/worker/${searchValue}` : "#"}
            className={styles.searchBtn}
          >
            search
          </Link>
        </div>
      </section>

      {/* stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {totalSupply !== undefined ? totalSupply.toString() : "—"}
          </span>
          <span className={styles.statLabel}>credentials issued</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {allIssuers ? allIssuers.length.toString() : "—"}
          </span>
          <span className={styles.statLabel}>verified issuers</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {isConnected && myTokenIds ? myTokenIds.length.toString() : "—"}
          </span>
          <span className={styles.statLabel}>your credentials</span>
        </div>
      </div>

      {/* grid */}
      <section className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>session status</div>
          {!isConnected ? (
            <div className={styles.cardEmpty}>
              <p className={styles.cardEmptyText}>wallet not connected</p>
              <p className={styles.cardEmptySub}>connect to see your status</p>
            </div>
          ) : (
            <>
              <div className={styles.addressRow}>
                <span className={styles.connectedDot} />
                <span className={styles.addressMono}>{truncate(address)}</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>verified issuer</span>
                <span className={isVerified ? styles.yes : styles.no}>
                  {isVerified ? "yes" : "no"}
                </span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>credentials received</span>
                <span className={styles.statusValue}>
                  {myTokenIds ? myTokenIds.length : "0"}
                </span>
              </div>
              <div className={styles.cardActions}>
                <Link href="/issuer" className={styles.cardBtn}>
                  issuer dashboard →
                </Link>
                <Link href={`/worker/${address}`} className={styles.cardBtn}>
                  my profile →
                </Link>
              </div>
            </>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.cardLabel}>what is workproof</div>
          <p className={styles.cardBody}>
            WorkProof lets verified employers mint soulbound NFT credentials
            directly to workers' wallets. Each credential is permanent,
            tamper-proof, and publicly verifiable — no résumé needed.
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <span className={styles.featureTick}>✓</span>
              soulbound — non-transferable NFTs
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureTick}>✓</span>
              on-chain — verifiable by anyone
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureTick}>✓</span>
              permissionless — no platform lock-in
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardLabel}>get started</div>
          <div className={styles.stepList}>
            <div className={styles.stepItem}>
              <span className={styles.stepNum}>01</span>
              <div>
                <div className={styles.stepTitle}>connect wallet</div>
                <div className={styles.stepSub}>use MetaMask or any web3 wallet</div>
              </div>
            </div>
            <div className={styles.stepItem}>
              <span className={styles.stepNum}>02</span>
              <div>
                <div className={styles.stepTitle}>register as issuer</div>
                <div className={styles.stepSub}>verify your identity on-chain</div>
              </div>
            </div>
            <div className={styles.stepItem}>
              <span className={styles.stepNum}>03</span>
              <div>
                <div className={styles.stepTitle}>issue credentials</div>
                <div className={styles.stepSub}>mint NFTs directly to workers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* live alert */}
      {liveAlert && (
        <div className={styles.liveAlert}>
          <span className={styles.liveDot} />
          <span className={styles.liveText}>
            live — new credential issued to{" "}
            <span className={styles.liveMono}>{truncate(liveAlert.worker)}</span>
          </span>
          <Link href={`/worker/${liveAlert.worker}`} className={styles.liveLink}>
            view profile →
          </Link>
          <button className={styles.liveClose} onClick={() => setLiveAlert(null)}>
            ×
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
// "use client";

// import { useAccount } from "wagmi";
// import Link from "next/link";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { useWatchContractEvent } from "wagmi";
// import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";
// import { useState } from "react";

// export default function Home() {
//   const { address, isConnected } = useAccount();
//   const [newCredsAlert, setNewCredsAlert] = useState(null);

//   useWatchContractEvent({
//     address: WORKPROOF_ADDRESS,
//     abi: WORKPROOF_ABI,
//     eventName: "CredentialsIssued",
//     onLogs(logs){
//       logs.forEach((log) => {
//         setNewCredsAlert({message: "new creds issued!", worker: log.args.worker});
//       })
//     }
//   })

//   return (
//     <div>
//       <Header/>

//       {isConnected && (
//         <div>
//           <p>Connected as: {address}</p>
//         </div>
//       )}

//       <div>
//         <Link href="/issuer">Connect as an Issuer</Link>
//         {" | "}
//         {isConnected && <Link href={`/worker/${address}`}>My Worker Profile</Link>}
//       </div>

//       {newCredsAlert && (
//                 <div style={{background: "lightpink", padding:"10px", margin:"10px 0"}}>
//                 <p>{newCredsAlert.message}</p>
//                 <Link href = {`/worker/${newCredsAlert.worker}`}>view profile</Link>
//                 </div>
//       )}

//       <Footer/>
//     </div>
//   );
// }