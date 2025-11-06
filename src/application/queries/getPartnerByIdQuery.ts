import { usePartnersStore } from "@/presentation/stores/partnerStore";
import { computed } from "vue";

export function getPartnerById(id: string) {
    const store = usePartnersStore();
    return computed(() => store.partners.find(partner => partner.id === id));
}