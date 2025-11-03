// src/presentation/composables/useFormDialog.ts
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
        (form as any)[key] = '';
      }
    }
    validForm.value = false;
    formRef.value?.resetValidation?.();
    errorMessage.value = null;
  }

  function setFormValues(values: Partial<T>) {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        (form as any)[key] = (values as any)[key];
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
    } catch (err: any) {
      console.error(err);
      errorMessage.value = err?.message || 'An unexpected error occurred';
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
