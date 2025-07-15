import { z } from 'zod';
import { FieldMeta } from './schema';

export const BuilderBlockSchema = z.object({
  type: z.string(),
  props: z.any(),
});

export const BuilderJsonSchema = z.object({
  blocks: z.array(BuilderBlockSchema),
});

export type BuilderJson = z.infer<typeof BuilderJsonSchema>;

const ContactFieldSection = z.object({
  type: z.literal('contactfield'),
  label: z.string().optional(),
  description: z.string().optional(),
  contactfield: FieldMeta,
});

const SectionSchema = z.union([ContactFieldSection]);

export const CreateCustomFormInput = z.object({
  form: z.object({ sections: z.array(SectionSchema) }),
});

export type CreateCustomFormInput = z.infer<typeof CreateCustomFormInput>;

export function builderToVastForm(
  config: BuilderJson,
  formMeta: Omit<CreateCustomFormInput, 'form'>
): CreateCustomFormInput {
  const sections = config.blocks.map((block) => {
    switch (block.type) {
      case 'ContactField':
        return {
          type: 'contactfield' as const,
          label: block.props.label,
          description: block.props.description,
          contactfield: block.props.meta,
        };
      default:
        throw new Error(`Unsupported block ${block.type}`);
    }
  });

  return {
    ...formMeta,
    form: { sections },
  };
}
