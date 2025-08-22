export const CreateTableProducts = `
    CREATE TABLE IF NOT EXISTS products (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        url_image VARCHAR(512),
        quantity INT NOT NULL DEFAULT 0
    );
`