create table users (
    id bigint AUTO_INCREMENT,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(200) not null,
    role ENUM('admin', 'client'),
     PRIMARY key(id) 
)

create table companies (
    user_id bigint not NULL,
    name VARCHAR(255) not null,
    Foreign Key (user_id) REFERENCES users(id)
)

alter table companies modify column user_id bigint not NULL 

alter table companies MODIFY column name VARCHAR(255) not null

create table vendors (
    id bigint AUTO_INCREMENT,
    name VARCHAR(200) not NULL,
    rate int,
    response_sales_hours VARCHAR(150),
    PRIMARY key (id)
)

create table projects (
    user_id bigint not NULL,
    name varchar(200) not null,
    Foreign Key (user_id) REFERENCES users(id)
)


create table services (
    id int AUTO_INCREMENT,
    name varchar(255) not null,
    PRIMARY key(id)
)

create table countries (
    id int AUTO_INCREMENT,
    name VARCHAR(255) not null,
    primary key(id)
)

create table vendors_services (
    vendor_id bigint not null,
    Foreign Key (vendor_id) REFERENCES vendors(id),
    service_id int not null,
    Foreign Key (service_id) REFERENCES services(id), 
    PRIMARY key (vendor_id, service_id)
)

create table vendors_countries (
    vendor_id bigint not null,
    Foreign Key (vendor_id) REFERENCES vendors(id),
    country_id int not null,
    Foreign Key (country_id) REFERENCES countries(id),
    primary key (vendor_id, country_id)
)

create table matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  vendor_id INT,
  score FLOAT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project(id),
  CONSTRAINT fk_vendor FOREIGN KEY (vendor_id) REFERENCES vendor(id)
);
