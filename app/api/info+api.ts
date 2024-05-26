const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(req: Request) {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=1,1027,825,1839,5426`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY!,
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}
