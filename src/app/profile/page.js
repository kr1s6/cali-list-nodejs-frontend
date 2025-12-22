'use client'
import Footer from "components/footer";
import { LoadingNavabar } from "components/navbar";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "utils/local-storage-utils";

export default function Profile() {
  const [isWaitingForData, setIsWaitingForData] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [userAvatarImg, setUserAvatarImg] = useState("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp");
  const [user, setUser] = useState(getLocalStorageItem("user") || null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const userAvatar = getLocalStorageItem("userAvatarImg");
    if (userAvatar) {
      setUserAvatarImg(userAvatar);
    }
    setIsWaitingForData(false);
  }, [isClient]);


  if (isWaitingForData) {
    return (
      <>
        <LoadingNavabar></LoadingNavabar>
        <Footer></Footer>
      </>
    );
  }


  return (
    <div className="bg-accent-content flex px-60">

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">TRAINED FOR</div>
          <div className="stat-value">{user.trainingDuration}</div>
        </div>
      </div>

    </div>
  );
}
