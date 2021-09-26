import { ExecutionContext } from '@nestjs/common';
import { I18nService } from 'src';

export interface I18nResolver {
  resolve(
    context: ExecutionContext,
  ): Promise<string | string[] | undefined> | string | string[] | undefined;
  resolveByRequest(
    req: any,
    service: I18nService,
  ): Promise<string | string[] | undefined> | string | string[] | undefined;
}
