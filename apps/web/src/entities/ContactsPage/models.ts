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
    phone?: string;
  }[]
}