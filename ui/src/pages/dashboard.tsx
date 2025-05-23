import { Button } from "@/components/ui/button";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const {mutate: disconnectWallet} = useDisconnectWallet();

  useEffect(() => {
    if (!currentAccount) {
      navigate("/");
    }
  }, [currentAccount, navigate]);
  return (
    <div>
      <Button onClick={() => disconnectWallet()}>Disconnect</Button>
    </div>
  );
};

export { Dashboard };
