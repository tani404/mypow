"use client";

import { VERIFIED_ISSUER_ADDRESS, VERIFIED_ISSUER_ABI } from "@/lib/contracts";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import styles from "./register.module.css";

export default function RegisterIssuer() {
  const { address } = useAccount();
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["readContract", {
          address: VERIFIED_ISSUER_ADDRESS,
          functionName: "isVerifiedIssuer",
          args: [address],
        }],
      });
    }
  }, [isSuccess]);

  function handleRegister() {
    writeContract({
      address: VERIFIED_ISSUER_ADDRESS,
      abi: VERIFIED_ISSUER_ABI,
      functionName: "getVerifiedAsAnIssuer",
      args: [address],
    });
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        onClick={handleRegister}
        disabled={isPending || isConfirming}
      >
        {isPending ? (
          <><span className={styles.spinner} /> check your wallet</>
        ) : isConfirming ? (
          <><span className={styles.spinner} /> confirming...</>
        ) : (
          "register as issuer →"
        )}
      </button>

      {isSuccess && (
        <div className={styles.successMsg}>
          <span className={styles.successDot} />
          registered successfully — refresh to see your dashboard
        </div>
      )}
    </div>
  );
}
// "use client"
// import { VERIFIED_ISSUER_ADDRESS, VERIFIED_ISSUER_ABI } from "@/lib/contracts";
// import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { useQueryClient } from "@tanstack/react-query";
// import { useEffect } from "react";

// export default function RegisterIssuer(){
//     const {address} = useAccount();
//     const {writeContract, data: txHash, isPending} = useWriteContract();
//     const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({hash: txHash});
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         if(isSuccess){
//             queryClient.invalidateQueries({
//                 queryKey: ["readContract", {
//                     address: VERIFIED_ISSUER_ADDRESS,
//                     functionName: "isVerifiedIssuer",
//                     args: [address],
//                 }]
//             });
//         }
//     }, [isSuccess]);

//     function handleRegister(){
//         writeContract({
//             address: VERIFIED_ISSUER_ADDRESS,
//             abi: VERIFIED_ISSUER_ABI,
//             functionName: "getVerifiedAsAnIssuer", 
//             args: [address],
//         });
//     }

//     return(
//         <div>
//             <button onClick={handleRegister} disabled={isPending || isConfirming}>
//                 {isPending ? "Check you wallet" : isConfirming ? "Waiting for confirmation" : "Register me"}
//             </button>

//             {isSuccess && <p>Registered successfully</p>}
//         </div>
//     );
// }