import type { ComponentType } from "react";

export type HomeUseCaseId =
  | "lineage"
  | "workflows"
  | "integration"
  | "quality"
  | "services"
  | "operations"
  | "bi";

export interface HomeUseCaseDefinition {
  id: HomeUseCaseId;
  label: string;
  prompt: string;
  stageColor: string;
  Icon: ComponentType;
  Result: ComponentType;
}
