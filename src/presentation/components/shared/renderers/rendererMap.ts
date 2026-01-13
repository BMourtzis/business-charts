import TextRenderer from "@/presentation/components/shared/renderers/TextRenderer.vue";
import PriceRenderer from "@/presentation/components/shared/renderers/PriceRenderer.vue";
import CheckboxRenderer from "@/presentation/components/shared/renderers/CheckboxRenderer.vue";

export const rendererMap = {
    "text": TextRenderer,
    "price": PriceRenderer,
    "checkbox": CheckboxRenderer
};