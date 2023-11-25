import { Line } from "../models/line";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if(response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchLines(): Promise<Line[]> {
  const response = await fetchData("/line/singlephase", { method: "GET" });
  return response.json();
}

export interface LineInput {
  title: string,
  flow: number,
}

export async function createLine(line: LineInput ): Promise<Line> {
  const response = await fetchData("/line/singlephase",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(line),
  });
  return response.json();
}