import { useMediaQuery } from "@react-hook/media-query";

export default function useScreenSize() {
  const isVerySmallScreen = useMediaQuery("(max-width: 450px)");
  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  const isTabletScreen = useMediaQuery("(max-width: 912px)");
  const isLargeScreen = useMediaQuery("(max-width: 1200px)");
  const isVeryLargeScreen = useMediaQuery("(min-width: 1399px)");

  const isExtraVeryLargeScreen = useMediaQuery("(min-width: 1400px)");

  return {
    isSmallScreen,
    isVeryLargeScreen,
    isVerySmallScreen,
    isTabletScreen,
    isLargeScreen,
    isExtraVeryLargeScreen,
  };
}
