type CreateSupplierVM = {
    contactName: string;
    businessName?: string;
    activity?: string;
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
    tin?: string;
}

type CreateB2BCustomerVM = {
    contactName?: string;
    businessName: string;
    deliveryCarrierId?: string;
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
    tin: string
}