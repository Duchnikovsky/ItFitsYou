'use client'
import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      isLoading={false}
      isDisabled={false}
      fontSize="18px"
      width="350px"
      height="2.25rem"
      type="button"
      onClick={() => signOut()}
      margin={'2rem auto 0 auto'}
    >
      Sign Out
    </Button>
  );
}
