import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';

describe('URL Shortner', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useClass(AppService)

      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Should Create A new short URL for Original URL and making request on that redirect to Original URL`, async () => {
    const url = 'https://google.com';
    const res = await request(app.getHttpServer()).post('/links').send({
      url,
    });
    return request(app.getHttpServer())
      .get("/" + res.body.urlHash)
      .expect('Location', url)
      .expect(302);
  });

  afterAll(async () => {
    await app.close();
  });
});
