import { ThemeProvider, createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { ReactNode } from 'react';

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  //const { themeDirection, mode, presetColor, fontFamily } = useConfig();

  //const theme: Theme = useMemo<Theme>(() => Palette(mode, presetColor), [mode, presetColor]);

  // const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
  //   () => Typography(fontFamily),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [mode, fontFamily]
  // );
  //const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => CustomShadows(theme), [theme]);

  // const themeOptions: ThemeOptions = useMemo(
  //   () => ({
  //     breakpoints: {
  //       values: {
  //         xs: 0,
  //         sm: 768,
  //         md: 1024,
  //         lg: 1266,
  //         xl: 1440
  //       }
  //     },
  //     direction: themeDirection,
  //     mixins: {
  //       toolbar: {
  //         minHeight: 60,
  //         paddingTop: 8,
  //         paddingBottom: 8
  //       }
  //     },
  //     palette: theme.palette,
  //     customShadows: themeCustomShadows,
  //     typography: themeTypography
  //   }),
  //   [themeDirection, theme, themeTypography, themeCustomShadows]
  // );

  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'dark'
      //mode: 'light'
    }
  };

  const themes: Theme = createTheme(themeOptions);
  //themes.components = componentsOverride(themes);

  //   return (
  //     <ThemeProvider theme={darkTheme}>
  //       <CssBaseline />
  //       <main>This app is using the dark mode</main>
  //     </ThemeProvider>
  //   );
}
