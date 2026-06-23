import {
  Column,
  eq,
  type ColumnBaseConfig,
  type ColumnDataType,
} from "drizzle-orm";

export function equal(
  value1: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>,
  value2: unknown,
) {
  return eq(value1, value2);
}
