import { DappDetails } from "features/dapp";
import { useParams } from "react-router-dom";

export default function DappInfoPage() {
  const params = useParams();
  return <DappDetails dappId={params.dappId!} />;
}
