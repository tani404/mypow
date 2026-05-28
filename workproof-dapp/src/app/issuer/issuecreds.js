"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";
import Link from "next/link";
import styles from "./issuecreds.module.css";

export default function IssueCredentials() {
  const [worker, setWorker]     = useState("");
  const [platform, setPlatform] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [rating, setRating]     = useState(0);
  const [ipfsHash, setIpfsHash] = useState("");

  const queryClient = useQueryClient();
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["readContract", {
          address: WORKPROOF_ADDRESS,
          functionName: "getCredentials",
          args: [worker],
        }],
      });
      // clear form
      setWorker("");
      setPlatform("");
      setJobTitle("");
      setRating(0);
      setIpfsHash("");
    }
  }, [isSuccess]);

  function handleIssue() {
    writeContract({
      address: WORKPROOF_ADDRESS,
      abi: WORKPROOF_ABI,
      functionName: "issueCredentials",
      args: [worker, platform, jobTitle, Number(rating), ipfsHash],
    });
  }

  const isDisabled = isPending || isConfirming || !worker || !platform || !jobTitle || !rating;

  return (
    <div className={styles.wrap}>
      <div className={styles.cardLabel}>issue new credential</div>

      <div className={styles.form}>

        {/* worker address — full width */}
        <div className={styles.fieldFull}>
          <label className={styles.label}>worker address</label>
          <input
            className={styles.input}
            placeholder="0x..."
            value={worker}
            onChange={(e) => setWorker(e.target.value)}
          />
        </div>

        {/* platform + job title — side by side */}
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>platform</label>
            <input
              className={styles.input}
              placeholder="e.g. Freelancer"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>job title</label>
            <input
              className={styles.input}
              placeholder="e.g. Solidity Dev"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
        </div>

        {/* rating + ipfs — side by side */}
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>rating</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`${styles.star} ${rating >= n ? styles.starActive : ""}`}
                  onClick={() => setRating(n)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>ipfs hash</label>
            <input
              className={styles.input}
              placeholder="Qm..."
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
            />
          </div>
        </div>

        {/* submit */}
        <button
          className={styles.submitBtn}
          onClick={handleIssue}
          disabled={isDisabled}
        >
          {isPending ? (
            <><span className={styles.spinner} /> check your wallet</>
          ) : isConfirming ? (
            <><span className={styles.spinner} /> waiting for confirmation</>
          ) : (
            "issue credential →"
          )}
        </button>

        {/* success */}
        {isSuccess && (
          <div className={styles.successRow}>
            <span className={styles.successDot} />
            <span className={styles.successText}>credential issued.</span>
            <Link href={`/worker/${worker}`} className={styles.successLink}>
              view profile →
            </Link>
          </div>
        )}

        {/* error */}
        {error && (
          <div className={styles.errorRow}>
            <span className={styles.errorDot} />
            {error.shortMessage ?? error.message}
          </div>
        )}

      </div>
    </div>
  );
}
// "use client"
// import { useState, useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { WORKPROOF_ABI, WORKPROOF_ADDRESS } from "@/lib/contracts";
// import Link from "next/link";

// export default function IssueCredentials(){
//     const [worker, setWorker] = useState("");
//     const [platform, setPlatform] = useState("");
//     const [jobTitle, setJobTitle] = useState("");
//     const [rating, setRating] = useState(5);
//     const [ipfsHash, setIpfsHash] = useState("");

//     const queryClient = useQueryClient();

//     const {writeContract, data: txHash, isPending, error} = useWriteContract();
//     const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({hash: txHash});

//     useEffect(() => {
//         if(isSuccess){
//             queryClient.invalidateQueries({
//                 queryKey: ["readContract", {
//                     address: WORKPROOF_ADDRESS,
//                     functionName: "getCredentials",
//                     args: [worker],
//                 }]
//             });
//         }
//     }, [isSuccess]);

//     function handleIssue() {
//         writeContract({
//             address: WORKPROOF_ADDRESS,
//             abi: WORKPROOF_ABI,
//             functionName: "issueCredentials",
//             args: [worker, platform, jobTitle, Number(rating), ipfsHash],
//         });
//     }

//     return(
//         <div>
//             <h2>Issue a credential</h2>

//             <div>
//                 <input
//                     placeholder="worker address (0x...)"
//                     value={worker}
//                     onChange={(e) => setWorker(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     placeholder="Platform (e.g. Freelancer)"
//                     value={platform}
//                     onChange={(e) => setPlatform(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     placeholder="Job Title"
//                     value={jobTitle}
//                     onChange={(e) => setJobTitle(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     type="number"
//                     min={1}
//                     max={5}
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <input
//                     placeholder="IPFS Hash"
//                     value={ipfsHash}
//                     onChange={(e) => setIpfsHash(e.target.value)}
//                 />
//             </div>

//             <button onClick={handleIssue} disabled={isPending || isConfirming}>
//                 {isPending ? "check ur wallet" : isConfirming ? "waiting for confirmation" : "issue creds"}
//             </button>

//             {isSuccess && <p>creds issued to {worker}. <Link href={`/worker/${worker}`}>view their profile</Link></p>}
//             {error && <p>error: {error.message}</p>}
//         </div>
//     );
// }