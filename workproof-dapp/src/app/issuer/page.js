"use client";

import { useAccount, useReadContract } from "wagmi";
import RegisterIssuer from "./register";
import IssueCredentials from "./issuecreds";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { VERIFIED_ISSUER_ABI, VERIFIED_ISSUER_ADDRESS } from "@/lib/contracts";
import styles from "./page.module.css";

export default function IssuerPage() {
  const { address, isConnected } = useAccount();

  const { data: isVerified, isLoading } = useReadContract({
    address: VERIFIED_ISSUER_ADDRESS,
    abi: VERIFIED_ISSUER_ABI,
    functionName: "isVerifiedIssuer",
    args: [address],
    query: { enabled: !!address },
  });

  return (
    <div className={styles.page}>

      {/* top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <span className={styles.pageLabel}>issuer dashboard</span>
            {isConnected && !isLoading && (
              <span className={isVerified ? styles.badgeVerified : styles.badgeUnverified}>
                {isVerified ? "✓ verified" : "unverified"}
              </span>
            )}
          </div>
          <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
        </div>
      </div>

      {/* body */}
      <div className={styles.body}>

        {/* not connected */}
        {!isConnected && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⬡</div>
            <p className={styles.emptyTitle}>wallet not connected</p>
            <p className={styles.emptySub}>connect your wallet to access the issuer dashboard</p>
          </div>
        )}

        {/* connected, not verified */}
        {isConnected && !isLoading && !isVerified && (
          <div className={styles.registerWrap}>
            <div className={styles.registerCard}>
              <div className={styles.cardLabel}>registration required</div>
              <h2 className={styles.registerTitle}>become a verified issuer</h2>
              <p className={styles.registerSub}>
                register on-chain to start issuing soulbound work credentials
                to your workers and freelancers.
              </p>
              <div className={styles.registerFeatures}>
                <div className={styles.registerFeature}>
                  <span className={styles.featureTick}>✓</span>
                  issue unlimited credentials
                </div>
                <div className={styles.registerFeature}>
                  <span className={styles.featureTick}>✓</span>
                  credentials are permanent and tamper-proof
                </div>
                <div className={styles.registerFeature}>
                  <span className={styles.featureTick}>✓</span>
                  revoke credentials anytime
                </div>
              </div>
              <RegisterIssuer />
            </div>
          </div>
        )}

        {/* connected and verified */}
        {isConnected && isVerified && (
          <div className={styles.dashboardWrap}>
            <IssueCredentials />
          </div>
        )}

      </div>
    </div>
  );
}
// "use client"

// import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
// import RegisterIssuer from "./register"
// import IssueCredentials from "./issuecreds"
// import { ConnectButton } from "@rainbow-me/rainbowkit"
// import Link from "next/link"
// import {VERIFIED_ISSUER_ABI, VERIFIED_ISSUER_ADDRESS, WORKPROOF_ABI, WORKPROOF_ADDRESS} from "@/lib/contracts";

// export default function IssuerPage(){
//     const {address, isConnected} = useAccount();

//     const {data: isVerified} = useReadContract({
//         address: VERIFIED_ISSUER_ADDRESS,
//         abi: VERIFIED_ISSUER_ABI,
//         functionName: "isVerifiedIssuer",
//         args: [address],
//         query: {enabled: !!address},
//     });

//     return(
//         <div>
//             <Link href="/">back to home</Link>
//             <h1>Issuer Dashboard: </h1>
//             <ConnectButton/>

//             {!isConnected && <p>Connect your wallet to continue</p>}

//             {isConnected && !isVerified && (
//                 <div>
//                     <p>You are not a registered issuer yet</p>
//                     <RegisterIssuer/>
//                 </div>
//             )}

//             {isConnected && isVerified && (
//                 <div>
//                     <p>Youre a verified issuer.</p>
//                     <IssueCredentials/>
//                 </div>
//             )}
//         </div>
//     );
// }