import React from 'react';
import { z } from 'zod';
import { FieldMeta } from '@form-shared/schema';

export const ContactFieldPropsSchema = z.object({
  label: z.string().min(1),
  description: z.string().optional(),
  meta: FieldMeta,
});

export type ContactFieldProps = z.infer<typeof ContactFieldPropsSchema>;

export const ContactFieldDefaults: ContactFieldProps = {
  label: 'First name',
  description: '',
  meta: {
    field_name: 'first_name',
    required: true,
    hidden: false,
    readonly: false,
    type: 'text',
    field_options: [],
  },
};

export function ContactField({ label, description }: ContactFieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontWeight: 600 }}>{label}</label>
      {description ? (
        <small style={{ display: 'block', marginBottom: 4 }}>{description}</small>
      ) : null}
      <input style={{ width: '100%', padding: 8, border: '1px solid #ccc' }} />
    </div>
  );
}

export default ContactField;
