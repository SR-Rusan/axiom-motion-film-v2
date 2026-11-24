import React from 'react';
import { Composition } from 'remotion';
import { AxiomV2Film } from './AxiomV2Film';

export const Root: React.FC = () => (
  <Composition id="Axiom-V2-Vertical" component={AxiomV2Film} durationInFrames={450} fps={30} width={1080} height={1920} />
);
