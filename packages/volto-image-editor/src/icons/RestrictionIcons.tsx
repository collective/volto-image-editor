import React from 'react';
import {
  TbAdjustmentsHorizontal,
  TbMaximize,
  TbFocus2,
  TbUnlink,
} from 'react-icons/tb';

// Fit Area - image fits inside boundaries
export const FitAreaIcon = () => <TbAdjustmentsHorizontal />;

// Fill Area - image fills the boundaries
export const FillAreaIcon = () => <TbMaximize />;

// Stencil - image restricted to stencil area
export const StencilIcon = () => <TbFocus2 />;

// None - no restrictions
export const NoRestrictionIcon = () => <TbUnlink />;
