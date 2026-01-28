import { ref } from 'vue';
import type { ApproveOrderInput } from '@/presentation/components/orders/OrderDetailsHeaderStatus.vue';
import type ApproveOrderModal from '@/presentation/components/orders/ApproveOrderModal.vue';

const dialogRef = ref<InstanceType<typeof ApproveOrderModal>>();

export function useApproveOrderDialog() {
  function openApproveModal(options: {
    initialInput?: Partial<ApproveOrderInput>;
    onConfirm: (input: ApproveOrderInput) => Promise<void>;
  }) {
    dialogRef.value?.open(options);
  }

  return {
    dialogRef,
    openApproveModal,
  };
}