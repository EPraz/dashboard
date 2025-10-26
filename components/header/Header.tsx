import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-white border-b border-slate-100 py-1 lg:ml-[96px]"
    >
      <HeaderMobile />

      <HeaderDesktop />
    </SafeAreaView>
  );
}
