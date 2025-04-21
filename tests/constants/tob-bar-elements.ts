import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "./colors";

const defaultHoverColorDark = DARK_THEME_COLORS.topTabHoverText;
const defaultHoverColorLight = LIGHT_THEME_COLORS.topTabHoverText;
const defaultNormalDark = DARK_THEME_COLORS.topTabText;
const defaultNormalLight = LIGHT_THEME_COLORS.text;

export const tabs: Record<
    string,
    {
        hoverDark: string;
        hoverLight: string;
        normalDark: string;
        normalLight: string;
    }
> = {
    Markets: {
        hoverDark: defaultHoverColorDark,
        hoverLight: defaultHoverColorLight,
        normalDark: defaultNormalDark,
        normalLight: defaultNormalLight,
    },
    Futures: {
        hoverDark: defaultHoverColorDark,
        hoverLight: defaultHoverColorLight,
        normalDark: defaultNormalDark,
        normalLight: defaultNormalLight,
    },
    Options: {
        hoverDark: defaultHoverColorDark,
        hoverLight: defaultHoverColorLight,
        normalDark: defaultNormalDark,
        normalLight: defaultNormalLight,
    },
    "Log In": {
        hoverDark: DARK_THEME_COLORS.secondaryHover,
        hoverLight: defaultHoverColorLight,
        normalDark: DARK_THEME_COLORS.topTabText,
        normalLight: defaultNormalLight,
    },
    "Phone Icon": {
        hoverDark: DARK_THEME_COLORS.secondaryHover,
        hoverLight: defaultHoverColorLight,
        normalDark: DARK_THEME_COLORS.topTabText,
        normalLight: defaultNormalLight,
    },
};

export const dropDowns: Record<
    string,
    {
        menuClassName: string;
        subMenuClassName: string;
        subMenuItemsClassName: string;
        numOfSubmenuItems: number;
    }
> = {
    Algo: {
        menuClassName: ".styles_menuHeading__VVqJx",
        subMenuClassName: ".styles_dropdownMenu__MOrqY",
        subMenuItemsClassName: ".styles_menuButton__WQ_uX",
        numOfSubmenuItems: 3,
    },
    More: {
        menuClassName: ".styles_menuHeading__HLWGW",
        subMenuClassName: ".styles_dropdownMenu__YYVUf",
        subMenuItemsClassName: ".styles_menuButton__atBaP",
        numOfSubmenuItems: 5,
    },
};
