import TextRenderer from "./TextRenderer.vue";
import PriceRenderer from "./PriceRenderer.vue";
import CheckboxRenderer from "./CheckboxRenderer.vue";

export const rendererMap = {
    "text": TextRenderer,
    "price": PriceRenderer,
    "checkbox": CheckboxRenderer
};