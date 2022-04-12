export async function storeFront(query, variables = {}) {
  const response = await fetch(
    "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": "3e03534a750d75e6d1b9f96209a1a754",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  return response.json();
}
