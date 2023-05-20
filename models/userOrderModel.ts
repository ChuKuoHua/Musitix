import mongoose, { Schema, Document } from 'mongoose';

enum OrderStatus {
  Unknown = 0,
  ReadyToUse = 1, // 可使用
  PendingPayment = 2, // 待付款
  Used = 3, // 已使用
  Expired = 4, // 已過期
  Refunded = 5, // 已退票
  InReview = 6 // 審核中
}

interface UserOrder {
  buyer: string;
  cellPhone: string;
  email: string;
  address: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  orderCreateDate: Date;
  memo: string;
  ticketList: Ticket[];
  activityId?: string;
  userId?: string;
  payTime?: Date;
}

export interface Ticket {
  scheduleName: string;
  categoryName: string;
  price: number;
  ticketNumber: string;
  ticketStatus: TicketStatus;
  qrCode: string;
}


enum TicketStatus {
  Failed = 0, // 付款失敗
  ReadyToUse = 1, // 可使用
  PendingPayment = 2, // 待付款
  Used = 3, // 已使用
  Expired = 4, // 已過期
  Refunded = 5, // 已退票
  InReview = 6 // 審核中
}


const ticketSchema: Schema<Ticket> = new Schema({
  scheduleName: { type: String, required: true },
  categoryName: { type: String, required: true },
  price: { type: Number, required: true },
  ticketNumber: { type: String, required: true },
  ticketStatus: {
    type: Number,
    default: TicketStatus.PendingPayment,
    enum: TicketStatus, required: true
  },
  qrCode: { type: String, required: true }
});

const UserOrderSchema: Schema = new Schema({
  buyer: { type: String, required: true },
  cellPhone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  orderNumber: { type: String, required: true },
  orderStatus: { type: Number,
    default: OrderStatus.Unknown,
    enum: OrderStatus, required: true},
  orderCreateDate: { type: Date, default: Date.now },
  memo: { type: String },
  ticketList: { type: [ticketSchema], required: true },
  activityId: { type: String },
  userId: { type: String },
  payTime: { type: Date }
});

const UserOrderModel = mongoose.model<UserOrder>('userorder', UserOrderSchema);

export { UserOrderModel, UserOrder, TicketStatus, OrderStatus };