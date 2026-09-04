import { biUseCase } from "./BIUseCase";
import { integrationUseCase } from "./IntegrationUseCase";
import { operationsUseCase } from "./OperationsUseCase";
import { qualityUseCase } from "./QualityUseCase";
import { servicesUseCase } from "./ServicesUseCase";
import { workflowsUseCase } from "./WorkflowsUseCase";

export const HOME_USE_CASES = [
  workflowsUseCase,
  integrationUseCase,
  qualityUseCase,
  servicesUseCase,
  operationsUseCase,
  biUseCase,
];

export type { HomeUseCaseDefinition, HomeUseCaseId } from "./types";
