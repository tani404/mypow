import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {anvil} from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "myPOW",
    projectId: "00a8d7237ee2a350b7e82c4d8bee0803",
    chains: [anvil],
    ssr: true
})