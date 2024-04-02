import dbConnect from '@/db/dbConnect';
import Sidebar from '@/models/Sidebar';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const sidebarData = await Sidebar.find();
  return NextResponse.json({ sidebarData });
}

export async function POST(request: Request) {
  await dbConnect();

  await Sidebar.create(request);
  return NextResponse.json({ message: "Topic deleted" }, { status: 201 });
}