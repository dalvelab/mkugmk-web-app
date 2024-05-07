import { ExhibitionCenter } from "../ExibitionCenter";

export type Ticket = {
  id: number;
  infotech_link: string;
  name: string;
  pushkin_card: boolean;
  exhibition_centers: ExhibitionCenter[];
};
