import { OrderItemDTO, OrderItemVariationDTO } from "@/application/dto/orderDTO";
import { VariationEditVM } from "../viewModels/variationEditVM";
import { OrderEditVM, OrderItemEditVM } from "../viewModels/orderItemEditVM";
import { AttributesRecord, normalizeAttribute } from "@/domain/order/models/orderItemVariation";
import { CreateCreditOrderCommand } from "@/application/commands/order/createCreditOrderCommand";

const SIZE_KEYS = [
    'shoe:38',
    'shoe:39',
    'shoe:40',
    'shoe:41',
    'shoe:42',
    'shoe:43',
    'shoe:44',
    'shoe:45',
    'shoe:46',
    'shoe:47'
];


export function dtoToVM(dto: OrderItemDTO): OrderItemEditVM {
    return {
        id: dto.id,
        name: dto.name,
        basePrice: dto.variations?.[0]?.price || 0,
        variations: dto.variations.map(dtoVarToVM)
    };
}

function dtoVarToVM(dto: OrderItemVariationDTO): VariationEditVM {
    const attributes: Record<string, string> = {};
    const sizing: Record<string, number> = {};

    for (const [key, value] of Object.entries(dto.attributes)) {
        if (SIZE_KEYS.includes(key)) {
            sizing[key] = Number(value) || 0;
        } else {
            attributes[key] = String(value);
        }
    }

    // distribute quantity if backend sends only total
    if (Object.keys(sizing).length === 0 && dto.quantity > 0) {
        // optional: assign to a default size or leave empty
    }

    return {
        attributes,
        sizing,
        price: dto.price
    };
}

export function vmToDto(
    vm: OrderItemEditVM,
    original: OrderItemDTO
): OrderItemDTO {
    return {
        ...original,
        name: vm.name,
        variations: vm.variations.flatMap((v, i) =>
            vmVarToDto(v, original.variations[i])
        )
    };
}

export function orderVmToCmd(vm: OrderEditVM): CreateCreditOrderCommand {
    return {
        partnerId: vm.partnerId,
        vatRate: vm.vatRate,
        dueDate: vm.dueDate || undefined,
        notes: vm.notes,
        depositAmount: vm.depositAmount,
        discountAmount: vm.discountAmount,
        items: vm.items.map(itemVm => ({
            name: itemVm.name,
            variations: itemVm.variations.flatMap(v => vmVarToDto(v))
        }))
    };
    //TODO: move items mapping to a separate functiona and add a merge for similar items
}

function vmVarToDto(
    vm: VariationEditVM,
    original?: OrderItemVariationDTO
): OrderItemVariationDTO[] {
    const sizingList = getSizingList(vm.sizing);
    const commonAttributes = getCommonAttributes(vm.attributes, original?.attributes);

    return sizingList
        .map(([key, value]) => {
            const attributes = {
                ...commonAttributes,
                size: key
            }

            return {
                attributes,
                normalizedAttributes: normalizeAttribute(attributes),
                quantity: value,
                price: vm.price
            };
        });
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
    original?: AttributesRecord) {
    //TODO: clear any attributes that are empty

    return {
        ...(original ?? {}),
        ...attributes
    };
}



