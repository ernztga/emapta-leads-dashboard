export interface ILead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  delivery: boolean;
  pickup: boolean;
  payment: boolean;
  created_at: string;
}

export interface ILeadsData {
  leads: ILead[];
}
