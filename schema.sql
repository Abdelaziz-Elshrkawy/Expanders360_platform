


create table users (
    id bigint AUTO_INCREMENT,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(200) not null,
    role ENUM('admin', 'client') DEFAULT 'client',
     PRIMARY key(id) 
);

create table services (
    id int AUTO_INCREMENT,
    name varchar(255) not null,
    PRIMARY key(id)
);

create table countries (
    id int AUTO_INCREMENT,
    name VARCHAR(255) not null,
    primary key(id)
);


create table companies (
    id bigint AUTO_INCREMENT,
    user_id bigint not NULL,
    name VARCHAR(255) not null,
    Foreign Key (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

create table vendors (
    id bigint AUTO_INCREMENT,
    name VARCHAR(200) not NULL,
    rate int,
    response_sla_hours VARCHAR(150),
    PRIMARY key (id)
);

create table projects (
    id bigint AUTO_INCREMENT,
    name varchar(200) not null,
    country_id int not null,
    user_id bigint not NULL,
    budget float not null,
    `status` varchar(50) not null,
    PRIMARY key(id),
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (country_id) REFERENCES countries(id)
);

create table vendors_services (
    vendor_id bigint not null,
    Foreign Key (vendor_id) REFERENCES vendors(id),
    service_id int not null,
    Foreign Key (service_id) REFERENCES services(id), 
    PRIMARY key (vendor_id, service_id)
);

create table vendors_countries (
    vendor_id bigint not null,
    country_id int not null,
    Foreign Key (vendor_id) REFERENCES vendors(id),
    Foreign Key (country_id) REFERENCES countries(id),
    primary key (vendor_id, country_id)
);

create table projects_services (
    project_id bigint not null,
    service_id int not null,
    Foreign Key (project_id) REFERENCES projects(id),
    Foreign Key (service_id) REFERENCES services(id),
    PRIMARY key(project_id, service_id)
);

create table matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id bigint,
  vendor_id bigint ,
  score FLOAT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

