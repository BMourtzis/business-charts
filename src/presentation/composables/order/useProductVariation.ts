import type { InternalRow, TableColumn } from "../editableTable/useEditableTable";

export const colourVariation = {
    name: "colour",
    title: "Χρώμα",
    type: "variation",
    editorType: "autocomplete",
    rendererType: "text",
    navigable: true,
    width: "4vw",
    list: [ "BLK", "WILD", "F", "KIT.TZIN", "GLOW", "BL", "ΚΦ", "ΒΕΡ. ΝΑΠΑ", "ΣΑ.ΤΖΙΝ", "ΣΑ", "ΚΝΛ", "ΨΗΦ", "OL", "X", "XK", "ΤΑΜΠΑ.Ψ", "ΓΚΡΙ", "ΜΝΤ", "ΚΙΤ.ΤΖΙΝ", "ΚΦ.ΝΑΙΡ"]
};

export const soleVariation = {
    name: "sole",
    title: "Σόλα",
    type: "variation",
    editorType: "autocomplete",
    rendererType: "text",
    navigable: true,
    width: "4vw",
    list: ["anatomic", "SOFT", "soft", "vamos", "VAMOS", "FIESTA", "fiesta", "SAND", "sand"]
}

export const menVariation = {
    name: "men",
    title: "Men",
    type: "variation",
    rendererType: "checkbox",
    navigable: true,
    width: "1vw",
}

export const shoeSizeVariations = [
    {
        name: "shoe:35",
        title: "35",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:36",
        title: "36",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:37",
        title: "37",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:38",
        title: "38",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:39",
        title: "39",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:40",
        title: "40",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:41",
        title: "41",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:42",
        title: "42",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:43",
        title: "43",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:44",
        title: "44",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:45",
        title: "45",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:46",
        title: "46",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
    {
        name: "shoe:47",
        title: "47",
        type: "size",
        editorType: "number",
        rendererType: "text",
        navigable: true,
        width: "1.2vw",
    },
];

export const shoesVariationLayout = [
    {
        order: 0, 
        ...colourVariation
    },
    {
        order: 1,
        ...soleVariation
    },
    {
        order: 2,
        ...menVariation
    },
    ...shoeSizeVariations.map((s, sIndex) => ({
        order: sIndex + 3,
        ...s
    })),
    {
        order: shoeSizeVariations.length + 3,
        title: "Τεμάχια Παραλλαγής",
        name: "calculated:totalQty",
        type: "calculated",
        rendererType: "text",
        width: "2vw",
        calculate: calculateTotalQty
    },
    {
        order: shoeSizeVariations.length + 4,
        title: "Τιμή Παραλλαγής",
        name: "variationPrice",
        type: "price",
        editorType: "price",
        rendererType: "price",
        navigable: true,
        width: "2.5vw",
    },
    {
        order: shoeSizeVariations.length + 5,
        title: "Σύνολο Παραλλαγής",
        name: "calculated:totalPrice",
        type: "calculated",
        rendererType: "price",
        width: "3vw",
        calculate: calculateTotalPrice
    }
].sort((a, b) => a.order - b.order) as TableColumn[];

function calculateTotalQty(row: InternalRow): string {
    let qty = 0;
    shoesVariationLayout.forEach((col, colIndex) => {
        if(col.type === "size") {
            qty += Number(row.cells[colIndex].value) || 0;
        }
    });

    return qty.toString();
}

function calculateTotalPrice(row: InternalRow): string {
    const qty = Number(calculateTotalQty(row)) || 0;

    const priceIndex = shoesVariationLayout
        .findIndex(c => c.name === "variationPrice");
    if(priceIndex === -1) {
        return "";
    }
    const price = Number(row.cells[priceIndex].value) || 0;

    return (qty * price).toString();
}