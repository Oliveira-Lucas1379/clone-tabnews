import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const version = await database.query("SELECT version();");

  const maxConnections = await database.query(
    "SELECT current_setting('max_connections');",
  );

  const openedConnections = await database.query(
    "SELECT sum(numbackends) FROM pg_stat_database;",
  );

  response.status(200).json({
    update_at: updateAt,
    version: version.rows[0]["version"],
    max_connections: maxConnections.rows[0]["current_setting"],
    opened_connections: openedConnections.rows[0]["sum"],
  });
}

export default status;
