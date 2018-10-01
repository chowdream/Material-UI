import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning';
import typographyMigration from './typographyMigration';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase',
};

const defaultFontFamiliy = '"Roboto", "Helvetica", "Arial", sans-serif';

/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */
export default function createTypography(palette, typography) {
  const {
    fontFamily = defaultFontFamiliy,
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    suppressDeprecationWarnings = process.env.MUI_SUPPRESS_DEPRECATION_WARNINGS,
    useNextVariants = false,
    // Apply the CSS properties to all the variants.
    allVariants,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  warning(
    !Object.keys(other).some(variant => typographyMigration.deprecatedVariants.includes(variant)),
    'Deprecation Warning: Material-UI: You are passing a deprecated variant to ' +
      `createTypography. ${typographyMigration.migrationGuideMessage}`,
  );

  warning(
    useNextVariants ||
      !Object.keys(other).some(variant => typographyMigration.restyledVariants.includes(variant)),
    'Deprecation Warning: Material-UI: You are passing a variant to createTypography ' +
      'that will be restyled in the next major release, without indicating that you ' +
      `are using typography v2 (set \`useNextVariants\` to true. ${
        typographyMigration.migrationGuideMessage
      }`,
  );

  const coef = fontSize / 14;
  const letterSpacingToEm = (tracking, spSize) => `${(tracking / spSize) * coef}em`;
  const pxToRem = size => `${(size / htmlFontSize) * coef}rem`;
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => ({
    color: palette.text.primary,
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...(fontFamily === defaultFontFamiliy
      ? { letterSpacing: letterSpacingToEm(letterSpacing, size) }
      : {}),
    ...casing,
    ...allVariants,
  });

  const nextVariants = {
    h1: buildVariant(fontWeightLight, 96, 1, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.04, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.17, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.33, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1Next: buildVariant(fontWeightRegular, 16, 1.5, 0.5),
    body2Next: buildVariant(fontWeightRegular, 14, 1.42, 0.25),
    buttonNext: buildVariant(fontWeightMedium, 14, 2.57, 0.75, caseAllCaps),
    captionNext: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1.5, caseAllCaps),
  };

  // To remove in v4
  const oldVariants = {
    display4: {
      fontSize: pxToRem(112),
      fontWeight: fontWeightLight,
      fontFamily,
      letterSpacing: '-.04em',
      lineHeight: `${round(128 / 112)}em`,
      marginLeft: '-.04em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display3: {
      fontSize: pxToRem(56),
      fontWeight: fontWeightRegular,
      fontFamily,
      letterSpacing: '-.02em',
      lineHeight: `${round(73 / 56)}em`,
      marginLeft: '-.02em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display2: {
      fontSize: pxToRem(45),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(51 / 45)}em`,
      marginLeft: '-.02em',
      color: palette.text.secondary,
      ...allVariants,
    },
    display1: {
      fontSize: pxToRem(34),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(41 / 34)}em`,
      color: palette.text.secondary,
      ...allVariants,
    },
    headline: {
      fontSize: pxToRem(24),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(32.5 / 24)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    title: {
      fontSize: pxToRem(21),
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: `${round(24.5 / 21)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    subheading: {
      fontSize: pxToRem(16),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(24 / 16)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    body2: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: `${round(24 / 14)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    body1: {
      fontSize: pxToRem(14),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(20.5 / 14)}em`,
      color: palette.text.primary,
      ...allVariants,
    },
    caption: {
      fontSize: pxToRem(12),
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: `${round(16.5 / 12)}em`,
      color: palette.text.secondary,
      ...allVariants,
    },
    button: {
      fontSize: pxToRem(14),
      textTransform: 'uppercase',
      fontWeight: fontWeightMedium,
      fontFamily,
      color: palette.text.primary,
      ...allVariants,
    },
  };

  return deepmerge(
    {
      pxToRem,
      round,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      ...oldVariants,
      ...(useNextVariants
        ? {
            ...nextVariants,
            body1: nextVariants.body1Next,
            body2: nextVariants.body2Next,
            button: nextVariants.buttonNext,
            caption: nextVariants.captionNext,
          }
        : nextVariants),
      suppressDeprecationWarnings,
      useNextVariants,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );
}
