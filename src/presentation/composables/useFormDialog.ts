import { ref, watch } from 'vue';

export function useFormDialog<T extends object>(form: T, options?: { autoReset?: boolean }) {
  const dialog = ref(false);
  const formRef = ref();
  const validForm = ref(false);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const autoReset = options?.autoReset ?? true;

  function reset() {
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        const k = key as keyof T;
        (form as T)[k] = '' as unknown as T[keyof T];
      }
    }
    validForm.value = false;
    formRef.value?.resetValidation?.();
    errorMessage.value = null;
  }

  function setFormValues(values: Partial<T>) {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const k = key as keyof T;
        (form as T)[k] = (values as Partial<T>)[k] as T[keyof T];
      }
    }
  }

  async function validate(): Promise<boolean> {
    const result = await formRef.value?.validate?.();
    return !!result?.valid;
  }

  function close() {
    dialog.value = false;
  }

  async function submit(action: (form: T) => Promise<void> | void) {
    errorMessage.value = null;
    const isValid = await validate();
    if (!isValid) return;

    loading.value = true;
    try {
      await action(form);
      close();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : typeof err === 'string' ? err : String(err);
      errorMessage.value = message || 'An unexpected error occurred';
    } finally {
      loading.value = false;
    }
  }

  watch(dialog, (open) => {
    if (!open && autoReset) reset();
  });

  return {
    dialog,
    formRef,
    validForm,
    loading,
    errorMessage,
    submit,
    validate,
    close,
    reset,
    setFormValues
  };
}
