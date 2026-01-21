import type { CreateCreditOrderCommand } from "@/application/commands/order/createCreditOrderCommand";
import type { OrderEditVM, OrderLineItemVM } from "../viewModels/orderVM";
import { calculateDerivedSKU, type VariationSnapshot } from "@/domain/order/models/sku";
import type { OrderLineItemDTO } from "@/application/dto/orderDTO";


//TODO: add dtoToVM mapper
// const SIZE_KEYS = [
//     'shoe:38',
//     'shoe:39',
//     'shoe:40',
//     'shoe:41',
//     'shoe:42',
//     'shoe:43',
//     'shoe:44',
//     'shoe:45',
//     'shoe:46',
//     'shoe:47'
// ];

// export function dtoToVM(dto: OrderLineItemDTO): OrderLineItemVM {
//     return {
//         name: dto.name,
//         basePrice: dto.variations?.[0]?.price || 0,
//         variations: dto.variations.map(dtoVarToVM)
//     };
// }

// function dtoVarToVM(dto: OrderItemVariationDTO): VariationEditVM {
//     const attributes: Record<string, string> = {};
//     const sizing: Record<string, number> = {};

//     for (const [key, value] of Object.entries(dto.attributes)) {
//         if (SIZE_KEYS.includes(key)) {
//             sizing[key] = Number(value) || 0;
//         } else {
//             attributes[key] = String(value);
//         }
//     }

//     // distribute quantity if backend sends only total
//     if (Object.keys(sizing).length === 0 && dto.quantity > 0) {
//         // optional: assign to a default size or leave empty
//     }

//     return {
//         attributes,
//         sizing,
//         price: dto.price
//     };
// }

// export function vmToDto(
//     vm: OrderLineItemVM,
//     original: OrderItemDTO
// ): OrderItemDTO {
//     return {
//         ...original,
//         name: vm.name,
//         variations: vm.variations.flatMap((v, i) =>
//             vmVarToDto(v, original.variations[i])
//         )
//     };
// }

export function orderVmToCmd(vm: OrderEditVM): CreateCreditOrderCommand {
    return {
        partnerId: vm.partnerId,
        vatRate: vm.vatRate,
        dueDate: vm.dueDate || undefined,
        notes: vm.notes,
        depositAmount: vm.depositAmount,
        discountAmount: vm.discountAmount,
        items: mapItemVmToDTOList(vm.items),
    };
}

function mapItemVmToDTOList(items: OrderLineItemVM[]): OrderLineItemDTO[] {
    const lineDTOList = items.flatMap(i => itemVmToDTO(i));
    return mergeLineItems(lineDTOList) 
        .sort((a, b) =>
            a.derivedSku.localeCompare(b.derivedSku)
        );
}

///Will take 1 vm and probably produce a number of dtos because of sizing
function itemVmToDTO(vm: OrderLineItemVM, original?: OrderLineItemDTO): OrderLineItemDTO[] {
    const sizingList = getSizingList(vm.sizing);
    const commonAttributes = getCommonAttributes(vm.variationSnapshot, original?.variationSnapshot);

    return sizingList
        .map(([key, value]) => {
            const attributes = {
                ...commonAttributes,
                size: key
            }

            return {
                name: vm.name,
                unitPrice: vm.unitPrice,
                productCode: vm.productCode,
                quantity: value,
                variationSnapshot: attributes,
                derivedSku: calculateDerivedSKU(vm.productCode, attributes)
            };
        });
}

///If there are duplicate dtos, merge them.
//TODO: move to domain
function mergeLineItems(items:OrderLineItemDTO[]): OrderLineItemDTO[] {
    const map = new Map<string, OrderLineItemDTO>();

        for( const item of items) {
        const key = item.derivedSku;

        const existing = map.get(key);

        if(existing) {
            existing.quantity += item.quantity;
        } else {
            map.set(key, {...item});
        }
    }

    return [...map.values()];
}

function getSizingList(sizing: Record<string, number>) {
    return Object.entries(sizing)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => {
            const sizeLabel = key.split(":")[1];
            return [sizeLabel, value] as [string, number]
        });
}

function getCommonAttributes(
    attributes: Record<string, string>, 
    original?: VariationSnapshot) {
    
    const cleanedAttrs = cleanAttributes(attributes);
    return {
        ...(original ?? {}),
        ...cleanedAttrs
    };
}

function cleanAttributes(attributes: Record<string, string>): Record<string, string> {
    return Object.fromEntries(
        Object.entries(attributes).filter(([_, value]) =>
        value !== "" && value !== null && value !== undefined)
    );
}



