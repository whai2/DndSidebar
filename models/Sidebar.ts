import { model, models, Schema } from 'mongoose';

export interface IProduct {
    parent_id: string;
    index: number;
}

const SidebarSchema = new Schema<IProduct>(
  {
    parent_id: String,
    index: Number,
  },
  {
    timestamps: true,
  }
);

const Sidebar = models.Sidebar || model('Sidebar', SidebarSchema);
export default Sidebar;