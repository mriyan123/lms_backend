/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static async getOrmConfig(configService): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      database: configService.get('DBNAME'),
      host: configService.get('DBHOSTNAME'),
      port: configService.get('DBPORT'),
      username: configService.get('DBUSER'),
      password: configService.get('DBPASSWORD'),
      entities: [__dirname + '/../*/entities/*{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      migrationsRun: false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
