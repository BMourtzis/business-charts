import AutocompleteEditor from "./AutocompleteEditor.vue";
import NumberEditor from "./NumberEditor.vue";
import PriceEditor from "./PriceEditor.vue";
import TextEditor from "./TextEditor.vue";
import CheckboxEditor from "./CheckboxEditor.vue";

export const editorMap = {
    "autocomplete": AutocompleteEditor,
    "number": NumberEditor,
    "price": PriceEditor,
    "text": TextEditor,
    "checkbox": CheckboxEditor
}