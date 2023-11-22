import { Type, Transform } from 'class-transformer';

function toArray(value: number | number[]): number[] {
  return Array.isArray(value) ? value : [value];
}

export class getStoreDto {
  @Type(() => Number)
  @Transform(({ value }) => toArray(value))
  category?: number[];

  @Type(() => Number)
  @Transform(({ value }) => toArray(value))
  availableDay?: number[];
}
