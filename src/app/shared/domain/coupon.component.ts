export class Coupon {
  id: number;
  adminId: number;
  creationDate: string;
  code: string;
  active: boolean
  reward: number;
  singleUse: boolean;
  startDate: string;
  endDate: string;
  redeemed: number;
}
