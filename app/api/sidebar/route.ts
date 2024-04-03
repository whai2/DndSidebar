import dbConnect from '@/db/dbConnect';
import Sidebar from '@/models/Sidebar';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const sidebarData = await Sidebar.find().sort({"index": 1});
  return NextResponse.json({ sidebarData });
}

export async function POST(request: Request) {
  await dbConnect();

  const { parent_id, index } = await request.json();
  await Sidebar.create({ parent_id, index });
  return NextResponse.json({ message: "페이지가 생성되었습니다." }, { status: 201 });
}

export async function PATCH(request: Request) {
  await dbConnect();

  const { _id, index } = await request.json();
  await Sidebar.updateOne({ _id }, { index: index });
  return NextResponse.json({ message: "페이지 정렬 완료." }, { status: 201 });
}
