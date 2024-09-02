test("GET to /api/v1/status shoul return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.update_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.version).toBeDefined();
  expect(responseBody.version.includes("PostgreSQL")).toBeTruthy();

  expect(responseBody.max_connections).toBeDefined();
  expect(parseInt(responseBody.max_connections)).not.toBeNaN();

  expect(responseBody.opened_connections).toBeDefined();
  expect(parseInt(responseBody.opened_connections)).not.toBeNaN();
});
