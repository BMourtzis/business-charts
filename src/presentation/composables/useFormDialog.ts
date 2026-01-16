import { ref, watch } from 'vue';

export function useFormDialog<T extends object>(form: T, options?: { autoReset?: boolean }) {
    const dialog = ref(false);
    const formRef = ref();
    const validForm = ref(false);
    const loading = ref(false);
    const errorMessage = ref<string | null>(null);

    const autoReset = options?.autoReset ?? true;
    const initialForm = deepClone(form);

    function reset() {
        Object.assign(form, deepClone(initialForm));

        validForm.value = false;
        errorMessage.value = null;

        // wait until form is back in DOM
        queueMicrotask(() => {
            formRef.value?.resetValidation?.();
        });
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
        console.log(form);
        let validationResult: boolean | null = null;

        // STEP 1 — Call Vuetify's v-form validate() if available
        if (formRef.value?.validate) {
            const result = await formRef.value.validate();

            // result is: { valid: boolean }
            validationResult = result.valid;
        }

        // STEP 2 — Some Vuetify elements only validate once touched,
        // so we also force validate each field manually
        if (formRef.value?.items) {
            for (const field of formRef.value.items) {
                field.validate?.();
            }
        }

        // STEP 3 — Prefer formRef.value.valid if Vuetify set it
        const finalValid =
            formRef.value?.valid ??
            validationResult ??
            false;

        validForm.value = finalValid;
        return finalValid;
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

    // Optional: watch for any change and re-validate form live
    watch(
        form,
        async () => {
            if (dialog.value) {
                await validate();
            }
        },
        { deep: true }
    );

    const hasOpened = ref(false);

    watch(dialog, (open) => {
        if (open) {
            hasOpened.value = true;
            return;
        }

        if (!open && hasOpened.value && autoReset) {
            reset();
        }
    });

    function deepClone<T>(value: T): T {
        // primitives
        if (value === null || typeof value !== 'object') {
            return value;
        }

        // Date
        if (value instanceof Date) {
            return new Date(value.getTime()) as T;
        }

        // Array
        if (Array.isArray(value)) {
            return value.map(v => deepClone(v)) as T;
        }

        // Object
        const cloned: any = {};
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                cloned[key] = deepClone((value as any)[key]);
            }
        }
        return cloned;
    }


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
