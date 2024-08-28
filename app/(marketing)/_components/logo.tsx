import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        className="dark:hidden"
        src="/favicon.png"
        height="40"
        width="40"
        alt="Logo"
      />
      <Image
        className="hidden dark:block"
        src="/favicon-dark.png"
        height="40"
        width="40"
        alt="Logo"
      />
      <p className={cn("font-semibold", font.className)}>Yotion</p>
    </div>
  );
};

export default Logo;
