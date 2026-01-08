import { OrderItemDTO, OrderItemVariationDTO } from "@/application/dto/orderDTO";
import { VariationEditVM } from "../viewModels/variationEditVM";
import { OrderItemEditVM } from "../viewModels/orderItemEditVM";

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
    basePrice: dto.basePrice,
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
    sizing
  };
}

function sumSizing(sizing: Record<string, number>): number {
  return Object.values(sizing).reduce((a, b) => a + b, 0);
}

function vmVarToDto(
  vm: VariationEditVM,
  original?: OrderItemVariationDTO
): OrderItemVariationDTO {
  return {
    attributes: {
      ...(original?.attributes ?? {}),
      ...vm.attributes,
      ...vm.sizing
    },
    quantity: sumSizing(vm.sizing)
  };
}

export function vmToDto(
  vm: OrderItemEditVM,
  original: OrderItemDTO
): OrderItemDTO {
  return {
    ...original,
    name: vm.name,
    basePrice: vm.basePrice,
    variations: vm.variations.map((v, i) =>
      vmVarToDto(v, original.variations[i])
    )
  };
}
