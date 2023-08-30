import header from "@/assets/header.png";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="logoArea">
      <Link href="/">
        <Image
          src={header}
          alt="logo"
          className="header"
          width={400}
          priority={true}
        ></Image>
      </Link>
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="logo"
          width={125}
          priority={true}
        ></Image>
      </Link>
    </div>
  );
}
