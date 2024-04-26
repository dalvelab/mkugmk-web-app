export type ContactsPage = {
  id: number;
  title: string;
  description: string;
  locale: string;
  contacts: {
    id: number;
    department?: string;
    caption?: string;
    email?: string;
    enable_order_call_modal: boolean;
    phone?: string;
  }[]
}