import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  HttpCode,
  Redirect,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import short from 'short-uuid';
import { UrlDto } from './url.dto';
import { Request } from 'express';
@Controller()
export class AppController {
  translator = short();
  constructor(private readonly appService: AppService) {}
  @Post('/links')
  @HttpCode(200)
  async saveUrlEntity(@Body() urlDto: UrlDto, @Req() req: Request) {
    const urlObj = await this.appService.create({
      url: urlDto.url,
      urlHash: this.translator.new(),
    });
    return {
      ...urlObj,
      shortUrl: `${req.protocol}://${req.get('Host')}/${urlObj.urlHash}`,
    };
  }
  @Get(':hash')
  @Redirect()
  @HttpCode(302)
  async redirectViaHash(@Param() params: { hash: string }) {
    return await this.appService.findOne(params.hash);
  }
}
