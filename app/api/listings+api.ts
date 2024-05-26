const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(req: Request) {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=BRL`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY!,
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}
