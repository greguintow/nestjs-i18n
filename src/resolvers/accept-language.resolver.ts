import { I18nResolver } from '../index';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { pick } from 'accept-language-parser';
import { I18nService } from '../services/i18n.service';

@Injectable()
export class AcceptLanguageResolver implements I18nResolver {
  async resolve(
    context: ExecutionContext,
  ): Promise<string | string[] | undefined> {
    let req: any;
    let service: I18nService;

    switch (context.getType() as string) {
      case 'http':
        req = context.switchToHttp().getRequest();
        service = req.i18nService;
        break;
      case 'graphql':
        [, , { req, i18nService: service }] = context.getArgs();
        if (!req) return undefined;
        break;
      default:
        return undefined;
    }

    return this.resolveByRequest(req, service);
  }

  async resolveByRequest(req: any, service: I18nService) {
    const lang = req.raw
      ? req.raw.headers?.['accept-language']
      : req?.headers?.['accept-language'];

    if (lang) {
      const supportedLangs = await service.getSupportedLanguages();
      return (
        pick(supportedLangs, lang) ??
        pick(supportedLangs, lang, { loose: true })
      );
    }
    return lang;
  }
}
