import { model, models, Schema } from 'mongoose';

export interface IProduct {
    id: string;
    parent_id: string;
}

const SidebarSchema = new Schema<IProduct>(
  {
    id: String,
    parent_id: String,
  },
  {
    timestamps: true,
  }
);

const Sidebar = models.Sidebar || model('Sidebar', SidebarSchema);
export default Sidebar;