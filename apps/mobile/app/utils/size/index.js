/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Dimensions, PixelRatio, Platform } from "react-native";
import { DDS } from "../../services/device-detection";

export const scale = {
  fontScale: 1
};
let windowSize = Dimensions.get("window");
let adjustedWidth = windowSize.width * PixelRatio.get();
let adjustedHeight = windowSize.height * PixelRatio.get();
const pixelDensity = PixelRatio.get();
export const getDeviceSize = () => {
  let dpi = getDpi(pixelDensity);
  let deviceWidthInInches = adjustedWidth / dpi;
  let deviceHeightInInches = adjustedHeight / dpi;
  let diagonalSize = Math.sqrt(
    Math.pow(deviceWidthInInches, 2) + Math.pow(deviceHeightInInches, 2)
  );
  return Platform.isPad ? diagonalSize + 2 : diagonalSize;
};

const getDpi = (pd) => {
  return 160 * pd;
};
const correction = (size, multiplier) => {
  let dSize = getDeviceSize();
  if (dSize >= 4 && dSize <= 5.3 && pixelDensity <= 3) {
    return size * 0.93;
  } else if (dSize > 5.3 && dSize < 7 && pixelDensity < 3 && !DDS.isTab) {
    if (Platform.OS === "ios") {
      return size;
    }
    return size * 0.97;
  } else if (dSize <= 7 && pixelDensity >= 3 && !DDS.isTab) {
    return size * 0.98;
  } else if (dSize >= 6.5 && dSize <= 7.2 && DDS.isTab) {
    return size * multiplier;
  } else if (dSize > 7.2 && dSize <= 8.5 && DDS.isTab) {
    return size * 0.85;
  } else if (dSize > 8.5 && dSize <= 9.2 && DDS.isTab) {
    return size * 0.9;
  } else if (dSize > 9.2 && dSize <= 10.5 && DDS.isTab) {
    return size * 0.95;
  } else if (dSize > 10.5) {
    return size * 1;
  } else {
    return size;
  }
};
export const normalize = (size) => {
  let pd = pixelDensity;
  if (pd === 1 || pd < 1) {
    return correction(size, 0.82);
  } else if (pd > 1 && pd <= 1.5) {
    return correction(size, 0.7);
  } else if (pd > 1.5 && pd <= 2) {
    return correction(size, 0.9);
  } else if (pd > 2 && pd <= 3) {
    return correction(size, 0.93);
  } else if (pd > 3) {
    return correction(size, 1);
  }
};
export const SIZE = {
  xxs: normalize(11) * scale.fontScale,
  xs: normalize(12.5) * scale.fontScale,
  sm: normalize(15) * scale.fontScale,
  md: normalize(16.5) * scale.fontScale,
  lg: normalize(22) * scale.fontScale,
  xl: normalize(24) * scale.fontScale,
  xxl: normalize(28) * scale.fontScale,
  xxxl: normalize(32) * scale.fontScale
};

export function updateSize() {
  SIZE.xxs = normalize(11) * scale.fontScale;
  SIZE.xs = normalize(12.5) * scale.fontScale;
  SIZE.sm = normalize(15) * scale.fontScale;
  SIZE.md = normalize(16.5) * scale.fontScale;
  SIZE.lg = normalize(22) * scale.fontScale;
  SIZE.xl = normalize(24) * scale.fontScale;
  SIZE.xxl = normalize(28) * scale.fontScale;
  SIZE.xxxl = normalize(32) * scale.fontScale;
  ph = normalize(10) * scale.fontScale;
  pv = normalize(10) * scale.fontScale;
}

export const br = 5; // border radius
export var ph = normalize(10); // padding horizontal
export var pv = normalize(10); // padding vertical
export const opacity = 0.5; // active opacity
