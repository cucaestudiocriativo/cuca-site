'use client';

import { useState } from 'react';
import type { SiteContent } from '@/content/types';
import Reveal from './Reveal';
import styles from './site.module.css';

/**
 * Destino das respostas. Troque pelo ID do seu formulário no Formspree
 * (.env.local → NEXT_PUBLIC_FORMSPREE_ID=xxxxxxx). Enquanto estiver vazio,
 * o formulário valida e mostra a tela de sucesso, mas não envia nada:
 * dá para revisar o layout sem gastar cota do serviço.
 */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

type State = 'idle' | 'sending' | 'done' | 'error';

export default function QualifyForm({ content }: { content: SiteContent }) {
  const { form, region } = content;
  const [state, setState] = useState<State>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;

    const data = new FormData(event.currentTarget);
    data.append('regiao', region === 'br' ? 'Brasil' : 'Portugal');

    if (!FORMSPREE_ID) {
      // sem destino configurado: não finge que enviou de verdade
      console.warn(
        '[CUCA] NEXT_PUBLIC_FORMSPREE_ID não configurado — envio simulado.',
        Object.fromEntries(data.entries()),
      );
      setState('done');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <Reveal className={styles.success}>
        <h3 className={styles.successTitle}>{form.success.title}</h3>
        <p className={styles.successText}>{form.success.text}</p>
      </Reveal>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      {form.fields.map((field) => {
        const wide = field.kind === 'textarea' || field.name === 'empresa';
        const id = `f-${field.name}`;

        return (
          <div
            key={field.name}
            className={[styles.field, wide ? styles.fieldWide : '']
              .filter(Boolean)
              .join(' ')}
          >
            <label className={styles.label} htmlFor={id}>
              {field.label} {field.required && <span aria-hidden="true">*</span>}
            </label>

            {field.kind === 'select' ? (
              <select
                id={id}
                name={field.name}
                className={styles.select}
                required={field.required}
                defaultValue=""
              >
                <option value="" disabled>
                  —
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.kind === 'textarea' ? (
              <>
                <textarea
                  id={id}
                  name={field.name}
                  className={styles.textarea}
                  required={field.required}
                  placeholder={field.placeholder}
                />
                {field.hint && <p className={styles.hint}>{field.hint}</p>}
              </>
            ) : (
              <input
                id={id}
                type={field.kind}
                name={field.name}
                className={styles.input}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={
                  field.kind === 'email'
                    ? 'email'
                    : field.name === 'nome'
                      ? 'name'
                      : field.name === 'empresa'
                        ? 'organization'
                        : 'off'
                }
              />
            )}
          </div>
        );
      })}

      {state === 'error' && (
        <p className={styles.formError} role="alert">
          {form.error}
        </p>
      )}

      <div className={styles.submitRow}>
        <button
          type="submit"
          className={styles.submit}
          disabled={state === 'sending'}
        >
          {state === 'sending' ? form.sending : form.submit}
        </button>
        <p className={styles.note}>{form.note}</p>
      </div>
    </form>
  );
}
