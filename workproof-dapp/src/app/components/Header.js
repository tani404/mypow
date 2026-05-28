"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { VERIFIED_ISSUER_ABI, VERIFIED_ISSUER_ADDRESS } from "@/lib/contracts";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { address, isConnected } = useAccount();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const { data: isVerified } = useReadContract({
    address: VERIFIED_ISSUER_ADDRESS,
    abi: VERIFIED_ISSUER_ABI,
    functionName: "isVerifiedIssuer",
    args: [address],
    query: { enabled: !!address },
  });

  function handleSearch(e) {
    if (e.key === "Enter" && searchValue.trim()) {
      router.push(`/worker/${searchValue.trim()}`);
      setSearchValue("");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* left — logo */}
        <Link href="/" className={styles.logo}>
          WorkProof
        </Link>

        {/* center — nav */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            home
          </Link>
          <Link
            href="/issuer"
            className={`${styles.navLink} ${isVerified && isConnected ? styles.navLinkActive : ""}`}
          >
            issuer dashboard
            {isVerified && isConnected && (
              <span className={styles.verifiedBadge}>✓</span>
            )}
          </Link>
          {isConnected && (
            <Link href={`/worker/${address}`} className={styles.navLink}>
              my profile
            </Link>
          )}
        </nav>

        {/* right — search + connect */}
        <div className={styles.right}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.searchInput}
              placeholder="0x..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className={styles.connectWrap}>
            <ConnectButton
              showBalance={false}
              chainStatus="none"
              accountStatus="address"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
// "use client"

// import Link from "next/link";
// import {useAccount, useReadContract} from "wagmi";
// import { VERIFIED_ISSUER_ABI, VERIFIED_ISSUER_ADDRESS } from "@/lib/contracts";
// import { useState } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// export default function Header(){
//     const {address, isConnected} = useAccount();
//     const [searchValue, setSearchValue] = useState(null);

//     const {data: isVerified} = useReadContract({
//         address: VERIFIED_ISSUER_ADDRESS,
//         abi: VERIFIED_ISSUER_ABI,
//         functionName: "isVerifiedIssuer",
//         args: [address],
//         query: {enabled: !!address},
//     })

//     return(
//         <div>
//             <h1>WorkProof dApp</h1>
//             <Link href="/">Home</Link>
            
//             {isVerified && isConnected &&(
//                 <div>
//                     <Link href="/issuer">issuer dashboard</Link>
//                 </div>
//             )}

//             {isVerified && isConnected && (
//                 <div>
//                     <Link href="/issuer">issue creds</Link>
//                 </div>
//             )}

//             {isConnected && (
//                 <div>
//                     <Link href={`/worker/${address}`}>myPOW</Link>
//                 </div>
//             )}

//             <div>
//                 <input placeholder="0xabc..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
//                 <button><Link href = {`/worker/${searchValue}`}>search</Link></button>
//             </div>

//             <ConnectButton/>
//         </div>
//     )
// }