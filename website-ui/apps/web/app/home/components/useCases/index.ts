import { biUseCase } from './BIUseCase';
import { integrationUseCase } from './IntegrationUseCase';
import { lineageUseCase } from './LineageUseCase';
import { qualityUseCase } from './QualityUseCase';
import { servicesUseCase } from './ServicesUseCase';
import { workflowsUseCase } from './WorkflowsUseCase';

export const HOME_USE_CASES = [integrationUseCase, workflowsUseCase, qualityUseCase, servicesUseCase, biUseCase];

export type { HomeUseCaseDefinition, HomeUseCaseId } from './types';
