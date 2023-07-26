export const lightColors = {
  main: "#fefefe",
  primary: "#262626",
  secondary: "#1c1c1c",
  offWhite: "#f9f9f9",
  lightGrey: "#cbcbcb",
  darkGrey: "#939393",
  lightBlue: "#b1dff9",
  mediumBlue: "#0094f4",
  darkBlue: "#042445",
};

export const darkColors = {
  main: "#000000",
  primary: "#ffffff",
  secondary: "#a3a3a3",
  darkGrey: "#353535",
  mediumBlue: "#002d4a",
  aceBlue: "#30618A",
  blueText: "#50758e",
  darkBlue: "#163458",
  lightBlue: "#0294f4",
};

export const bottomNavIcons = {
  homeLightActive: require("../../assets/icons/home-light-active.png"),
  homeLightInactive: require("../../assets/icons/home-light-inactive.png"),

  homeDarkActive: require("../../assets/icons/home-dark-active.png"),
  homeDarkInactive: require("../../assets/icons/home-dark-inactive.png"),
};

export const otherIcons = {
  // addPostLight: require("../assets/icons/add-post-light.png"),
  // addPostDark: require("../assets/icons/add-post-dark.png"),
  // messengerLight: require("../assets/icons/messenger-light.png"),
  // messengerDark: require("../assets/icons/messenger-dark.png"),
  // likeLightActive: require("../assets/icons/like-light-active.png"),
  // likeDarkActive: require("../assets/icons/like-dark-active.png"),
  // likeLightInactive: require("../assets/icons/like-light-inactive.png"),
  // likeDarkInactive: require("../assets/icons/like-dark-inactive.png"),
  // commentLight: require("../assets/icons/comment-light.png"),
  // commentDark: require("../assets/icons/comment-dark.png"),
  // shareLight: require("../assets/icons/share-light.png"),
  // shareDark: require("../assets/icons/share-dark.png"),
  // bookmarkLight: require("../assets/icons/bookmark-light.png"),
  // bookmarkDark: require("../assets/icons/bookmark-dark.png"),
};

export const getThemeColors = (isDark) => {
  const colors = {
    main: isDark ? darkColors.main : lightColors.main,
    primary: isDark ? darkColors.primary : lightColors.primary,
    blue: isDark ? darkColors.lightBlue : lightColors.mediumBlue,
    containerColor: isDark ? darkColors.darkGrey : lightColors.offWhite,
    borderColor: isDark ? darkColors.darkGrey : lightColors.lightGrey,
    darkBlueText: isDark ? darkColors.aceBlue : lightColors.darkBlue,
    dividerColor: isDark ? darkColors.secondary : lightColors.darkGrey,
    borderWhite: isDark ? darkColors.primary : lightColors.lightGrey,
  };

  return colors;
};

export const getLightIcon = (focused, icon) => {
  let selectedIcon;
  if (focused) {
    switch (icon) {
      case "home":
        selectedIcon = bottomNavIcons.homeLightActive;
        break;

      case "search":
        selectedIcon = bottomNavIcons.searchLightActive;
        break;

      case "reels":
        selectedIcon = bottomNavIcons.reelsLightActive;
        break;

      case "heart":
        selectedIcon = bottomNavIcons.heartLightActive;
        break;

      default:
        selectedIcon = bottomNavIcons.homeLightActive;
    }

    return selectedIcon;
  }
};

export const getDarkIcon = (focused, icon) => {
  let selectedIcon;
  if (focused) {
    switch (icon) {
      case "home":
        selectedIcon = bottomNavIcons.homeDarkActive;
        break;

      case "search":
        selectedIcon = bottomNavIcons.searchDarkActive;
        break;

      case "reels":
        selectedIcon = bottomNavIcons.reelsDarkActive;
        break;

      case "heart":
        selectedIcon = bottomNavIcons.heartDarkActive;
        break;

      default:
        selectedIcon = bottomNavIcons.homeDarkActive;
    }

    return selectedIcon;
  }
};
