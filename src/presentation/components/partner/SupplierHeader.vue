<template>
  <div class="d-flex justify-space-between align-start flex-wrap">
    <div class="left-block">
      <div class="d-flex align-center flex-wrap mb-1">
        <h1 class="text-h4 font-weight-bold mr-2">
          {{ supplier.businessName }}
        </h1>

        <v-chip 
          color="primary"
          size="small"
        >
          {{ tCap('partner.supplier') }}
        </v-chip>
      </div>
      <div class="text-subtitle-1 text-grey-darken-1">
        {{ supplier.contactName }}
      </div>
      
      <div class="text-subtitle-1 text-grey-darken-1">
        {{ tCap('partner.activity') }}: <strong>{{ supplier.activity }}</strong>
      </div>
    </div>

    <div class="d-flex align-center mt-2 mt-md-0">
      <EditPartnerModal 
        :partner="supplier" 
        mini
      />
      <ConfirmDeleteModal
        :name="supplier.businessName"
        :action-fn="() => deletePartner()"
        mini
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from 'vue-router';

import { Supplier } from "@/domain/partner/models/supplier";

import { useLocalizationHelpers } from '@/presentation/composables/useLocalization'
import { usePartners } from "@/presentation/composables/partner/usePartners";

import EditPartnerModal from "@/presentation/components/partner/EditPartnerModal.vue";
import ConfirmDeleteModal from "@/presentation/components/ConfirmDeleteModal.vue";

const props = defineProps<{
  supplier: Supplier;
}>();

const { deletePartnerCommandHandler } = usePartners();

const { tCap } = useLocalizationHelpers();

const router = useRouter();

function deletePartner() {
  router.back();
  deletePartnerCommandHandler.handle({id: props.supplier.id});
}
</script>

<style scoped>
.left-block {
  text-align: left;
}
</style>