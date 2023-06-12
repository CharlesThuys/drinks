import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const json_response = {
    status: "success",
  }

  return NextResponse.json(json_response)
}