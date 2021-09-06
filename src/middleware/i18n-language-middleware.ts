import { Injectable, NestMiddleware } from '@nestjs/common';
import { I18nService } from '../services/i18n.service';

@Injectable()
export class I18nLanguageMiddleware implements NestMiddleware {
  constructor(private readonly i18nService: I18nService) {}

  async use(req: any, res: any, next: () => void) {
    await this.i18nService.getLanguageByRequest(req);

    next();
  }
}
