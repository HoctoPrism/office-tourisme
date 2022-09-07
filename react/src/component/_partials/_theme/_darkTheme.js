/*export const darkPalette = {
    50: '#faecec',
    100: '#f4d0d0',
    200: '#ecb0b0',
    300: '#e49090',
    400: '#df7979',
    500: '#d96161',
    600: '#d55959',
    700: '#cf4f4f',
    800: '#ca4545',
    900: '#c03333',
    A100: '#ffffff',
    A200: '#ffd4d4',
    A400: '#ffa1a1',
    A700: '#ff8888',
    'contrastDefaultColor': 'dark',
};*/

export const darkTheme = {
    palette: {
        type: 'dark',
        primary: {
          main: '#5468ff',
          light: '#ccd2ff',
          dark: '#414fd0',
          contrastText: '#c8cdff',
        },
        secondary: {
          main: '#e6ecfd',
          light: 'rgb(235, 239, 253)',
          dark: 'rgb(211,216,243)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        warning: {
            main: '#ff9800',
            light: 'rgb(255, 172, 51)',
            dark: 'rgb(178, 106, 0)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            main: '#2196f3',
            light: 'rgb(77, 171, 245)',
            dark: 'rgb(23, 105, 170)',
            contrastText: '#fff',
        },
        success: {
            main: '#4caf50',
            light: 'rgb(111, 191, 115)',
            dark: 'rgb(53, 122, 56)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        alternative : '#f8f8ff',
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#f5f5f5',
            A200: '#eeeeee',
            A400: '#bdbdbd',
            A700: '#616161'
        },
        divider: 'rgba(182,183,213,0.22)',
        background: {
          paper: '#2b2f48',
          default: '#313553',
        },
        text: {
          primary: '#b6b7d5',
          secondary: 'rgba(182,183,213,0.86)',
          disabled: 'rgba(182,183,213,0.56)',
          hint: 'rgba(182,183,213,0.56)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 4,
    shape: {
        borderRadius: 4
    },
    mixins: {
        minHeight: 56
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        htmlFontSize: 16,
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    "&:before": {
                        borderColor: '#c4c6c8'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: '#c4c6c8'
                    },
                    ".MuiSelect-iconOutlined": {
                        fill: '#c4c6c8'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": {
                        backgroundColor: '#394248',
                        color: '#fff'
                    }
                }
            }
        }
    }
};