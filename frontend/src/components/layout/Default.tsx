import { NavigationBar } from "@/components/nav/NavigationBar";
import { Noto_Sans_JP } from "next/font/google";

interface LayoutDefaultProps {
  children: JSX.Element;
}

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <header className={`${notoSansJp.className} w-full`}>
          <NavigationBar />
        </header>
        <main
          className={`${notoSansJp.className} bg-container flex flex-1 flex-col items-center w-full`}
        >
          <div className="flex-1 max-w-5xl bg-base px-8 py-4 gap-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
