export class OrderTimeline {
    readonly approved?: Date;
    readonly shipped?: Date;
    readonly completed?: Date;
    readonly cancelled?: Date;

    constructor(
        approved?: Date,
        shipped?: Date,
        completed?: Date,
        cancelled?: Date
    ) {
        this.approved = approved;
        this.shipped = shipped;
        this.completed = completed;
        this.cancelled = cancelled;
    }

    withApproved(date: Date = new Date()): OrderTimeline {
        return new OrderTimeline(date, this.shipped, this.completed, this.cancelled);
    }

    withShipped(date: Date = new Date()): OrderTimeline {
        return new OrderTimeline(this.approved, date, this.completed, this.cancelled);
    }

    withCompleted(date: Date = new Date()): OrderTimeline {
        return new OrderTimeline(this.approved, this.shipped, date, this.cancelled);
    }

    withCancelled(date: Date = new Date()): OrderTimeline {
        return new OrderTimeline(this.approved, this.shipped, this.completed, date);
    }
}