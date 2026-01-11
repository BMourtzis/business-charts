import TextRenderer from "@/presentation/components/shared/renderers/TextRenderer.vue";
import PriceRenderer from "@/presentation/components/shared/renderers/PriceRenderer.vue";

export const rendererMap = {
    "text": TextRenderer,
    "price": PriceRenderer
};