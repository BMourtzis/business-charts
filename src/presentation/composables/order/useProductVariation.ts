import { InternalRow, TableColumn } from "../shared/useEditableTable";

export const colourVariation = {
    name: "colour",
    title: "Colour",
    type: "autocomplete",
    list: [ "BLK", "WILD", "F", "KIT.TZIN", "GLOW", "BL", "ΚΦ", "ΒΕΡ. ΝΑΠΑ", "ΣΑ.ΤΖΙΝ", "ΣΑ", "ΚΝΛ", "ΨΗΦ", "OL", "X", "XK", "ΤΑΜΠΑ.Ψ", "ΓΚΡΙ", "ΜΝΤ", "ΚΙΤ.ΤΖΙΝ", "ΚΦ.ΝΑΙΡ", "ΨΗΦ"]
};

export const soleVariation = {
    name: "sole",
    title: "Sole",
    type: "autocomplete",
    list: ["ANATOMIC", "anatomic", "SOFT", "soft", "vamos", "FIESTA", "fiesta", "SAND"]
}

export const shoeSizeVariations = [
    {
        name: "shoe:35",
        title: "35",
        type: "text" as const
    },
    {
        name: "shoe:36",
        title: "36",
        type: "text" as const
    },
    {
        name: "shoe:37",
        title: "37",
        type: "text" as const
    },
    {
        name: "shoe:38",
        title: "38",
        type: "text" as const
    },
    {
        name: "shoe:39",
        title: "39",
        type: "text" as const
    },
    {
        name: "shoe:40",
        title: "40",
        type: "text" as const
    },
    {
        name: "shoe:41",
        title: "41",
        type: "text" as const
    },
    {
        name: "shoe:42",
        title: "42",
        type: "text" as const
    },
    {
        name: "shoe:43",
        title: "43",
        type: "text" as const
    },
    {
        name: "shoe:44",
        title: "44",
        type: "text" as const
    },
    {
        name: "shoe:45",
        title: "45",
        type: "text" as const
    },
    {
        name: "shoe:46",
        title: "46",
        type: "text" as const
    },
    {
        name: "shoe:47",
        title: "47",
        type: "text" as const
    },
];

export const shoesVariationLayout = [
    {
        order: 0, 
        editableRow: true,
        ...colourVariation
    },
    {
        order: 1,
        editableRow: true,
        ...soleVariation
    },
    ...shoeSizeVariations.map((s, sIndex) => ({
        order: sIndex + 2,
        editableRow: true,
        ...s
    })),
    {
        order: shoeSizeVariations.length + 2,
        title: "Total",
        name: "calculated:total",
        type: "calculated",
        editableRow: false,
        calculate: (row: InternalRow) => {
            return row.cells
                .slice(2)
                .reduce((sum, v) => sum + (Number(v.value) || 0), 0)
                .toString()
        }
            
    }
].sort((a, b) => a.order - b.order) as TableColumn[];