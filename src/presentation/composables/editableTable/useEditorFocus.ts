import { nextTick, onMounted, ref, watch, type Ref } from "vue";

export function useEditorFocus() {
    const fieldRef = ref<any>(null);

    onMounted(() => focus());

    async function focus() {
        await nextTick()
        const input =
            fieldRef.value?.$el?.querySelector('input')
        input?.focus()
    }

    return {
        fieldRef
    };
}

export function useCheckboxFocus(focusKey: Ref<number>) {
    const checkboxRef = ref<HTMLElement | any>(null);

    onMounted(() => focus());

    watch(() => focusKey.value, (k) => {
        if (!k) return;
        focus();
    })

    async function focus() {
        await nextTick();
        const input: HTMLInputElement | null =
            checkboxRef.value?.$el?.querySelector('input[type="checkbox"]');
        input?.focus();
    }

    return {
        checkboxRef
    }
}