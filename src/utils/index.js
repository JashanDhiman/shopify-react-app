export async function storeFront(query, variables) {
  const response = await fetch(
    "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "d179890dc5a100e660bd74bd255488b6",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  console.log(response);
  return response.json();
}
