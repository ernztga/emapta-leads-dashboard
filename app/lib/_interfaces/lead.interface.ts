export interface ILead {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  delivery: boolean | string;
  pickup: boolean | string;
  payment: boolean | string;
  created_at?: string;
}

export interface ILeadsData {
  leads: ILead[];
}
