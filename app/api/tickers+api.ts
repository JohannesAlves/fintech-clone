export async function GET(req: Request) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`
  );

  const data = await response.json();

  return Response.json(data);
}
