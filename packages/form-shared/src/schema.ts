import { z } from 'zod';

export const Hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

export const FieldMeta = z.object({
  field_name: z.string().regex(/^[^:]*$/),
  required: z.boolean(),
  hidden: z.boolean(),
  readonly: z.boolean(),
  type: z.enum(['text', 'select', 'multi', 'bool', 'number', 'compound', 'optin']),
  field_options: z.array(z.string()),
  placeholder: z.string().optional(),
  max_characters: z.number().optional(),
  selected_index: z.number().optional(),
  options_allow_other: z.boolean().optional(),
});
