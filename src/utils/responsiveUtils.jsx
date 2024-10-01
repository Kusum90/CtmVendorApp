import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Custom logic to determine if the device is a tablet
export const isTablet = () => width >= 600;

// Base dimensions for scaling
const baseWidth = isTablet() ? 768 : 375; // Use larger base width for tablets
const baseHeight = isTablet() ? 1024 : 812; // Use larger base height for tablets

export const scaleFontSize = (size) => {
  return Math.round((size * width) / baseWidth);
};

export const scaleWidth = (size) => (size * width) / baseWidth;
export const scaleHeight = (size) => (size * height) / baseHeight;
export const scaleBorderWidth = (size) => (size * width) / baseWidth;




// import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const BREAKPOINTS = {
  DESKTOP: 1024,
  TABLET: 768,
  SMALL_TABLET: 600,
  LARGE_PHONE: 480,
  PHONE: 320
};

// Convert percentage to device width
export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
};

// Convert percentage to device height
export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
};

// Determine the number of videos/products/cards to show based on device size
export const getProductCard = () => {
  if (deviceWidth >= BREAKPOINTS.DESKTOP) {
    // Desktop
    return 4;
  } else if (deviceWidth >= BREAKPOINTS.TABLET) {
    // Large Tablet
    return 3;
  } else if (deviceWidth >= BREAKPOINTS.SMALL_TABLET) {
    // Small Tablet
    return 2;
  } else if (deviceWidth >= BREAKPOINTS.LARGE_PHONE) {
    // Large Phone
    return 2;
  } else {
    // Phone
    return 2;
  }
};

// Check if the device is considered large (e.g., tablet)
export const isLargeDevice = deviceWidth >= 768;

// Get box size based on orientation
export const getBoxSize = (height, width) => {
  if (width > height) {
    // Landscape
    return 250;
  } else if (width < height) {
    // Portrait
    return 300;
  } else {
    // Square
    return 200;
  }
};

// Define font sizes directly based on device size
export const FontSize = (baseFontSize) => {
  if (deviceWidth >= BREAKPOINTS.DESKTOP) {
    // Desktop: Increase font size significantly
    return baseFontSize * 1.2;
  } else if (deviceWidth >= BREAKPOINTS.TABLET) {
    // Tablet: Slightly increase the font size
    return baseFontSize * 1.1;
  } else if (deviceWidth >= BREAKPOINTS.SMALL_TABLET) {
    // Small Tablet / Large Phone: Use base font size with minor adjustments
    return baseFontSize;
  } else if (deviceWidth >= BREAKPOINTS.LARGE_PHONE) {
    // Large Phone: Keep the base font size or slightly adjust
    return baseFontSize * 0.9;
  } else {
    // Phone: Apply a slight reduction in font size
    return baseFontSize * 0.8;
  }
};

