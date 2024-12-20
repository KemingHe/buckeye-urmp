// ./src/contexts/ProviderProps.d.ts
//
// Generic interface for context provider props.

// React essential imports.
import { type ComponentType, type ReactNode } from 'react';

// biome-ignore format: added alignment for clarity.
export interface ProviderProps {
  LoadingComponent: ComponentType;
  ErrorComponent  : ComponentType;
  children        : ReactNode;
}
