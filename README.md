# ISFIFramework
ISFIFramework is a lightweight and modern PHP MVC (Model-View-Controller) framework designed to streamline the development of web applications. It provides a clean and intuitive structure that encourages best practices and helps developers build scalable, maintainable, and efficient projects.

`Start building your next project with ISFIFramework and experience the simplicity of modern PHP development.`

## MVC Architecture
ISFIFramework adopts the Model-View-Controller design pattern, separating application logic, data handling, and user interface components to ensure clean and modular code.

## Routing System
The framework includes a robust and flexible routing system, allowing developers to define clean and SEO-friendly URLs. Routes can handle dynamic parameters for advanced functionality.

## Database Integration
Seamlessly connect to databases with built-in support for query builders, prepared statements, and ORM-like functionality to simplify data handling.

## Error Handling
ISFIFramework provides comprehensive error and exception handling, ensuring clarity during development and graceful error pages in production.

## Extensibility
With its modular structure, developers can easily extend functionality by adding custom libraries, helpers, and plugins.

## Security Features
Incorporates best practices for security, including CSRF protection, input validation, and escaping to defend against common vulnerabilities.


# Getting Started

- Download or clone the ISFIFramework repository.
  ``` 
  git clone https://github.com/ahmadsopyan9/Isfiframework.git
  ```
- Set up your database credentials in the configuration file.
- Define routes, create controllers, and start building your application.


# Builder Class Usage

## Introduction
The `Builder` class is a query builder that simplifies the process of creating and executing SQL queries in PHP. This class supports common SQL operations such as `SELECT`, `INSERT`, `UPDATE`, and `DELETE`. It also provides support for advanced features like joins, grouping, ordering, pagination, and more.

## Features
- Chainable methods for clean and intuitive query building
- Supports `WHERE`, `OR WHERE`, `WHERE IN`, `JOINS`, `GROUP BY`, `HAVING`
- CRUD operations (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
- Pagination with `LIMIT` and `OFFSET`
- Count records easily

## How to Use

### 1. **Select Basic Query**
```php
$builder = new Builder();
$result = $builder
    ->table('users')
    ->select(['id', 'name', 'email'])
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT id, name, email FROM users;
```

### 2. **Where and Order By**
```php
$builder = new Builder();
$result = $builder
    ->table('products')
    ->select('*')
    ->where('price', '>', 10000)
    ->orderBy('price', 'DESC')
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT * FROM products WHERE price > 10000 ORDER BY price DESC;
```

### 3. **Using Joins**
```php
$builder = new Builder();
$result = $builder
    ->table('orders')
    ->select(['orders.id', 'users.name', 'orders.total'])
    ->join('users', 'orders.user_id', '=', 'users.id')
    ->where('orders.status', 'completed')
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT orders.id, users.name, orders.total 
FROM orders 
INNER JOIN users ON orders.user_id = users.id 
WHERE orders.status = 'completed';
```

### 4. **Group By and Having**
```php
$builder = new Builder();
$result = $builder
    ->table('sales')
    ->select(['category', 'SUM(amount) as total_amount'])
    ->groupBy('category')
    ->having('total_amount', '>', 5000)
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT category, SUM(amount) as total_amount 
FROM sales 
GROUP BY category 
HAVING total_amount > 5000;
```

### 5. **Insert Data**
```php
$builder = new Builder();
$data = [
    'name' => 'John Doe',
    'email' => 'johndoe@example.com',
    'password' => password_hash('123456', PASSWORD_DEFAULT)
];

$inserted = $builder->table('users')->insert($data);

if ($inserted) {
    echo "Data successfully inserted!";
}
```
**Generated SQL:**
```sql
INSERT INTO users (name, email, password) VALUES (?, ?, ?);
```

### 6. **Update Data**
```php
$builder = new Builder();
$data = [
    'name' => 'John Updated',
    'email' => 'johnupdated@example.com'
];

$updated = $builder
    ->table('users')
    ->where('id', 1)
    ->update($data);

if ($updated) {
    echo "Data successfully updated!";
}
```
**Generated SQL:**
```sql
UPDATE users SET name = ?, email = ? WHERE id = 1;
```

### 7. **Delete Data**
```php
$builder = new Builder();
$deleted = $builder
    ->table('users')
    ->where('id', 1)
    ->delete();

if ($deleted) {
    echo "Data successfully deleted!";
}
```
**Generated SQL:**
```sql
DELETE FROM users WHERE id = 1;
```

### 8. **Pagination (Limit and Offset)**
```php
$builder = new Builder();
$result = $builder
    ->table('posts')
    ->select(['id', 'title', 'content'])
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->offset(20)
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT id, title, content FROM posts 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 20;
```

### 9. **Count Records**
```php
$builder = new Builder();
$count = $builder
    ->table('users')
    ->where('status', 'active')
    ->count();

echo "Number of active users: $count";
```
**Generated SQL:**
```sql
SELECT COUNT(*) as count FROM users WHERE status = 'active';
```

### 10. **Where In**
```php
$builder = new Builder();
$result = $builder
    ->table('products')
    ->whereIn('id', [1, 2, 3, 4])
    ->get();

print_r($result);
```
**Generated SQL:**
```sql
SELECT * FROM products WHERE id IN (1, 2, 3, 4);
```

## Notes
- Ensure the `Database` class supports prepared statements to prevent SQL injection.
- Properly handle errors in the `query()` and `execute()` methods.
- Validate inputs for security and data integrity.

## License
This script is open-source. You are free to modify and use it as per your project requirements.
