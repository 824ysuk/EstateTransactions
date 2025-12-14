// File: test/e2e/estate-transaction.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import request from 'supertest';
import type { Server } from 'node:http';

import { AppModule } from '../../src/app.module';
import { ESTATE_TRANSACTION_REPOSITORY } from '../../src/modules/town-planning/estate-transaction/domain/tokens';
import type { EstateTransactionRepository } from '../../src/modules/town-planning/estate-transaction/domain/estate-transaction.repository';

function applyAppDefaults(app: INestApplication): void {
  app.setGlobalPrefix('api/v1');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

describe('EstateTransaction (e2e)', () => {
  let app: INestApplication<Server>;

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('成功: 200で取引価格を返す', async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    applyAppDefaults(app);
    await app.init();

    await request(app.getHttpServer())
      .get(
        '/api/v1/townPlanning/estateTransaction/bar?prefectureCode=13&year=2015&type=1',
      )
      .expect(200)
      .expect({
        year: 2015,
        prefectureCode: 13,
        prefectureName: '東京都',
        type: 1,
        value: 324740,
      });
  });

  it('バリデーション: 400で弾く（datasetに存在しないyear）', async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    applyAppDefaults(app);
    await app.init();

    const res = await request(app.getHttpServer())
      .get(
        '/api/v1/townPlanning/estateTransaction/bar?prefectureCode=13&year=2014&type=1',
      )
      .expect(400);

    expect(res.body).toMatchObject({
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('該当なし: 404を返す（Repositoryを差し替えてnullにする）', async () => {
    const repo: EstateTransactionRepository = {
      findByKey() {
        return Promise.resolve(null);
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ESTATE_TRANSACTION_REPOSITORY)
      .useValue(repo)
      .compile();

    app = moduleRef.createNestApplication();
    applyAppDefaults(app);
    await app.init();

    await request(app.getHttpServer())
      .get(
        '/api/v1/townPlanning/estateTransaction/bar?prefectureCode=13&year=2015&type=1',
      )
      .expect(404);
  });
});
