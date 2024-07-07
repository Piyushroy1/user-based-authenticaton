import { Schema } from "mongoose";

export class BaseSchema extends Schema {
  constructor(structure: any, options?: any) {
    super(
      {
        ...structure,
        isDeleted: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
      { ...options, timestamps: true }
    );
  }
}
