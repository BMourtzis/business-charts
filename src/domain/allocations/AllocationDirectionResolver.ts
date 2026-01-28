import { AllocationDirection } from "../order/allocationTypes";
import { MoneyDirection } from "../payment/MoneyMovementTypes";

export class AllocationDirectionResolver {
    static resolve(
        moneyDirection: MoneyDirection
    ): AllocationDirection {
        if (moneyDirection === MoneyDirection.In) {
            return AllocationDirection.Apply;
        }

        if (moneyDirection === MoneyDirection.Out) {
            return AllocationDirection.Reverse;
        }

        throw new Error("Unsupported money direction");
    }
}