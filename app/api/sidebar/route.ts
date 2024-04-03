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

  const { parent_id } = await request.json();
  await Sidebar.create({ parent_id });
  return NextResponse.json({ message: "페이지가 생성되었습니다." }, { status: 201 });
}