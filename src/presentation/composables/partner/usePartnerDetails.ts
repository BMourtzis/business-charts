import { computed } from 'vue';

import { PartnerType } from '@/domain/partner/partnerTypes';
import { Partner } from '@/domain/partner/models/partner';
import { Supplier } from '@/domain/partner/models/supplier';
import { B2BCustomer } from '@/domain/partner/models/b2bCustomer';

import { PartnerMapper } from '@/application/mapper/partnerMapper';

import { usePartnersStore } from '@/presentation/stores/partnerStore';

export function usePartnerDetails(id: string) {
    const store = usePartnersStore();

    const dto = computed(() => store.getById(id));

    const model = computed<Partner | Supplier | B2BCustomer | undefined>(() => {
        const partner = dto.value;
        if (!partner) return undefined;

        const mapped = PartnerMapper.toModel(partner);

        switch (partner.type) {
            case PartnerType.Supplier:
                return mapped as Supplier;
            case PartnerType.B2BCustomer:
                return mapped as B2BCustomer;
            default:
                return mapped as Partner;
        }
    });

    const isSupplier = computed(() => dto.value?.type === PartnerType.Supplier);
    const isB2BCustomer = computed(() => dto.value?.type === PartnerType.B2BCustomer);

    return { dto, model, isSupplier, isB2BCustomer };
}