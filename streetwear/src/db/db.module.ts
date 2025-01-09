import { Module } from '@nestjs/common';
import { DbConnection } from './db.source';

@Module({
  providers: [...DbConnection], // Provide the DataSource
  exports: [...DbConnection],  // Export for use in other modules
})
export class DbModule {}