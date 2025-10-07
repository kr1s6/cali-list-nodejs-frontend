'use client'

import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  if (!localStorage.getItem("jwt")) {
    router.push("/login");
  } else {
    return <><p>Siema</p></>
  }

}